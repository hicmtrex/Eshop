import React, { useContext } from 'react';
import { Container, Text, Left, Right, H1 } from 'native-base';
import {
  StyleSheet,
  View,
  Dimensions,
  Button,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/cartActions';
import CartItems from './CartItems';
import Icon from 'react-native-vector-icons/FontAwesome';
import StoreContext from '../../context/store-context';
import EasyButton from '../../components/EasyButton';

let { height, width } = Dimensions.get('window');

const Cart = (props) => {
  const { cartItems, deleteFromCart, clearCart } = useContext(StoreContext);
  const total = cartItems.reduce((acc, p) => acc + p.price * p.qty, 0)

  return (
    <>
      {cartItems.length ? (
        <Container>
          <H1 style={{ alignSelf: 'center' }}>Cart</H1>

          <SwipeListView
            data={cartItems}
            renderItem={(data) => <CartItems item={data} />}
            renderHiddenItem={(data) => (
              <View style={styles.hiddenContainer}>
                <TouchableOpacity
                  onPress={() => deleteFromCart(data.item)}
                  style={styles.hiddenButton}
                >
                  <Icon name='trash' color={'white'} size={30} />
                </TouchableOpacity>
              </View>
            )}
            disableRightSwipe={true}
            previewOpenDelay={3000}
            friction={1000}
            tension={40}
            leftOpenValue={75}
            stopLeftSwipe={75}
            rightOpenValue={-75}
          />
          <View style={styles.bottomContainer}>
            <Left>
              <Text style={styles.price}>$ {total}</Text>
            </Left>
            <Right>
              <EasyButton danger medium onPress={() => clearCart()}>
                <Text style={{ color: 'white' }}>Clear</Text>
              </EasyButton>
            </Right>
            <Right>
              <EasyButton
                secondary
                medium
                onPress={() => props.navigation.navigate('Checkout')}
              >
                <Text style={{ color: 'white' }}>checkout</Text>
              </EasyButton>
            </Right>
          </View>
        </Container>
      ) : (
        <Container style={styles.emptyContainer}>
          <Text>Looks like your cart is empty</Text>
          <Text>Add products to your cart to get started</Text>
        </Container>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bottomContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'white',
    elevation: 20,
  },
  price: {
    fontSize: 18,
    margin: 20,
    color: 'red',
  },
  hiddenContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  hiddenButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 25,
    height: 70,
    width: width / 1.2,
  },
});
export default Cart;
