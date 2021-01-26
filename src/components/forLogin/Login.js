import React, { Component } from'react';
import getAjaxResultPost from'../getAjaxResultPost';
import getAjaxResultPostForGet from '../getAjaxResultForGet';
import LoginByGoogle from './LoginByGoogleButton';
import checkTokenState from'./checkTokenState';
import imagesMap from'../../images/imagesMap';
import displayErrorInSwal from '../displayErrorInSwal';



import { connect } from 'react-redux';
import createSetJWTLoginAction from'../forReducesrs/actions/setJWTLoginAction';
import createUserInformationAction from '../forReducesrs/actions/setUserInformationAction';

class Login extends Component {
    constructor(props) {
        super(props);

   

        this.loginButtonRef = React.createRef();
        this.logoutButtonRef = React.createRef();

        this.LoginFormRef = React.createRef();
        this.LogiinFormSubstituteRef = React.createRef();

        checkTokenState(props, 'userInformationState', 'user');
        checkTokenState(props, 'loginJWTState');
        checkTokenState(props, 'loginGoogleState');



        
    }
    state = {
        login_username: null,
        login_password: null,
        authTokenAfterLogin: null,
        loggedInUserInformation: null,
    };

    handleChange = (e) => {
const {id}  =e.target;
        this.setState ({
            [id] : e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        
        
        let userName = '';
        let pass = '';
        for(let s in this.state) {
            if(s.includes('password'))
                pass = this.state[s];

            if(s.includes('username'))
                userName = this.state[s];
        }

        console.log('In Login:');
        console.log(`${userName}\n${pass}`);

        
    //url: `https://localhost:44361/api/jwt/createJwtToken`,
        const headers = {
            type: "POST",
			contentType: "application/json",
			dataType: "json",
        };
        const url = `https://localhost:44361/api/jwt/createJwtToken`;
        const data = {
            "username": userName,
            "password": pass
        };

        getAjaxResultPost(url, data, headers).
        then(res => {
            //We dispatch the token (returned from the server as res.data) to the reducer store
            this.props.createSetJWTLoginAction(res.data.Token);
            this.props.createUserInformationAction(res.data.Information);
            //and also put it to the local state
            this.setState({
                authTokenAfterLogin: res.data.Token,
                loggedInUserInformation: res.data.Information

            });

            this.props.passUserInfoStateToCallingComponentFunc(res.data.Information);
            this.props.setUserInfoStateInCallingComponentFunc(res.data.Information);

            this.checkButtonsVisibility ();
             alert(     `The token is: \n${this.props.loginJWTtokenState}`     );

        })
        .catch(err => { displayErrorInSwal(err); });


    }

    checkButtonsVisibility () {
        if(this.props.loginJWTtokenState.length < 150 ) {
            this.loginButtonRef.current.disabled = false;
            this.logoutButtonRef.current.disabled = true;

        }
        
        else {
            this.loginButtonRef.current.disabled = true;
            this.logoutButtonRef.current.disabled = false;

        }
    }

    determineRealToken(){
        if(this.props.loginJWTtokenState !== undefined && this.props.loginJWTtokenState !== null && typeof this.props.loginJWTtokenState === 'string' && this.props.loginJWTtokenState.length > 150){
            this.setState({
                authTokenAfterLogin: this.props.loginJWTtokenState
            });
        }
        if(this.props.loginGoogleTokenState !== undefined && this.props.loginGoogleTokenState !== null && typeof this.props.loginGoogleTokenState === 'string' && this.props.loginGoogleTokenState.length > 150) {
            this.setState({
                authTokenAfterLogin: this.props.loginGoogleTokenState
            });
        }

    }



    componentDidMount(){

        this.checkButtonsVisibility();
        checkTokenState(this.props, 'loginJWTState');
        this.determineRealToken();

        this.displayLoginTableByTokenInLOcalState();

    }

    componentDidUpdate(previousProps, previousState) {

        if(previousProps !== this.props) {

            if(this.props.loginGoogleTokenState !== null && this.props.loginGoogleTokenState !== undefined &&  this.props.loginGoogleTokenState.length > 150) {
                const headers = {
                    type: "POST",
                    contentType: "application/json",
                    dataType: "json",
                };
                const url = `https://localhost:44361/api/jwt/getResurrectedGoogleCredentialsBasedNativeToken`;
    
                getAjaxResultPostForGet(url, headers)
                .then(res => {
                    this.props.createUserInformationAction(res.data);
                    this.setState({
                        loggedInUserInformation: res.data
                    });
                    this.props.passUserInfoStateToCallingComponentFunc(res.data);
                    this.props.setUserInfoStateInCallingComponentFunc(res.data);

                    //alert(JSON.stringify(res.data));
                });
    
            }

        }

        //alert(JSON.stringify(this.props.loginGoogleTokenState));


        this.displayLoginTableByTokenInLOcalState();
        this.checkButtonsVisibility();


        //alert("IN LOGIN:\n-------------------------------------------------\n" + JSON.stringify(this.state.loggedInUserInformation));
    }

    displayLoginTableByTokenInLOcalState() {
        if(this.state.authTokenAfterLogin !== null && this.state.authTokenAfterLogin !== undefined && this.state.authTokenAfterLogin.length > 150) {
            this.LogiinFormSubstituteRef.current.style.visibility = 'visible';
            this.LogiinFormSubstituteRef.current.style.display = 'table';
            this.LoginFormRef.current.style.visibility = 'hidden';
            this.LoginFormRef.current.style.display = 'none';
            this.loginButtonRef.current.disabled = true;
            this.logoutButtonRef.current.disabled = false;

        }
        else{
            this.LogiinFormSubstituteRef.current.style.visibility = 'hidden';
            this.LogiinFormSubstituteRef.current.style.display = 'none';
            this.LoginFormRef.current.style.visibility = 'visible';
            this.LoginFormRef.current.style.display = 'table';
            this.loginButtonRef.current.disabled = false;
            this.logoutButtonRef.current.disabled = true;
        }
    }

    render() {
        return(
        <div>
            <table border="0" ref={this.LogiinFormSubstituteRef}>
                <tr>
                    <td>
                        <img src={imagesMap().get('loginPageTakeOff')} width="600"/>
                    </td>
                </tr>
            </table>

            <form ref={this.LoginFormRef} onSubmit={this.handleSubmit}  class="FlightsTable" style={{border: 'none'}}>
                <br/>
                <img src={imagesMap().get('planeBanner')} />
                <br/><br/>
                <table border ="1"  class="FlightsTable">
                <tr>
                    <td>
                        User Name:
                    </td>
                    <td>
                        <input type="text" id="login_username" onChange={this.handleChange} style={{width: '70%'}} />
                    </td>
                </tr> 
                <tr>
                    <td>
                        Password:
                    </td>
                    <td>
                        <input type="text" id="login_password"  onChange={this.handleChange} style={{width: '70%'}} />
                    </td>
                </tr>
                </table>
                
                <br />
                <button id="login_button" ref={this.loginButtonRef}>Login</button>
            </form>
            <button id="logout_button" ref={this.logoutButtonRef}  onClick={() => {
                const tokenAbsenceMessage = 'if you can see this message this means that Jason Web Token isn\'t re ceived from the server';

                //we overwrite the token in the reducer storage with "tokenAbsenceMessage"
                this.props.createSetJWTLoginAction(tokenAbsenceMessage);
                //also do the same in the localStorage of the browser
                localStorage.setItem('loginJWTState', tokenAbsenceMessage);
                //and in the local state
                this.setState({
                    authTokenAfterLogin: tokenAbsenceMessage
                });

	
                this.props.setUserInfoStateInCallingComponentFunc({});
                this.props.passUserInfoStateToCallingComponentFunc({});


                this.checkButtonsVisibility();
                
                }}>Logout</button>
            <br/><br/>
                    <LoginByGoogle putGoogleTokenIntoParentState={
                        (googleToken) => {
                        this.setState({ authTokenAfterLogin: googleToken });
                         }}
                         makeUserInformationInvisibleInParentComponent={() =>{
                            this.props.setUserInfoStateInCallingComponentFunc({});
                            this.props.passUserInfoStateToCallingComponentFunc({});
                         }}
                         />
                    <br/><br/>
            <br />
    



        </div>
        );

    }
}

//setTheToken
const mapDispatchToProps = (dispatch) => {
    return {
        createSetJWTLoginAction: (payload) => {
        dispatch(createSetJWTLoginAction(payload))
      },
      createUserInformationAction: (payload) => {
        dispatch(createUserInformationAction(payload))
      }
    }
  }


  const mapStateToProps = (state) => {
    return { 
        loginJWTtokenState: state.loginJWTState,
        loginGoogleTokenState: state.loginGoogleState,

        userInformationState: state.userInformationState,
     }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);