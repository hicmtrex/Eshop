import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UserProfile from '../screens/user/UserProfile';
import Login from '../screens/user/Login';
import Register from '../screens/user/Register';
import StoreContext from '../context/store-context';

const Stack = createStackNavigator();

const UserNavigator = () => {
  const { isOnline } = useContext(StoreContext);
  return (
    <Stack.Navigator
      initialRouteName={isOnline ? 'User Profile' : 'Login'}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='User Profile' component={UserProfile} />
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Register' component={Register} />
    </Stack.Navigator>
  );
};

export default UserNavigator;
