import React, { Component } from 'react';
import { connect } from 'react-redux';
import checkTokenState from '../forLogin/checkTokenState';
import getAjaxResultForGet from'../getAjaxResultForGet';
import getAjaxResultPost from'../getAjaxResultPost';
import getAuthTokenFromStore from '../getAuthTokenFromStore';
import PreloadIDs from '../PreloadIDs';
import displayErrorInSwal from '../displayErrorInSwal';
import Swal from 'sweetalert2';


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

class ViewEditCustomers extends Component {
    constructor(props) {
        super(props);

        this.props.setIconFunc('customersIcon');

        this.displayClientsTableRef = React.createRef();
        this.getPreloadedIDsRef = React.createRef();
        this.showResultsTableTbody = React.createRef();
        this.displayWaitingTimeTable = React.createRef();
        this.stopLoadingButtonRef  = React.createRef();


        checkTokenState(props, 'loginJWTState');
        checkTokenState(props, 'loginGoogleState');


    }
    state = {
        authToken: null,
        customers: [],
        visualisedCustomers: [],
        waitingTime: 0,
        letsStopLoadingBool: false
    }
    
    customerToJsx(customer, number) {
        if(customer === undefined) {
            return (
                <table  style={{visibility: 'visible', display: 'table'}} id="_flightTable">
                <tr>
                <td>#</td>
                <td><image width="80"    /></td>
                <td>#</td>
                <td>#</td>
                <td>#</td>
                <td>#</td>
            </tr>      
            </table>          
            );
        }

        this[`customer_${customer.iD}_VisualReprsentataionViewRef`] = React.createRef();
        this[`customer_${customer.iD}_VisualReprsentataionEditRef`] = React.createRef();

        this[`oneImage_${customer.iD}_ViewRef`] = React.createRef();
        this[`oneImage_${customer.iD}_EditRef`] = React.createRef();
        
        this[`oneFirstName_${customer.iD}_ViewRef`] = React.createRef();
        this[`oneFirstName_${customer.iD}_EditRef`] = React.createRef();

        this[`oneLastName_${customer.iD}_ViewRef`] = React.createRef();
        this[`oneLastName_${customer.iD}_EditRef`] = React.createRef();
        
        this[`oneAddress_${customer.iD}_ViewRef`] = React.createRef();
        this[`oneAddress_${customer.iD}_EditRef`] = React.createRef();
        
        this[`onePhone_${customer.iD}_ViewRef`] = React.createRef();
        this[`onePhone_${customer.iD}_EditRef`] = React.createRef();

        const jsxElementView = (
        <table border="1" class="FlightsTableInner" style={{visibility: 'visible', display: 'table'}}  ref={this[`customer_${customer.iD}_VisualReprsentataionViewRef`]} id="_flightTable">
            <tr>
                <td style={{width: '2%'}}>{number}</td>
                <td style={{width: '80',padding: 0, borderSpacing: 0}}>
                    <img ref={this[`oneImage_${customer.iD}_ViewRef`]} style={{display:'block', width: '100%'}} src={customer.Image}   />
                </td>
                <td ref={this[`oneFirstName_${customer.iD}_ViewRef`]} style={{width: '20%'}}>{customer.FirstName}</td>
                <td ref={this[`oneLastName_${customer.iD}_ViewRef`]} style={{width: '20%'}}>{customer.LastName}</td>
                <td ref={this[`oneAddress_${customer.iD}_ViewRef`]} style={{width: '20%'}}>{customer.Address}</td>
                <td ref={this[`onePhone_${customer.iD}_ViewRef`]} style={{width: '20%'}}>{customer.Phone}</td>
            </tr>
            </table>
        )

        const localFunctionStateMap = new  Map();
        localFunctionStateMap.set('Image', customer.Image.replace('data:image/jpeg;base64,', ''));
        localFunctionStateMap.set('FirstName', customer.FirstName);
        localFunctionStateMap.set('LastName', customer.LastName);
        localFunctionStateMap.set('Address', customer.Address);
        localFunctionStateMap.set('Phone', customer.Phone);

        const  jsxElementEdit = (
        <table   class="FlightsTable" style={{visibility: 'hidden', display: 'none'}} ref={this[`customer_${customer.iD}_VisualReprsentataionEditRef`]} id="_flightTable">
            <tr>
            <td style={{width: '20%'}}>{number}</td>
            <td style={{width: '80px'}}>
            <img ref={this[`oneImage_${customer.iD}_EditRef`]} src={customer.Image} width="80"/>
							<label class="custom-file-upload-button">
                            <input type="file" id="Image" accept='image/*' 
                            onChange={(e) => {
                                //next two rows are making the old image opaque 
                                this[`oneImage_${customer.iD}_EditRef`].current.style.opacity = 0.5;
                                this[`oneImage_${customer.iD}_ViewRef`].current.style.opacity = 0.5;

                                const image = e.target.files[0];
                                getBase64(image).then(resBase64image => {
                                    
                                    localFunctionStateMap.set(e.target.id, resBase64image);
                                })
                                .catch(err =>  {

                                    Swal.fire('IMAGE UPLOADING TO DB FAILED!\n' + err);
                                });

                            } }/>
								בחר קובץ
							</label>	
            </td>
            <td style={{width: '20%'}}>
				<input ref={this[`oneFirstName_${customer.iD}_EditRef`]} id="FirstName" type="text" defaultValue={customer.FirstName} onChange={(e) => { 
                        if(localFunctionStateMap.get(e.target.id) !== e.target.value)
                           localFunctionStateMap.set(e.target.id, e.target.value);  
                       }} />
            </td>
            <td style={{width: '20%'}}>
				<input ref={this[`oneLastName_${customer.iD}_EditRef`]} id="LastName" type="text" defaultValue={customer.LastName} onChange={(e) => {   localFunctionStateMap.set(e.target.id, e.target.value);   }} />
            </td>
            <td style={{width: '20%'}}>
				<input ref={this[`oneAddress_${customer.iD}_EditRef`]} id="Address" type="text" defaultValue={customer.Address} onChange={(e) => {   localFunctionStateMap.set(e.target.id, e.target.value);   }} />
            </td>
            <td style={{width: '20%'}}>
				<input ref={this[`onePhone_${customer.iD}_EditRef`]} id="Phone" type="text" defaultValue={customer.Phone} onChange={(e) => {   localFunctionStateMap.set(e.target.id, e.target.value);   }} />
            </td>
            <td style={{width: '20%'}}>
                <button onClick={() => {
                    this[`oneImage_${customer.iD}_EditRef`].current.style.opacity = 0.5;
                    this[`oneImage_${customer.iD}_ViewRef`].current.style.opacity = 0.5;

                    this[`oneFirstName_${customer.iD}_ViewRef`].current.opacity = 0.5;
                    this[`oneFirstName_${customer.iD}_EditRef`].current.disabled = true;
                    this[`oneLastName_${customer.iD}_ViewRef`].current.opacity = 0.5;
                    this[`oneLastName_${customer.iD}_EditRef`].current.disabled = true;
                    this[`oneAddress_${customer.iD}_ViewRef`].current.opacity = 0.5;
                    this[`oneAddress_${customer.iD}_EditRef`].current.disabled = true;
                    this[`onePhone_${customer.iD}_ViewRef`].current.opacity = 0.5;
                    this[`onePhone_${customer.iD}_EditRef`].current.disabled = true;



                    const url = `https://localhost:44361/api/LoggedInAdministratorFacade/UpdateCustomerDetails`;
                    const headers = {
                        'Authorization': `Bearer ${this.state.authToken}`,
                        'Content-Type': 'application/json',
                        'From': 'local'
                    };
                    const data = {
                        'Address': localFunctionStateMap.get('Address'),
                        'FirstName': localFunctionStateMap.get('FirstName'),
                        'LastName': localFunctionStateMap.get('LastName'),
                        'Phone': localFunctionStateMap.get('Phone'),
                        'Image': localFunctionStateMap.get('Image'),
                        'iD': customer.iD
                    };
                    getAjaxResultPost(url, data, headers).then(resUpdatedCustomer => {
                        this[`oneImage_${customer.iD}_EditRef`].current.src = resUpdatedCustomer.data.Image;
                        this[`oneImage_${customer.iD}_ViewRef`].current.src = resUpdatedCustomer.data.Image;
                        
                        this[`oneFirstName_${customer.iD}_ViewRef`].current.innerText = resUpdatedCustomer.data.FirstName;
                        this[`oneFirstName_${customer.iD}_EditRef`].current.value = resUpdatedCustomer.data.FirstName;
                
                        this[`oneLastName_${customer.iD}_ViewRef`].current.innerText = resUpdatedCustomer.data.LastName;
                        this[`oneLastName_${customer.iD}_EditRef`].current.value = resUpdatedCustomer.data.LastName;
                        
                        this[`oneAddress_${customer.iD}_ViewRef`].current.innerText = resUpdatedCustomer.data.Address;
                        this[`oneAddress_${customer.iD}_EditRef`].current.value = resUpdatedCustomer.data.Address;
                        
                        this[`onePhone_${customer.iD}_ViewRef`].current.innerText = resUpdatedCustomer.data.Phone;
                        this[`onePhone_${customer.iD}_EditRef`].current.value = resUpdatedCustomer.data.Phone;

                        this[`oneImage_${customer.iD}_EditRef`].current.style.opacity = 1;
                        this[`oneImage_${customer.iD}_ViewRef`].current.style.opacity = 1;
                        this[`oneFirstName_${customer.iD}_ViewRef`].current.opacity = 1;
                        this[`oneFirstName_${customer.iD}_EditRef`].current.disabled = false;
                        this[`oneLastName_${customer.iD}_ViewRef`].current.opacity = 1;
                        this[`oneLastName_${customer.iD}_EditRef`].current.disabled = false;
                        this[`oneAddress_${customer.iD}_ViewRef`].current.opacity = 1;
                        this[`oneAddress_${customer.iD}_EditRef`].current.disabled = false;
                        this[`onePhone_${customer.iD}_ViewRef`].current.opacity = 1;
                        this[`onePhone_${customer.iD}_EditRef`].current.disabled = false;

                        Swal.fire(JSON.stringify(resUpdatedCustomer.data));
                    })
                    .catch(err => Swal.fire(`Failed to update customer, Error:\n${JSON.stringify(err)}`));

                

                }}>Edit</button>
            </td>
        </tr>
        </table>
        );
        return (
            <div>
                {jsxElementView}
                {jsxElementEdit}
            </div>
        );
    }

