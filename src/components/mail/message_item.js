import React, { Component } from 'react'
import style from './style.css'
import { BtnMain } from 'components/form/buttons'
import { showAttach } from 'actions'
import store, { history } from 'store'
import { connect } from 'react-redux'

class MessageItem extends Component {
    showAttach = () => {
        const dialog_id = history.location.pathname.split('/').pop() * 1
        store.dispatch(showAttach(this.props.message.id, this.props.user.token, dialog_id))
    }

    showPhoto = (e) => {
        e.stopPropagation()
        if (this.props.message.attach_confirm === '1') {
            this.props.showPhoto()
        }
    }    

    render() {
        const message = this.props.message
        const user = this.props.user
        const classRight = ! message.my ? 'pull-right' : ''

        let text = message.original

        if (message.original.indexOf('[$link]') + 1) {
            text = text.replace('[$link]', '<a href="/member/'+message.receiver_id+'">'+message.receiver_first_name+'</a>')
        }

        return (
            <div className={style.messageRow + ' ' + 'clearfix'}>
                <div className={style.messageWrap + ' ' + classRight}>
                    <img className={style.avatar} src={message.my ? user.data.avatar.croped : message.receiver_avatar} alt="" />
                    <span className={style.messageTime + " pull-right"}><i>({message.date})</i></span>
                    <br />
                    <div><span className={style.originalMessage}><i><span dangerouslySetInnerHTML={{__html: text}} /></i></span></div>
                    <br />
                    <span><i>{message.translation}</i></span>
                    <div className={style.attachmentWrap}>
                        {
                            message.attach_confirm !== '1' && message.attachment && ! message.my && this.props.user.data.role === 'client'
                            ? <span className={style.attachBtnWrap}>
                                    <BtnMain
                                        type="button"
                                        bsStyle="success"
                                        text="View"
                                        onClick = {this.showAttach} />
                                </span>
                            : ''
                        }
                        <img onClick={this.showPhoto} className="img-responsive" src={message.attachment} alt="" />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: {
            token: state.user.token,
            data: {
                avatar: state.user.data.avatar,
                role: state.user.data.role
            }
        },
        services: {
            gallery: {
                show_light_box: state.services.gallery.show_light_box
            }
        }
    }
}

export default connect(
    mapStateToProps
)(MessageItem)