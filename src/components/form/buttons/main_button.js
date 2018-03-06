import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import style from './main_button.css'

class BtnMain extends Component {
    render() {
        return (
            <Button
                type={this.props.type}
                bsStyle={this.props.bsStyle}
                bsClass={style.button}
                onClick={this.props.onClick}
                disabled={this.props.disabled}
            >
                <span>{this.props.text}</span>
            </Button>
        );
    }
}

export default BtnMain