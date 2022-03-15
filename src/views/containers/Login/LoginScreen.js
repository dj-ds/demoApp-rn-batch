/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Images
import logo from 'assets/appIcon/logo2.png';

// // API
// import {BASE_URL, makeRequest} from '../../../api/ApiInfo';

// // User Preference
// import {KEYS, storeData} from '../../../api/UserPreference';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  handleLogin = async () => {
    const {username, password} = this.state;

    // Validations
    if (username.trim() === '') {
      Alert.alert('Alert!', 'Enter Username !');
      return;
    }

    if (password.trim() === '') {
      Alert.alert('Alert!', 'Enter Password !');
      return;
    }

    try {
      // params
      const params = {
        username,
        password,
      };

      await this.props.login('login', params);

      const {isLogin: response} = this.props;
      console.log('Response', response);
      if (response) {
        const {success, message} = response;

        if (success) {
          const info = response;
          const {userInfo} = response;

          // if (userInfo) {
          //   const {role} = userInfo;

          //   // if (role === 'Student') {
          //   //   await storeData(KEYS.USER_INFO, userInfo);
          //   //   Alert.alert('Login!', message);
          //   //   this.props.navigation.navigate('LoggedIn');
          //   //   return;
          //   // }
          // }

          // Navigating To Home
          this.props.navigation.navigate('LoggedIn', {info});

          Alert.alert('Login!', message);
        } else {
          Alert.alert('Alert!', message);
        }
      } else {
        Alert.alert('Alert!', 'Network Request Error');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Image source={logo} resizeMode="cover" style={styles.imageStyle} />

        <TextInput
          placeholder="Enter Username / Enroll No."
          placeholderTextColor={'#ddd'}
          onChangeText={e => {
            this.setState({username: e});
          }}
          style={styles.inputStyle}
        />

        <TextInput
          placeholder="Enter Password"
          placeholderTextColor={'#ddd'}
          onChangeText={e => {
            this.setState({password: e});
          }}
          style={styles.inputStyle}
          secureTextEntry={true}
        />

        <TouchableOpacity style={styles.buttonStyle} onPress={this.handleLogin}>
          <Text style={styles.buttonTextStyle}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#444',
  },
  imageStyle: {
    height: hp(25),
    aspectRatio: 1 / 1,
    alignSelf: 'center',
    marginTop: hp(10),
    marginBottom: hp(4),
  },
  termsText: {
    fontSize: wp(3.5),
    color: '#fff',
    fontWeight: '400',
    paddingLeft: wp(2),
  },
  checkBoxView: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: wp(4),
  },
  inputStyle: {
    marginTop: hp(2),
    width: '90%',
    color: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignSelf: 'center',
  },
  buttonStyle: {
    marginTop: '10%',
    backgroundColor: 'green',
    height: hp(6),
    width: '60%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextStyle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
});
