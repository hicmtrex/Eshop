import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Left, Right, ListItem, Thumbnail, Body } from 'native-base';
import StoreContext from '../../context/store-context';
import Icon from 'react-native-vector-icons/FontAwesome';

const CartItems = ({ item }) => {
  //const [quantity, setQuantity] = useState(props.item.product.item.quantity);
  const { addToCart, removeFromCart } = useContext(StoreContext);

  const price = Number(item.item.price * item.item.qty).toFixed(2);
  return (
    <>
      <ListItem style={styles.listItem} key={Math.random() * 100}>
        <Left>
          <Thumbnail
            source={{
              uri: item.item?.image
                ? item.item?.image
                : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
            }}
          />
        </Left>
        <Body style={styles.body}>
          <Left>
            <Text>{item.item?.name}</Text>
          </Left>
          <Right>
            <Text>${item.item?.price}</Text>
          </Right>
        </Body>
      </ListItem>
      <View style={styles.icons}>
        <Text style={{ marginRight: 100 }}>${price}</Text>
        <Icon
          style={{ marginRight: 5 }}
          onPress={() => addToCart(item.item)}
          name='plus-circle'
          size={24}
          color='blue'
        />
        <Text style={{ marginLeft: 5, marginRight: 6 }}>{item.item?.qty}</Text>

        <Icon
          onPress={() => removeFromCart(item.item)}
          name='minus-circle'
          size={24}
          color={item.item.qty <= 1 ? 'red' : 'blue'}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  listItem: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  body: {
    margin: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  icons: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 20,
  },
});

export default CartItems;
