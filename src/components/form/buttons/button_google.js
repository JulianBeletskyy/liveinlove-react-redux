import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import style from './google_button.css'

class BtnGoogle extends Component {
    render() {
        return (
            <Button
                type="button"
                bsClass={style.button}
                onClick={this.props.onClick}
                id="google" >
                <i className="fab fa-google-plus-square"></i>
                <span>{this.props.title}</span>
            </Button>
        );
    }
}

export default BtnGoogle