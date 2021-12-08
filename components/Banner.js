import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Dimensions, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper/src';

let { width } = Dimensions.get('window');

const Banner = () => {
  const [bannerData, setBannerData] = useState([]);
  useEffect(() => {
    setBannerData([
      'https://images.vexels.com/media/users/3/126443/preview2/ff9af1e1edfa2c4a46c43b0c2040ce52-macbook-pro-touch-bar-banner.jpg',
      'https://www.yardproduct.com/blog/wp-content/uploads/2016/01/gardening-banner.jpg',
      'https://pbs.twimg.com/media/D7P_yLdX4AAvJWO.jpg',
    ]);
    return () => {
      setBannerData([]);
    };
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.swiper}>
        <Swiper
          style={{ height: width / 2 }}
          showButtons={false}
          autoplay={true}
          autoplayTimeout={5}
        >
          {bannerData.map((item) => (
            <Image
              style={styles.imageBanner}
              key={item}
              source={{ uri: item }}
              resizeMode='contain'
            />
          ))}
        </Swiper>
        <View style={{ height: 20 }}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gainsboro',
  },
  swiper: {
    width: width,
    alignItems: 'center',
    marginTop: 10,
  },
  imageBanner: {
    height: width / 2,
    width: width - 40,
    borderRadius: 10,
    marginHorizontal: 20,
  },
});
export default Banner;
