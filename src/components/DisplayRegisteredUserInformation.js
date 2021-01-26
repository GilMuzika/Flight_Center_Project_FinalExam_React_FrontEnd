import React, { Component } from 'react';
import enlargedImage from './enlargedImage';


class DisplayRegisteredUserInformation extends Component {
    constructor() {
        super();

        this.enlargedImageFramingRef = React.createRef();

    }


    render() {

        const tableCellContainingImage = [];
        const userInfoArr = [];
        if(this.props.registeredUserInformation !== undefined && this.props.registeredUserInformation !== null && Object.keys(this.props.registeredUserInformation).length !== 0) {

            userInfoArr.push(
            <td> Greetings, </td>
            );

            

            const regUsIn = this.props.registeredUserInformation;
            for(let s in regUsIn) {
                if(regUsIn[s] !== undefined && regUsIn[s] !== null && s !== 'USER_NAME' && s !== 'PASSWORD') {
                    if(s !== 'Image') {
                        userInfoArr.push(
                        <td id={s}>{ regUsIn[s] }</td>
                        );
                    }
                    else{
                        let localImage   = new Image();
                        localImage.src = regUsIn[s];

                        let isClickedBool  = false;


                        tableCellContainingImage.push(
   
                                <td id={s}> 
                                    <img src={regUsIn[s]}  width="100" onMouseOver={(e)=>{
                                        this.enlargedImageFramingRef.current.style.left = `${e.clientX + 100}px`;
                                        this.enlargedImageFramingRef.current.style.top = `${e.clientY - 100}px`;                                      
                                        this.enlargedImageFramingRef.current.style.display = 'block';

                                        }
                                        }/>  
                                </td>

                            );
                                tableCellContainingImage.push(

                                <td id={s}

                                 ref={this.enlargedImageFramingRef} style={{display: 'none', border: 'solid 3px green', position: 'absolute', width: localImage.width, height: localImage.height}}>

                                        <div onClick={() => {    this.enlargedImageFramingRef.current.style.display = 'none';   }} 
                                            style={
                                                {font: 'Times new Roman', position: 'absolute', width: 10, height: 3, textAlign: 'center', verticalAlign: 'middle', top: 0, left: localImage.width - 10, cursor: 'pointer'}
                                                }>
                                            <div style={{backgroundColor: 'black'}}>
                                            x
                                            </div>
                                        </div>
                                    <img
                                    onMouseDown={() => { isClickedBool = true;}}
                                    onMouseUp={() => { isClickedBool = false; }}
                                    onMouseOver={(e) => {
                                     if(isClickedBool) {
                                        this.enlargedImageFramingRef.current.style.left = `${e.clientX}px`;
                                        this.enlargedImageFramingRef.current.style.top = `${e.clientY}px`;
                                     }
                                }}                                    
                                    src={regUsIn[s]}/>    
                                </td>

                                );

                    }



                        

                    

                }

            }
        }

        return(
            <table border="0" style={{padding : 2}}>
                <tr>
                { userInfoArr }
                { tableCellContainingImage }
                </tr>
            </table>
        );
    }

}

export default  DisplayRegisteredUserInformation;


