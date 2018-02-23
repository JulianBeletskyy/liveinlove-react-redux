import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Auth, MainModal, Recovery, PublicHome } from 'components'
import { toggleModal, setRecoveryHash, activateUser } from 'actions'
import { Grid } from 'react-bootstrap'
import store, { history } from 'store'
import style from './style.css';
import ClientHome from 'components/home/client_home.js';
import GirlHome from 'components/home/girl_home.js';

class Home extends Component {
    constructor(props) {
        super(props)
        if (props.match.params.hash) {
            store.dispatch(toggleModal(true, 'recovery'))
            store.dispatch(setRecoveryHash(props.match.params.hash))
            history.push('/');
        }

        if (props.match.params.activate_hash) {
            store.dispatch(activateUser(props.match.params.activate_hash))
        }
    }

    showModal = () => {
        store.dispatch(toggleModal(true, 'registration'))
    }

    render() {
        
        const { token, data } = this.props.user

        return (
            <div className={style.homeWrapper}>
                {
                    token
                    ? data.role == 'client'
                        ? (<ClientHome />)
                        : (<GirlHome />)
                    : (<PublicHome />)
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(
    mapStateToProps
)(Home);