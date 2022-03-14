/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, AppState} from 'react-native';

// Library
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Components Import
import HeaderComponent from 'views/layouts/Header';

// Delegates
import {
  checkPermission,
  isAppOpenedByRemoteNotificationWhenAppClosed,
  resetIsAppOpenedByRemoteNotificationWhenAppClosed,
} from 'utils/firebase_api/FirebaseAPI';

// References
export let homeScreenFetchNotificationCount = null;

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
    };
  }

  componentDidMount = async () => {
    await checkPermission();
    // navigating to Notification screen
    if (isAppOpenedByRemoteNotificationWhenAppClosed) {
      resetIsAppOpenedByRemoteNotificationWhenAppClosed();
      this.props.navigation.navigate('Notification');
      return;
    }

    homeScreenFetchNotificationCount = this.fetchNotificationCount;
    AppState.addEventListener('change', this.handleAppStateChange);
  };

  componentWillUnmount() {
    homeScreenFetchNotificationCount = null;
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = async nextAppState => {
    try {
      const {appState} = this.state;
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        await this.fetchNotificationCount();
      }
      this.setState({appState: nextAppState});
    } catch (error) {
      console.log(error.message);
    }
  };

  handleNavProfile = () => {
    this.props.navigation.navigate('Profile');
  };

  handleNavNotification = () => {
    this.props.navigation.navigate('Notification');
  };

  handleNavSendNotification = () => {
    this.props.navigation.navigate('SendNotification');
  };

  handleNavAssignments = () => {
    this.props.navigation.navigate('Extra');
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

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.handleNavSendNotification}>
          <Text style={styles.buttonText}>Send Notification</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.handleNavAssignments}>
          <Text style={styles.buttonText}>Send </Text>
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
