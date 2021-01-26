import React, {	useState } from 'react';
import './App.css';
import './common_style.css';
import imagesMap from'./images/imagesMap';
import { BrowserRouter, Route, useHistory } from 'react-router-dom';
import navbar from'./components/navbar';
import Routes from './components/Routes';

import { connect } from 'react-redux';
import createUserInformationAction from './components/forReducesrs/actions/setUserInformationAction';
import createSetJWTLoginAction from './components/forReducesrs/actions/setJWTLoginAction';
import DisplayRegisteredUserInformation from './components/DisplayRegisteredUserInformation';
import checkTokenState from'./components/forLogin/checkTokenState';


//those components are actual site pages
import Login from'./components/forLogin/Login';
import ExampleComp from'./components/ExampleComp';
import ViewEditCustomers from'./components/ViewEditCustomers/ViewEditCustomers';
import AirlineCompany from'./components/airline/AirlineCompany';
import PreloadIDs from './components/PreloadIDs';



let loggedInUserInformationOutside = null;

function IsJsonString(str) {
	const is_this_json_object = 'IT_IS_NOT_JSON_OBGECT';
	let afterParse = null;
    try {
        afterParse = JSON.parse(str);
    } catch (e) {
		afterParse = { 
			is_this_json_object
		 };

		 if(loggedInUserInformationOutside !== null && loggedInUserInformationOutside !== undefined) {
			 afterParse = loggedInUserInformationOutside;
		 }

		 alert('In IsJsonString:\n' +JSON.stringify(str));
    }
    return afterParse;
}


class App extends React.Component {
	constructor(props) {
		super(props);

		checkTokenState(props, 'loginJWTState');
		checkTokenState(props, 'userInformationState', 'user');

	}


	state = {
		iconKeyName: 'flightsmamagementSystemDefaultIcon',
		loggedInUserInformation: []
	}

	setIconToComponent = (iconKeySource) => {
		if(iconKeySource === undefined)
			iconKeySource = 'flightsmamagementSystemDefaultIcon';
		this.setState({
			iconKeyName: iconKeySource
		});
	}

	passUserInfoStateToCallingComponent = (userInfoState) => {
		loggedInUserInformationOutside = userInfoState
	}

	setUserInfoStateInCallingComponent = (param) => {
		this.setState({
			loggedInUserInformation: param
		});
	}





	componentDidUpdate(previousProps, previousState) {

		if(previousProps.userInformationState !== this.props.userInformationState) {
				if(this.props.loginJWTtokenState.length > 150 || this.props.loginGoogleTokenState.length > 150) {
				this.setState({
					loggedInUserInformation: IsJsonString(this.props.userInformationState)
				});
			}
		}


		//alert(`In componentDidUpdate:\n${this.state.loggedInUserInformation}`);
		

	}




	

	render() {

		
		let registeredUserInformationObj = {};
		if(this.props.userInformationState !== undefined && typeof this.props.userInformationState === 'string' && this.props.userInformationState.length > 150 && typeof JSON.parse(this.props.userInformationState) === 'object' && this.props.loginJWTtokenState.length > 150) {
			registeredUserInformationObj = 	loggedInUserInformationOutside;
		}

		const navigationComponentsActual = new Map();


		//in order to get the application functioning
		// you need to provide the routed components and their respective names to 
		// "navigationComponentsActual" map
		navigationComponentsActual.set('Login', () =>  <Login setIconFunc={this.setIconToComponent} passUserInfoStateToCallingComponentFunc={this.passUserInfoStateToCallingComponent} setUserInfoStateInCallingComponentFunc={this.setUserInfoStateInCallingComponent} currentHistory={useHistory()} />);
		navigationComponentsActual.set('ExampleComp', () =>  <ExampleComp setIconFunc={this.setIconToComponent} />);
		navigationComponentsActual.set('ViewEditCustomers', () =>  <ViewEditCustomers setIconFunc={this.setIconToComponent} />);
		navigationComponentsActual.set('AirlineCompany', () =>  <AirlineCompany setIconFunc={this.setIconToComponent} currentHistory={useHistory()} />);


				return (
				<div>

					<div class="Box">
					<PreloadIDs url='https://localhost:44361/api/LoggedInCustomerFacade/PreloadAllCustomersIDs'/>
					{/*		<PreloadIDs url='https://localhost:44361/api/LoggedInAirlineCompanyFacade/PreloadAllAirlineIDs'/>	*/}
					
					</div>
					<div class="onTopOfTable">
						<div style={{margin: '10px', padding: '10px'}}>
							<table class="upperBox" border="0" cellspacing="0" cellpadding="0" style={{background: '#b3c8d7', padding: '0', margin: '0', border: '0px', borderSpacing: '0', borderCollapse: 'collapse'}}>
								<tr>
									<td><img style={{verticalAlign: 'top'}} src={imagesMap().get('upperLeftCorner')} width="8" /></td>
									<td></td>
									<td><img style={{verticalAlign: 'top'}} src={imagesMap().get('upperRightCorner')} width="8" /></td>
								</tr>
								<tr>
									<td></td>
									<td style={{verticalAlign: 'middle'}}>
										<table border="0">
											<tbody>
											<tr>
												<td></td>
												<td rowspan="3">
													<img src={imagesMap().get(this.state.iconKeyName)} />
												</td>
											</tr>
											<tr>
												<td>Flights Management Center&nbsp;</td>
											</tr>
											<tr>
												<td></td>
											</tr>
											</tbody>
										</table>
									</td>
									<td></td>
								</tr>
								<tr>
									<td><img style={{verticalAlign: 'bottom'}} src={imagesMap().get('bottomLeftCorner')} width="8" /></td>
									<td></td>
									<td><img style={{verticalAlign: 'bottom'}} src={imagesMap().get('bottomRightCorner')} width="8" /></td>
								</tr>
							</table>
						</div>
					</div>
			<BrowserRouter>
				<table class="FlightsTable">
					<tr style={{textAlign: 'left'}}>
						<td width="5">
							&nbsp;<br/>
						</td>
						<td width="0"></td>
						<td style={{textAlign:'left'}}>
								{/*		הסרגל העליון	*/}	 
								{/*	 	navbar gets array of names of the acrual routing components, the names extracted from the "navigationComponentsActual" map that contains the actual components as values and their names as keys, and converted to an array  	*/}
								{	navbar([...navigationComponentsActual.keys()])	}
						</td>
					</tr>
				</table>
				<br />
				{/* <!-- class "FlightsTable" uses different colors for "<th>" and "<tr>" elements --> */ }
				
				<table class="FlightsTable" name="search_text_and_buttons_table">
					<thead>
						<tr>
							<th>&nbsp;</th>

						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<center>
									{/*	 	==	    	אזור הפעילות    	==		*/}
									<DisplayRegisteredUserInformation registeredUserInformation={this.state.loggedInUserInformation} />	{/*  displaying registred user infprmation that came from the backend alongside registration token, when existrs */}
									<Routes navigationComponentsActual={navigationComponentsActual} />	
										

								</center>
							</td>
						</tr>
					</tbody>
				</table>
			</BrowserRouter>
				<br />






				<div class="Box">

				</div>

				


				</div>
			);
	  }
}



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



export default connect(mapStateToProps, mapDispatchToProps)(App);



//<PreloadIDs url='https://localhost:44361/api/LoggedInAdministratorFacade/PreloadAllAirlineCompaniesIDs'/>