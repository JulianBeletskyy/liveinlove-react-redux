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
        for (var k in messages) {
            this.container[messages[k].level](messages[k].text, '', { closeButton: true })
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