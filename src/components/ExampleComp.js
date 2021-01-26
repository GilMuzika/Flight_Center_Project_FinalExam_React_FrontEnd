import React, { Component } from'react';
import { connect } from 'react-redux';

class ExampleComp extends Component {
    constructor(props) {
        super(props)
        
        this.props.setIconFunc();
    }

    render() {
        return(
            <div>
                <table style={{border: 'solid 1px black'}}>
                    <td>
                        <tr>
                            <center>
                                <hr/>
                            <br/>
                            <br/>
                            {  this.props.loginAnyTokenState   }
                            <br/>
                            <br/>
                                <hr/>
                            </center>
                        </tr>
                    </td>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state) => {

    return { loginAnyTokenState: `${state.loginJWTState}        <br><br>        ${state.loginGoogleState}` }
};

export default connect(mapStateToProps)(ExampleComp);