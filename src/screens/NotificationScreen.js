import React, {Component} from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

// Library
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Components Import
import HeaderComponent from '../components/HeaderComponent';
import NotificationComponent from '../components/NotificationComponent';

// Images
import ic_user_default from '../assets/images/ic_user_default.png';
import ic_edit_profile from '../assets/icons/ic_edit_profile.png';

export default class NotificationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [
        {
          title: 'Order Placed',
          message:
            'Your order #3210 has been placed successfully. Will be delivered to you soon',
          date: '10 Feb 2021',
        },
        {
          title: 'Order Placed',
          message:
            'Your order #3210 has been placed successfully. Will be delivered to you soon',
          date: '10 Feb 2021',
        },
        {
          title: 'Order Placed',
          message:
            'Your order #3210 has been placed successfully. Will be delivered to you soon',
          date: '10 Feb 2021',
        },
        {
          title: 'Order Placed',
          message:
            'Your order #3210 has been placed successfully. Will be delivered to you soon',
          date: '10 Feb 2021',
        },
        {
          title: 'Order Placed',
          message:
            'Your order #3210 has been placed successfully. Will be delivered to you soon',
          date: '10 Feb 2021',
        },
        {
          title: 'Order Placed',
          message:
            'Your order #3210 has been placed successfully. Will be delivered to you soon',
          date: '10 Feb 2021',
        },
        {
          title: 'Order Placed',
          message:
            'Your order #3210 has been placed successfully. Will be delivered to you soon',
          date: '10 Feb 2021',
        },
        {
          title: 'Order Placed',
          message:
            'Your order #3210 has been placed successfully. Will be delivered to you soon',
          date: '10 Feb 2021',
        },
        {
          title: 'Order Placed',
          message:
            'Your order #3210 has been placed successfully. Will be delivered to you soon',
          date: '10 Feb 2021',
        },
        {
          title: 'Order Placed',
          message:
            'Your order #3210 has been placed successfully. Will be delivered to you soon',
          date: '10 Feb 2021',
        },
      ],
    };
  }

  handleEditProfile = () => {
    this.props.navigation.push('EditProfile');
  };

  renderItem = ({item}) => (
    <NotificationComponent item={item} nav={this.props.navigation} />
  );

  keyExtractor = (item, index) => index.toString();
  itemSeparator = () => <View style={styles.separator} />;

  render() {
    return (
      <View style={styles.container}>
        <HeaderComponent title="Notifications" nav={this.props.navigation} />

        <View style={styles.mainContainer}>
          <FlatList
            data={this.state.notifications}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            ItemSeparatorComponent={this.itemSeparator}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatListStyle}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
  },

  mainContainer: {
    flex: 1,
  },
  flatListStyle: {
    padding: wp(2),
  },

  separator: {
    height: wp(4),
  },
});
