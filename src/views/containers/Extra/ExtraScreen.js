import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  Platform,
  TouchableOpacity,
} from 'react-native';

// Library
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ModalSelector from 'react-native-modal-selector';

import {
  check,
  request,
  openSettings,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';

export default class ExtraScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: {
        key: '0',
        label: 'Select Fruit',
      },
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
              console.log('Permission Granted');
          }
          break;

        case RESULTS.GRANTED:
          console.log('The permission is granted');

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

  render() {
    let index = 0;
    const data = [
      {key: index++, section: true, label: 'Fruits'},
      {key: index++, label: 'Red Apples'},
      {key: index++, label: 'Cherries'},
      {
        key: index++,
        label: 'Cranberries',
        accessibilityLabel: 'Tap here for cranberries',
      },
    ];

    return (
      <View style={styles.container}>
        {/* <HeaderComponent title="Extra" nav={this.props.navigation} /> */}

        <View style={{flex: 1}}>
          <ModalSelector
            data={data}
            initValue="Select something yummy!"
            accessible={true}
            scrollViewAccessibilityLabel={'Scrollable options'}
            cancelButtonAccessibilityLabel={'Cancel Button'}
            onChange={option => {
              this.setState({selectedValue: option});
            }}>
            <View style={styles.boxContainer}>
              <Text>{this.state.selectedValue.label}</Text>
            </View>
          </ModalSelector>
          <TouchableOpacity onPress={this.checkPermission}>
            <Text>Access Permission</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
  },
  boxContainer: {
    width: wp(80),
    marginTop: wp(4),
    height: hp(6),
    backgroundColor: 'white',
    alignSelf: 'center',
    padding: wp(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
