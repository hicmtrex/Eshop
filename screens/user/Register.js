import Toast from 'react-native-toast-message';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormContainer from '../../components/form/FormContainer';
import Input from '../../components/form/Input';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from '../../redux/actions/userActions';

const Register = (props) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { success } = useSelector((state) => state.register);
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      Toast.show({
        topOffset: 60,
        type: 'success',
        text1: 'Registration Succeeded',
        text2: 'Please Login into your account',
      });
      props.navigation.navigate('Login');
    }
  }, [success]);

  const registerHandler = async () => {
    if (email === '' || name === '' || phone === '' || password === '') {
      setError('Please fill in the form correctly');
    }
    const user = {
      name: name,
      email: email,
      password: password,
      phone: phone,
      isAdmin: false,
    };
    dispatch(userRegister(user));
  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer title='Register'>
        <Input
          placeholder={'Email'}
          name={'email'}
          id={'email'}
          onChangeText={(text) => setEmail(text.toLowerCase())}
        />
        <Input
          placeholder={'Name'}
          name={'name'}
          id={'name'}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder={'Phone Number'}
          name={'phone'}
          id={'phone'}
          keyboardType={'numeric'}
          onChangeText={(text) => setPhone(text)}
        />
        <Input
          placeholder={'Password'}
          name={'password'}
          id={'password'}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <View style={styles.buttonGroup}>
          {error ? <Error message={error} /> : null}
        </View>
        <View style={{ marginBottom: 10 }}>
          <Button title='Register' onPress={registerHandler} />
        </View>
        <View>
          <Button
            title='Back To Login'
            onPress={() => props.navigation.navigate('Login')}
          />
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    width: '80%',
    margin: 10,
    alignItems: 'center',
  },
});
export default Register;
