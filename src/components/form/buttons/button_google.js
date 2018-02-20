import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import style from './google_button.css'

class BtnGoogle extends Component {
    render() {
        return (
            <Button
                type="button"
                bsClass={style.button}
                onClick={this.props.onClick}
            >
                <i className="fab fa-google-plus-square"></i>
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
)(BtnGoogle);