import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

let { width } = Dimensions.get('window');

const ListHeader = () => {
  return (
    <View elevation={1} style={styles.listHeader}>
      <View style={styles.headerItem}></View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: '600' }}>Brand</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: '600' }}>Name</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: '600' }}>Category</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: '600' }}>Price</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  listHeader: {
    flexDirection: 'row',
    padding: 5,
    backgroundColor: 'gainsboro',
  },
  headerItem: {
    margin: 3,
    width: width / 6,
  },
});
export default ListHeader;
