import React, { Component } from 'react'
import style from './style.css'
import store, { history } from 'store'
import { setReceiver } from 'actions'

class MessagePreview extends Component {

    goToDialog = () => {
        store.dispatch(setReceiver(this.props.options.receiver_id))
        history.push('/mail/' + this.props.options.id.toString())
    }

    render() {
        const dialog = this.props.options
        
        return (
            <div className={style.wrap + ' ' + (this.props.client ? '' : 'girl')} onClick={this.goToDialog}>
                <div className={style.imgWrap}>
                    <img src={dialog.receiver_avatar} alt="" />
                </div>
                <div className="font-bebas">
                    <strong>{dialog.receiver_first_name + ' ' + dialog.receiver_last_name}</strong>
                </div>
                <div>
                    {<span className="small-italic"><i>({dialog.last_message.date})</i></span>}
                </div>
                <div className={style.textWrap}>
                {
                    dialog.last_message.read
                    ? <span>{dialog.last_message.message}</span>
                    : <strong>{dialog.last_message.message}</strong>
                }
                </div>
                { dialog.unread > 0 ? <span className={style.badge}>{dialog.unread}</span> : '' }
            </div>
        );
    }
}

export default MessagePreview