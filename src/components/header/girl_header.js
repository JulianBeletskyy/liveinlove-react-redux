import React, { Component } from 'react'
import store from 'store'
import style from './style.css'
import { Link } from 'react-router-dom'
import { toggleModal, logout } from 'actions'

class GirlHeader extends Component {

    showLogIn = () => {
        store.dispatch(toggleModal(true, 'login'))
    }

    logOut = () => {
        store.dispatch(logout())
    }

    render() {
        return (
           <ul className={style.navBar + ' nav navbar-nav navbar-right'}>
                <li role="presentation">
                    <Link to="/girls">Mail</Link>
                </li>

                <li role="presentation">
                    <Link to="/profile/info">My profile</Link>
                </li>

                <li role="presentation">
                    <Link to="/success-stories">Girls</Link>
                </li>

                <li role="presentation">
                    <Link to="/blog">Contacts</Link>
                </li>

                <li role="presentation">
                    <Link to="/blog">Services</Link>
                </li>

                <li role="presentation">
                    <Link to="/blog">Shop</Link>
                </li>

                <li>
                    <a href="javascript:;" onClick={this.logOut}>Log Out</a>
                </li>
            </ul>
        );
    }
}

export default GirlHeader