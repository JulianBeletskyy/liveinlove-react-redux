import React, { Component } from 'react'
import store, { history } from 'store'
import { connect } from 'react-redux'
import BtnMain from 'components/form/buttons/main_button.js'
import { removeDraft, removeMessage, removeMessagePermanent, restoreMessage, setActiveTab } from 'actions'

class MailItem extends Component {
    getDate = type => {
        const date = this.props.date.split(' ')
        switch (type) {
            case 'date': return date[0]
            case 'time': return date[1]
        }
    }

    getMessage = () => {
        this.props.type != 'drafts' ? history.push(`/mail/main/${this.props.id}/${this.props.type}`) : history.push(`/mail/main/drafts/${this.props.id}`)
    }

    removeDraft = () => {
        store.dispatch(removeDraft(this.props.id, this.props.user.token))
    }

    removeMessage = () => {
        store.dispatch(removeMessage(this.props.id, this.props.user.token, this.props.type))
    }

    removePermanent = () => {
        store.dispatch(removeMessagePermanent(this.props.id, this.props.user.token, this.props.type))
    }

    isMy = () => {
        return this.props.user.data.id === this.props.sender_id
    }

    restore = () => {
        store.dispatch(restoreMessage(this.props.id, this.props.user.token, this.isMy() ? 'sent' : 'inbox'))
        .then(res => {
            if (res) {
                store.dispatch(setActiveTab(this.isMy() ? 'sent' : 'inbox', 'mail'))
            }
        })
    }

    componentDidMount() {
        const el = document.getElementById(`description-${this.props.id}`)
        const text = el.textContent
        if (text.length >= 50) {
            el.innerHTML = text.slice(0, 50) + '...'
        }
    }

    render() {
        let data = {}

        switch(this.props.type) {
            case 'sent':
                data = {
                    fromTo: 'To',
                    avatar: this.props.receiver_avatar,
                    oponent: this.props.receiver_first_name,
                    member_id: this.props.receiver_id,
                    removeFunc: this.removeMessage,
                    text: this.props.original
                }
                break
            case 'drafts':
                data = {
                    fromTo: 'To',
                    avatar: this.isMy() ? this.props.receiver_avatar : this.props.sender_avatar,
                    oponent: this.isMy() ? this.props.receiver_first_name : this.props.sender_first_name,
                    member_id: this.isMy() ? this.props.receiver_id : this.props.sender_id,
                    removeFunc: this.removeDraft,
                    text: this.props.original
                }
                break
            case 'deleted':
                data = {
                    fromTo: this.isMy() ? 'To' : 'From',
                    avatar: this.isMy() ? this.props.receiver_avatar : this.props.sender_avatar,
                    oponent: this.isMy() ? this.props.receiver_first_name : this.props.sender_first_name,
                    member_id: this.isMy() ? this.props.receiver_id : this.props.sender_id,
                    removeFunc: this.removePermanent,
                    text: this.isMy() ? this.props.original : (this.props.user.data.role === 'client' ? this.props.translation : this.props.original)
                }
                break
            default:
                data = {
                    fromTo: 'From',
                    avatar: this.props.sender_avatar,
                    oponent: this.props.sender_first_name,
                    member_id: this.props.sender_id,
                    removeFunc: this.removeMessage,
                    text: this.props.user.data.role === 'client' ? this.props.translation : this.props.original
                }
                break
        }

        const unreadClass = ! this.props.read && this.props.type === 'inbox' ? 'unread-message' : ''
        
        return (
            <div className="p-15">
                <div className={`row ${unreadClass} ${this.props.user.data.role}`}>
                    <div className="col-sm-2">
                        <img src={data.avatar} alt="" className="img-responsive pointer" onClick={() => history.push('/member/' + data.member_id)} />
                    </div>
                    <div className="col-sm-10">
                        <div><strong>{data.fromTo}: </strong>{data.oponent}</div>
                        {
                            this.props.type != 'drafts'
                            ?   <div>
                                    <div><strong>Date: </strong>{this.getDate('date')}</div>
                                    <div><strong>Time: </strong>{this.getDate('time')}</div>
                                </div>
                            :   null
                        }
                            
                        <div className="form-group">
                            <strong>Message: </strong>
                            <span id={`description-${this.props.id}`} dangerouslySetInnerHTML={{__html: data.text}} />
                        </div>
                        <BtnMain
                            type="submit"
                            bsStyle="success"
                            onClick={this.getMessage}
                            text="Read Message" />
                        &nbsp;
                        <BtnMain
                            type="submit"
                            bsStyle="success"
                            onClick={data.removeFunc}
                            text="Remove message" />
                        &nbsp;
                        {
                            this.props.type === 'deleted'
                            ?   <BtnMain
                                    type="submit"
                                    bsStyle="success"
                                    onClick={this.restore}
                                    text="Restore message" />
                            :   null
                        }  
                    </div>
                </div>
                <hr />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: {
            token: state.user.token,
            data: {
                role: state.user.data.role,
                id: state.user.data.id
            }
        }
    }
}

export default connect(
    mapStateToProps
)(MailItem)