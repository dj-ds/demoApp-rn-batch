import React, {useState} from 'react';

import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Images
import ic_notification_bell from '../assets/icons/ic_notification_bell.png';

import basicStyles from '../styles/BasicStyles';

const NotificationListComponent = props => {
  const {item, backgroundColor} = props;

  const {id, title, description, status, created, sent_by} = item;

  return (
    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
      <View style={styles.notificationHeader}>
        <Image
          source={ic_notification_bell}
          resizeMode="cover"
          style={styles.bellIcon}
        />
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.notificationBody}>
        <Text style={styles.message}>{description}</Text>
      </View>
      <View style={[basicStyles.directionRow, basicStyles.justifyBetween]}>
        <Text style={styles.date}>{created}</Text>
        <Text style={styles.date}>Sent By : {sent_by}</Text>
      </View>
    </View>
  );
};

export default NotificationListComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 2,
    padding: wp(2),
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1.2),
  },
  bellIcon: {
    width: wp(5.4),
    aspectRatio: 1 / 1,
  },
  audioContainer: {
    // position: 'absolute',
    // right: 0,
    marginLeft: wp(1),
  },
  audioIcon: {
    height: hp(4),
    aspectRatio: 1 / 1,
  },
  title: {
    color: '#111',
    fontSize: wp(3.8),
    fontWeight: '700',
    marginLeft: wp(2),
    flex: 1,
    textTransform: 'capitalize',
  },
  notificationBody: {
    borderBottomWidth: 1,
    borderBottomColor: '#e7e7e7',
    paddingBottom: hp(2),
    flexDirection: 'row',
  },
  message: {
    flex: 1,
    color: '#111',
    fontSize: wp(3.2),
    textAlign: 'justify',
    textTransform: 'capitalize',
  },
  date: {
    color: '#666',
    fontSize: wp(2.8),
    marginTop: wp(2),
    fontWeight: '700',
  },
});
