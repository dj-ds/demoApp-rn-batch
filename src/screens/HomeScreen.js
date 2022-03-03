/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

// Library
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ImageSlider from 'react-native-image-slider';

// Components Import
import HeaderComponent from '../components/HeaderComponent';

// Images
import banner1 from '../assets/images/banner1.jpg';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleNavProfile = () => {
    this.props.navigation.navigate('Profile');
  };

  handleNavNotification = () => {
    this.props.navigation.navigate('Notification');
  };

  render() {
    const {activeTab} = this.state;
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    };
    return (
      <View style={styles.container}>
        <HeaderComponent title="Home" nav={this.props.navigation} />

        <ImageSlider
          images={[banner1, banner1, banner1]}
          //       images={[
          //   'https://placeimg.com/640/640/nature',
          //   'https://placeimg.com/640/640/people',
          //   'https://placeimg.com/640/640/animals',
          //   'https://placeimg.com/640/640/beer',
          // ]}
          loopBothSides
          autoPlayWithInterval={3000}
        />

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.handleNavProfile}>
          <Text style={styles.buttonText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.handleNavNotification}>
          <Text style={styles.buttonText}>Notification</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
  },
  buttonContainer: {
    height: hp(15),
    backgroundColor: '#00adcc',
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    margin: wp(2),
    borderRadius: wp(4),
    elevation: 15,
  },

  buttonText: {
    color: '#fff',
    fontSize: wp(3.8),
    fontWeight: '700',
  },
});
