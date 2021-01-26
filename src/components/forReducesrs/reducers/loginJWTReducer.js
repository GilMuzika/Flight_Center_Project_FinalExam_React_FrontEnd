
const loginJWTReducer = (state = 'if you can see this message this means that Jason Web Token isn\'t re ceived from the server', action) => {
    switch(action.type) {
        case 'SET_THE_JWT_TOKEN' : {
            //alert(JSON.stringify(action.payload));
            if(typeof action.payload === 'string' && action.payload.length > 150){

            const returnedState = action.payload;
            return  returnedState;
            }
            else return state;
        }
        default :{     return state;     }
    }
};

export default loginJWTReducer;