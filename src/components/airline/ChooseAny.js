 /* Explaination of "ChooseAy component"
the callbacks "onChangeFunc" and "selectedChanged" are work in tandem, "selectedChanged" takes the value returned from "onChangeFunc" as a parameter.
This value is one of the items of the array "dataEntries", selected by "onChangeFunc" according to the user selection, and afterwards processes by "selectedChanged".

List of required props values:
selectedChanged: callback. Does the final processing of the option value determined by user selection.

onChangeFunc: callback. Responsible for selecting a particular object from the array "dataEntries" determined by user selection.

createSelectOptionsFunc: callback. Converts the array "dataEntries" to array of "react-select" component option objects.

createSelectedOptionFunc: callback. Converts the default selected option object (of the same structure as "dataEntries" array nodes) to "react-select" component option object.

dataEntries: objects array. Represents the input data of the component, that subsequently converted to an array of
"react-select" option objects by "createSelectOptionsFunc" callback method.

selectedOption: an object of the same structure as "dataEntries" array nodes and actually one of them. Represents the default selected option, subsequently converted to "react-select" option object by "createSelectedOptionFunc" callback method.

reactSelectStyles: styling object, optional.
"reactSelectStyles" object id optional and provides styling for the dropdown "react-select" component.
 */

import React, { Component } from 'react';
import Select from "react-select";
import displayMessageInSwal from '../displayMessageInSwal';

class ChooseAny extends Component {
    state = {
        selectComponentValues: [],
        selectComponentOptions: []
        
    };

    display() {
        let count = 0;
        setInterval(() => {
            if(this.props.dataEntries !== undefined && this.props.dataEntries !== null) {
                const options = this.props.createSelectOptionsFunc(this.props.dataEntries);
                this.setState({selectComponentOptions: options});
            }
            if(this.state.selectComponentOptions !== undefined && this.state.selectComponentOptions !== null && Array.isArray(this.state.selectComponentOptions) && this.state.selectComponentOptions.length > 0) {
                return;
            }
            if(count >= 10) {
                displayMessageInSwal(`More than ${count} attempts to render, "this.props.dataEntries" noe received properly `);
                return;
            }
            count++;
        }, 500);


    }

    componentDidMount() {
        this.display();
    }
    



    makeSelectedOption(selected) {
        return selected === undefined || selected === null ? {value: -1, label: 'default'} : selected;
    }
    
    render() {

        const jsxForSelectComponentAbsenceMessage = "No JSX for <Select /> component, probably props weren't passed to the component (\"ChooseAirlineCompany\"), or \"render()\" function was called before the props had passed";
        const dataEntries = this.props.dataEntries;

        let selectedOption = {value: -1, label: 'default'};
        if(this.props.selectedOption !== undefined && this.props.selectedOption !== null) {
            selectedOption = this.props.createSelectedOptionFunc(this.props.selectedOption);
        }

        let componentJSX  = (<div>
            <small>
                {jsxForSelectComponentAbsenceMessage}
            </small>
        </div>);

        if(this.state.selectComponentOptions !== undefined && this.state.selectComponentOptions !== null && Array.isArray(this.state.selectComponentOptions) && this.state.selectComponentOptions.length > 0) {
                componentJSX  = (
                    <Select 
                    options={this.state.selectComponentOptions}
                    defaultValue={ selectedOption }
                    onChange={
                        (selected) => {
                            this.props.selectedChanged(this.props.onChangeFunc(selected, selectedOption, dataEntries))
                        }
                         }
                         styles={ this.props.reactSelectStyles }
                />
                );
        }


        return(
        <div className="col-sm-6" width="100">

          {     componentJSX   }

        </div>);
    }
}

export default ChooseAny;