    componentDidUpdate() {
        if(this.state.visualisedCustomers.length > 0) {
            this.displayClientsTableRef.current.style = {visibility: 'visible', display: 'table'};
            this.displayWaitingTimeTable.current.style.visibility = 'hidden';
            this.displayWaitingTimeTable.current.style.display = 'none';
            
           
        }


    }

    componentDidMount() {
        getAuthTokenFromStore(this.props.loginJWTtokenState, this.props.loginGoogleTokenState)
        .then(resToken => {
                this.setState({authToken: resToken});

                this.evaluateStateAndCall();
            } )
        .catch(err => Swal.fire(`ERROR! The authorisation token can't be fetched from the store! Caugth error :\n${err}`));


        
    }


    evaluateStateAndCall() {
        let currentToken = this.state.authToken;

        let flagJWTBool = true;
        let flagGoogleBool = true;
        if(this.props.loginJWTtokenState === null || this.props.loginJWTtokenState === undefined || this.props.loginJWTtokenState.length < 150)
            flagJWTBool = false;
        if(this.props.loginGoogleTokenState === null || this.props.loginGoogleTokenState === undefined || this.props.loginGoogleTokenState.length < 150)
            flagGoogleBool = false;

        if(flagJWTBool === false && flagGoogleBool === false) {
            Swal.fire("You don't have any auth token... :(");
            return;
        }
            
        

        ////////////////////////////////////////////////////////////////////////////////////////////
        let waitingTime = 0;
        let settedInterval = setInterval(() =>{
            if(this.props.preloadCustomersIDsState.preloadedCustomersIDs.data !== undefined) {
                clearInterval(settedInterval);
                this.loadAllCustomersOneByOne();
             }
             else {
                this.setState({
                    waitingTime
                });
                if(this.displayWaitingTimeTable.current !== null) {
                    this.displayWaitingTimeTable.current.style.visibility = 'visible';
                    this.displayWaitingTimeTable.current.style.display = 'table';
                }
                      
             }             
             waitingTime++;          
             }, 500);
    }

