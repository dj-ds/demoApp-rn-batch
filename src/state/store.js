import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';

// Reducers
import * as reducers from './ducks';

export default function configureStore(initialState = {}) {
  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: [],
  };

  const rootReducer = combineReducers(reducers);
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const middleware = [thunk];
  const enhancer = composeWithDevTools(applyMiddleware(...middleware));

  const store = createStore(persistedReducer, initialState, enhancer);

  const persister = persistStore(store);

  return {store, persister};
}
