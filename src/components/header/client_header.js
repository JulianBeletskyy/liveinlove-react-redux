/* eslint-disable */
import React, { Component } from 'react'
import store, { history } from 'store'
import { setSegment, setCart } from 'actions'
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
        store.dispatch(setCart(this.getCart()))
    }

    getCart = () => {
        const data = window.localStorage.getItem('cart');
        return JSON.parse(data ? data : '[]');
    }

    goToCart = () => {
        history.push('/shop/cart')
    }

    showLogIn = () => {
        store.dispatch(toggleModal(true, 'login'))
    }

    logOut = () => {
        store.dispatch(logout())
    }

    countCart = () => {
        let count = 0
        for (let prod of this.props.shop.cart) {
            count += prod.count
        }
        return count
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

                <li role="presentation" className={url === 'blogs' ? style.active : ''}>
                    <Link to="/blogs">Blog</Link>
                </li>

                <li role="presentation" className={url === 'shop' ? style.active : ''}>
                    <Link to="/shop">Shop</Link>
                </li>

                <li role="presentation">
                    <a href="javascript:;"onClick={this.goToCart}><i className="fas fa-shopping-cart"></i></a>
                    {this.props.shop.cart.length ? <span className={style.badge}>{this.countCart()}</span> : ''}
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
        shop: {
            cart: state.shop.cart
        }
    }
}

export default connect(
    mapStateToProps
)(ClientHeader)