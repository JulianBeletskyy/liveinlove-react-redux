import React, { Component } from 'react'
import { connect } from 'react-redux'
import ContactPreview from './contact_preview.js'
import { history } from 'store'

class ContactsBlock extends Component {

    printContacts = (contact , i) => {
        if (contact.id) {
        return  <ContactPreview 
                    key={i} 
                    {...contact} 
                    client={this.props.user.data.role === 'client'} 
                    onClick={() => this.goToMember(contact.id)} 
                    getMessage={(e) => this.getMessage(e, contact.dialog)} />
        }  
    }

    goToMember = (id) => {
        history.push('/member/'+id)
    }

    getMessage = (e, id) => {
        e.stopPropagation()
        history.push('/mail/'+id)
    }
    
    render() {
        const contacts = this.props.messages.contacts
        return (
            <div>{ contacts.map((contact, i) => this.printContacts(contact, i)) }</div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        members: {
            list: state.members.list
        },
        messages: {
            contacts: state.messages.contacts
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
)(ContactsBlock)