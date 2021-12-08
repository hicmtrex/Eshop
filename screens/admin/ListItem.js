import React, { useContext, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Button,
  Modal,
  ScrollView,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome';
import EasyButton from '../../components/EasyButton';
import StoreContext from '../../context/store-context';
let { width } = Dimensions.get('window');

const ListItem = ({ item, navigation, index }) => {
  const { deleteProduct, error } = useContext(StoreContext);
  const [modalVisible, setModalVisible] = useState(false);

  const handleDelete = () => {
    deleteProduct(item.id);
    if (!error) {
      Toast.show({
        topOffset: 60,
        type: 'success',
        text1: 'Product Deleted',
      });
      setModalVisible(false);
    } else {
      Toast.show({
        topOffset: 60,
        type: 'success',
        text1: error,
      });
    }
  };

  return (
    <View>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                position: 'absolute',
                top: 5,
                right: 10,
              }}
              underlayColor='#e8e8e8'
              onPress={() => setModalVisible(false)}
            >
              <Icon
                onPress={() => setModalVisible(false)}
                name='close'
                size={20}
              />
            </TouchableOpacity>
            <EasyButton
              medium
              secondary
              onPress={() => navigation.navigate('ProductForm', { item })}
            >
              <Text style={styles.textStyle}>Edit</Text>
            </EasyButton>
            <EasyButton medium danger onPress={handleDelete}>
              <Text style={styles.textStyle}>Delete</Text>
            </EasyButton>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ProductDetail', { item });
        }}
        onLongPress={() => setModalVisible(true)}
        style={[
          styles.container,
          {
            backgroundColor: index % 2 == 0 ? 'white' : 'gainsboro',
          },
        ]}
      >
        <Image
          style={styles.image}
          source={{
            uri: item.image
              ? item.image
              : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
          }}
        />
        <Text style={styles.item}>{item.brand}</Text>
        <Text style={styles.item} numberOfLines={1} ellipsizeMode='tail'>
          {item.name}
        </Text>
        <Text style={styles.item} numberOfLines={1} ellipsizeMode='tail'>
          {item.category.name}
        </Text>
        <Text style={styles.item}>$ {item.price}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 5,
    width: width,
  },
  image: {
    borderRadius: 50,
    width: width / 6,
    height: 20,
    margin: 2,
  },
  item: {
    flexWrap: 'wrap',
    margin: 3,
    width: width / 6,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
});
export default ListItem;
