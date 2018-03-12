import React, { Component } from 'react'
import { connect } from 'react-redux'
import MessagePreview from './message_preview.js'

class MessagesBlock extends Component {

    printMessages = (message , i) => {
        return (<MessagePreview key={i} options={message} client={this.props.user.data.role === 'client'} />)
    }
    
    render() {
        const data = this.props.messages.list
        return (
            <div>
                { data.map((message, i) => this.printMessages(message, i)) }
                
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        messages: {
            list: state.messages.list
        },
        user: {
            data: {
                role: state.user.data.role
            }
        }
    }
}

export default connect(
    mapStateToProps
)(MessagesBlock)