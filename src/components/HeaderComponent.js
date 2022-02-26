import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

// Library
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const HeaderComponent = props => {
  const {title} = props;

  return (
    <View style={styles.container}>
      <Text style={styles.titleStyle}>{title}</Text>
    </View>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: hp(6),
    backgroundColor: '#555',
    // borderBottomLeftRadius: wp(4),
    // borderBottomRightRadius: wp(4),
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: wp(3.2),
    color: '#fff',
    fontWeight: '400',
    marginLeft: wp(2),
  },
});
