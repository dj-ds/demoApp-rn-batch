import LoginScreen from './LoginScreen';
import {connect} from 'react-redux';

// Selectors
import {sessionSelectors} from 'state/ducks/session';

// Operation
import {sessionOperations} from 'state/ducks/session';

const mapStateToProps = state => ({
  isLogin: sessionSelectors.isLogin(state),
});

const mapDispatchToProps = {
  login: sessionOperations.login,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
