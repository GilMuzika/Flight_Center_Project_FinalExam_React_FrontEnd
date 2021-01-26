import React, { Component } from 'react';
import { connect } from 'react-redux';
import checkTokenState from '../forLogin/checkTokenState';
import getAuthTokenFromStore from '../getAuthTokenFromStore';
import Swal from 'sweetalert2';
import getAjaxResultForGet from '../getAjaxResultForGet';
import getAjaxResultPost from'../getAjaxResultPost';
import displayErrorInSwal from '../displayErrorInSwal';
import ChooseAirlineCompany from './ChooseAny';
import ChooseDepartureCountry from './ChooseAny';
import ChooseDestinationCountry from './ChooseAny';
import displayMessageInSwal from '../displayMessageInSwal';


import createSetJWTLoginAction from'../forReducesrs/actions/setJWTLoginAction';
import createsetGoogleLoginAction from'../forReducesrs/actions/setGoogleLoginAction';


function getBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = error => reject(error);
	});
}

class AirlineCompany extends Component {
    constructor(props) {
        super(props);

        this.props.setIconFunc('airlineIcon');

        checkTokenState(props, 'loginJWTState');
        checkTokenState(props, 'loginGoogleState');

        this.checkAuthToken();

        this.enableEdidingBurttonRef = React.createRef();
    }
    state ={
        authToken: null,
        allFlightsData: [], 
        flightsToJSXMaps: new Map(),
        allAirlineCompaniesArr: [],
        allCountriesArr: [],
        ViewTablesRefs: [],
        EditTablesRefs: [], 
        reactSelectStyles: {
            //this object id for styling 'REACT-SELECT'
            option: (provided, state) => ({
                ...provided,
                borderBottom: '1px dotted pink',
                color: state.isSelected ? 'red' : 'blue',
                padding: 20,
                })
          },
    }

    getallAirlineCompaniesAndCountriesArr() {
        return new Promise((resolve, reject) => {

            const intermediateArr = [];
            if(this.state.authToken !== null && this.state.authToken !== undefined && typeof this.state.authToken === 'string' && this.state.authToken.length > 150) {
                const urlAirlines = 'https://localhost:44361/api/AnonimousUserFacade/GetAllAirlineCompanies';
                const headers = {
                    'Authorization': `Bearer ${this.state.authToken}`,
                    'Content-Type': 'application/json',
                    'From': 'local'
                };
                        getAjaxResultForGet(urlAirlines, headers).then(resAllAirlines => {
                            this.setState({
                                allAirlineCompaniesArr: resAllAirlines.data
                            });

                            if(this.state.allAirlineCompaniesArr !== undefined && this.state.allAirlineCompaniesArr !== null && Array.isArray(this.state.allAirlineCompaniesArr) && this.state.allAirlineCompaniesArr.length > 0) {
                                //resolve(this.state.allAirlineCompaniesArr);
                                intermediateArr.push(this.state.allAirlineCompaniesArr);
                            }

                        }).catch(errFromAirlies => {
                            reject(errFromAirlies);
                        });

                    const urlCountries = 'https://localhost:44361/api/AnonimousUserFacade/GetAllCountries';
                    getAjaxResultForGet(urlCountries, headers).then(resAllCountries => {
                        this.setState({
                            allCountriesArr: resAllCountries.data
                        });

                        if(this.state.allCountriesArr !== undefined && this.state.allCountriesArr !== null && Array.isArray(this.state.allCountriesArr) && this.state.allCountriesArr.length > 0) {
                            //resolve(this.state.allCountriesArr);
                            intermediateArr.push(this.state.allCountriesArr);
                        }

                        if(intermediateArr.length === 2) {
                            resolve(intermediateArr);
                        }

                    }).catch(errFromContries => {
                        reject(errFromContries);
                    });
            }
        });

    }
    

