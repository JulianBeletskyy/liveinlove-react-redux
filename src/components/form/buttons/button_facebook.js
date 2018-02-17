import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import style from './facebook_button.css'

class BtnFacebook extends Component {
    render() {
        return (
            <Button
                type="button"
                bsClass={style.button}
                onClick={this.props.onClick}
            >
                <i className="fab fa-facebook"></i>
                <span>Upload from Facebook</span>
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