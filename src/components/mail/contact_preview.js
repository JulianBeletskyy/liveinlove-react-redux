import React, { Component } from 'react'
import style from './style.css'
import { BtnMain } from 'components/form/buttons'

class ContactPreview extends Component {
    render() {
        return (
            <div className={style.wrap + ' ' + (this.props.client ? '' : 'girl')} onClick={this.props.onClick}>
                <div className={style.imgContactWrap}>
                    <img src={this.props.options.avatar} alt="" />
                </div>
                <div className={style.contactInfo}>
                    <strong className="font-bebas">{this.props.options.first_name + ' ' + this.props.options.last_name}</strong>
                </div>
                <div className={style.sendBtn}>
                    <BtnMain
                        type="button"
                        bsStyle="success"
                        text="Send Message"
                        onClick = {this.props.getMessage} />
                </div>
            </div>
        );
    }
}

export default ContactPreview