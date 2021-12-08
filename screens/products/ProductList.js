import React from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import ProductCard from './ProductCard';

let { width } = Dimensions.get('window');

const ProductList = ({ navigation, item }) => {
  return (
    <TouchableOpacity
      style={{ width: '50%' }}
      onPress={() => navigation.navigate('ProductDetail', { item })}
    >
      <View style={{ width: width / 2, backgroundColor: 'gainsboro' }}>
        <ProductCard item={item} />
      </View>
    </TouchableOpacity>
  );
};

export default ProductList;
