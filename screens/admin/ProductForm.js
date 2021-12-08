import { Item, Picker } from 'native-base';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';
import FormContainer from '../../components/form/FormContainer';
import Input from '../../components/form/Input';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories } from '../../redux/actions/productActions';
import Error from '../../components/Error';
import EasyButton from '../../components/EasyButton';
import * as ImagePicker from 'expo-image-picker';
import baseURL from '../../assets/common/baseUrl';
import mime from 'mime';
import Toast from 'react-native-toast-message';

const ProductForm = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { categories, error } = useSelector((state) => state.getCategories);

  const [pickerValue, setPickerValue] = useState();
  const [brand, setBrand] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [mainImage, setMainImage] = useState();
  const [category, setCategory] = useState('5f15d545f3a046427a1c26e2');
  //  const [categories, setCategories] = useState([]);
  const [token, setToken] = useState();
  const [err, setError] = useState();
  const [countInStock, setCountInStock] = useState();
  const [rating, setRating] = useState(0);
  const [isFeatured, setIsFeature] = useState(false);
  const [richDescription, setRichDescription] = useState();
  const [numReviews, setNumReviews] = useState(0);
  const [item, setItem] = useState(null);

  useEffect(() => {
    dispatch(getCategories());
    // imahe picker
    if (!route.params) {
      setItem(null);
    } else {
      setItem(route.params.item);
      setBrand(item?.brand);
      setName(item?.name);
      setPrice(item?.price?.toString());
      setDescription(item?.description);
      setMainImage(item?.image);
      setImage(item?.image);
      setCategory(category?.id);
      setCountInStock(item?.countInStock?.toString());
    }

    const pikcerImage = async () => {
      if (Platform.OS !== 'web') {
        const { status } = await imagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    };
    pikcerImage();
  }, [dispatch, route]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setMainImage(result.uri);
      setImage(result.uri);
    }
  };

  const addProduct = () => {
    if (
      name == '' ||
      brand == '' ||
      price == '' ||
      description == '' ||
      category == '' ||
      countInStock == ''
    ) {
      setError('Please fill in the form correctly');
    }

    let formData = new FormData();

    const newImageUri = 'file:///' + image.split('file:/').join('');

    formData.append('image', {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri.split('/').pop(),
    });
    formData.append('name', name);
    formData.append('brand', brand);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('countInStock', countInStock);
    formData.append('richDescription', richDescription);
    formData.append('rating', rating);
    formData.append('numReviews', numReviews);
    formData.append('isFeatured', isFeatured);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    if (item !== null) {
      axios
        .put(`${baseURL}/products/${item.id}`, formData, config)
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            Toast.show({
              topOffset: 60,
              type: 'success',
              text1: 'Product successfuly updated',
              text2: '',
            });
            setTimeout(() => {
              navigation.navigate('Products');
            }, 500);
          }
        })
        .catch((error) => {
          Toast.show({
            topOffset: 60,
            type: 'error',
            text1: 'Something went wrong',
            text2: 'Please try again',
          });
        });
    } else {
      axios
        .post(`${baseURL}/products`, formData, config)
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            Toast.show({
              topOffset: 60,
              type: 'success',
              text1: 'New Product added',
              text2: '',
            });
            setTimeout(() => {
              props.navigation.navigate('Products');
            }, 500);
          }
        })
        .catch((error) => {
          Toast.show({
            topOffset: 60,
            type: 'error',
            text1: 'Something went wrong',
            text2: 'Please try again',
          });
        });
    }
  };

  return (
    <FormContainer title='Add Product'>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: mainImage }} />
        <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
          <Icon style={{ color: 'white' }} name='camera' />
        </TouchableOpacity>
      </View>
      <View style={styles.label}>
        <Text style={{ textDecorationLine: 'underline' }}>Brand</Text>
      </View>
      <Input
        placeholder='Brand'
        name='brand'
        id='brand'
        value={brand}
        onChangeText={(text) => setBrand(text)}
      />
      <View style={styles.label}>
        <Text style={{ textDecorationLine: 'underline' }}>Name</Text>
      </View>
      <Input
        placeholder='Name'
        name='name'
        id='name'
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <View style={styles.label}>
        <Text style={{ textDecorationLine: 'underline' }}>Price</Text>
      </View>
      <Input
        placeholder='Price'
        name='price'
        id='price'
        value={price}
        keyboardType={'numeric'}
        onChangeText={(text) => setPrice(text)}
      />
      <View style={styles.label}>
        <Text style={{ textDecorationLine: 'underline' }}>Count in Stock</Text>
      </View>
      <Input
        placeholder='Stock'
        name='stock'
        id='stock'
        value={countInStock}
        keyboardType={'numeric'}
        onChangeText={(text) => setCountInStock(text)}
      />
      <View style={styles.label}>
        <Text style={{ textDecorationLine: 'underline' }}>Description</Text>
      </View>
      <Input
        placeholder='Description'
        name='description'
        id='description'
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <Item picker>
        <Picker
          mode='dropdown'
          iosIcon={<Icon color={'#007aff'} name='arrow-down' />}
          style={{ width: undefined }}
          placeholder='Select your Category'
          selectedValue={pickerValue}
          placeholderStyle={{ color: '#007aff' }}
          placeholderIconColor='#007aff'
          onValueChange={(e) => [setPickerValue(e), setCategory(e)]}
        >
          {categories.map((c) => {
            return <Picker.Item key={c.id} label={c.name} value={c.id} />;
          })}
        </Picker>
      </Item>
      {err ? <Error message={err} /> : null}
      <View style={styles.buttonContainer}>
        <EasyButton large primary onPress={() => addProduct()}>
          <Text style={styles.buttonText}>Confirm</Text>
        </EasyButton>
      </View>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  label: {
    width: '80%',
    marginTop: 10,
  },
  buttonContainer: {
    width: '80%',
    marginBottom: 80,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderStyle: 'solid',
    borderWidth: 8,
    padding: 0,
    justifyContent: 'center',
    borderRadius: 100,
    borderColor: '#E0E0E0',
    elevation: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  imagePicker: {
    position: 'absolute',
    right: 5,
    bottom: 5,
    backgroundColor: 'grey',
    padding: 8,
    borderRadius: 100,
    elevation: 20,
  },
});
export default ProductForm;
