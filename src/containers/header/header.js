import React, { Component } from 'react'
import { connect } from 'react-redux'
import store, { history } from 'store'
import style from './style.css'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import { toggleModal, logout } from 'actions'
import PublicHeader from 'components/header/public_header.js'
import GirlHeader from 'components/header/girl_header.js'
import ClientHeader from 'components/header/client_header.js'

class Header extends Component {
    constructor(props) {
        super(props)
        
        history.listen((location, action) => {
            const nav = document.getElementById('collapse')
            if (nav.className.indexOf('in') + 1) {
                const el = document.getElementsByClassName("navbar-toggle");
                el[0].click()
            }
        })
    }

    showLogIn = () => {
        store.dispatch(toggleModal(true, 'login'))
    }

    logOut = () => {
        store.dispatch(logout())
    }

    render() {
        const { token, data } = this.props.user
        return (
            <Navbar className="title" fixedTop collapseOnSelect={true} onToggle={this.setNavExpanded}>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">
                            <img alt="Brand" src="/assets/img/logo-dark.svg" className={style.brandImg + " img-responsive"} />
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse id="collapse" className={style.collapse}>
                    {
                        token
                        ? data.role === 'client'
                        ? (<ClientHeader onSelect={this.onSelect} />)
                        : (<GirlHeader />)
                        : (<PublicHeader />)
                    }
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: {
            data: state.user.data,
            token: state.user.token
        }
    }
}

export default connect(
    mapStateToProps
)(Header)