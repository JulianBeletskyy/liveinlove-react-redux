import React, { Component } from 'react'
import store from 'store'
import { connect } from 'react-redux'

class Dialog extends Component {
    constructor(props) {
        super(props)

        /*if (props.match.params.id) {
            store.dispatch(getDialog(props.match.params.id, props.user.token))
        }*/
    }

    render() {
        return (
            <div>
                <h1>Dialog</h1>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: {
            token: state.user.token
        }
    }
}

export default connect(
    mapStateToProps
)(Dialog)