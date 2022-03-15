import {makeNetworkRequest} from 'state/utils/MakeNetworkRequest';
import * as actions from './actions';

export const login = (url, params) => async dispatch => {
  try {
    const response = await makeNetworkRequest(url, params);
    console.log(response);
    if (response) {
      const {success} = response;

      if (success) {
        dispatch(actions.login(response));
      } else {
        dispatch(actions.error(response));
      }
    } else {
      dispatch(actions.error(null));
    }
  } catch (error) {
    dispatch(actions.error(error.message));
  }
};
