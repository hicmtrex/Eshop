import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import productsContainer from '../screens/products/ProductsContainer';
import SingleProduct from '../screens/products/SingleProduct';

const Stack = createStackNavigator();
const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='Home' component={productsContainer} />
      <Stack.Screen name='ProductDetail' component={SingleProduct} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
