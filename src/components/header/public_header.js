import React, { Component } from 'react'
import store from 'store'
import style from './style.css'
import { Link } from 'react-router-dom'
import { NavDropdown } from 'react-bootstrap'
import { toggleModal, logout } from 'actions'
import { connect } from 'react-redux'


class PublicHeader extends Component {

    showLogIn = () => {
        store.dispatch(toggleModal(true, 'login'))
    }

    logOut = () => {
        store.dispatch(logout())
    }

    render() {
        const url = this.props.segments.first
        return (
            <ul className={style.navBar + ' nav navbar-nav navbar-right'} >
                <NavDropdown role="presentation" title="About" id="dropdown">
                    <Link to="/about">About Agency</Link>
                    <Link to="/how-works">How it works?</Link>
                    <Link to="/testimonials">Testimonials</Link>
                    <Link to="success-stories">Success stories</Link>
                </NavDropdown>

                <li role="presentation">
                    <Link to="/girls">Girls</Link>
                </li>

                <li role="presentation">
                    <Link to="/services">Services</Link>
                </li>

                <li role="presentation">
                    <Link to="/success-stories">Success Stories</Link>
                </li>

                <li role="presentation" className={url === 'blogs' ? style.active : ''}>
                    <Link to="/blogs">Blogs</Link>
                </li>

                <NavDropdown 
                    role="presentation"
                    eventKey={2}
                    title="Support" 
                    id="support-nav-dropdown">
                    <Link to="/send-request">Send Request</Link>
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