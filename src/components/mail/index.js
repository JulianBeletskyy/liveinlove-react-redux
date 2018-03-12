import React, { Component } from 'react'
import Tabs from 'components/tabs'
import MessagesBlock from './messages_block.js'

class Mail extends Component {
    
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
                            content: <div>Contacts</div>
                        }
                    ]}
                    activeKey="messages"
                    tabKey="mail" />
                
            </div>
        );
    }
}

export default Mail