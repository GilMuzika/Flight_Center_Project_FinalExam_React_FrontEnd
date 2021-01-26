let retState_debug_variable = "---------------------------------------------------------------------";


const loginGoogleReducer = (state = 'if you can see this message this means that Google Token isn\'t re ceived from the server', action) => {
    switch(action.type) {
        case 'SET_THE_GOOGLE_TOKEN' : {
            //alert(JSON.stringify(action.payload));
            if(typeof action.payload === 'string'){
            const returnedState = action.payload;
            retState_debug_variable = returnedState;
            return  returnedState;
            }
            else return state;
        }
        default :{     return state;     }
    }
};

export default loginGoogleReducer;