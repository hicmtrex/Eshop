import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Products from '../screens/admin/Products';
import Categories from '../screens/admin/Categories';
import Orders from '../screens/admin/Orders';
import ProductForm from '../screens/admin/ProductForm';

const Stack = createStackNavigator();

const AdminNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        options={{ title: 'Products' }}
        name='Products'
        component={Products}
      />
      <Stack.Screen name='Categories' component={Categories} />
      <Stack.Screen name='Orders' component={Orders} />
      <Stack.Screen name='ProductForm' component={ProductForm} />
    </Stack.Navigator>
  );
};

export default AdminNavigator;