    checkAuthToken() {
        if(this.state.authToken === null || typeof this.state.authToken !== 'string' || this.state.authToken.length < 150) {
            getAuthTokenFromStore(this.props.loginJWTtokenState, this.props.loginGoogleTokenState)
            .then(resToken => {
                    this.setState({authToken: resToken});
                    this.getallAirlineCompaniesAndCountriesArr().catch(err => displayErrorInSwal(err, this.props.currentHistory));
                } )
                .catch(err => {    Swal.fire( `CAN'T FETCH authorisation token, caugh error:\n---------------------------------------\n ${ JSON.stringify(err)}`);    });
        }
    }





flightsToJSX(flightData, allAirlinesArr, allCountriesArr){
    if(allCountriesArr !== undefined && Array.isArray(allCountriesArr) && allCountriesArr.length > 0){
        alert(JSON.stringify(allCountriesArr));
    }
    if(allAirlinesArr !== undefined && Array.isArray(allAirlinesArr) && allAirlinesArr.length > 0){
        alert(JSON.stringify(allAirlinesArr));
    }
    const retValArr = [];
    for(let s in flightData) {

        this.state.flightsToJSXMaps.set(s, new Map());
        
        this.state.flightsToJSXMaps.get(s).set('iD', flightData[s].iD);
        this.state.flightsToJSXMaps.get(s).set('Image', flightData[s].Image.replace('data:image/jpeg;base64,', ''));
        this.state.flightsToJSXMaps.get(s).set('Adorning', flightData[s].Adorning);
        this.state.flightsToJSXMaps.get(s).set('AirlineName', flightData[s].AirlineName);
        this.state.flightsToJSXMaps.get(s).set('DepartureCountryName', flightData[s].DepartureCountryName);
        this.state.flightsToJSXMaps.get(s).set('DestinationCountryname', flightData[s].DestinationCountryName);
        this.state.flightsToJSXMaps.get(s).set('EstimatedTime', flightData[s].EstimatedTime);
        this.state.flightsToJSXMaps.get(s).set('Price', flightData[s].Price);
        this.state.flightsToJSXMaps.get(s).set('RemainingTickets', flightData[s].RemainingTickets);

        this.state.flightsToJSXMaps.get(s).set('DEPARTURE_TIME', flightData[s].DEPARTURE_TIME);
        this.state.flightsToJSXMaps.get(s).set('LANDING_TIME', flightData[s].LANDING_TIME);
        this.state.flightsToJSXMaps.get(s).set('FlightDuration', flightData[s].FlightDuration);

        this.state.flightsToJSXMaps.get(s).set('AirlineCompany', flightData[s].AirlineCompany);
        this.state.flightsToJSXMaps.get(s).set('DepartureCountry', flightData[s].DepartureCountry);
        this.state.flightsToJSXMaps.get(s).set('DestinationCountry', flightData[s].DestinationCountry);


        this[`EditButton_${s}_Ref`] = React.createRef();

        this[`WholeTable_${s}_EditRef`] = React.createRef();
        this[`WholeTable_${s}_ViewRef`] = React.createRef();

        this[`Image_${s}_EditRef`] = React.createRef();
        this[`Adorning_${s}_EditRef`] = React.createRef();
        this[`AirlineName_${s}_EditRef`] = React.createRef();
        this[`DepartureCountryName_${s}_EditRef`] = React.createRef();
        this[`DestinationCountryname_${s}_EditRef`] = React.createRef();
        this[`DepartureCountry_${s}_EditRef`] = React.createRef();
        this[`DestinationCountry_${s}_EditRef`] = React.createRef();
        this[`EstimatedTime_${s}_EditRef`] = React.createRef();
        this[`Price_${s}_EditRef`] = React.createRef();
        this[`RemainingTickets_${s}_EditRef`] = React.createRef();
        this[`AirlineCompany_${s}_EditRef`] = React.createRef();

        this[`Image_${s}_ViewRef`] = React.createRef();
        this[`Adorning_${s}_ViewRef`] = React.createRef();
        this[`AirlineName_${s}_ViewRef`] = React.createRef();
        this[`DepartureCountryName_${s}_ViewRef`] = React.createRef();
        this[`DestinationCountryname_${s}_ViewRef`] = React.createRef();
        this[`EstimatedTime_${s}_ViewRef`] = React.createRef();
        this[`Price_${s}_ViewRef`] = React.createRef();
        this[`RemainingTickets_${s}_ViewRef`] = React.createRef();






    retValArr.push(
        <table  class="FlightsTableInner" ref={this[`WholeTable_${s}_ViewRef`]} border="1" style={{padding: '2px', border: 'solid 1px white', visibility: 'visible', display: 'table'}}>
            <tr>
                <td width="2%" style={{padding: '3px'}}>{flightData[s].iD}</td>
                <td style={{width:'10%', padding: '3px'}}  ref ={this[`Adorning_${s}_ViewRef`]}>{flightData[s].Adorning}</td>
                <td style={{width:'5%', padding: '3px'}}><img  ref={this[`Image_${s}_ViewRef`]} src={flightData[s].Image} alt="" /></td>
                <td style={{width:'10%', padding: '3px'}} ref ={this[`AirlineName_${s}_ViewRef`]}>{flightData[s].AirlineName}</td>
                <td style={{width:'20%', padding: '3px'}} ref ={this[`DepartureCountryName_${s}_ViewRef`]}>{flightData[s].DepartureCountryName}</td>
                <td style={{width:'20%', padding: '3px'}} ref ={this[`DestinationCountryname_${s}_ViewRef`]}>{flightData[s].DestinationCountryName}</td>
                <td style={{width:'20%', padding: '3px'}} ref ={this[`EstimatedTime_${s}_ViewRef`]}>{flightData[s].EstimatedTime}</td>
                <td style={{width:'5%', padding: '3px'}} ref ={this[`Price_${s}_ViewRef`]}>{flightData[s].Price}</td>
                <td style={{width:'5%', padding: '3px'}} ref ={this[`RemainingTickets_${s}_ViewRef`]}>{flightData[s].RemainingTickets}</td>
            </tr>
        </table>
    )
retValArr.push(
    <table ref={this[`WholeTable_${s}_EditRef`]} width="100%" style={{border: 'solid 1px red', visibility: 'hidden', display: 'none'}}>
    <tr>
        <td>
            <tr>
                <td style={{width: '2%'}}>{flightData[s].iD}</td>
                <td style={{width: '10%'}}><input readonly disabled style={{width: '50px'}} ref={this[`Adorning_${s}_EditRef`]} type="text" id="Adorning" defaultValue={flightData[s].Adorning} onChange={(e) => {
                       this.state.flightsToJSXMaps.get(s).set(e.target.id, e.target.value); 
                       alert(JSON.stringify(this.state.flightsToJSXMaps.get(s).get('Adorning')));
                         }} /></td>
                <td style={{width: '10%'}}>
                    <img ref={this[`Image_${s}_EditRef`]} src={flightData[s].Image} alt="" />
                    {/*
                    <label class="custom-file-upload-button">
                            <input type="file" id="Image" accept='image/*' 
                            onChange={(e) => {
                                //next two rows are making the old image opaque 
                                //this[`oneImage_${customer.iD}_EditRef`].current.style.opacity = 0.5;
                                //this[`oneImage_${customer.iD}_ViewRef`].current.style.opacity = 0.5;

                                const image = e.target.files[0];
                                getBase64(image).then(resBase64image => {
                                    alert(e.target.id);
                                    this.state.flightsToJSXMaps.get(s).set(e.target.id, resBase64image);
                                    if(this[`Image_${s}_EditRef`].current) {
                                        alert(`${e.target.id}: \n-------\n${this.state.flightsToJSXMaps.get(s).get(e.target.id)}`);
                                        this[`Image_${s}_EditRef`].current.src = this.state.flightsToJSXMaps.get(s).get(e.target.id);
                                    }
                                })
                                .catch(err =>  {

                                    Swal.fire('IMAGE UPLOADING TO DB FAILED!\n' + err);
                                });

                            } }/>
								בחר קובץ
							</label>	
                            */}
                
                </td>
                {/*
                <td style={{width: '20%'}}><input ref={this[`AirlineName_${s}_EditRef`]} type="text" id="AirlineName" defaultValue={flightData[s].AirlineName} onChange={(e) =>{this.state.flightsToJSXMaps.get(s).set(e.target.id, e.target.value)}} /></td>
                */}
                <td style={{width: '150px'}}>
                                
                                {/* Explaination of "ChooseAy component"
                                   The callbacks "onChangeFunc" and "selectedChanged" are work in tandem, "onChangeFunc" takes th value returned from "selectedChanged" as a parameter.
                                    The full description is in "ChooseAny" component.
                                */}
                                 <ChooseAirlineCompany ref={this[`AirlineCompany_${s}_EditRef`]} selectedChanged={(newSelected)=>{
                                     alert(`${newSelected.AIRLINE_NAME}\n------------\n${JSON.stringify(newSelected)}`);    

                                     this.state.flightsToJSXMaps.get(s).set('AirlineCompany', newSelected); //AirlineCompany as a whole, as defined in th backend "AirlineCompany" type, not "Flight" an not "FlightData"
                                     this.state.flightsToJSXMaps.get(s).set('AirlineName', newSelected.AIRLINE_NAME);
                                     this.state.flightsToJSXMaps.get(s).set('Adorning', newSelected.ADORNING);


                                     this[`Image_${s}_EditRef`].current.src = 'data:image/jpeg;base64,' + newSelected.IMAGE;
                                     this[`Adorning_${s}_EditRef`].current.value = newSelected.ADORNING;
                                 }} 
                                      reactSelectStyles={ this.state.reactSelectStyles }
                                      dataEntries = { allAirlinesArr } 
                                      createSelectOptionsFunc = {this.createSelectOptions = (dataEntries) => {
                                         return dataEntries.map(d => ({
                                            "value" : d.ID,
                                            "label" : d.AIRLINE_NAME
                                          }));
                                      }}
                                      createSelectedOptionFunc = { this.createSelectedOption = (inComponentSelectedOption) => {
                                        return { value: inComponentSelectedOption.ID, label: inComponentSelectedOption.AIRLINE_NAME };
                                      } }
                                     onChangeFunc = {this.inComponentOnChange = (inComponentSelected, inComponentSelectedOption, inComponentdataEntries) => {

                                                displayMessageInSwal(`Be careful! Now this flight belongs to commpany ${inComponentSelectedOption.label}. You're about to change it to ${inComponentSelected.label}. After the flight will be edited (after pressing "Edit") it no longer will appear in the list of flights of  the company "${inComponentSelectedOption.label}", so it won't appear in the page anymore. `);
                                                for(let s in inComponentdataEntries) {               
                                                    if(inComponentSelected.label === inComponentdataEntries[s].AIRLINE_NAME) {    
                                                        return inComponentdataEntries[s];
                                                    }
                                                }
                                     }}
                                     selectedOption = { this.state.flightsToJSXMaps.get(s).get('AirlineCompany') } />      
                                

                </td>
                <td style={{width: '150px'}}>
                    {/*    <input style={{width: '50px'}} ref={this[`DepartureCountryName_${s}_EditRef`]} type="text" id="DepartureCountryName" defaultValue={flightData[s].DepartureCountryName} onChange={(e) => {this.state.flightsToJSXMaps.get(s).set(e.target.id, e.target.value)}} />     */}
                    
                    <ChooseDepartureCountry ref={this[`DepartureCountry_${s}_EditRef`]} selectedChanged={(newSelected) => {
                        alert(JSON.stringify(newSelected));
                        this.state.flightsToJSXMaps.get(s).set('DepartureCountry', newSelected);
                        this.state.flightsToJSXMaps.get(s).set('DepartureCountryName', newSelected.COUNTRY_NAME);
                    }}
                    
                    reactSelectStyles={ this.state.reactSelectStyles }
                    dataEntries = { allCountriesArr } 
                    createSelectOptionsFunc = {this.createSelectOption = (dataEntries) => {
                                return dataEntries.map(d => ({
                                "value" : d.ID,
                                "label" : d.COUNTRY_NAME
                            }));
                        }}
                    createSelectedOptionFunc = { this.createSelectedOption = (inComponentSelectedOption) => {
                            return { value: inComponentSelectedOption.ID, label: inComponentSelectedOption.COUNTRY_NAME };
                    } }
                    onChangeFunc = {this.inComponentOnChange = (inComponentSelected, inComponentSelectedOption, inComponentdataEntries) => {

                        for(let s in inComponentdataEntries) {    
                            if(inComponentSelected.label === inComponentdataEntries[s].COUNTRY_NAME) {
                                return inComponentdataEntries[s];
                            }
                        }
                    }}
                    selectedOption = { this.state.flightsToJSXMaps.get(s).get('DepartureCountry') }
                    />
                    
                    

                    </td>
                <td style={{width: '150px'}}>
                        {/*    <input style={{width: '50px'}} ref={this[`DestinationCountryname_${s}_EditRef`]} type="text" id="DestinationCountryname" defaultValue={flightData[s].DestinationCountryName} onChange={(e) => {this.state.flightsToJSXMaps.get(s).set(e.target.id, e.target.value)}} />    */}
                        <ChooseDestinationCountry ref={this[`DestinationCountry_${s}_EditRef`]} selectedChanged={(newSelected) => {
                        alert(JSON.stringify(newSelected));
                        this.state.flightsToJSXMaps.get(s).set('DestinationCountry', newSelected);
                        this.state.flightsToJSXMaps.get(s).set('DestinationCountryName', newSelected.COUNTRY_NAME);
                    }}
                    
                    reactSelectStyles={ this.state.reactSelectStyles }
                    dataEntries = { allCountriesArr } 
                    createSelectOptionsFunc = {this.createSelectOption = (dataEntries) => {
                                return dataEntries.map(d => ({
                                "value" : d.ID,
                                "label" : d.COUNTRY_NAME
                            }));
                        }}
                    createSelectedOptionFunc = { this.createSelectedOption = (inComponentSelectedOption) => {
                            return { value: inComponentSelectedOption.ID, label: inComponentSelectedOption.COUNTRY_NAME };
                    } }
                    onChangeFunc = {this.inComponentOnChange = (inComponentSelected, inComponentSelectedOption, inComponentdataEntries) => {

                        for(let s in inComponentdataEntries) {    
                            if(inComponentSelected.label === inComponentdataEntries[s].COUNTRY_NAME) {
                                return inComponentdataEntries[s];
                            }
                        }
                    }}
                    selectedOption = { this.state.flightsToJSXMaps.get(s).get('DestinationCountry') }
                    />
                </td>
                <td style={{width: '10%'}}><input style={{width: '50px'}} ref={this[`EstimatedTime_${s}_EditRef`]} type="text" id="EstimatedTime" defaultValue={flightData[s].EstimatedTime} onChange={(e) => {this.state.flightsToJSXMaps.get(s).set(e.target.id, e.target.value)}} /></td>
                <td style={{width: '10%'}}><input style={{width: '50px'}} ref={this[`Price_${s}_EditRef`]} type="text" id="Price" defaultValue={flightData[s].Price} onChange={(e) => {this.state.flightsToJSXMaps.get(s).set(e.target.id, e.target.value)}} /></td>
                <td style={{width: '10%'}}><input style={{width: '50px'}} ref={this[`RemainingTickets_${s}_EditRef`]} type="text" id="RemainingTickets" defaultValue={flightData[s].RemainingTickets} onChange={(e) => {this.state.flightsToJSXMaps.get(s).set(e.target.id, e.target.value)}} /></td>
                <td>

                    <button ref={this[`EditButton_${s}_Ref`]} onClick={() => {

                const url = `https://localhost:44361/api/LoggedInAirlineCompanyFacade/UpdateFlight`;
                const headers = {
                    'Authorization': `Bearer ${this.state.authToken}`,
                    'Content-Type': 'application/json',
                    'From': 'local'
                };
                const data = {
                    'iD': this.state.flightsToJSXMaps.get(s).get('iD'),
                    'Image': this.state.flightsToJSXMaps.get(s).get('Image'),
                    'AirlineName': this.state.flightsToJSXMaps.get(s).get('AirlineName'),
                    'Adorning': this.state.flightsToJSXMaps.get(s).get('Adorning'),
                    'DepartureCountryName': this.state.flightsToJSXMaps.get(s).get('DepartureCountryName'),
                    'DestinationCountryname': this.state.flightsToJSXMaps.get(s).get('DestinationCountryname'),
                    'EstimatedTime': this.state.flightsToJSXMaps.get(s).get('EstimatedTime'),
                    'Price': this.state.flightsToJSXMaps.get(s).get('Price'),
                    'RemainingTickets': this.state.flightsToJSXMaps.get(s).get('RemainingTickets'),
                    'AirlineCompany': this.state.flightsToJSXMaps.get(s).get('AirlineCompany'),
                    'DepartureCountry': this.state.flightsToJSXMaps.get(s).get('DepartureCountry'),
                    'DestinationCountry': this.state.flightsToJSXMaps.get(s).get('DestinationCountry'),

                    'DEPARTURE_TIME': this.state.flightsToJSXMaps.get(s).get('DEPARTURE_TIME'),
                    'LANDING_TIME': this.state.flightsToJSXMaps.get(s).get('LANDING_TIME'),
                    'FlightDuration': this.state.flightsToJSXMaps.get(s).get('FlightDuration'),
                };

                //this[`EditButton_${s}_Ref`].current.style.cursor = 'not-allowed';
                //this[`EditButton_${s}_Ref`].current.style.pointerEvents = 'none';
                //this[`EditButton_${s}_Ref`].current.style.color = this[`EditButton_${s}_Ref`].current.style.backgroundColor;
                this[`EditButton_${s}_Ref`].current.disabled = true;

                getAjaxResultPost(url, data, headers).then(resUpdatedFlight => {
                    this[`Image_${s}_EditRef`].current.src = resUpdatedFlight.data.Image;
                    this[`Adorning_${s}_EditRef`].current.value = resUpdatedFlight.data.Adorning;
                    //this[`AirlineName_${s}_EditRef`].current.value = resUpdatedFlight.data.AirlineName;
                    //this[`DepartureCountryName_${s}_EditRef`].current.value = resUpdatedFlight.data.DepartureCountryName;
                    //this[`DestinationCountryname_${s}_EditRef`].current.value = resUpdatedFlight.data.DestinationCountryName;
                    this[`EstimatedTime_${s}_EditRef`].current.value = resUpdatedFlight.data.EstimatedTime;
                    this[`Price_${s}_EditRef`].current.value = resUpdatedFlight.data.Price;
                    this[`RemainingTickets_${s}_EditRef`].current.value = resUpdatedFlight.data.RemainingTickets;
                    this[`AirlineCompany_${s}_EditRef`].current.selectedOption= resUpdatedFlight.data.AirlineCompany;
                    this[`DepartureCountry_${s}_EditRef`].current.selectedOption = resUpdatedFlight.data.DepartureCountry;
                    this[`DestinationCountry_${s}_EditRef`].current.selectedOption = resUpdatedFlight.data.DestinationCountry;
                    
                    this[`Image_${s}_ViewRef`].current.src = resUpdatedFlight.data.Image;
                    this[`Adorning_${s}_ViewRef`].current.innerText = resUpdatedFlight.data.Adorning;
                    this[`AirlineName_${s}_ViewRef`].current.innerText = resUpdatedFlight.data.AirlineName;
                    this[`DepartureCountryName_${s}_ViewRef`].current.innerText = resUpdatedFlight.data.DepartureCountryName;
                    this[`DestinationCountryname_${s}_ViewRef`].current.innerText = resUpdatedFlight.data.DestinationCountryName;
                    this[`EstimatedTime_${s}_ViewRef`].current.innerText = resUpdatedFlight.data.EstimatedTime;
                    this[`Price_${s}_ViewRef`].current.innerText = resUpdatedFlight.data.Price;
                    this[`RemainingTickets_${s}_ViewRef`].current.innerText = resUpdatedFlight.data.RemainingTickets;

                    this[`EditButton_${s}_Ref`].current.disabled = false;
                });

                

                        alert(
                            this.state.flightsToJSXMaps.get(s).get('Adorning') + '\n' + 
                            //this.state.flightsToJSXMaps.get(s).get('Image') + '\n' + 
                            this.state.flightsToJSXMaps.get(s).get('AirlineName') + '\n' + 
                            this.state.flightsToJSXMaps.get(s).get('DepartureCountryName') + '\n' + 
                            this.state.flightsToJSXMaps.get(s).get('DestinationCountryname') + '\n' +
                            this.state.flightsToJSXMaps.get(s).get('EstimatedTime') + '\n'  +
                            this.state.flightsToJSXMaps.get(s).get('Price') + '\n' +
                            this.state.flightsToJSXMaps.get(s).get('RemainingTickets') + '\n' + 
                            JSON.stringify(this.state.flightsToJSXMaps.get(s).get('AirlineCompany')) + '\n'

                            );
                    }}>Edit</button>
                </td>
            </tr>
        </td>
    </tr>
</table>
);



this.state.EditTablesRefs.push(this[`WholeTable_${s}_EditRef`]);
this.state.ViewTablesRefs.push(this[`WholeTable_${s}_ViewRef`]);


setTimeout(() => {
    this.enableEdidingBurttonRef.current.style.visibility = 'visible';
    this.enableEdidingBurttonRef.current.style.display = 'block';    
}, 1000);




}



    

    return(
        <div>
            <table class="FlightsTableInner" border = "0">
                {  retValArr   }
            </table>
        </div>
    );
}


render() {
    return(
        <div>
        
            {/*    -=     אזור הכפתורים     =-     */}
            <button onClick={() => {
                        alert(JSON.stringify(this.state.allAirlineCompaniesArr));



                        const url=`https://localhost:44361/api/LoggedInAirlineCompanyFacade/GetAllFlightsAsync`;
                        const headers = {
                            'Authorization': `Bearer ${this.state.authToken}`,
                            'Content-Type': 'application/json',
                            'From': 'local'
                        };

                        let locAllAirlines = this.state.allAirlineCompaniesArr;
                        let locAllCountries = this.state.allCountriesArr;
                        if(this.state.allAirlineCompaniesArr === undefined || this.state.allAirlineCompaniesArr === null || !Array.isArray(this.state.allAirlineCompaniesArr) || this.state.allAirlineCompaniesArr.length === 0) {

                            this.getallAirlineCompaniesAndCountriesArr().then(resAllAirlinesArr => {
                                locAllAirlines = resAllAirlinesArr[0];
                                locAllCountries = resAllAirlinesArr[1];                                

                                getAjaxResultForGet(url, headers)
                                .then(resallFlightsData => {
                
                                    this.setState({
                                        allFlightsData: this.flightsToJSX(resallFlightsData.data, locAllAirlines, locAllCountries)
                                    });
                                    return;
                                })
                                .catch(err => displayErrorInSwal(err, this.props.currentHistory));

                                return;
                            });
                        }




                getAjaxResultForGet(url, headers)
                .then(resallFlightsData => {

                    this.setState({
                        allFlightsData: this.flightsToJSX(resallFlightsData.data, locAllAirlines, locAllCountries)
                    });
                    return;
                })
                .catch(err => displayErrorInSwal(err, this.props.currentHistory));
            }}>Get All Flights</button>

            <table border="1" class="FlightsTable" style={{width: '100%'}}>
                <tr>
                    <td>
                        <button ref={this.enableEdidingBurttonRef} style={{visibility: 'hidden', display: 'none'}}
                        onClick={() => {
                            //alert(`${this.state.EditTablesRefs.length}\n-----------------------------------\n${this.state.ViewTablesRefs.length}`);
                            if(this.state.EditTablesRefs.length !== 0) {

                                if(this.enableEdidingBurttonRef.current) {
                                    this.enableEdidingBurttonRef.current.innerHTML = this.enableEdidingBurttonRef.current.innerHTML === 'Enable editing' ? this.enableEdidingBurttonRef.current.innerHTML = 'Disable editing': this.enableEdidingBurttonRef.current.innerHTML = 'Enable editing';
                                }

                                for(let s in this.state.EditTablesRefs) {
                                    if(this.state.EditTablesRefs[s].current) {
                                        //alert(`${this.state.EditTablesRefs[s].current.style.visibility}\n------------------\n${this.state.EditTablesRefs[s].current.style.display}`);
                                        this.state.EditTablesRefs[s].current.style.visibility =  this.state.EditTablesRefs[s].current.style.visibility === 'hidden' ? this.state.EditTablesRefs[s].current.style.visibility = 'visible' : this.state.EditTablesRefs[s].current.style.visibility = 'hidden';
                                        this.state.EditTablesRefs[s].current.style.display =  this.state.EditTablesRefs[s].current.style.display === 'none' ? this.state.EditTablesRefs[s].current.style.display = 'table' : this.state.EditTablesRefs[s].current.style.display = 'none';
                                    }
                                    else alert("NOPE! 1");
                                }
                            }
                            if(this.state.ViewTablesRefs.length !== 0) {
                                for(let s in this.state.ViewTablesRefs) {
                                    if(this.state.ViewTablesRefs[s].current) {
                                        this.state.ViewTablesRefs[s].current.style.visibility = this.state.ViewTablesRefs[s].current.style.visibility === 'hidden' ? this.state.ViewTablesRefs[s].current.style.visibility = 'visible' : this.state.ViewTablesRefs[s].current.style.visibility = 'hidden';
                                        this.state.ViewTablesRefs[s].current.style.display = this.state.ViewTablesRefs[s].current.style.display === 'none' ? this.state.ViewTablesRefs[s].current.style.display = 'table' : this.state.ViewTablesRefs[s].current.style.display = 'none';
                                    }
                                    else alert("NOPE! 2");
                                }
                            }
                            

                        }}
                        >Enable editing</button>
                        {   this.state.allFlightsData   }
                    </td>
                </tr>
            </table>
        </div>
    );
}


}

const mapStateToProps = (state) => {
    return { 
        loginJWTtokenState: state.loginJWTState,
        loginGoogleTokenState: state.loginGoogleState,
     }
};


const mapDispatchToProps = (dispatch) => {
    return {
        createSetJWTLoginAction: (payload) => {
            dispatch(createSetJWTLoginAction(payload))
      },
        createsetGoogleLoginAction: (payload) => {
            dispatch(createsetGoogleLoginAction(payload));
      }
    }
  }




  export default connect(mapStateToProps, mapDispatchToProps)(AirlineCompany);