import React, { Component } from 'react'
import style from './style.css'

class MessagePreview extends Component {
    render() {
        const text = 'Then you can customize the text you want your leads to receive. We recommend putting in the link to your booking site and your number and letting them know that they can reply by text as well. This gives the lead 3 ways to engage. On the right side of the page you will see a list of all of your leads. Leads who click the link will have a green check next to their name, while a blue check signifies that they texted a reply.'
        return (
            <div className={style.wrap + ' ' + (this.props.client ? '' : 'girl')}>
                <div className={style.imgWrap}>
                    <img src="/assets/img/default-avatar.jpg" alt="" />
                </div>
                <div className="font-bebas">
                    <strong>SOFIA ROSBERG</strong>
                </div>
                <div>
                    <span className="small-italic"><i>(23:15 2018-12-15)</i></span>
                </div>
                <div className={style.textWrap}>
                    <span>{text}</span>
                </div>
            </div>
        );
    }
}

export default MessagePreview