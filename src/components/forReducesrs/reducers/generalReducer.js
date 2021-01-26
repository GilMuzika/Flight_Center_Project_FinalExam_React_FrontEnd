
const emptyStateMessage = "this this the default state of the general reducer, no entries yet";
let initialState = {
    preloadedCustomersIDs: emptyStateMessage,
    preloadedAirlineCompaniesIDs: emptyStateMessage

};


const generalReducer = (state = initialState, action) => {
    //alert(JSON.stringify(`${state}\n---------------------\n${JSON.stringify(action)}`));
    switch(action.type) {
        case 'PreloadAllCustomersIDs' : {

            //const returnedState = action.payload;
            return  {
                preloadedCustomersIDs: action.payload  
            };
        }
        case 'PRELOAD_AIRLINECOMPANIES_IDS' : {

            //const returnedState = action.payload;
            return  {
                preloadedAirlineCompaniesIDs: action.payload  
            };
        }
        default :{     return state;     }
    }
};

export default generalReducer;