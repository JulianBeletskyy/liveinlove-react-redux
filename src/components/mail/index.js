import React, { Component } from 'react'
import Tabs from 'components/tabs'
import { getDialogs } from 'actions'
import { connect } from 'react-redux'
import store from 'store'
import MessagesBlock from './messages_block.js'
import ContactsBlock from './contacts_block.js'

class Mail extends Component {
    constructor(props) {
        super(props)
        store.dispatch(getDialogs(props.user.token))
    }
    
    render() {
        return (
            <div>
                <Tabs 
                    tabs={[
                        {
                            eventKey: 'messages', 
                            title: 'Messages', 
                            content: <MessagesBlock />
                        }, {
                            eventKey: 'contacts', 
                            title: 'Contacts', 
                            content: <ContactsBlock />
                        }
                    ]}
                    activeKey="messages"
                    tabKey="mail" />
                
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
)(Mail)