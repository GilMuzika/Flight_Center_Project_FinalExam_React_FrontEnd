import React, { Component } from 'react';
import { connect } from 'react-redux';
import checkTokenState from '../forLogin/checkTokenState';
import getAuthTokenFromStore from '../getAuthTokenFromStore';
import generalActionCreator from '../forReducesrs/actions/generalActionCreator';
import getAjaxResultForGet from'../getAjaxResultForGet';

import createSetJWTLoginAction from'../forReducesrs/actions/setJWTLoginAction';
import createsetGoogleLoginAction from'../forReducesrs/actions/setGoogleLoginAction';


//This component calleed from the "App" class to preload immediately when the root page of the site is requested by the browser
class PreloadAirlineCompaniesIDs extends Component {
    constructor(props) {
        super(props);
        checkTokenState(props, 'loginJWTState');
        checkTokenState(props, 'loginGoogleState');
    }

    state = {
        authToken: null,
        //customersIDs: null
    }    


    preloadCustomersIDs(authToken) {
        const headers = {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
            'From': 'local'
        };
        const url=`https://localhost:44361/api/LoggedInAdministratorFacade/PreloadAllAirlineCompaniesIDs`;
        getAjaxResultForGet(url, headers)
        .then(res => {
            //this.setState({ 
                this.props.createPreloadAirlineCompaniesIDsAction(res)
            //});
        })
        .catch(err => {    alert(`In "PreloadAirlineCompaniesIDs" - "preloadCustomersIDs" method, the error:\n---------------------------------\n${JSON.stringify(err)}`);    });

    }

    componentDidMount() {
        getAuthTokenFromStore(this.props.loginJWTtokenState, this.props.loginGoogleTokenState)
        .then(resToken => {
            this.setState({authToken: resToken});
            this.preloadCustomersIDs(resToken);
            })
        .catch(err => {   alert(err);  });

        //this.isLoggedProperly(this.props.loginJWTtokenState, this.props.loginGoogleTokenState);

        



    }

    render() {
        return(
            <div>

            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return { 
        loginJWTtokenState: state.loginJWTState,
        loginGoogleTokenState: state.loginGoogleState,

        preloadCustomersIDsState: state.generalState,
     }
};


const mapDispatchToProps = (dispatch) => {
    return {
        createPreloadAirlineCompaniesIDsAction: (payload) => {
            dispatch(generalActionCreator(payload, 'PRELOAD_IDS'))
      },




      //two next
      createSetJWTLoginAction: (payload) => {
        dispatch(createSetJWTLoginAction(payload))
  },
    createsetGoogleLoginAction: (payload) => {
        dispatch(createsetGoogleLoginAction(payload));
  }
    }
  }


  export default connect(mapStateToProps, mapDispatchToProps)(PreloadAirlineCompaniesIDs);


