import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from 'store'
import { ToastContainer } from "react-toastr"
import { removeAlert } from 'actions'

class Alert extends Component {
    constructor(props) {
        super(props)
        this.container = false
    }

    componentWillReceiveProps(nextProps) {
        const { messages } = this.props.alerts
        if (nextProps.alerts.messages.length !== messages.length) {
            this.showMessages(messages)
        }
    }

    showMessages = (messages) => {
        for (let message of messages) {
            this.container[message.level](message.text, '', { closeButton: true, timeOut: message.timeout })
        }
        store.dispatch(removeAlert())
    }

    render() {
        return (
            <ToastContainer
                ref={ref => this.container = ref}
                className="toast-bottom-right"
            />
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        alerts: {
            messages: state.alerts.messages
        }   
    }
}

export default connect(
    mapStateToProps
)(Alert);