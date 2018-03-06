import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from 'store'
import style from './plans.css'
import { openPriceBtn, setPlan, toggleModal } from 'actions'

class PlanItem extends Component {

    printPrice(value, i) {
        let priceClass = ''
        switch(value.month) {
            case 3: priceClass = style.price_3; break;
            case 6: priceClass = style.price_6; break;
            case 12: priceClass = style.price_12; break;
        }

        if (value.month !== 1) {
            return (<div key={i}>
                        <div className={priceClass + ' ' + style.priceItem}>
                            <span className={style.price}>{value.month_payment ? '$' + value.month_payment : ''}</span>
                            <span className="ult_price_term ult-responsive">{value.month_payment ? '/ ' + value.month + 'month' : <span>&nbsp;</span>}</span>
                        </div>
                    </div>)
        }
    }

    showValues = () => {
        store.dispatch(openPriceBtn(this.props.options.id))
    }

    hideValues = () => {
        store.dispatch(openPriceBtn(0))
    }

    setPlan = (val) => {
        store.dispatch(setPlan(this.props.options.id, val.id, this.props.user.token))
        this.hideValues()
        store.dispatch(toggleModal(false, 'plans'))
    }

    printPriceButton(value, i) {
        if (value.month !== 1) {
            return (<div key={i} className={style.btnValues}>
                        <a href="javascript:;" onClick={() => { this.setPlan(value) }} className={style.buttonBottom}>${value.month_payment} / {value.month} month</a>
                    </div>)
        }
    }

    render() {
        const { active_btn } = this.props.memberships
        const { id } = this.props.user.data.membership
        const classBtn = active_btn == this.props.options.id ? style.active : ''
        return (
            <div className={style.table + ' text-center'}>
                <div className={style.heading}>
                    <h3 className={style.title}>{this.props.options.name}</h3>
                </div>
                
                <div className={style.priceBlock}>
                    { this.props.options.values.map((value, i) => this.printPrice(value, i)) }
                </div>
                <div>
                    <ul className={style.list + ' text-left'}>
                        <li>Send 1st free letter to any girl: <strong>{this.props.options.free_leter}</strong></li>
                        <li>Accept/send private photos: <strong>{this.props.options.private_photo}</strong></li>
                        <li>Set photos in your profile: <strong>{this.props.options.my_photo}</strong></li>
                        <li>View photos in profiles: <strong>{this.props.options.view_photo}</strong></li>
                        <li>View videos in profiles: <strong>{this.props.options.view_video}</strong></li>
                        <li>Expression of Interest: <strong>{this.props.options.likes}</strong></li>
                    </ul>
                   <span className="ult_price_term ult-responsive"></span> 
                </div>
                    {
                        this.props.options.id == id
                        ?   <div className={style.btnWrap}>
                                <span className={style.btnCurrent}>Current</span>
                            </div>
                        :   
                        this.props.options.name == 'Free'
                        ?   <div className={style.btnWrap}>
                                <span className={style.btnCurrent}>Free</span>
                            </div>
                        :   <div className={style.btnWrap} onClick={this.showValues}>
                                <a href="javascript:;" className={style.buttonBottom}>buy now</a>
                            </div>
                        
                    }
                <div className={style.wrapValues + ' ' + classBtn}>
                    <div className={style.btnValues}>
                        <a onClick={this.hideValues} className={style.buttonBottom}>
                            <i className="fas fa-angle-down"></i>
                        </a>
                    </div>
                    {this.props.options.values.map((value, i) => this.printPriceButton(value, i))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        memberships: {
            plans: state.memberships.plans,
            active_btn: state.memberships.active_btn
        },
        user: {
            data: {
                membership: {
                    id: state.user.data.membership.id
                }
            },
            token: state.user.token
        }
    }
}

export default connect(
    mapStateToProps
)(PlanItem)