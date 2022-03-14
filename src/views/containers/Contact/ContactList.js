import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import ContactListComponent from 'views/components/ContactListComponent';

export default class ContactList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        {
          name: 'Lokesh kumawat',
          number: '9876543210',
          image:
            'https://variety.com/wp-content/uploads/2015/11/ben-kohn.jpg?w=800',
        },
        {
          name: 'Rajesh kumawat',
          number: '9876543210',
          image:
            'https://variety.com/wp-content/uploads/2015/11/ben-kohn.jpg?w=800',
        },
        {
          name: 'Rajesh kumawat',
          number: '9876543210',
          image:
            'https://variety.com/wp-content/uploads/2015/11/ben-kohn.jpg?w=800',
        },
        {
          name: 'Rajesh kumawat',
          number: '9876543210',
          image:
            'https://variety.com/wp-content/uploads/2015/11/ben-kohn.jpg?w=800',
        },
        {
          name: 'Rajesh kumawat',
          number: '9876543210',
          image:
            'https://variety.com/wp-content/uploads/2015/11/ben-kohn.jpg?w=800',
        },
        {
          name: 'Rajesh kumawat',
          number: '9876543210',
          image:
            'https://variety.com/wp-content/uploads/2015/11/ben-kohn.jpg?w=800',
        },
        {
          name: 'Rajesh kumawat',
          number: '9876543210',
          image:
            'https://variety.com/wp-content/uploads/2015/11/ben-kohn.jpg?w=800',
        },
        {
          name: 'Rajesh kumawat',
          number: '9876543210',
          image:
            'https://variety.com/wp-content/uploads/2015/11/ben-kohn.jpg?w=800',
        },
        {
          name: 'Rajesh kumawat',
          number: '9876543210',
          image:
            'https://variety.com/wp-content/uploads/2015/11/ben-kohn.jpg?w=800',
        },
        {
          name: 'Rajesh kumawat',
          number: '9876543210',
          image:
            'https://variety.com/wp-content/uploads/2015/11/ben-kohn.jpg?w=800',
        },
        {
          name: 'Rajesh kumawat',
          number: '9876543210',
          image:
            'https://variety.com/wp-content/uploads/2015/11/ben-kohn.jpg?w=800',
        },
        {
          name: 'Rajesh kumawat',
          number: '9876543210',
          image:
            'https://variety.com/wp-content/uploads/2015/11/ben-kohn.jpg?w=800',
        },
        {
          name: 'Rajesh kumawat',
          number: '9876543210',
          image:
            'https://variety.com/wp-content/uploads/2015/11/ben-kohn.jpg?w=800',
        },
        {
          name: 'Rajesh kumawat',
          number: '9876543210',
          image:
            'https://variety.com/wp-content/uploads/2015/11/ben-kohn.jpg?w=800',
        },
        {
          name: 'Rajesh kumawat',
          number: '9876543210',
          image:
            'https://variety.com/wp-content/uploads/2015/11/ben-kohn.jpg?w=800',
        },
        {
          name: 'Rajesh kumawat',
          number: '9876543210',
          image:
            'https://variety.com/wp-content/uploads/2015/11/ben-kohn.jpg?w=800',
        },
      ],
    };
  }

  renderItemView = ({item}) => <ContactListComponent item={item} />;

  keyExtractor = (item, index) => index.toString();

  separatorComponent = () => <View style={styles.separator} />;

  render() {
    return (
      <View style={styles.container}>
        <Text>Flat List example</Text>

        {/* <Image
        
          source={{
            uri: 'https://variety.com/wp-content/uploads/2015/11/ben-kohn.jpg?w=800',
          }} 
          resizeMode="cover"
          style={styles.imageStyle}
        /> */}

        <FlatList
          data={this.state.data}
          renderItem={this.renderItemView}
          keyExtractor={this.keyExtractor}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={this.separatorComponent}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f1f2f2',
    flex: 1,
  },

  imageStyle: {
    height: 80,
    aspectRatio: 1 / 1,
  },
  separator: {
    height: 8,
  },
});
