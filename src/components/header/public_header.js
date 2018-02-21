import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from 'store'
import style from './style.css'
import { Link } from 'react-router-dom'
import { Navbar, NavDropdown } from 'react-bootstrap'
import { toggleModal, logout } from 'actions'

class PublicHeader extends Component {

    showLogIn = () => {
        store.dispatch(toggleModal(true, 'login'))
    }

    logOut = () => {
        store.dispatch(logout())
    }

    render() {
        const { token } = this.props.user
        return (
            <Navbar className={style.navbarDefault + ' title'} fixedTop fluid>
                 <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">
                            <img alt="Brand" src="/assets/img/white-logo.svg"/>
                        </Link>
                    </Navbar.Brand>

                    <Navbar.Toggle />
                 </Navbar.Header>

                <Navbar.Collapse> 
                    <ul className={style.navBar + ' nav navbar-nav navbar-right'} >
                        <NavDropdown role="presentation" eventKey={1} title="About" id="about-nav-dropdown">
                          <Link to="/about">About Agency</Link>
                          <Link to="/how-works">How it works?</Link>
                          <Link to="/testimonials">Testimonials</Link>
                          <Link to="stories">Success stories</Link>
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

                        <li role="presentation">
                            <Link to="/blog">Blog</Link>
                        </li>

                        <NavDropdown 
                            role="presentation"
                            eventKey={2}
                            title="Support" 
                            id="support-nav-dropdown"
                        >
                            <Link to="/send-request">Send Request</Link>
                            <Link to="/faq">FAQ</Link>
                        </NavDropdown>
                        <li>
                        {
                            token
                            ?(<a href="javascript:;" onClick={this.logOut}>Log Out</a>)
                            :(<a href="javascript:;" onClick={this.showLogIn}>Log In</a>)
                        }
                        </li>
                        
                    </ul>
                </Navbar.Collapse> 
            </Navbar>
        );
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(
    mapStateToProps
)(PublicHeader);