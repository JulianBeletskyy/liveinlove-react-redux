import React, { Component } from 'react'
import Tabs from 'components/tabs'
import { getDialogs, getContacts, getMail, setActiveTab } from 'actions'
import { connect } from 'react-redux'
import store from 'store'
import MessagesBlock from './messages_block.js'
import ContactsBlock from './contacts_block.js'
import MessagesList from './messages_list.js'

class Mail extends Component {
    constructor(props) {
        super(props)
        
        store.dispatch(getContacts(props.user.token))
        console.log(props.location.state)
        if (props.location.state) {
            store.dispatch(getMail('outgoing', props.location.state.active, this.props.user.token))
            store.dispatch(setActiveTab('sent', 'mail'))
        } else {
            store.dispatch(getMail('incoming', 'inbox', this.props.user.token))
        }
    }
    
    render() {
        return (
            <Tabs 
                tabs={[
                    {
                        eventKey: 'inbox', 
                        title: 'Inbox',
                        data: 'inbox',
                        content: <MessagesList type="inbox" />
                    }, {
                        eventKey: 'sent', 
                        title: 'Sent Mail', 
                        content: <MessagesList type="sent" />
                    }, {
                        eventKey: 'drafts', 
                        title: 'Drafts', 
                        content: <MessagesList type="drafts" />
                    }, {
                        eventKey: 'contacts', 
                        title: 'Contacts', 
                        content: <ContactsBlock />
                    }
                ]}
                activeKey="inbox"
                tabKey="mail" />
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
)(Mail)