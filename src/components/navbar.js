import React from 'react';
import { NavLink } from 'react-router-dom';


const navbar = (elementsNames) => {
const ret_val = [];
    for(let s in elementsNames) {
        ret_val.push(
        <div>&nbsp;<NavLink exact to={`/${elementsNames[s].toLowerCase()}`} activeStyle={{color:'white' }}  >{elementsNames[s]}</NavLink>&nbsp;</div>
        );
        
    }
    /*if(elementsNames === undefined || elementsNames === null)
        return(
            <div>
                 <li><NavLink exact to='/login' activeStyle={{ background: 'yellow',color:'black' }}>-= login =-</NavLink></li>
            </div>
        );*/
    
        return(
            <div>
                {ret_val}
            </div>
        );
}

export default navbar;