import { Component } from 'react'
import { connect } from 'react-redux'
import { activateUser } from 'actions'
import store from 'store'

class Activate extends Component {
	constructor(props) {
		super(props)
		store.dispatch(activateUser(props.match.params.hash))
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