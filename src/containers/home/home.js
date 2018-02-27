import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PublicHome } from 'components'
import { toggleModal, setRecoveryHash, activateUser } from 'actions'
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

    getHome = (role) => {
        switch (role) {
            case 'client': return <ClientHome />
            case 'girl': return <GirlHome />
            default: return <PublicHome />
        }
    }

    render() {
        const { token, data } = this.props.user
        return (
            <div className={style.homeWrapper}>
                {
                    ! token
                    ? <PublicHome />
                    : this.getHome(data.role)
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: {
            token: state.user.token,
            data: {
                role: state.user.data.role
            }
        }
    }
}

export default connect(
    mapStateToProps
)(Home);