/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

// Library
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Icons
import ic_home from '../assets/icons/ic_home.png';
import ic_extra from '../assets/icons/ic_extra.png';
import ic_profile from '../assets/icons/ic_profile.png';

const FooterComponent = props => {
  const {title, nav} = props;

  const handleNavigate = routeName => () => {
    nav.navigate(routeName);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonsStyles}
        onPress={handleNavigate('Home')}>
        <Image source={ic_home} resizeMode="cover" style={styles.iconStyle} />
        <Text
          style={
            title === 'Home' ? styles.activeTitleStyle : styles.titleStyle
          }>
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonsStyles}
        onPress={handleNavigate('Profile')}>
        <Image
          source={ic_profile}
          resizeMode="cover"
          style={styles.iconStyle}
        />
        <Text
          style={
            title === 'Profile' ? styles.activeTitleStyle : styles.titleStyle
          }>
          Profile
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonsStyles}
        onPress={handleNavigate('Extra')}>
        <Image source={ic_extra} resizeMode="cover" style={styles.iconStyle} />
        <Text
          style={
            title === 'Extra' ? styles.activeTitleStyle : styles.titleStyle
          }>
          Extra
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FooterComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: hp(8),
    backgroundColor: '#555',
    borderTopLeftRadius: wp(6),
    borderTopRightRadius: wp(6),
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: wp(3),
    color: '#fff',
    fontWeight: '400',
    paddingHorizontal: wp(0.8),
  },

  buttonsStyles: {alignItems: 'center'},

  activeTitleStyle: {
    fontSize: wp(3),
    color: '#000',
    fontWeight: '400',
    backgroundColor: '#fff',
    paddingHorizontal: wp(0.8),
  },

  iconStyle: {
    height: wp(6),
    aspectRatio: 1 / 1,
    marginBottom: wp(1),
  },
});
