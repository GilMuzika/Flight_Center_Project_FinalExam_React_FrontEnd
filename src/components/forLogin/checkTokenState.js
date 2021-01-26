
// tokenStateType -> string,  "loginGoogleState" for google token 
// and "loginJWTState" for ordinary JWT token

/*
        checkTokenState(props, 'loginJWTState');
        createSetJWTLoginAction
        checkTokenState(props, 'loginGoogleState');
        createsetGoogleLoginAction

*/
const checkTokenState = (callingComponentProps, tokenStateType, optionalReplacerForComparingPattern1, optionalReplacerForComparingPattern2) => {
    const token = localStorage.getItem(tokenStateType);
    //alert(`In checkTokenState,JWT token is: ${token}`)
    let replacer1 = 'login';
    let replacer2 = 'State';
    if(optionalReplacerForComparingPattern1 !== undefined && optionalReplacerForComparingPattern1 !== null)
        replacer1 = optionalReplacerForComparingPattern1.toLowerCase();
        if(optionalReplacerForComparingPattern2 !== undefined && optionalReplacerForComparingPattern2 !== null)
        replacer2 = optionalReplacerForComparingPattern2.toLowerCase();
    let compiringPattern = tokenStateType.replace(replacer1, '').replace(replacer2, '');
	//if(token !== null && ((typeof token === 'string' && token.length > 150) || typeof token === 'object')) {
    if(token !== null && token !== undefined) {
        console.log('In checkTokenState:');
        for(let s in callingComponentProps) {
            if(s.includes("Action") && s.includes(compiringPattern)) {
                callingComponentProps[s](token);      
            }
            //console.log(`${s}: ${callingComponentProps[s]}`);
            console.log(`${s}:`);
            console.log(callingComponentProps[s]);
        }
		//callingComponentProps.createSetGoogleLoginAction(token);
	}
}

export default checkTokenState;