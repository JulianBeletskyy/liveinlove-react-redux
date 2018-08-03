import React, { Component } from 'react'
import store, { history } from 'store'
import { connect } from 'react-redux'
import BtnMain from 'components/form/buttons/main_button.js'
import { removeDraft, removeMessage } from 'actions'

class MailItem extends Component {
    getDate = type => {
        const date = this.props.date.split(' ')
        switch (type) {
            case 'date': return date[0]
            case 'time': return date[1]
        }
    }

    getDescription = (text) => {
        return text && text.length >= 50 ? text.slice(0, 50) + '...' : text
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

    render() {
        let data = {
            fromTo: 'From',
            avatar: this.props.senderr_avatar,
            oponent: this.props.sender_first_name,
            member_id: this.props.sender_id
        }

        if (this.props.type == 'sent') {
            data = {
                fromTo: 'To',
                avatar: this.props.receiver_avatar,
                oponent: this.props.receiver_first_name,
                member_id: this.props.receiver_id
            }
        }

        if (this.props.type == 'drafts') {
            data = {
                fromTo: 'To',
                avatar: this.props.receiver_first_avatar,
                oponent: this.props.receiver_first_name,
                member_id: this.props.receiver_id
            }
        }

        const text = this.props.type === 'inbox' && this.props.user.data.role === 'client' ? this.props.translation : this.props.original
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
                            :   ''
                        }
                            
                        <div className="form-group"><strong>Message: </strong><span dangerouslySetInnerHTML={{__html: this.getDescription(text)}} /></div>
                        <BtnMain
                            type="submit"
                            bsStyle="success"
                            onClick={this.getMessage}
                            text="Read Message" />
                        &nbsp;
                        <BtnMain
                            type="submit"
                            bsStyle="success"
                            onClick={this.props.type === 'drafts' ? this.removeDraft : this.removeMessage}
                            text="Remove message" />
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
                role: state.user.data.role
            }
        }
    }
}

export default connect(
    mapStateToProps
)(MailItem)