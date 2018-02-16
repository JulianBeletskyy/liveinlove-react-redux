import React, { Component } from 'react'
import { connect } from 'react-redux'

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