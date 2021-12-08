import React, { useContext } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import StoreContext from '../../context/store-context';
import EasyButton from '../../components/EasyButton';

let { width } = Dimensions.get('window');

const ProductCard = (props) => {
  const { addToCart } = useContext(StoreContext);
  const { item } = props;

  return (
    <View style={styles.container}>
      <Image
        resizeMode='contain'
        source={{
          uri: item.image
            ? item.image
            : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
        }}
        style={styles.image}
      />
      <View style={styles.card} />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.price}>${item.price}</Text>
      {item.countInStock > 0 ? (
        <View style={{ marginBottom: 60 }}>
          <EasyButton
            primary
            medium
            onPress={() => {
              addToCart(item),
                Toast.show({
                  topOffset: 60,
                  type: 'success',
                  text1: `${item.name} added to Cart`,
                  text2: 'Go to your cart to complete order',
                });
            }}
            color={'green'}
          >
            <Text style={{ color: 'white' }}>Add</Text>
          </EasyButton>
        </View>
      ) : (
        <Text style={{ marginTop: 20 }}>Currently Unavailable</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width / 2 - 20,
    height: width / 1.7,
    padding: 10,
    borderRadius: 10,
    marginTop: 55,
    marginBottom: 5,
    marginLeft: 10,
    alignItems: 'center',
    elevation: 8,
    backgroundColor: 'white',
  },
  image: {
    width: 110,
    height: 200,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: -45,
  },
  card: {
    marginBottom: 10,
    height: width / 2 - 20 - 90,
    backgroundColor: 'transparent',
    width: width / 2 - 20 - 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  price: {
    fontSize: 20,
    color: 'orange',
    marginTop: 10,
  },
});

export default ProductCard;
