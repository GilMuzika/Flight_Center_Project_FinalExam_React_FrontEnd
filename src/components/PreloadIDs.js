import React, { Component } from 'react';
import { connect } from 'react-redux';
import checkTokenState from './forLogin/checkTokenState';
import getAuthTokenFromStore from './getAuthTokenFromStore';
import generalActionCreator from './forReducesrs/actions/generalActionCreator';
import getAjaxResultForGet from'./getAjaxResultForGet';

import createSetJWTLoginAction from'./forReducesrs/actions/setJWTLoginAction';
import createsetGoogleLoginAction from'./forReducesrs/actions/setGoogleLoginAction';
import displayErrorInSwal from './displayErrorInSwal';
import Swal from 'sweetalert2';


//This component calleed from the "App" class to preload immediately when the root page of the site is requested by the browser
class PreloadIDs extends Component {
    constructor(props) {
        super(props);




        checkTokenState(props, 'loginJWTState');
        checkTokenState(props, 'loginGoogleState');
    }

    state = {
        url: null,

        authToken: null,
        //customersIDs: null
    }    


    preload_IDs(authToken, url) {
        const headers = {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
            'From': 'local'
        };
        //const url=`https://localhost:44361/api/LoggedInCustomerFacade/PreloadAllCustomersIDs`;
        getAjaxResultForGet(url, headers)
        .then(res => {
            //this.setState({ 
                this.props.createpreload_IDsAction(res)
            //});
        })
        .catch(err => {     displayErrorInSwal(err);    });

    }

    componentDidUpdate(previousProps, previousState) {
        if(previousProps !== this.props) {
            this.checkStateAndBeginPreload();
        }


        if(this.state.authToken !== null && this.state.authToken !== undefined && this.state.authToken.length > 150)
            this.preload_IDs(this.state.authToken, this.props.url);
    }



    checkStateAndBeginPreload() {
        if(this.props.url === undefined || this.props.url === null) {
            Swal.fire(
                {
                   title: "URL ISN'T PASSED TO THE PROPS!",
                   text: "this component must get a value \"url\" with the url address to the backend method, forexampe, \n\"https://localhost:44361/api/LoggedInCustomerFacade/PreloadAllCustomersIDs\" ",
                   timer: 20000,
                   icon: "error",
                   showCancelButton: false,
                   //cancelButtonColor: '#1dd168',
                   //cancelButtonText: 'For more info'
                });
        }

        this.setState({
            url: this.props.url
        });
        
        getAuthTokenFromStore(this.props.loginGoogleTokenState, this.props.loginJWTtokenState)
        .then(resToken => {
            this.setState({authToken: resToken});


            let t = this.state.authToken;
            let u = this.state.url;
            /*Swal.fire({
                text: "HURRAY!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
                timer: 1000
                });*/


                if(typeof this.props.loginJWTtokenState === 'string' && this.props.loginJWTtokenState.length > 150) {
                this.preload_IDs(this.props.loginJWTtokenState, this.props.url);                
                }


            })
        .catch(err => {   displayErrorInSwal(err);  });
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
        preload_IDsState: state.generalState,
     }
};


const mapDispatchToProps = (dispatch) => {

    const actionType = 'aaaaaaaaaaaaaaa';// this.props.url.substring(this.props.url.lastIndexOf("/"));

    return {
        createpreload_IDsAction: (payload) => {
            dispatch(generalActionCreator(payload, 'PreloadAllCustomersIDs'))
      },
      //PRELOAD_CUSTOMERS_IDS




      //two next
      createSetJWTLoginAction: (payload) => {
        dispatch(createSetJWTLoginAction(payload))
  },
    createsetGoogleLoginAction: (payload) => {
        dispatch(createsetGoogleLoginAction(payload));
  }
    }
  }


  export default connect(mapStateToProps, mapDispatchToProps)(PreloadIDs);


