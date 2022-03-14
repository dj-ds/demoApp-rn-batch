import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const UseStateHookExample = props => {
  let [count, setCount] = useState(0);
  let [username, setUserName] = useState('');

  const incrementFunction = () => {
    count += 1;
    setCount(count);
  };

  const decrementFunction = () => {
    count -= 1;
    setCount(count);
  };

  // const changeText

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter Name"
        style={styles.inputStyle}
        value={username}
        onChangeText={e => {
          setUserName(e);
        }}
      />

      <Text style={styles.countStyles}>Name : {username}</Text>
      <View style={styles.mainContainer}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={decrementFunction}>
          <Text>Decrement</Text>
        </TouchableOpacity>

        <Text style={styles.countStyles}>{count}</Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={incrementFunction}>
          <Text>Increment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UseStateHookExample;

const styles = StyleSheet.create({
  container: {flex: 1},
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  buttonStyle: {
    borderWidth: 1.5,
    borderColor: '#888',
    height: hp(5),
    width: wp(40),
    alignItems: 'center',
    justifyContent: 'center',
  },

  countStyles: {
    fontSize: wp(6),
    textAlign: 'center',
  },

  inputStyle: {
    borderWidth: 1.6,
    borderColor: '#999',
    width: wp(60),
    alignSelf: 'center',
    marginTop: hp(6),
    paddingLeft: wp(2),
  },
});
