import { combineReducers } from 'redux';
import loginGoogleReducer from './loginGoogleReducer';
import loginJWTReducer from './loginJWTReducer';
import generalReducer from './generalReducer';
import userInformationReducer from './userInformationReducer';

import { sessionReducer } from 'redux-react-session';
 
const RootReducer = combineReducers({
  loginGoogleState: loginGoogleReducer,
  loginJWTState: loginJWTReducer,
  generalState: generalReducer,
  userInformationState: userInformationReducer,
  sessionState: sessionReducer,
});
 
export default RootReducer;