import React, { Component } from 'react'
import style from './style.css'
import { history } from 'store'

class MessagePreview extends Component {

    goToDialog = () => {
        history.push(this.props.options.id.toString())
    }

    render() {
        const dialog = this.props.options
        const text = 'Then you can customize the text you want your leads to receive. We recommend putting in the link to your booking site and your number and letting them know that they can reply by text as well. This gives the lead 3 ways to engage. On the right side of the page you will see a list of all of your leads. Leads who click the link will have a green check next to their name, while a blue check signifies that they texted a reply.'
        return (
            <div className={style.wrap + ' ' + (this.props.client ? '' : 'girl')} onClick={this.goToDialog}>
                <div className={style.imgWrap}>
                    <img src={dialog.avatar} alt="" />
                </div>
                <div className="font-bebas">
                    <strong>{dialog.first_name + ' ' + dialog.last_name}</strong>
                </div>
                <div>
                    <span className="small-italic"><i>({dialog.last_message.date})</i></span>
                </div>
                <div className={style.textWrap}>
                    <span>{dialog.last_message.message}</span>
                </div>
            </div>
        );
    }
}

export default MessagePreview