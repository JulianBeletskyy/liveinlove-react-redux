import React, { Component } from 'react'
import store from 'store/'
import { connect } from 'react-redux'
import { changeStep } from 'actions'
import { FormGroup } from 'react-bootstrap'
import Btn from 'components/form/buttons/button.js'

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

    prevStep = () => {
        store.dispatch(changeStep(1))
    }

    render() {
        return (
            <form onSubmit={this.getSignUpThree} noValidate={true}>
                <h1>Upload</h1>
                <FormGroup className="text-center">
                    <Btn
                        type="button"
                        text="Prev"
                        orientation="left"
                        onClick={this.prevStep}
                    />
                    <Btn
                        type="submit"
                        text="Get Confirm"
                        orientation="right"
                    />
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