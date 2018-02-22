import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import { Auth, Registration, MainModal, MainPanel, Recovery, PublicHome } from 'components'
import { toggleModal, setRecoveryHash, activateUser } from 'actions'
import store, { history } from 'store'
import BtnMain from 'components/form/buttons/main_button.js'
import style from './style.css';
import ClientHome from 'components/home/client_home.js';

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
        const { registration, login, recovery } = this.props.modals
        const { token } = this.props.user

        return (
            <div className={style.homeWrapper} >
            {
                token ?
                (<ClientHome />)
                : (<PublicHome />)
            }
                <MainModal
                    body={<Registration />}
                    title="Registration"
                    show={registration}
                    keyModal="registration"
                    size="lg"
                />
                <MainModal
                    body={<Auth />}
                    title="LOg IN"
                    show={login}
                    keyModal="login"
                />
                <MainModal
                    body={<Recovery />}
                    title="Recovery"
                    show={recovery}
                    keyModal="recovery"
                />
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