import React, { Component } from 'react'
import style from './style.css'

class ContactPreview extends Component {
    render() {
        return (
            <div className={style.wrap + ' ' + (this.props.client ? '' : 'girl')}>
                <div className={style.imgContactWrap}>
                    <img src={this.props.options.avatar} alt="" />
                </div>
                <div>
                    <strong className="font-bebas">{this.props.options.first_name + ' ' + this.props.options.last_name}</strong>
                    <div>
                        <span>{this.props.options.age + ' years'}</span>
                    </div>
                    <div>
                        <span>{this.props.options.country + ', ' + this.props.options.city}</span>
                    </div>
                </div>
                <div></div>
            </div>
        );
    }
}

export default ContactPreview