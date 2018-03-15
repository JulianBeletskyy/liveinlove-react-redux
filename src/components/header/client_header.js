import React, { Component } from 'react'
import store, { history } from 'store'
import { setSegment } from 'actions'
import { connect } from 'react-redux'
import { NavDropdown } from 'react-bootstrap'
import style from './style.css'
import { Link } from 'react-router-dom'
import { toggleModal, logout } from 'actions'

class ClientHeader extends Component {
    constructor(props) {
        super(props)
        const first = history.location.pathname.replace('/', '')
        store.dispatch(setSegment(first))
    }

    showLogIn = () => {
        store.dispatch(toggleModal(true, 'login'))
    }

    logOut = () => {
        store.dispatch(logout())
    }

    render() {
        const url = this.props.segments.first
        return (
           <ul className={style.navBar + " nav navbar-nav navbar-right"}>
                <li role="presentation" className={url === 'mail' ? style.active : ''}>
                    <Link to="/mail/main">Mail</Link>
                </li>

                <li role="presentation" className={url === 'profile' ? style.active : ''}>
                    <Link to="/profile/info">My profile</Link>
                </li>

                <li role="presentation" className={url === 'girls' ? style.active : ''}>
                    <Link to="/girls">Girls</Link>
                </li>

                <NavDropdown 
                    role="presentation"
                    eventKey={2}
                    title="Contacts" 
                    id="support-nav-dropdown">
                    <Link to="/contacts/favorite">Favorite</Link>
                </NavDropdown>

                <li role="presentation" className={url === 'services' ? style.active : ''}>
                    <Link to="/services">Services</Link>
                </li>

                <li role="presentation" className={url === 'blog' ? style.active : ''}>
                    <Link to="/blog">Shop</Link>
                </li>

                <li>
                    <a href="javascript:;" onClick={this.logOut}>Log Out</a>
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
)(ClientHeader)