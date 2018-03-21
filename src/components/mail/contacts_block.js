import React, { Component } from 'react'
import { connect } from 'react-redux'
import ContactPreview from './contact_preview.js'

class ContactsBlock extends Component {

    printContacts = (contact , i) => {
        return (<ContactPreview key={i} options={contact} client={this.props.user.data.role === 'client'} onClick={() => this.goToMember(contact.id)} getMessage={(e) => this.getMessage(e, contact.id)} />)
    }

    goToMember = (id) => {
        console.log(id)
    }

    getMessage = (e, id) => {
        e.stopPropagation()
        console.log(e)
        console.log(id)
    }
    
    render() {
        const data = this.props.members.list
        return (
            <div>
                { data.map((contact, i) => this.printContacts(contact, i)) }
            </div>
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