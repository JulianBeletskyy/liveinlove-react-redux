import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from 'store'
import {  Row, Col } from 'react-bootstrap'
import style from './plans.css'
import { getMemberships, openPriceBtn, setPlan, toggleModal } from 'actions'

class PlanItem extends Component {
    constructor(props) {
        super(props)
    }

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
                        <span className={style.price}>${value.month_payment}</span>
                        <span className="ult_price_term ult-responsive"> / {value.month} month</span>
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
        store.dispatch(setPlan(this.props.options, val.id))
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
                        <li>Free letter: <strong>{this.props.options.free_leter}</strong></li>
                        <li>Private Photo: <strong>{this.props.options.private_photo}</strong></li>
                        <li>Upload Photo: <strong>{this.props.options.my_photo}</strong></li>
                        <li>View Photo: <strong>{this.props.options.view_photo}</strong></li>
                        <li>View Video: <strong>{this.props.options.view_video}</strong></li>
                        <li>Likes: <strong>{this.props.options.likes}</strong></li>
                    </ul>
                   <span className="ult_price_term ult-responsive"></span> 
                </div>
                <div className={style.btnWrap} onClick={this.showValues}>
                    <a href="javascript:;" className={style.buttonBottom}>buy now</a>
                </div>
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
        }
    }
}

export default connect(
    mapStateToProps
)(PlanItem)