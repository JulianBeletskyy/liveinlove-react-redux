import React, { Component } from 'react'
import style from './style.css'

class MessageItem extends Component {

    render() {
        const message = this.props.message
        const user = this.props.user
        const classRight = ! message.my ? 'pull-right' : ''
        
        return (
            <div className={style.messageRow + ' ' + 'clearfix'}>
                <div className={style.messageWrap + ' ' + classRight}>
                    <img className={style.avatar} src={message.my ? user.data.avatar.croped : message.avatar} alt="" />
                    <span className={style.messageTime + " pull-right"}><i>({message.date})</i></span>
                    <br />
                    <div><span className={style.originalMessage}><i>{message.original}</i></span></div>
                    <br />
                    <span><i>{message.translation}</i></span>
                </div>
            </div>
        )
    }
}

export default MessageItem