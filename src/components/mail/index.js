import React, { Component } from 'react'
import Tabs from 'components/tabs'
import { getDialogs, getContacts, getMail, setActiveTab } from 'actions'
import { connect } from 'react-redux'
import store, { history } from 'store'
import MessagesBlock from './messages_block.js'
import ContactsBlock from './contacts_block.js'
import MessagesList from './messages_list.js'

class Mail extends Component {
    constructor(props) {
        super(props)
        store.dispatch(getContacts(props.user.token))

        switch (props.services.tabs.mail) {
            case 'inbox':
                store.dispatch(getMail('incoming', 'inbox', props.user.token))
                store.dispatch(setActiveTab('inbox', 'mail'))
                break
            case 'sent':
                store.dispatch(getMail('outgoing', 'sent', props.user.token))
                store.dispatch(setActiveTab('sent', 'mail'))
                break
            default: return
        }

        /*if (props.location.state && props.location.state.active) {
            
            //const type = props.location.state === 'sent' ? 'outgoing' : 'incoming'
            //store.dispatch(getMail(type, props.location.state.active, this.props.user.token))
            //store.dispatch(setActiveTab(props.location.state.active, 'mail'))
        } else {
            store.dispatch(getMail('incoming', 'inbox', this.props.user.token))
            store.dispatch(setActiveTab('inbox', 'mail'))
        }*/
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
        },
        services: {
            tabs: {
                mail: state.services.tabs.mail
            }
        }
    }
}

export default connect(
    mapStateToProps
)(Mail)