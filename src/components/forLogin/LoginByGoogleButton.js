import React, { Component } from 'react';
//import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import GoogleLogout from 'react-google-login';

import { connect } from 'react-redux';
import createSetGoogleLoginAction from'../forReducesrs/actions/setGoogleLoginAction';
import checkTokenState from'./checkTokenState';

class LoginByGoogleButton extends Component {
		constructor(props) {
				super(props);

				checkTokenState(props, 'loginGoogleState');
				this.props.putGoogleTokenIntoParentState(this.props.loginGoogleTokenState);
				const google_LogInLogOut = new 	Map();
				this.state = {
					google_LogInLogOutMap: google_LogInLogOut, 
					googleId: '192335092013-a0l5g1kbhiel7ih6d1cnol736hbi0cpu.apps.googleusercontent.com',
				};
	}

	


	
  signup(res) {
	let id_token = res.getAuthResponse().id_token;
	// put the Google token into the reducer store
	this.props.createSetGoogleLoginAction(id_token);
	//and also to the local store of the parent component
	this.props.putGoogleTokenIntoParentState(id_token);
	this.setState({
		currentGoogleToken: id_token
	});
  };


	render() {
	  const responseGoogle = (response) => {
		console.log(response);
		var res = response.profileObj;
		console.log(res);
		this.signup(response);
	  }



	  const handleLogoutFailure = (logoutFailRes) => {
		alert(`logout failed, \n fail logout responce: ${JSON.stringify(logoutFailRes)}`);
	  }
	  const handleLogoutSucsess = (logoutSucsessRes) => {
		alert(`logout failed, \n fail logout responce: ${JSON.stringify(logoutSucsessRes)}`);
	  }


	  //const google_LogInLogOut = new 	Map();
	  this.state.google_LogInLogOutMap.set('google_login', 
		<GoogleLogin
			clientId={this.state.googleId}
			buttonText="Login with Google"
			onSuccess={responseGoogle}
			onFailure={responseGoogle} 
			cookiePolicy={ 'single_host_origin' }
			responseType='code,token' > 
		</GoogleLogin>
	  );

	  this.state.google_LogInLogOutMap.set('google_logout',
	  <GoogleLogout
	  clientId={this.state.googleId}
		buttonText='Logout with Google'
		onLogoutSuccess={ handleLogoutSucsess }
		onFailure={ handleLogoutFailure } >
			<div
				  onClick={
					(res) => {
						this.props.makeUserInformationInvisibleInParentComponent();
						res.preventDefault();
						const tokenAbsenceMessage = "if you can see this message this means that Jason Web Token isn\'t re ceived from the server";
						//overwrite the google token on the reducer store with "tokenAbsenceMessage"
						this.props.createSetGoogleLoginAction(tokenAbsenceMessage);
						//and also do the same in the local state of the parent component
						this.props.putGoogleTokenIntoParentState(tokenAbsenceMessage);

						alert(`${this.props.loginGoogleTokenState}, lngth: ${this.props.loginGoogleTokenState.length}`);
						localStorage.setItem('loginGoogleState', tokenAbsenceMessage); //also deliting the token froom the localStorage

						checkTokenState(this.props, 'loginGoogleState');

						alert(`logout sucseed,\nlogout responce:\n${res}`);
						console.log('In LoginByGoogleButton - logout responce:');
						console.log(res);
					}
				} 
			>Logout with Google</div>
	  </GoogleLogout>
	  );

	  return (
		<div className="App">
		  <div className="row">
			  {/*
			<div className="col-sm-12 btn btn-info">
			  Login With Google Using ReactJS
			  </div>
			  */}
		  </div>
		  <div className="row">
			<div style={{ 'paddingTop': "20px" }} className="col-sm-12">
			  <div className="col-sm-4"></div>
			  <div className="col-sm-4">


			{  typeof this.props.loginGoogleTokenState === 'string' && this.props.loginGoogleTokenState.length < 150  ? this.state.google_LogInLogOutMap.get('google_login')  : this.state.google_LogInLogOutMap.get('google_logout') 	}

			  </div>
			  <div className="col-sm-4"></div>
			</div>
		  </div>
		</div>
	  )
	}



}


const mapDispatchToProps = (dispatch) => {
    return {
        createSetGoogleLoginAction: (payload) => {
        dispatch(createSetGoogleLoginAction(payload))
      }
    }
  }

  const mapStateToProps = (state) => {
    return { loginGoogleTokenState: state.loginGoogleState }
};


export default connect(mapStateToProps, mapDispatchToProps)(LoginByGoogleButton);