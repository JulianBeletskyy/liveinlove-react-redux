import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PublicHome } from 'components'
import { Loader } from 'containers'
import { toggleModal, setRecoveryHash, activateUser, getOptionsSignUp } from 'actions'
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

        this.getFunc = {
            height: () => {store.dispatch(getOptionsSignUp('height'))},
            weight: () => {store.dispatch(getOptionsSignUp('weight'))},
            eyes: () => {store.dispatch(getOptionsSignUp('eyes'))},
            hair_colors: () => {store.dispatch(getOptionsSignUp('hair_colors'))},
            hair_lengths: () => {store.dispatch(getOptionsSignUp('hair_lengths'))},
            ethnicities: () => {store.dispatch(getOptionsSignUp('ethnicities'))},
            marital_statuses: () => {store.dispatch(getOptionsSignUp('marital_statuses'))},
            countries: () => {store.dispatch(getOptionsSignUp('countries'))},
            interests: () => {store.dispatch(getOptionsSignUp('interests'))},
            religions: () => {store.dispatch(getOptionsSignUp('religions'))},
            want_children: () => {store.dispatch(getOptionsSignUp('want_children'))},
            education: () => {store.dispatch(getOptionsSignUp('education'))},
            smoke: () => {store.dispatch(getOptionsSignUp('smoke'))},
            primary_language: () => {store.dispatch(getOptionsSignUp('primary_language'))},
            language_level: () => {store.dispatch(getOptionsSignUp('language_level'))},
            drink: () => {store.dispatch(getOptionsSignUp('drink'))}
        }
        
        for (let k in this.getFunc) {
            if (! this.props.options[k].length) {
                this.getFunc[k]()
            }
        }
    }

    getHome = (role) => {
        switch (role) {
            case 'client': return <ClientHome />
            case 'girl': return <GirlHome />
            default: return <PublicHome />
        }
    }

    checkData = () => {
        for (let k in this.getFunc) {
            if (! this.props.options[k].length) {
                return false
            }
        }
        return true
    }

    render() {
        const { token, data } = this.props.user
        return (
            <div className={style.homeWrapper}>
                {
                    ! token
                    ? <PublicHome />
                    : this.checkData()
                        ? this.getHome(data.role)
                        : <Loader />
                    
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
        },
        signup: state.signup,
        options: state.options
    }
}

export default connect(
    mapStateToProps
)(Home);