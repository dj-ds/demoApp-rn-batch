import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SafeAreaView from 'react-native-safe-area-view';

// Components
import HeaderComponent from '../../components/HeaderComponent';
import showToast from '../../components/CustomToast';
import HrAssignmentsComponent from '../../components/Assignments/HrAssignmentsComponent';
import CustomLoader from '../../components/CustomLoader';
import ModalSelector from 'react-native-modal-selector';

// API
import {BASE_URL, makeRequest} from '../../api/ApiInfo';

// User Preference
import {KEYS, getData, clearData} from '../../api/UserPreference';
import basicStyles from '../../styles/BasicStyles';

// Icons
import ic_add from '../../assets/icons/ic_add.png';

export default class HrAssignmentsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      assignmentData: null,

      batchData: [],
      selectedBatchData: {
        key: '',
        label: 'All Batch',
      },

      facultyData: [],
      selectedFaculty: {
        key: '',
        label: 'All Faculty',
      },

      showImagePopup: false,
      status: null,
      isRefreshing: false,
    };
  }

  componentDidMount() {
    this.fetchAssignments();
    this.fetchFaculty();
    this.fetchBatches();
  }

  fetchAssignments = async () => {
    const {selectedBatchData, selectedFaculty} = this.state;

    try {
      const params = {
        facultyId: selectedFaculty.key,
        batchId: selectedBatchData.key,
        branchId: '',
      };

      const response = await makeRequest(
        BASE_URL + 'getAssignment',
        params,
        true,
      );

      if (response) {
        const {success, message} = response;

        if (success) {
          const {assignmentDetails} = response;

          this.setState({assignmentData: assignmentDetails, isLoading: false});
        } else {
          showToast(message);
        }
      } else {
        showToast('Network request Failed');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  fetchFaculty = async () => {
    try {
      // starting loader
      this.setState({isLoading: true});

      // calling api
      const response = await makeRequest(BASE_URL + 'getFaculty', null, true);

      // processing response
      if (response) {
        const {success} = response;

        if (success) {
          const {faculty} = response;

          const facultyData = faculty.map(item => {
            const {id, name} = item;
            let data = {
              key: id,
              label: name,
            };

            return data;
          });

          this.setState({facultyData, isLoading: false});
        } else {
          const {message} = response;

          this.setState({
            facultyData: [],
            status: message,
            isLoading: false,
            isRefreshing: false,
          });
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  fetchBatches = async () => {
    const {selectedFaculty, selectedBranch} = this.state;
    try {
      const userInfo = await getData(KEYS.USER_INFO);

      const {branchId} = userInfo;

      // starting loader
      this.setState({isLoading: true});

      // preparing params
      const params = {
        facultyId: selectedFaculty.key,
        branchId: branchId,
      };

      // calling api
      const response = await makeRequest(BASE_URL + 'getBatch', params, true);

      // processing response
      if (response) {
        const {success} = response;

        if (success) {
          const {batchDetails} = response;

          const batchData = batchDetails.map(item => {
            const {batchId, name} = item;
            let data = {
              key: batchId,
              label: name,
            };

            return data;
          });

          this.setState({
            batchData,
            isLoading: false,
            selectedBatchData: {
              key: '',
              label: 'All Batch',
            },
          });
        } else {
          const {message} = response;

          this.setState({
            batchData: [],
            status: message,
            isLoading: false,
            isRefreshing: false,
          });
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  handleRemoveAssignment = async assignmentId => {
    try {
      const params = {
        assignment_id: assignmentId,
      };

      const response = await makeRequest(
        BASE_URL + 'deleteAssignment',
        params,
        true,
      );

      if (response) {
        const {success, message} = response;

        if (success) {
          this.setState({isLoading: false});

          alert(message);

          await this.fetchAssignments();
        } else {
          showToast(message);
        }
      } else {
        showToast('Network request Failed');
      }
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
      <HrAssignmentsComponent
        item={item}
        nav={this.props.navigation}
        backgroundColor={backgroundColor}
        fetchAssignments={this.fetchAssignments}
        handleRemoveAssignment={this.handleRemoveAssignment}
      />
    );
  };

  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View style={styles.separator} />;

  handleAddAssignment = () => {
    this.props.navigation.push('HrAddAssignment', {
      fetchAssignments: this.fetchAssignments,
    });
  };

  handleBatchSelect = async selectedBatchData => {
    this.setState({selectedBatchData}, () => {
      this.fetchAssignments();
    });
  };

  handleFacultySelect = async selectedFaculty => {
    this.setState({selectedFaculty}, () => {
      this.fetchBatches();
      this.fetchAssignments();
    });
  };

  render() {
    const {isLoading} = this.state;
    if (isLoading) {
      return <CustomLoader />;
    }

    const {
      assignmentData,
      isRefreshing,
      facultyData,
      selectedBatchData,
      batchData,
      selectedFaculty,
    } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <HeaderComponent title="Assignments" nav={this.props.navigation} />
        </View>

        <View
          style={[
            basicStyles.directionRow,
            basicStyles.alignCenter,
            basicStyles.marginTopHalf,
            basicStyles.justifyEvenly,
          ]}>
          <ModalSelector
            data={facultyData}
            initValue="Select Faculty"
            cancelText="Cancel"
            animationType="fade"
            backdropPressToClose={true}
            onChange={this.handleFacultySelect}
            // style={styles.pickerStyle}
            initValueTextStyle={styles.initialTextStyle}
            selectTextStyle={styles.selectedTextStyle}
            optionTextStyle={styles.optionTextStyle}>
            <View style={[styles.customPickerStyle]}>
              <Text style={[styles.initialTextStyle, {paddingLeft: wp(2)}]}>
                {selectedFaculty.label}
              </Text>
            </View>
          </ModalSelector>

          <ModalSelector
            data={batchData}
            initValue="Select Batch"
            cancelText="Cancel"
            animationType="fade"
            backdropPressToClose={true}
            onChange={this.handleBatchSelect}
            // style={styles.pickerStyle}
            initValueTextStyle={styles.initialTextStyle}
            selectTextStyle={styles.selectedTextStyle}
            optionTextStyle={styles.optionTextStyle}>
            <View style={[styles.customPickerStyle]}>
              <Text style={[styles.initialTextStyle, {paddingLeft: wp(2)}]}>
                {selectedBatchData.label}
              </Text>
            </View>
          </ModalSelector>
        </View>

        <View style={[basicStyles.flexOne]}>
          <Text style={styles.textStyle}>Assignments List</Text>
          {assignmentData ? (
            <FlatList
              data={assignmentData}
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
              <Text style={styles.messageText}>No Assignment Found</Text>
            </View>
          )}
        </View>

        <TouchableOpacity
          style={styles.addButtonStyle}
          onPress={this.handleAddAssignment}>
          <Image
            source={ic_add}
            resizeMode="cover"
            style={styles.addAssignIcon}
          />
        </TouchableOpacity>
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
  addButtonStyle: {
    backgroundColor: '#444',
    position: 'absolute',
    padding: wp(2),
    borderRadius: wp(7),
    bottom: wp(5),
    right: wp(5),
  },
  addAssignIcon: {
    height: wp(7),
    aspectRatio: 1 / 1,
  },

  // Picker Style
  customPickerStyle: {
    width: wp(40),
    height: wp(11),
    borderWidth: 0.8,
    borderColor: '#999',
    borderRadius: wp(1),
    justifyContent: 'center',
    // borderRadius: 1,
    margin: wp(2),
  },
  pickerStyle: {
    width: wp(40),
    // height: wp(12),
    margin: wp(2),
  },

  templatePickerStyle: {
    width: wp(35),
    // borderRadius: 1,
    margin: wp(2),
  },

  initialTextStyle: {
    color: '#666',
    fontSize: wp(3),
    // marginLeft: wp(2),
    marginVertical: wp(1.33),
    textAlign: 'left',
  },

  optionTextStyle: {
    color: '#111',
  },

  selectedTextStyle: {
    textAlign: 'left',
    color: '#111',
    fontSize: wp(3),
    marginLeft: wp(2),
    marginVertical: wp(1.33),
  },
});
