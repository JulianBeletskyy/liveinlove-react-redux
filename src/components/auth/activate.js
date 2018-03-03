import { Component } from 'react'
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

export default Activate