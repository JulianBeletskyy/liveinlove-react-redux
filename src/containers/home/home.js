import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PublicHome } from 'components'
import { Loader } from 'containers'
import { toggleModal, setRecoveryHash, activateUser, getOptions } from 'actions'
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
            height: () => {store.dispatch(getOptions('height'))},
            weight: () => {store.dispatch(getOptions('weight'))},
            eyes: () => {store.dispatch(getOptions('eyes'))},
            hair_colors: () => {store.dispatch(getOptions('hair_colors'))},
            hair_lengths: () => {store.dispatch(getOptions('hair_lengths'))},
            ethnicities: () => {store.dispatch(getOptions('ethnicities'))},
            marital_statuses: () => {store.dispatch(getOptions('marital_statuses'))},
            countries: () => {store.dispatch(getOptions('countries'))},
            interests: () => {store.dispatch(getOptions('interests'))},
            religions: () => {store.dispatch(getOptions('religions'))},
            want_children: () => {store.dispatch(getOptions('want_children'))},
            education: () => {store.dispatch(getOptions('education'))},
            smoke: () => {store.dispatch(getOptions('smoke'))},
            primary_language: () => {store.dispatch(getOptions('primary_language'))},
            language_level: () => {store.dispatch(getOptions('language_level'))},
            drink: () => {store.dispatch(getOptions('drink'))}
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