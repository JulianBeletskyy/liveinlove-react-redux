/* eslint-disable */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import store, { history } from 'store'
import { toggleModal, toggleRegistration } from 'actions'
import { animateScroll as scroll, } from 'react-scroll'
import style from './style.css'
import Options from 'options'

class PublicFooter extends Component {
    goTo = (url) => {
        history.push(url)
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
                                    <li>
                                        <i className="far fa-comments"></i>
                                        <a href="javascript:;">Live Chat</a>
                                    </li>
                                    <li>
                                        <i className="far fa-user"></i>
                                        <a href="javascript:;" onClick={this.membership}>Membership</a>
                                    </li>                            
                                    <li>
                                        <i className="fas fa-shield-alt"></i>
                                        <a href="javascript:;">Online Safety</a>
                                    </li>
                                    <li>
                                        <i className="fas fa-question-circle"></i>
                                        <a href="javascript:;" onClick={() => this.goTo('/how-it-works')}>How it works</a>
                                    </li>
                                </ul>
                            </Col>
                            <Col sm={4}>
                                <ul>
                                    <li>
                                        <i className="fas fa-info-circle"></i>
                                        <a href="javascript:;" onClick={() => this.goTo('/about')}>About Us</a>
                                    </li>
                                    <li>
                                        <i className="fas fa-briefcase"></i>
                                        <a href="javascript:;" onClick={() => this.goTo('/faq')}>FAQ</a>
                                    </li>
                                    <li>
                                        <i className="far fa-heart"></i>
                                        <a href="javascript:;" onClick={() => this.goTo('/success-stories')}>Success Stories</a>
                                    </li>
                                    <li>
                                        <i className="fas fa-globe"></i>
                                        <a href="javascript:;" onClick={() => this.goTo('/blogs')}>Blogs</a>
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
            token: state.user.token
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