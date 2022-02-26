/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

// Library
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Components Import
import HeaderComponent from '../components/HeaderComponent';
import FooterComponent from '../components/FooterComponent';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderComponent title="Home" nav={this.props.navigation} />
        <View style={{flex: 1}}>
          <Text>HomeScreen</Text>
        </View>
        <FooterComponent title="Home" nav={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
