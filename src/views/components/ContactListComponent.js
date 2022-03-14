import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ContactListComponent = props => {
  const {item} = props;
  const {name, number, image} = item;

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: image,
        }} /* from server */
        resizeMode="cover"
        style={styles.imageStyle}
      />
      <View style={{marginLeft: wp(2)}}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.number}>{number}</Text>
      </View>
    </View>
  );
};

export default ContactListComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  name: {
    // flex: 1,
    marginBottom: wp(1),
    fontSize: wp(3.8),
    fontWeight: '700',
  },

  number: {
    // flex: 1,
  },
  imageStyle: {
    height: wp(13),
    margin: 5,
    borderRadius: 50,
    aspectRatio: 1 / 1,
    // flex: 1,
  },
});
