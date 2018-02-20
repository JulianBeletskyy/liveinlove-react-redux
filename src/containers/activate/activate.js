import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid } from 'react-bootstrap'
import { activateUser } from 'actions'
import store from 'store'

class Activate extends Component {
	constructor(props) {
		super(props)
		store.dispatch(activateUser(props.match.params.hash)).then(response => {
            console.log(response)
        })
    }

    render() {
        return (
           ''
        );
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(
    mapStateToProps
)(Activate);