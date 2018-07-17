import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from 'store'
import style from './plans.css'
import { setMembershipsData, setPlan, toggleModal } from 'actions'

class PlanItem extends Component {

    printPrice(value, i) {
        let priceClass = ''
        switch(value.month) {
            case 3: priceClass = style.price_3; break;
            case 6: priceClass = style.price_6; break;
            case 12: priceClass = style.price_12; break;
        }

        if (value.month !== 1) {
            const opacity = value.month_payment ? 1 : 0
            return (<div key={i} className={priceClass + ' ' + style.priceItem} style={{opacity: opacity}}>
                        <span className={style.price}>{value.month_payment ? '$' + value.month_payment : ''}</span>
                        <span className="ult_price_term ult-responsive"> per month</span>
                        <div className="fs-12" style={{opacity: 0.8}}>billed in one payment ${value.one_payment}</div>
                        <div>({value.month} month)</div>
                    </div>)
        }
    }

    showValues = () => {
        store.dispatch(setMembershipsData(this.props.options.id, 'active_btn'))
    }

    hideValues = () => {
        store.dispatch(setMembershipsData(0, 'active_btn'))
    }

    setPlan = (val) => {
        this.props.onChoose(val)
        //store.dispatch(setPlan(this.props.options.id, val.id, this.props.user.token))
        this.hideValues()
        store.dispatch(toggleModal(false, 'plans'))
    }

    printPriceButton(value, i) {
        if (value.month_payment) {
            return (<div key={i} className={style.btnValues}>
                        <a href="javascript:;" onClick={() => { this.setPlan(value) }} className={style.buttonBottom}>${value.month_payment} / {value.month} month {value.month === 1 ? (<div>( Trial )</div>) : ''}</a>
                    </div>)
        }
    }

    render() {
        const { active_btn } = this.props.memberships
        const { id } = this.props.user.data.membership
        const classBtn = active_btn === this.props.options.id ? style.active : ''
        return (
            <div className={style.padding}>
                <div className={style.table + ' text-center'}>
                    <div className={style.heading}>
                        <h3 className={style.title}>{this.props.options.name}</h3>
                    </div>
                    
                    <div className={style.priceBlock}>
                        { this.props.options.values.map((value, i) => this.printPrice(value, i)) }
                    </div>
                    <div>
                        <div className={style.list + ' text-left'}>
                            <div>
                                <div>Send 1st free letter to any girl:<strong>{this.props.options.free_leter}</strong></div>
                                {
                                    this.props.options.name === 'Free'
                                    ? <div>Accept private photos:<strong>{this.props.options.private_photo}</strong></div>
                                    : <div>Accept/send private photos:<strong>{this.props.options.private_photo}</strong></div>
                                }
                                <div>Set photos in your profile:<strong>{this.props.options.my_photo}</strong></div>
                                <div>View photos in profiles:<strong>{this.props.options.view_photo}</strong></div>
                                <div>View videos in profiles:<strong>{this.props.options.view_video}</strong></div>
                                <div>Expression of Interest:<strong>{this.props.options.likes}</strong></div>
                                <div>Discount on ALL services:<strong>{this.props.options.discount}%</strong></div>
                                <div>Share contact details:<strong>{this.props.options.contact_details}</strong></div>
                            </div>
                        </div>
                        <span className="ult_price_term ult-responsive"></span> 
                    </div>
                        {
                            this.props.options.id === id
                            ?   <div className={style.btnWrap}>
                                    <span className={style.btnCurrent}>Current</span>
                                </div>
                            :   
                            this.props.options.name === 'Free'
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