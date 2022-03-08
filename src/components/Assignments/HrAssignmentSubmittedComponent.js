import React from 'react';
import {
  Text,
  View,
  Image,
  Platform,
  Linking,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Styles
import basicStyles from '../../styles/BasicStyles';

const HrAssignmentSubmittedComponent = props => {
  const {item, backgroundColor} = props;

  const {
    studentImage,
    studentName,
    studentBranch,
    studentEnroll,
    studentMobile,
    studentGrade,
    submitedOn,
  } = item;

  const handleStudentNavigation = () => {
    props.nav.navigate('HrStudentDetail');
  };

  return (
    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
      <View style={styles.mainContainer}>
        <Image
          source={{uri: studentImage}}
          resizeMode="cover"
          style={styles.userImage}
        />
        <View style={styles.contentContainer}>
          <View style={styles.rowStyle}>
            <Text style={styles.nameStyle}>{studentName} </Text>
            <Text
              style={[basicStyles.text, basicStyles.textBold, {color: '#111'}]}>
              ({studentEnroll})
            </Text>
            <Text style={styles.statusText}>{studentBranch} </Text>
          </View>

          <View style={styles.rowStyle}>
            <Text style={styles.headText}>Mobile</Text>
            <Text style={styles.midText}> - </Text>
            <Text style={styles.subTitle}>{studentMobile}</Text>
          </View>

          <View style={styles.rowStyle}>
            <Text style={styles.headText}>Grade</Text>
            <Text style={styles.midText}> - </Text>
            <Text style={styles.subTitle}>{studentGrade}</Text>
          </View>
          <View style={styles.rowStyle}>
            <Text style={styles.headText}>Submitted On</Text>
            <Text style={styles.midText}> - </Text>
            <Text style={styles.subTitle}>{submitedOn}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HrAssignmentSubmittedComponent;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#e7e8e9',
    borderRadius: wp(2),
    padding: wp(2),
  },
  mainContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
    // marginBottom: hp(1.2),
  },
  userImage: {
    width: hp(10),
    aspectRatio: 1 / 1,
    borderRadius: wp(1),
  },
  statusText: {
    textAlign: 'right',
    flex: 1,
    color: '#111',
    fontSize: wp(3),
    fontWeight: '700',
  },
  contentContainer: {
    // borderWidth: 2,
    flex: 1,
    marginHorizontal: wp(2),
  },
  rowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameStyle: {
    color: '#111',
    fontSize: wp(3.2),
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  headText: {
    flex: 1,
    color: '#111',
    fontSize: wp(3),
    fontWeight: '700',
    marginLeft: wp(2),
    textTransform: 'capitalize',
  },
  midText: {
    color: '#111',
    fontSize: wp(3),
    fontWeight: '700',
    marginLeft: wp(2),
    textTransform: 'capitalize',
  },
  subTitle: {
    flex: 2,
    color: '#444',
    fontSize: wp(3),
    textAlign: 'right',
    textTransform: 'capitalize',
  },
});
