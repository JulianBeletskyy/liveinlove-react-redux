import React, { Component } from 'react'
import { connect } from 'react-redux'
import ContactPreview from './contact_preview.js'

class ContactsBlock extends Component {

    printContacts = (contact , i) => {
        return (<ContactPreview key={i} options={contact} client={this.props.user.data.role === 'client'} />)
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