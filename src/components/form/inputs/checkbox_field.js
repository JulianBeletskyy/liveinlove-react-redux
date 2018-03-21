import React, { Component } from 'react'
import { Checkbox } from 'react-bootstrap'

class CheckboxField extends Component {
    render() {
        return (
            <Checkbox 
                inputRef={this.props.inputRef} 
                defaultChecked={this.props.value} >
                <span className="small-italic">{this.props.text}</span>
            </Checkbox>
        );
    }
}

export default CheckboxField