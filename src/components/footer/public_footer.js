/* eslint-disable */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import store, { history } from 'store'
import { toggleModal, toggleRegistration } from 'actions'
import { animateScroll as scroll, } from 'react-scroll'
import style from './style.css'
import Options from 'options'
import { Link } from 'react-router-dom'

class PublicFooter extends Component {
    goTo = () => {
        scroll.scrollToTop({duration: 0})
    }

    showLogin = () => {
        store.dispatch(toggleModal(true, 'login'))
    }

    showSignUp = () => {
        store.dispatch(toggleRegistration(true))
        scroll.scrollToTop({duration: 0})
    }

    membership = () => {

        if (this.props.user.token) {
            store.dispatch(toggleModal(true, 'plans'))
        } else {
            Options.getAll()
            store.dispatch(toggleRegistration(true))
            scroll.scrollToTop({duration: 0});
            history.push('/')
        }
    }

    render() {
        return (
            this.props.signup.country !== 'UA' || this.props.user.token
            ?   <div className={style.footer} >
                    <Grid>
                        <Row className="title">
                            <Col sm={4}>
                                <ul>
                                {
                                    this.props.user.token && this.props.user.data.role === 'girl'
                                    ?   ''
                                    :   <li>
                                            <i className="far fa-user"></i>
                                            <Link to="/services" onClick={() => this.goTo()}>Membership</Link>
                                        </li> 
                                }   
                                    <li>
                                        <i className="fas fa-question-circle"></i>
                                        <Link to="/how-it-works" onClick={() => this.goTo()}>How it works</Link>
                                    </li>
                                    <li>
                                        <i className="fas fa-briefcase"></i>
                                        <Link to="/faq" onClick={() => this.goTo()}>FAQ</Link>
                                    </li>
                                </ul>
                            </Col>
                            <Col sm={4}>
                                <ul>
                                    <li>
                                        <i className="fas fa-info-circle"></i>
                                        <Link to="/about" onClick={() => this.goTo()}>About Us</Link>
                                    </li>
                                    <li>
                                        <i className="far fa-heart"></i>
                                        <Link to="/success-stories" onClick={() => this.goTo()}>Success Stories</Link>
                                    </li>
                                    <li>
                                        <i className="fas fa-globe"></i>
                                        <Link to="/blogs" onClick={() => this.goTo()}>Blogs</Link>
                                    </li>
                                </ul>
                            </Col>
                            <Col sm={4}>
                                <ul>
                                    <li>
                                        <i className="fas fa-user-plus"></i>
                                        <a href="javascript:;" onClick={this.showSignUp}>Join Free</a>
                                    </li>                            
                                    <li>
                                        <i className="fas fa-sign-in-alt"></i>
                                        <a href="javascript:;" onClick={this.showLogin}>Member Login</a>
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                        <div className={style.bottomFooter}>
                            Copyright &copy; Lifeinlove - All Rights Reserved 2018
                        </div>
                    </Grid>
                </div>
            :   ''
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: {
            token: state.user.token,
            data: {
                role: state.user.data.role
            }
        },
        modals: {
            plans: state.modals.plans,
            credits: state.modals.credits
        },
        signup: {
            country: state.signup.country
        }
    } 
}

export default connect(
    mapStateToProps
)(PublicFooter)