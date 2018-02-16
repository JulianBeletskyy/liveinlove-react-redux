import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import style from './style.css'
import { Link } from 'react-router-dom'
import Btn from 'components/form/buttons/button.js'

class PublicFooter extends Component {
    render() {
        return (
            <div className={style.footer} >
                <Grid fluid>
                    {/*<Row className={style.borderBottom + ' title'} >
                        <Col md={2} xs={6} className={style.footerCol}> 
                            <div>
                                <Link to="/about">About us</Link>
                            </div>

                            <div>
                                <Link to="/chat">Live Chat</Link>
                            </div>

                            <div>
                                <Link to="/membership">Membership</Link>
                            </div>
                        </Col>

                        <Col md={2} xs={6} className={style.footerCol} > 
                            <div>
                                <Link to="/faq">FAQ</Link>
                            </div>

                            <div>
                                <Link to="/how">How It Works</Link>
                            </div>

                            <div>
                                <Link to="/about">Else</Link>
                            </div>
                        </Col>

                        <Col md={2} xs={6} className={style.footerCol} > 
                            <div>
                                <Link to="/stories">Success Stories</Link>
                            </div>

                            <div>
                                <Link to="/stories">Something</Link>
                            </div>
                        </Col>

                        <Col md={2} xs={6} className={style.footerCol} > 
                            <div>
                                <Link to="/faq">Online Safety</Link>
                            </div>

                            <div>
                                <Link to="/how">Member Login</Link>
                            </div>
                        </Col>

                        <Col md={2} xs={6} className={style.footerCol} > 
                            <div>
                                <Link to="/faq">FAQ</Link>
                            </div>

                            <div>
                                <Link to="/how">How It Works</Link>
                            </div>

                            <div>
                                <Link to="/about">Else</Link>
                            </div>
                        </Col>

                        <Col md={2} xs={6} className={style.footerCol} > 
                            <div>
                                <Link to="/faq">FAQ</Link>
                            </div>

                            <div>
                                <Btn
                                    type="button"
                                    bsStyle="success"
                                    text="Join Free"
                                />
                            </div>
                        </Col>
                    </Row>*/}

                    <Row className="title">
                        <Col sm={12} md={6}>
                            Copyright &copy; Liveinlove - All Rights Reserved
                        </Col>

                        <Col sm={12} md={6} className="text-right">
                            2018
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(
    mapStateToProps
)(PublicFooter);