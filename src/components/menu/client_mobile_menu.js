import React, { Component } from 'react'
import { Grid } from 'react-bootstrap'
import style from './right_menu.css'
import store, { history } from 'store'
import { toggleModal } from 'actions'

class ClientMobileMenu extends Component {

    goToSection = (url) => {
        history.push(url)
    }

    showModal = (modal) => {
        store.dispatch(toggleModal(true, modal))
    }

    render() {
        return (
            <div className={style.mobileWrap}>
	            <ul>
                    <li>
                        <a href="javascript:;">
                            <span onClick={() => this.goToSection('/profile/info')}>Profile</span>
                            <i className="fas fa-user"></i>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;">
                            <span onClick={() => this.goToSection('/profile/edit/info')}>Edit</span>
                            <i className="fas fa-cog"></i>
                            
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;">
                            <span onClick={() => this.goToSection('/profile/edit/password')}>Change password</span>
                            <i className="fas fa-unlock-alt"></i>
                        </a>
                    </li>
                    {
                        this.props.client
                        ?   <li>
                                <a href="javascript:;">
                                    <span onClick={() => this.showModal('credits')}>Add Credits</span>
                                    <i className="fas fa-credit-card"></i>
                                </a>
                            </li>
                        : ''
                    }
                    {
                        this.props.client
                        ?   <li>
                                <a href="javascript:;">
                                    <span onClick={() => this.showModal('plans')}>Membership</span>
                                    <i className="fab fa-paypal"></i>
                                </a>
                            </li>
                        : ''
                    }  
                </ul>
            </div>
        );
    }
}

export default ClientMobileMenu