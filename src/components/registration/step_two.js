import React, { Component } from 'react'
import store from 'store/'
import { connect } from 'react-redux'
import { FormGroup, ControlLabel, FormControl, Button, Row, Col } from 'react-bootstrap'
import Validator from 'validate'
import { changeStep } from 'actions'

class SignUpTwo extends Component {
    constructor(props) {
        super(props)
        this.signup = {
            birth: {},
            match: {}
        }
    }

    getSignUpThree = (event) => {
        event.preventDefault()
        store.dispatch(changeStep(3))
    }

    render() {
        const { step, data } = this.props.signup;
        return (
            <form onSubmit={this.getSignUpThree} noValidate={true}>
                <h1>Upload</h1>
                <FormGroup className="text-center">
                    <Button type="submit" bsStyle="success">Get Confirm</Button>
                </FormGroup>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(
    mapStateToProps
)(SignUpTwo);