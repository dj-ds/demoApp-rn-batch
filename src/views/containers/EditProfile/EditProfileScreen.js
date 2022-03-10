import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
} from 'react-native';

// Library
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {
  check,
  request,
  openSettings,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';

import DocumentPicker from 'react-native-document-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

// Components Import
import HeaderComponent from 'views/layouts/Header';

// Images
import ic_user_default from 'assets/images/ic_user_default.png';
import ic_edit_profile from 'assets/icons/ic_edit_profile.png';

export default class EditProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImage: null,
    };
  }

  checkPermission = async () => {
    try {
      const platformPermission = Platform.select({
        android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        ios: PERMISSIONS.IOS.MEDIA_LIBRARY,
      });

      const result = await check(platformPermission);

      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log(
            'This feature is not available (on this device / in this context)',
          );
          break;

        case RESULTS.DENIED:
          const requestResult = await request(platformPermission);

          switch (requestResult) {
            case RESULTS.GRANTED:
              this.handleUploadFile();
              console.log('Permission Granted');
          }
          break;

        case RESULTS.GRANTED:
          console.log('The permission is granted');
          this.handleUploadFile();
          break;

        case RESULTS.BLOCKED:
          Alert.alert(
            'Permission Blocked',
            'Press OK and provide "Gallery" permission in App Setting',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: this.handleOpenSettings,
              },
            ],
            {cancelable: false},
          );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  handleOpenSettings = async () => {
    try {
      await openSettings();
    } catch (error) {
      console.log('cannot open settings', error);
    }
  };

  // handleUploadFile = async () => {
  //   try {
  //     const response = await DocumentPicker.pick({
  //       type: [DocumentPicker.types.allFiles],
  //     });

  //     this.setState({selectedImage: response[0].uri});
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  handleUploadFile = async () => {
    try {
      let option = {mediaType: 'photo', quality: 0.9};

      launchImageLibrary(option, response => {
        this.setState({selectedImage: response.assets[0].uri});
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  handleUpdateProfile = () => {
    this.props.navigation.pop();
  };

  render() {
    return (
      <View style={styles.container}>
        <HeaderComponent title="Edit Profile" nav={this.props.navigation} />

        <View>
          <View style={styles.userImageContainer}>
            {this.state.selectedImage ? (
              <Image
                source={{uri: this.state.selectedImage}}
                resizeMode="cover"
                style={styles.userImageStyle}
              />
            ) : (
              <Image
                source={ic_user_default}
                resizeMode="cover"
                style={styles.userImageStyle}
              />
            )}
          </View>

          <TouchableOpacity
            style={styles.editContainer}
            onPress={this.checkPermission}>
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
            <Text style={[styles.titleStyle, {width: wp(4)}]}> : </Text>
            <TextInput placeholder="Enter Name" style={styles.textStyle} />
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.titleStyle}>Mobile</Text>
            <Text style={[styles.titleStyle, {width: wp(4)}]}> : </Text>
            <TextInput placeholder="Enter Mobile" style={styles.textStyle} />
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.titleStyle}>Email</Text>
            <Text style={[styles.titleStyle, {width: wp(4)}]}> : </Text>
            <TextInput placeholder="Enter Email" style={styles.textStyle} />
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.titleStyle}>Address</Text>
            <Text style={[styles.titleStyle, {width: wp(4)}]}> : </Text>
            <TextInput placeholder="Enter Address" style={styles.textStyle} />
          </View>

          <TouchableOpacity
            style={styles.logOutButton}
            onPress={this.handleUpdateProfile}>
            <Text style={styles.logoutText}>Update Profile</Text>
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
  mainContainer: {flex: 1, alignItems: 'center', marginTop: hp(6)},

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
    alignItems: 'center',
  },

  titleStyle: {
    fontSize: wp(3.5),
    fontWeight: '700',
    color: '#222',
    width: wp(27),
  },
  textStyle: {
    flex: 1,
    fontSize: wp(3),
    fontWeight: '700',
    color: '#555',
    height: hp(4.8),
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
