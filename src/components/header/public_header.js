import React, { Component } from 'react'
import store, { history } from 'store'
import style from './style.css'
import { Link } from 'react-router-dom'
import { NavDropdown } from 'react-bootstrap'
import { toggleModal, logout } from 'actions'
import { connect } from 'react-redux'
import { Link as SmoothLink, animateScroll as scroll, } from 'react-scroll'


class PublicHeader extends Component {

    showLogIn = () => {
        store.dispatch(toggleModal(true, 'login'))
    }

    showSupport = () => {
        store.dispatch(toggleModal(true, 'support'))
    }

    logOut = () => {
        store.dispatch(logout())
    }

    goToHiw = () => {
       history.push('/')
       scroll.scrollTo(3310)
    }

    render() {
        const url = this.props.segments.first
        return (
            <ul className={style.navBar + ' nav navbar-nav navbar-right'} >
                <NavDropdown role="presentation" title="About" id="dropdown">
                    <Link to="/about">About Agency</Link>
                    <Link to="/how-it-works">How it works?</Link>
                    <Link to="/testimonials">Testimonials</Link>
                    <Link to="success-stories">Success stories</Link>
                </NavDropdown>

                <li role="presentation" className={url === 'girls' ? style.active : ''}>
                    <Link to="/girls">Girls</Link>
                </li>

                <li role="presentation" className={url === 'services' ? style.active : ''}>
                    <Link to="/services">Services</Link>
                </li>

                <li role="presentation" className={url === 'success-stories' ? style.active : ''}>
                    <Link to="/success-stories">Success Stories</Link>
                </li>

                <li role="presentation" className={url === 'blogs' ? style.active : ''}>
                    <Link to="/blogs">Blog</Link>
                </li>

                <li role="presentation" className={url === 'how-it-works' ? style.active : ''}>
                    <Link to="/how-it-works">How it works?</Link>
                </li>

                <NavDropdown 
                    role="presentation"
                    eventKey={2}
                    title="Support" 
                    id="support-nav-dropdown">
                    <a href="javascript:;" onClick={this.showSupport}>Send Request</a>
                    <Link to="/faq">FAQ</Link>
                </NavDropdown>
                <li>
                    <a href="javascript:;" onClick={this.showLogIn}>Log In</a>
                </li>
            </ul>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        segments: state.segments
    }
}

export default connect(
    mapStateToProps
)(PublicHeader)