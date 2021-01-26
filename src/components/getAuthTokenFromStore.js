

const getAuthTokenFromStore = (googleToken, JWTtoken) => {

    let token = null;
    return new Promise((resolve, reject) => {
        if(googleToken.length > 150)
            token = googleToken;
        if(JWTtoken.length > 150)
            token = JWTtoken;

        
            
            if(token !== null && token.length > 150)
                resolve(token);
            else 
                reject("If you see this neither Google token and regular JWT token aren't aviliable");
            
            
                //reject("TOKEN NOT AVILIABLE");
    });     
}

export default getAuthTokenFromStore;