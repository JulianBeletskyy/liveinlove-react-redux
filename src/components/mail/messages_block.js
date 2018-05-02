import React, { Component } from 'react'
import { connect } from 'react-redux'
import MessagePreview from './message_preview.js'

class MessagesBlock extends Component {

    printMessages = (message , i) => {
        return (<MessagePreview key={i} options={message} firstname={this.props.user.data.first_name} client={this.props.user.data.role === 'client'} />)
    }
    
    render() {
        const data = this.props.messages.list
        return data.map((message, i) => this.printMessages(message, i))
    }
}

const mapStateToProps = (state) => {
    return {
        messages: {
            list: state.messages.list
        },
        user: {
            data: {
                role: state.user.data.role,
                first_name: state.user.data.first_name
            }
        }
    }
}

export default connect(
    mapStateToProps
)(MessagesBlock)