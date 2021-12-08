import React, { useEffect, useState, useContext } from 'react';
import { View, Button } from 'react-native';
import { Item, Picker } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import FormContainer from '../../../components/form/FormContainer';
import Input from '../../../components/form/Input';
import countries from '../../../assets/data/countries.json';
import StoreContext from '../../../context/store-context';

const Checkout = (props) => {
  const [orderItems, setOrderItems] = useState();
  const [address, setAddress] = useState();
  const [address2, setAddress2] = useState();
  const [city, setCity] = useState();
  const [zip, setZip] = useState();
  const [country, setCountry] = useState();
  const [phone, setPhone] = useState();
  const [user, setUser] = useState();
  const { cartItems } = useContext(StoreContext);

  useEffect(() => {
    setOrderItems(cartItems);
  }, [cartItems]);

  const checkoutHandler = () => {
    let order = {
      city,
      country,
      dateOrdered: Date.now(),
      orderItems,
      phone,
      shippingAddress1: address,
      shippingAddress2: address2,
      status: '3',
      user,
      zip,
    };
    props.navigation.navigate('Payment', { order: order });
  };
  return (
    <KeyboardAwareScrollView>
      <FormContainer title={'Shipping Address'}>
        <Input
          placeholder={'Phone'}
          name={'phone'}
          value={phone}
          keyboardType={'numeric'}
          onChangeText={(text) => setPhone(text)}
        />
        <Input
          placeholder={'Shipping Address 1'}
          name={'ShippingAddress1'}
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <Input
          placeholder={'Shipping Address 2'}
          name={'ShippingAddress2'}
          value={address2}
          onChangeText={(text) => setAddress2(text)}
        />
        <Input
          placeholder={'City'}
          name={'city'}
          value={city}
          onChangeText={(text) => setCity(text)}
        />
        <Input
          placeholder={'Zip Code'}
          name={'zip'}
          value={zip}
          keyboardType={'numeric'}
          onChangeText={(text) => setZip(text)}
        />
        <Item picker>
          <Picker
            note='dropdown'
            iosIcon={<Icon name='arrow-down' color='#007aff' />}
            style={{
              width: undefined,
            }}
            selectedValue={country}
            placeholder='Select your country'
            placeholderStyle={{ color: '#007aff' }}
            placeholderIconColor='#007aff'
            onValueChange={(e) => setCountry(e)}
          >
            {countries.map((c) => (
              <Picker.Item key={c.code} label={c.name} value={c.name} />
            ))}
          </Picker>
        </Item>
        <View style={{ width: '80%', alignItems: 'center' }}>
          <Button title='Confirm' onPress={() => checkoutHandler()} />
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};
const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

export default connect(mapStateToProps)(Checkout);
