import React, { Component } from 'react'
import { connect } from 'react-redux'
import SignUpStart from './step_zero.js'
import SignUpOne from './step_one.js'
import SignUpTwo from './step_two.js'
import SignUpThree from './step_three.js'
import SignUpConfirm from './step_confirm.js'

class Registration extends Component {
    handleSubmit = (event) => {
        event.preventDefault()
    }

    render() {
        const { step } = this.props.signup
        let content = <SignUpStart />
        switch (step) {
            case 1: content = <SignUpOne />; break;
            case 2: content = <SignUpTwo />; break;
            case 3: content = <SignUpThree />; break;
            case 4: content = <SignUpConfirm />; break;
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