    checkAuthToken() {
        if(this.state.authToken === null || typeof this.state.authToken !== 'string' || this.state.authToken.length < 150) {
            getAuthTokenFromStore(this.props.loginJWTtokenState, this.props.loginGoogleTokenState)
            .then(resToken => {
                    this.setState({authToken: resToken});
                } )
                .catch(err => {    Swal.fire( `CAN'T FETCH authorisation token, caugh error:\n ${ JSON.stringify(err)}`);    });
        }
    }

    loadAllCustomersOneByOne() {


        const dataArr = this.props.preloadCustomersIDsState.preloadedCustomersIDs.data;
        if(dataArr !== undefined && Array.isArray(dataArr) && dataArr.length > 0) {
            
        }
        else Swal.fire(JSON.stringify(dataArr));

        const custIDsMap = new Map();
        if(dataArr !== undefined) {
        for(let i = 0; i < dataArr.length; i++) {
        //for(let i = 0; i < 15; i++) {

            custIDsMap.set(i, dataArr[i]);
             }
        }

        console.log('In ViewEditCustomers - checking custIDsMap:');
        console.log(custIDsMap);
        console.log(custIDsMap.size);

        this.getAllCustomersOneByOne(custIDsMap.get(0), custIDsMap);
    }

    getOneCustomerByID(id) {
        return new Promise((resolve, reject) => {
            this.checkAuthToken();
            const url=`https://localhost:44361/api/LoggedInCustomerFacade/TakeOneCustomer/${id}`;
            const headers = {
                'Authorization': `Bearer ${this.state.authToken}`,
                'Content-Type': 'application/json',
                'From': 'local'
            };
            getAjaxResultForGet(url, headers)
            .then(resCustomer => {
                    resolve(resCustomer);
                })
            .catch(err => {  
                 displayErrorInSwal(err);
                  //Swal.fire(`Can't fetch customer with ID ${id},\n caugth error: \n ${JSON.stringify(err)}`); 
                // reject(err);
                   });
        });
    }


