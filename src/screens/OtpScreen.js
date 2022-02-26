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

// Libraries
import CheckBox from '@react-native-community/checkbox';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Images
import logo from '../assets/appIcon/logo2.png';

export default class OtpScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      otp: '',
    };
  }

  handleButton = otp => {
    this.props.navigation.navigate('Home');
  };

  handleOtpChange = otp => {
    this.setState({otp});
  };

  render() {
    const {isSelected} = this.state;

    return (
      <View style={styles.container}>
        <Image source={logo} resizeMode="cover" style={styles.imageStyle} />

        <OTPInputView
          style={styles.otpContainer}
          pinCount={4}
          autoFocusOnLoad
          placeholderCharacter="*"
          placeholderTextColor="#ddd"
          codeInputFieldStyle={styles.underlineStyleBase}
          onCodeFilled={this.handleButton}
        />

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={this.handleButton}>
          <Text style={styles.buttonTextStyle}>Login !</Text>
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
  otpContainer: {
    width: wp(70),
    height: wp(6),
    alignItems: 'center',
    alignSelf: 'center',
  },
  underlineStyleBase: {
    color: '#fff',
  },
  imageStyle: {
    height: hp(20),
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
