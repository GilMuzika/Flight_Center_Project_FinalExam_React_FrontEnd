import React, { Component } from'react';
import { BrowserRouter, Route } from 'react-router-dom';

class Routes extends Component {
    constructor(props) {
        super(props)
        console.log('In Routes:');
        const navigationComponentsNames = [...this.state.navigationComponentsActual.keys()];

        console.log(navigationComponentsNames);

		for(let s in navigationComponentsNames) {
			this.state.navigationRoutesArr.push(
				<Route exact path={`/${navigationComponentsNames[s].toLowerCase()}`} component={ this.state.navigationComponentsActual.get(navigationComponentsNames[s]) } />
            );
		}
    }
    

    state = {
        navigationComponentsActual: this.props.navigationComponentsActual,
        navigationRoutesArr: []
    }





    render() {


        return(
        <div>{this.state.navigationRoutesArr}</div>
        );
    }



}

export default Routes;