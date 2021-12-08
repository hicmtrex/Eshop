import React, { useContext, useState, useCallback, useEffect } from 'react';
import { View, Text, ScrollView, Button, StyleSheet } from 'react-native';
import { Container } from 'native-base';
import StoreContext from '../../context/store-context';
import EasyButton from '../../components/EasyButton';

const UserProfile = ({ navigation }) => {
  const { userInfo, isOnline, userLogout } = useContext(StoreContext);

  useEffect(() => {
    if (!isOnline) {
      navigation.navigate('Login');
    }
  }, [isOnline]);

  const logoutHandler = () => {
    userLogout();
    navigation.navigate('Login');
  };
  return (
    <Container style={styles.container}>
      <ScrollView contentContainerStyle={styles.subContainer}>
        <Text style={{ fontSize: 30 }}>{userInfo?.name}</Text>
        <View style={{ marginTop: 20 }}>
          <Text style={{ margin: 10 }}>Email: {userInfo?.email}</Text>
          <Text style={{ margin: 10 }}>Phone: {userInfo?.phone}</Text>
          <Text style={{ margin: 10 }}>
            Admin: {userInfo.isAdmin ? 'Admin' : 'Not Admin'}
          </Text>
        </View>
        <View style={{ marginTop: 80 }}>
          <EasyButton medium secondary onPress={logoutHandler}>
            <Text style={{ color: 'white' }}>Sign Out</Text>
          </EasyButton>
        </View>
        <View style={styles.order}>
          <Text style={{ fontSize: 20 }}>My Orders</Text>
          <View></View>
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  subContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  order: {
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 60,
  },
});

export default UserProfile;
