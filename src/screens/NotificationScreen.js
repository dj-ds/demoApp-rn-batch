import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SafeAreaView from 'react-native-safe-area-view';
import firebase from 'react-native-firebase';

// Components
import HeaderComponent from '../components/HeaderComponent';
import NotificationListComponent from '../components/NotificationListComponent';
import CustomLoader from '../components/CustomLoader';

// API
import {BASE_URL, makeRequest} from '../api/ApiInfo';

// User Preference
import {KEYS, getData} from '../api/UserPreference';
import basicStyles from '../styles/BasicStyles';

export default class NotificationScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      notification: null,

      message: '',
      title: '',
      showImagePopup: false,
      status: null,
      isRefreshing: false,
    };
  }

  componentDidMount() {
    this.fetchNotifications();
  }

  fetchNotifications = async () => {
    try {
      // starting loader
      this.setState({isLoading: true});

      // calling api
      const response = await makeRequest(
        BASE_URL + 'getNotification',
        null,
        true,
      );

      // processing response
      if (response) {
        const {success} = response;

        if (success) {
          const {notification} = response;
          this.setState({
            notification,
            status: null,
            isLoading: false,
            isRefreshing: false,
          });
          await this.resetNotificationCount();
        } else {
          const {message} = response;

          this.setState({
            status: message,
            notification: null,
            isLoading: false,
            isRefreshing: false,
          });
        }
        // }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  resetNotificationCount = async params => {
    try {
      // calling api
      const response = await makeRequest(
        BASE_URL + 'resetNotificationCount',
        params,
        true,
      );

      // processing response
      if (response) {
        const {success} = response;

        if (success) {
          firebase.notifications().removeAllDeliveredNotifications();
          this.setState({isLoading: false, isRefreshing: false});
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  handleListRefresh = async () => {
    try {
      // pull-to-refresh
      this.setState({isRefreshing: true}, () => {
        // updating list
        this.componentDidMount();
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  renderItem = ({item}) => {
    const backgroundColor =
      '#' +
      (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6) +
      55;
    return (
      <NotificationListComponent
        item={item}
        nav={this.props.navigation}
        backgroundColor={backgroundColor}
      />
    );
  };
  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View style={styles.separator} />;

  render() {
    const {isLoading} = this.state;
    if (isLoading) {
      return <CustomLoader />;
    }

    const {notification, showImagePopup, status, isRefreshing} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <HeaderComponent title="Notification" nav={this.props.navigation} />
        </View>

        <View style={basicStyles.flexOne}>
          <Text style={styles.textStyle}>Notification List</Text>
          {notification ? (
            <FlatList
              data={notification}
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
              ItemSeparatorComponent={this.itemSeparator}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContentContainer}
              refreshing={isRefreshing}
              onRefresh={this.handleListRefresh}
            />
          ) : (
            <View style={styles.messageContainer}>
              <Text style={styles.messageText}>{status}</Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    backgroundColor: '#096481',
  },
  listContentContainer: {
    padding: wp(2),
  },
  separator: {
    height: wp(2),
  },
  messageContainer: {
    flex: 1,
    padding: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    color: '#000',
    fontSize: wp(3.5),
    textAlign: 'center',
  },
  fromDateFieldContainer: {
    // flex: 1,
    height: hp(5),
    width: wp(40),
    paddingHorizontal: wp(4),
    borderRadius: 5,
    fontSize: wp(3),
    color: '#333',
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: wp(3),
    justifyContent: 'center',
  },
  loginFormTextInput: {
    height: hp(5),
    width: wp(85),
    fontSize: wp(3),
    borderWidth: 0.8,
    borderColor: '#999',
    textAlignVertical: 'top',
    borderRadius: wp(1),
  },
  searchButton: {
    backgroundColor: '#1d99d2',
    width: wp(20),
    alignSelf: 'center',
    marginTop: hp(2),
    height: hp(4),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(1),
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: wp(3.2),
  },
  textStyle: {
    padding: wp(2),
    fontSize: wp(4.8),
    fontWeight: '700',
    marginTop: wp(5),
  },
  loginFormTextArea: {
    height: hp(10),
    width: wp(62),
    fontSize: wp(3),
    marginRight: wp(5),
    borderWidth: 0.8,
    borderColor: '#999',
    textAlignVertical: 'top',
    borderRadius: wp(1),
  },
});
