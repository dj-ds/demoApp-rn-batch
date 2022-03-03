import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';

// Library
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Icons
import ic_bell from '../assets/icons/ic_bell.png';

const NotificationComponent = props => {
  const {item} = props;

  const {title, message, date} = item;

  return (
    <View style={styles.container}>
      <View style={styles.notificationContainer}>
        <Image source={ic_bell} resizeMode="cover" style={styles.bellIcon} />

        <View style={styles.notificationBody}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>

      <Text style={styles.dateText}>Date : {date}</Text>
    </View>
  );
};

export default NotificationComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: wp(2),
    padding: wp(2),
    elevation: 5,
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1),
  },

  bellIcon: {width: wp(6), aspectRatio: 1 / 1, marginLeft: wp(1)},

  notificationBody: {
    flex: 1,
    marginLeft: wp(3),
    alignItems: 'flex-start',
  },

  title: {
    color: '#444',
    fontSize: wp(3.5),
    fontWeight: '700',
  },

  message: {
    // flex: 1,
    color: '#666',
    fontSize: wp(3),
    fontWeight: '400',
    textAlign: 'justify',
  },
  dateText: {color: '#777', fontSize: wp(2.8), fontWeight: '700'},
});
