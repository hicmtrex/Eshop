import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeNavigator from './HomeNavigator';
import CartIcon from '../components/CartIcon';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CartNavigator from './CartNavigation';
import UserNavigator from './UserNavigator';
import StoreContext from '../context/store-context';
import AdminNavigator from './AdminNavigator';

const Tab = createBottomTabNavigator();
const Main = () => {
  const { userInfo } = useContext(StoreContext);
  return (
    <Tab.Navigator
      initialRouteName='Home'
      tabBarOptions={{
        keyboardHidesTabBar: true,
        showLabel: false,
        activeTintColor: '#e91e63',
      }}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name='Home'
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name='home' color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <View>
              <Icon name='shopping-cart' color={color} size={30} />
              <CartIcon />
            </View>
          ),
        }}
        name='Card'
        component={CartNavigator}
      />
      {userInfo?.isAdmin ? (
        <Tab.Screen
          name='Admin'
          component={AdminNavigator}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name='cog' color={color} size={30} />
            ),
          }}
        />
      ) : null}
      <Tab.Screen
        name='User'
        component={UserNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name='user' color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;
