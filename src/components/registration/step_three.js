import React, { Component } from 'react'
import store from 'store/'
import { connect } from 'react-redux'
import { FormGroup, ControlLabel, FormControl, Button, Row, Col } from 'react-bootstrap'
import Validator from 'validate'

class SignUpThree extends Component {
    constructor(props) {
        super(props)
        this.signup = {
            birth: {},
            match: {}
        }
    }

    confirm = (event) => {
        event.preventDefault()
    }

    render() {
        const { step, data } = this.props.signup;
        return (
            <form onSubmit={this.confirm} noValidate={true}>
                <h1>Confirm Email</h1>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(
    mapStateToProps
)(SignUpThree);