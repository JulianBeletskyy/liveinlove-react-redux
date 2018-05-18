import React, { Component } from 'react'
import { connect } from 'react-redux'
import MailItem from './mail_item.js'

class MessagesList extends Component {
    
    printMessages = (item, i) => <MailItem type={this.props.type} key={i} {...item} />

    render() {
        const list = this.props.messages[this.props.type]
        return list.map((item, i) => this.printMessages(item, i))
    }
}

const mapStateToProps = state => {
    return {
        messages: {
            inbox: state.messages.inbox,
            sent: state.messages.sent,
            drafts: state.messages.drafts
        }
    }
}

export default connect(
    mapStateToProps
)(MessagesList)