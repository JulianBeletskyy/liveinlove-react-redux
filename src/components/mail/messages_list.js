import React, { Component } from 'react'
import { connect } from 'react-redux'
import MailItem from './mail_item.js'

class MessagesList extends Component {
    
    printMessages = (item, i) => <MailItem type={this.props.type} key={i} {...item} />

    render() {
        const list = this.props.messages[this.props.type]
        return list.filter(item => {
            if (item.remove_for_user && this.props.type !== 'deleted') {
                return ! item.remove_for_user.split(',').includes(this.props.user.data.id.toString())
            }
            return true
            
        }).map((item, i) => this.printMessages(item, i))
    }
}

const mapStateToProps = state => {
    return {
        messages: {
            inbox: state.messages.inbox,
            sent: state.messages.sent,
            drafts: state.messages.drafts,
            deleted: state.messages.deleted
        },
        user: {
            data: {
                id: state.user.data.id
            }
        }
    }
}

export default connect(
    mapStateToProps
)(MessagesList)