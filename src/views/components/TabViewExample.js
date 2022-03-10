/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

// Library
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Components Import
import HeaderComponent from 'views/layouts/Header';

import ExtraScreen from 'views/containers/Extra';
import ProfileScreen from 'views/containers/Profile';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'Profile',
    };
  }

  renderTabView = () => {
    const {activeTab} = this.state;

    if (activeTab === 'Profile') {
      return <ProfileScreen />;
    } else if (activeTab === 'Extra') {
      return <ExtraScreen />;
    }
  };

  handleChangeTab = tabName => () => {
    this.setState({activeTab: tabName});
  };

  onSwipeLeft(gestureState) {
    if (this.state.activeTab !== 'Extra') {
      this.setState({activeTab: 'Extra'});
    }
  }

  onSwipeRight(gestureState) {
    if (this.state.activeTab !== 'Profile') {
      this.setState({activeTab: 'Profile'});
    }
  }

  render() {
    const {activeTab} = this.state;
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    };
    return (
      <View style={styles.container}>
        <HeaderComponent title="Home" nav={this.props.navigation} />

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={
              activeTab === 'Profile'
                ? styles.tabActiveButton
                : styles.tabButton
            }
            onPress={this.handleChangeTab('Profile')}>
            <Text style={styles.tabTextStyles}>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              activeTab === 'Extra' ? styles.tabActiveButton : styles.tabButton
            }
            onPress={this.handleChangeTab('Extra')}>
            <Text style={styles.tabTextStyles}>Extra</Text>
          </TouchableOpacity>
        </View>

        <GestureRecognizer
          // onSwipe={(direction, state) => this.onSwipe(direction, state)}
          onSwipeLeft={state => this.onSwipeLeft(state)}
          onSwipeRight={state => this.onSwipeRight(state)}
          config={config}
          style={{
            flex: 1,
            backgroundColor: this.state.backgroundColor,
          }}>
          <View style={styles.mainContainer}>{this.renderTabView()}</View>
        </GestureRecognizer>
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
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabButton: {
    height: hp(8.5),
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#999',
    borderBottomWidth: 4,
    borderBottomColor: '#999',
  },
  tabActiveButton: {
    height: hp(8.5),
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#666',
    borderBottomWidth: 4,
    borderBottomColor: '#ddd',
  },
  tabTextStyles: {
    color: '#fff',
    fontSize: wp(3.5),
    fontWeight: '700',
  },
});
