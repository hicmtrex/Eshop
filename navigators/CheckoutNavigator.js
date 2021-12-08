import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Checkout from '../screens/cart/checkout/Checkout';
import Confirm from '../screens/cart/checkout/Confirm';
import Payment from '../screens/cart/checkout/Payment';

const Tab = createMaterialTopTabNavigator();

const CheckoutNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Shipping' component={Checkout} />
      <Tab.Screen name='Payment' component={Payment} />
      <Tab.Screen name='Confirm' component={Confirm} />
    </Tab.Navigator>
  );
};

export default CheckoutNavigator;
