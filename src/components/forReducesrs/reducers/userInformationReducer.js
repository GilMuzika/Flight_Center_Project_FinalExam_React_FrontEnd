let retState_debug_variable = "---------------------------------------------------------------------";

const userInformationReducer = (state = 'if you can see this message this means that user information didn\'t passsed to the reducer and eventually to session', action) => {
    switch(action.type) {
        case 'SET_USER_INFORMATION' : {
            //alert(JSON.stringify(action.payload));
            let t  = typeof action.payload;
            let userInfoStringified = JSON.stringify(action.payload);
            //if(typeof action.payload === 'object' || typeof JSON.parse(action.payload) === 'object'){
            if(typeof action.payload === 'string' || typeof JSON.parse(userInfoStringified) === 'object'){
            const returnedState = action.payload;
            retState_debug_variable = returnedState;
            return  returnedState;
            }
            if(typeof action.payload === 'number') {
                return 'this is userInformationState after logging out';
            }
            else return state;
        }
        default :{     return state;     }
    }
};

export default userInformationReducer;