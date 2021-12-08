import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import EasyButton from '../../components/EasyButton';
import Error from '../../components/Error';
import FormContainer from '../../components/form/FormContainer';
import Input from '../../components/form/Input';
import StoreContext from '../../context/store-context';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { userLogin, isOnline } = useContext(StoreContext);

  useEffect(() => {
    if (isOnline) {
      navigation.navigate('User Profile');
    }
  }, [isOnline]);

  const handleSubmit = () => {
    if (email === '' || password === '') {
      setError('Please fill in your credentials');
    } else {
      userLogin(email, password);
      Toast.show({
        topOffset: 60,
        type: 'success',
        text1: 'Login Succeeded',
        text2: `Welcome`,
      });
    }
  };

  return (
    <FormContainer title='Login'>
      <Input
        placeholder={'Enter Email'}
        name={'email'}
        id={'email'}
        value={email}
        onChangeText={(text) => setEmail(text.toLowerCase())}
      />
      <Input
        placeholder={'Enter Password'}
        name={'password'}
        id={'password'}
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <View style={styles.buttonGroup}>
        {error ? <Error message={error} /> : null}
        <EasyButton medium primary onPress={() => handleSubmit()}>
          <Text style={{ color: 'white' }}>Sign In</Text>
        </EasyButton>
        <View style={[{ marginTop: 40 }, styles.buttonGroup]}>
          <Text style={styles.middleText}>Don't have an account yet?</Text>
          <EasyButton
            medium
            primary
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={{ color: 'white' }}>Sign Up</Text>
          </EasyButton>
        </View>
      </View>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    width: '80%',
    alignItems: 'center',
  },
  middleText: {
    marginBottom: 20,
    alignSelf: 'center',
  },
});
export default Login;
