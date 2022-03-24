import React, {Component} from 'react';
import {
  Text,
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';

//Responsive Screen
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Libraries
import {
  check,
  request,
  openSettings,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';

import Geolocation from 'react-native-geolocation-service';

import ProcessingLoader from 'utils/ProcessingLoader';

import {showToast} from 'utils/CustomToast';

import {getData, KEYS, storeData} from 'state/utils/UserPreference';
import {makeRequest} from '../../../api/ApiInfo';

export default class InitialLocationScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isProcessing: false,
    };
  }

  checkPermission = async () => {
    try {
      const platformPermission = Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      });

      const result = await check(platformPermission);

      switch (result) {
        case RESULTS.UNAVAILABLE:
          // this.isLocationPermissionBlocked = true;
          Alert.alert(
            'Location Services Not Available',
            'Press OK, then check and enable the Location Services in your Privacy Settings',
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
          break;
        case RESULTS.DENIED:
          // console.log(
          //   'The permission has not been requested / is denied but requestable',
          // );
          const requestResult = await request(platformPermission);
          switch (requestResult) {
            case RESULTS.GRANTED:
              this.fetchCurrentPosition();
          }
          break;
        case RESULTS.GRANTED:
          // console.log("The permission is granted");
          this.fetchCurrentPosition();
          break;
        case RESULTS.BLOCKED:
          // this.isLocationPermissionBlocked = true;
          // console.log('The permission is denied and not requestable anymore');
          Alert.alert(
            'Permission Blocked',
            'Press OK and provide "Location" permission in App Setting',
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
      console.log('Unable to open App Settings:', error);
    }
  };

  fetchCurrentPosition = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 10000,
      showLocationDialog: true,
      forceRequestLocation: true,
    };

    Geolocation.getCurrentPosition(
      this.geolocationSuccessCallback,
      this.geolocationErrorCallback,
      options,
    );
  };

  geolocationSuccessCallback = async position => {
    try {
      // starting loader
      this.setState({isProcessing: true});

      // preparing info
      const API_KEY = '';
      this.coords = position.coords;

      console.log(position);

      const {latitude, longitude} = this.coords;

      // calling api
      const response = await makeRequest(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`,
      );

      // processing response
      if (response) {
        const {status} = response;

        if (status === 'OK') {
          const {results} = response;

          console.log(results);

          // filtering addresses result(taking first address only)
          const filteredResult = results[5];
          const currentLocationAddress = filteredResult.formatted_address;

          const locationCoords = {latitude, longitude};

          await this.handleSaveLocation(locationCoords);

          await storeData(KEYS.CURRENT_LOCATION, currentLocationAddress);

          await storeData(KEYS.LOCATION_COORDS, locationCoords);

          const userInfo = await getData(KEYS.USER_INFO);

          this.setState({
            isProcessing: false,
            locationPopUp: false,
          });

          if (userInfo) {
            this.props.navigation.navigate('LoggedIn');
          } else {
            this.props.navigation.navigate('LoggedOut');
          }
        } else {
          const {error_message} = response;
          console.log(error_message);

          this.setState({
            formatted_address: '',
            isProcessing: false,
            locationPopUp: false,
          });
        }
      } else {
        this.setState({
          isProcessing: false,
          isLoading: false,
          locationPopUp: false,
        });
        showToast('Network Request Error...');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  geolocationErrorCallback = error => {
    if (
      error.code === 2 &&
      error.message === 'No location provider available.'
    ) {
      this.setState({
        formatted_address: '',
        isProcessing: false,
        locationPopUp: false,
      });
      Alert.alert(
        '',
        "Make sure your device's Location/GPS is ON",
        [{text: 'OK'}],
        {cancelable: false},
      );
    } else {
      console.log(error.code, error.message);
      this.setState({
        formatted_address: '',
        isProcessing: false,
        locationPopUp: false,
      });
      Alert.alert(
        'Error',
        "Something went wrong...\nMake sure your device's Location/GPS is ON",
        [{text: 'OK'}],
        {cancelable: false},
      );
    }
  };

  render() {
    return (
      <View style={[styles.container]}>
        <Text>Fetch Location</Text>

        {this.state.isProcessing && <ProcessingLoader />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messageStyle: {
    alignSelf: 'center',
    fontSize: wp(4.6),
    fontWeight: '700',
    color: '#F57C00',
    textAlign: 'center',
    width: wp(70),
    marginTop: hp(4),
  },
  input: {
    fontSize: wp(4),
    borderRadius: wp(1.5),
    paddingHorizontal: wp(3),
    height: hp(5.5),
    backgroundColor: '#f2f1f1',
    marginBottom: wp(3),
  },
  arrowIcon: {
    width: wp(6),
    aspectRatio: 1 / 1,
    marginLeft: wp(2),
  },
  button: {
    borderRadius: wp(1),
    height: hp(6),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp(3),
    flexDirection: 'row',
    marginHorizontal: wp(12),
  },

  orSecretor: {
    marginTop: hp(1),
    marginBottom: hp(5),
  },

  button3: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  signText: {
    fontSize: wp(6.5),
    fontWeight: '700',
    color: '#333',
    marginVertical: wp(2),
    paddingLeft: wp(4),
  },
  venderRegister: {
    borderWidth: 1,
    borderColor: '#F57C00',
  },
  orText: {
    fontSize: wp(3.5),
    color: '#999',
  },
});
