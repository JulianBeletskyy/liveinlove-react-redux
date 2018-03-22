import React, { Component } from 'react'
import style from './style.css'

class ReceiverInfo extends Component {
    render() {
    	console.log(this.props.receiver)
        return (
            <div>
                Receiver: 
            </div>
        );
    }
}

export default ReceiverInfo