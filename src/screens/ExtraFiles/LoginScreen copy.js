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

// Libraries
import CheckBox from '@react-native-community/checkbox';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Images
import logo from '../assets/appIcon/logo2.png';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      mobile: '',
      password: '',
      isSelected: false,
      isPickerVisible: false,
      selectedDate: 'Pick A Date',
    };
  }

  handleButton = () => {
    this.props.navigation.push('OTP');
  };

  showDatePicker = () => {
    this.setState({isPickerVisible: true});
  };

  hideDatePicker = () => {
    this.setState({isPickerVisible: false});
  };

  handleConfirm = dateObj => {
    // const date = dateObj.getDate();
    // const month = dateObj.getMonth() + 1;
    // const year = dateObj.getFullYear();
    // const selectedDate = `${date}-${month}-${year}`;

    // this.setState({selectedDate});

    this.hideDatePicker();
  };

  render() {
    const {isSelected, isPickerVisible, selectedDate} = this.state;

    return (
      <View style={styles.container}>
        <Image source={logo} resizeMode="cover" style={styles.imageStyle} />

        <TextInput
          placeholder="Enter Name"
          placeholderTextColor={'#ddd'}
          onChangeText={e => {
            this.setState({name: e});
          }}
          style={styles.inputStyle}
        />

        <TextInput
          placeholder="Enter Email"
          placeholderTextColor={'#ddd'}
          onChangeText={e => {
            this.setState({email: e});
          }}
          style={styles.inputStyle}
        />

        <TextInput
          placeholder="Enter Mobile"
          placeholderTextColor={'#ddd'}
          maxLength={10}
          keyboardType="number-pad"
          onChangeText={e => {
            this.setState({mobile: e});
          }}
          style={styles.inputStyle}
        />

        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#fff',
            width: wp(90),
            alignSelf: 'center',
            marginTop: hp(3),
            paddingBottom: wp(2),
          }}>
          <TouchableOpacity onPress={this.showDatePicker}>
            <Text style={styles.termsText}>{selectedDate}</Text>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isPickerVisible}
            mode="time"
            onConfirm={this.handleConfirm}
            onCancel={this.hideDatePicker}
          />
        </View>

        <TextInput
          placeholder="Enter Password"
          placeholderTextColor={'#ddd'}
          onChangeText={e => {
            this.setState({password: e});
          }}
          style={styles.inputStyle}
          secureTextEntry={true}
        />

        <View style={styles.checkBoxView}>
          <CheckBox
            value={isSelected}
            onValueChange={e => {
              this.setState({isSelected: e});
            }}
            tintColors={{true: 'white', false: '#999'}}
          />
          <Text style={styles.termsText}>I Accept Terms & Conditions</Text>
        </View>

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={this.handleButton}>
          <Text style={styles.buttonTextStyle}>Send OTP !</Text>
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
