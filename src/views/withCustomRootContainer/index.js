import React from 'react';
import SafeAreaView from 'react-native-safe-area-view';

// styles
import styles from './styles';

// components
import CustomLoader from 'views/components/CustomLoader';
import ProcessingLoader from 'views/components/ProcessingLoader';

const withCustomRootContainer = WrappedComponent => {
  const WithCustomRootContainer = props => {
    const {isFetching = false, isProcessing = false} = props;

    return (
      <SafeAreaView style={styles.container}>
        <WrappedComponent {...props} />
      </SafeAreaView>
    );
  };

  return WithCustomRootContainer;
};

export default withCustomRootContainer;
