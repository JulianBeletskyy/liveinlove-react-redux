import React, { Component } from 'react'
import store from 'store'
import { connect } from 'react-redux'
import { NavDropdown } from 'react-bootstrap'
import style from './style.css'
import { Link } from 'react-router-dom'
import { toggleModal, logout, getUnreadMessage } from 'actions'

class GirlHeader extends Component {

    constructor(props) {
        super(props)
        store.dispatch(getUnreadMessage(props.user.token))
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
                    <Link to="/mail/main">Mail
                    {
                        this.props.user.data.unread_message
                        ?   <span className="badge-message">{this.props.user.data.unread_message}</span>
                        :   null
                    }
                    </Link>
                </li>

                <li role="presentation" className={url === 'profile' ? style.active : ''}>
                    <Link to="/profile/info">My profile</Link>
                </li>

                <li role="presentation" className={url === 'men' ? style.active : ''}>
                    <Link to="/men">Men</Link>
                </li>

                <NavDropdown 
                    role="presentation"
                    eventKey={2}
                    title="Contacts" 
                    id="support-nav-dropdown">
                    <Link to="/contacts/favorite">Favorite</Link>
                    <Link to="/contacts/interests">My interests</Link>
                </NavDropdown>

                <li role="presentation" className={url === 'blogs' ? style.active : ''}>
                    <Link to="/blogs">Blog</Link>
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
        segments: state.segments,
        user: {
            token: state.user.token,
            data: {
                unread_message: state.user.data.unread_message
            }
        }
    }
}

export default connect(
    mapStateToProps
)(GirlHeader)