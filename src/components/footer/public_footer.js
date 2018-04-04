import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import store, { history } from 'store'
import { toggleModal, toggleRegistration } from 'actions'
import { animateScroll as scroll, } from 'react-scroll'
import style from './style.css'

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

    render() {
        return (
            <div className={style.footer} >
                <Grid>
                    <Row className="title">
                        <Col xs={4}>
                            <ul>
                                <li><a href="javascript:;">Live Chat</a></li>
                                <li><a href="javascript:;">Membership</a></li>                            
                                <li><a href="javascript:;">Online Safety</a></li>
                                <li><a href="javascript:;">How it works</a></li>
                            </ul>
                        </Col>
                        <Col xs={4}>
                            <ul>
                                <li><a href="javascript:;" onClick={() => this.goTo('/about')}>About Us</a></li>
                                <li><a href="javascript:;" onClick={() => this.goTo('/faq')}>FAQ</a></li>
                                <li><a href="javascript:;" onClick={() => this.goTo('/success-stories')}>Success Stories</a></li>
                                <li><a href="javascript:;" onClick={() => this.goTo('/blogs')}>Blogs</a></li>
                            </ul>
                        </Col>
                        <Col xs={4}>
                            <ul>
                                <li><a href="javascript:;">iPhone Dating App</a></li>
                                <li><a href="javascript:;">Android Dating App</a></li>
                                <li><a href="javascript:;" onClick={this.showSignUp}>Join Free</a></li>                            
                                <li><a href="javascript:;" onClick={this.showLogin}>Member Login</a></li>
                            </ul>
                        </Col>
                    </Row>
                    <div className={style.bottomFooter}>
                        Copyright &copy; Lifeinlove - All Rights Reserved 2018
                    </div>
                </Grid>
            </div>
        );
    }
}

export default PublicFooter