    //recursive function
    getAllCustomersOneByOne(id, IdsMap) {
        this.getOneCustomerByID(id).then(res => {
            let resCustomer  = res.data;
            let keyOfId = [...IdsMap].find(([key, val]) => val == id)[0];
            if(resCustomer !== undefined && keyOfId < IdsMap.size) {
                this.state.customers.push(resCustomer);
                let lastCust = this.state.customers[this.state.customers.length - 1];
                this.setState({
                    visualisedCustomers: [...this.state.visualisedCustomers, this.customerToJsx(lastCust, keyOfId + 1)]
                });
                console.log(id);
                if(this.state.customers.length === IdsMap.size - 1 || this.state.letsStopLoadingBool === true) {
                    this.setState({    customers: []    });
                    debugger;
                    return;
                }
                this.getAllCustomersOneByOne(IdsMap.get(++keyOfId), IdsMap);
            }
        })
        .catch(err => { 
            this.setState({    customers: []    });
            alert(`In method getAllCustomersOneByOne - getOneCustomerByID did return error:\n${JSON.stringify(err)}`);
        });
    }


    render() {
        return(
            <div>
                <button ref={this.getPreloadedIDsRef} 
                onClick={() => {
                    //this.displayClientsTableRef.current.style = {visibility: 'hidden', display: 'none'};

                    this.loadAllCustomersOneByOne();


                }}>Get ID's</button>

                <button ref={this.stopLoadingButtonRef} onClick={() =>{
                    this.setState({
                        letsStopLoadingBool: true
                    });
                    this.stopLoadingButtonRef.current.innerText="Stopping\xa0\xa0\xa0";
                    let localInterval = setInterval(() => {
                        //this.stopLoadingButtonRef.current.innerText+= ".";
                        let whatReplace = this.stopLoadingButtonRef.current.innerText.substring(this.stopLoadingButtonRef.current.innerText.length - 3, this.stopLoadingButtonRef.current.innerText.length);
                        let replacer = "...";
                        switch(whatReplace) {
                            case "\xa0\xa0\xa0": replacer = ".\xa0\xa0"; break;
                            case ".\xa0\xa0": replacer = "..\xa0"; break;
                            case "..\xa0": replacer = "..."; break;
                            case "...": replacer = "\xa0\xa0\xa0"; break;
                        }
                        let butonText = this.stopLoadingButtonRef.current.innerText.replace(whatReplace, replacer);
                        this.stopLoadingButtonRef.current.innerText = butonText;
                        if(this.state.customers.length === 0) {
                            this.stopLoadingButtonRef.current.innerText = "Stopped";
                            clearInterval(localInterval);  
                        }
                    }, 500);

                    }}>stop Loading</button>
                    <button onClick={() => {
                        for(let s in this.state.customers) {
                            this[`customer_${this.state.customers[s].iD}_VisualReprsentataionViewRef`].current.style.visibility = 'hidden';
                            this[`customer_${this.state.customers[s].iD}_VisualReprsentataionViewRef`].current.style.display = 'none';
    
                            this[`customer_${this.state.customers[s].iD}_VisualReprsentataionEditRef`].current.style.visibility = 'visible';
                            this[`customer_${this.state.customers[s].iD}_VisualReprsentataionEditRef`].current.style.display = 'table';                            
                        }


                    }}>Enable Editing</button>
                <br/>
                <table class="DisplayWaitingTime"  ref={this.displayWaitingTimeTable} style={{visibility: 'hidden', display: 'none'}}>
                    <tr>
                        <td>
                           
                                PleaseWait, {this.state.waitingTime}
                            
                        </td>
                    </tr>
                </table>

                <table border="0" class="FlightsTable" ref={this.displayClientsTableRef} id="display_clients_table" style={{visibility: 'hidden', display: 'none'}}>
                    <thead>
                        <tr>
                            <td>
                                <table  class="FlightsTableInner">
                                        <tr>
                                            <th style={{width: '20%'}}>#</th>
                                            <th style={{width: '80px'}}>&nbsp;{/*   <!-- image in the table body -->    */}</th>
                                            <th style={{width: '20%'}}>First Name</th>
                                            <th style={{width: '20%'}}>Last Name</th>
                                            <th style={{width: '20%'}}>Address</th>
                                            <th style={{width: '20%'}}>Phone</th>
                                            <th>
                                            <div class="editCustomers">&nbsp;</div>
                                            </th>
                                        </tr>
                                </table>
                            </td>
                        </tr>
                    </thead>
                    {/*     <!-- The content of this "tbody" tag is filled by JS script by runtime -->      */}
                    
                    <tbody ref={this.showResultsTableTbody} id="show_results_table_tbody">
                        <tr>
                            <td>
                                {
                                    this.state.visualisedCustomers
                                }
                            </td>
                        </tr>
                    </tbody>
                    
                    

                </table>
                
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
        createSetJWTLoginAction: (payload) => {
            dispatch(createSetJWTLoginAction(payload))
      },
        createsetGoogleLoginAction: (payload) => {
            dispatch(createsetGoogleLoginAction(payload));
      }
    }
  }



export default connect(mapStateToProps, mapDispatchToProps)(ViewEditCustomers);