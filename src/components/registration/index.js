import React, { Component } from 'react'
import store from 'store/'
import { connect } from 'react-redux'
import { FormGroup, ControlLabel, FormControl, Button, Panel, Grid } from 'react-bootstrap'
import Validator from 'validate'
import SignUpStart from './step_zero.js'
import SignUpOne from './step_one.js'
import SignUpTwo from './step_two.js'
import SignUpThree from './step_three.js'

class Registration extends Component {
    constructor(props) {
        super(props)
    }

    handleSubmit = (event) => {
        event.preventDefault()
    }

    render() {
        const { step, data } = this.props.signup
        let content = <SignUpStart />
        switch (step) {
            case 1: content = <SignUpOne />; break;
            case 2: content = <SignUpTwo />; break;
            case 3: content = <SignUpThree />; break;
            default: content = <SignUpStart />;
        }

        return (
            <div>
                { content }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        signup: {
            step: state.signup.step
        }
    }
}

export default connect(
    mapStateToProps
)(Registration);