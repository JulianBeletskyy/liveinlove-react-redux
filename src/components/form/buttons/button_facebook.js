import React, { Component } from 'react'
import { connect } from 'react-redux'
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

const mapStateToProps = (state) => {
    return state
}

export default connect(
    mapStateToProps
)(BtnFacebook);