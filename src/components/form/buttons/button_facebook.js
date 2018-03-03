import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import style from './facebook_button.css'

class BtnFacebook extends Component {
    render() {
        return (
            <Button
                type="button"
                bsClass={style.button + ' btn'}
                onClick={this.props.onClick}
            >
                <i className="fab fa-facebook"></i>
                <span>{this.props.title}</span>
            </Button>
        );
    }
}

export default BtnFacebook