import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';

// Library
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Components Import
import HeaderComponent from 'views/layouts/Header';

// Images
import ic_user_default from 'assets/images/ic_user_default.png';
import ic_edit_profile from 'assets/icons/ic_edit_profile.png';

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleEditProfile = () => {
    this.props.navigation.push('EditProfile');
  };

  render() {
    return (
      <View style={styles.container}>
        <HeaderComponent title="Profile" nav={this.props.navigation} />

        <View>
          <View style={styles.userImageContainer}>
            <Image
              source={ic_user_default}
              resizeMode="cover"
              style={styles.userImageStyle}
            />
          </View>

          <TouchableOpacity
            style={styles.editContainer}
            onPress={this.handleEditProfile}>
            <Image
              source={ic_edit_profile}
              resizeMode="cover"
              style={styles.editIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.mainContainer}>
          <View style={styles.contentContainer}>
            <Text style={styles.titleStyle}>Name</Text>
            <Text style={[styles.titleStyle]}> : </Text>
            <Text style={styles.textStyle}>John Watson</Text>
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.titleStyle}>Mobile</Text>
            <Text style={[styles.titleStyle]}> : </Text>
            <Text style={styles.textStyle}>+91 9876543210</Text>
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.titleStyle}>Email</Text>
            <Text style={[styles.titleStyle]}> : </Text>
            <Text style={styles.textStyle}>abc@email.com</Text>
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.titleStyle}>Address</Text>
            <Text style={[styles.titleStyle]}> : </Text>
            <Text style={styles.textStyle}>Street No.2, Delhi </Text>
          </View>

          <TouchableOpacity style={styles.logOutButton}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
  },

  editContainer: {
    position: 'absolute',
    top: hp(21),
    right: wp(29),
    zIndex: 10,
    backgroundColor: '#fff',
    borderRadius: wp(21),
  },

  editIcon: {
    height: hp(6),
    aspectRatio: 1 / 1,
  },

  mainContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: hp(6),
  },

  userImageContainer: {
    borderRadius: wp(20),
    alignSelf: 'center',
    marginTop: hp(6),
    // elevation: 10,
  },

  userImageStyle: {
    height: hp(20),
    aspectRatio: 1 / 1,
    borderRadius: wp(20),
  },

  contentContainer: {
    flexDirection: 'row',
    width: wp(90),
    backgroundColor: '#fff',
    padding: wp(2),
    borderRadius: wp(2),
    marginHorizontal: wp(2),
    marginVertical: hp(1.2),
    elevation: 8,
  },

  titleStyle: {
    fontSize: wp(3.5),
    fontWeight: '700',
    color: '#222',
    width: wp(27),
  },
  textStyle: {
    flex: 1,
    fontSize: wp(3.5),
    fontWeight: '700',
    color: '#555',
  },
  logOutButton: {
    backgroundColor: '#00adcc',
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(6),
    width: wp(50),
    marginTop: hp(6),
    elevation: 8,
    borderRadius: wp(2),
  },
  logoutText: {
    fontSize: wp(3.5),
    fontWeight: '700',
    color: '#fff',
  },
});
