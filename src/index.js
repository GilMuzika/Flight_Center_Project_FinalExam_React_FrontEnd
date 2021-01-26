import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import universalStore from './components/forReducesrs/universalStore';
import rootReducer from'./components/forReducesrs/reducers/RootReducer';
import { Provider } from 'react-redux';

const providedStore = universalStore(rootReducer);

providedStore.subscribe(() => {
  const mergedState = providedStore.getState();
  const loginGoogleState = mergedState.loginGoogleState;
  const loginJWTState = mergedState.loginJWTState;
  const userInformationState = mergedState.userInformationState;
 /*
  alert(`loginGoogleState :${mergedState.loginGoogleState}\nloginJWTState :${mergedState.loginJWTState}\nsessionState: ${mergedState.sessionState}`);
*/
	if(mergedState.loginGoogleState.length > 150)
		setToLocalStorage('loginGoogleState', loginGoogleState);

	if(mergedState.loginJWTState.length > 150)
    setToLocalStorage('loginJWTState', loginJWTState);
    
  if(typeof userInformationState === 'object') {
    setToLocalStorage('userInformationState', JSON.stringify(userInformationState));
  }

});

function setToLocalStorage(stateName, stateValue) {
  localStorage.setItem(stateName, stateValue);
}

ReactDOM.render(

  <React.StrictMode>
     <Provider  store={providedStore}  >
    	<App  />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
