import React, { Component } from 'react'
import { connect } from 'react-redux'
import {  Row, Col } from 'react-bootstrap'
import style from './plans.css'

class Plans extends Component {
    constructor(props) {
        super(props)
        this.user = {}
    }

    render() {
        return (
            <Row>
                <Col sm={4}>
                    <div className={style.table + ' text-center'}>
                        <div className={style.heading}>
                            <h3 className={style.title}>Starter</h3>
                            <h5 className="cust-subhead ult-responsive">Billed annually or $12 month-to-month</h5>
                        </div>
                        <div className={style.priceBlock}>
                            <div className="ult_price_body">
                                <div id="price-table-wrap-8060" className="ult_price">
                                    <span className={style.price}>$10</span>
                                    <span className="ult_price_term ult-responsive">per mounth</span>
                                </div>
                            </div>
                        </div>
                        <div className={style.btnWrap}>
                            <a href="javascript:;" className={style.buttonBottom}>buy now</a>
                        </div>
                    </div>
                </Col>
                <Col sm={4}>
                    <div className={style.table + ' text-center'}>
                        <div className={style.heading}>
                            <h3 className={style.title}>Starter</h3>
                            <h5 className="cust-subhead ult-responsive">Billed annually or $12 month-to-month</h5>
                        </div>
                        <div className={style.priceBlock}>
                            <div className="ult_price_body">
                                <div id="price-table-wrap-8060" className="ult_price">
                                    <span className={style.price}>$10</span>
                                    <span className="ult_price_term ult-responsive">per mounth</span>
                                </div>
                            </div>
                        </div>
                        <div className={style.btnWrap}>
                            <a href="javascript:;" className={style.buttonBottom}>buy now</a>
                        </div>
                    </div>
                </Col>
                <Col sm={4}>
                    <div className={style.table + ' text-center'}>
                        <div className={style.heading}>
                            <h3 className={style.title}>Starter</h3>
                            <h5 className="cust-subhead ult-responsive">Billed annually or $12 month-to-month</h5>
                        </div>
                        <div className={style.priceBlock}>
                            <div className="ult_price_body">
                                <div id="price-table-wrap-8060" className="ult_price">
                                    <span className={style.price}>$10</span>
                                    <span className="ult_price_term ult-responsive">per mounth</span>
                                </div>
                            </div>
                        </div>
                        <div className={style.btnWrap}>
                            <a href="javascript:;" className={style.buttonBottom}>buy now</a>
                        </div>
                    </div>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(
    mapStateToProps
)(Plans);