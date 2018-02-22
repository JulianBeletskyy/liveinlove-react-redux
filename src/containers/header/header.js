import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from 'store'
import style from './style.css'
import { Link } from 'react-router-dom'
import { Navbar, NavDropdown, Grid } from 'react-bootstrap'
import { toggleModal, logout } from 'actions'
import PublicHeader from 'components/header/public_header.js'
import GirlHeader from 'components/header/girl_header.js'
import ClientHeader from 'components/header/client_header.js'

class Header extends Component {

    showLogIn = () => {
        store.dispatch(toggleModal(true, 'login'))
    }

    logOut = () => {
        store.dispatch(logout())
    }

    render() {
        const { token, data } = this.props.user
        return (
            <Navbar className="title" fixedTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">
                            <img alt="Brand" src="/assets/img/logo-dark.svg" className={style.brandImg + " img-responsive"} />
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                {
                    token
                    ? data.role == 'client'
                    ? (<ClientHeader />)
                    : (<GirlHeader />)
                    : (<PublicHeader />)
                }
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
)(Header);