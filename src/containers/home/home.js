import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PublicHome } from 'components'
import { Loader } from 'containers'
import { toggleModal, setRecoveryHash, activateUser, getOptions } from 'actions'
import store, { history } from 'store'
import style from './style.css';
import ClientHome from 'components/home/client_home.js';
import GirlHome from 'components/home/girl_home.js';
import Options from 'options'

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
        for (let k in this.props.options) {
            if (! this.props.options[k].length) {
                return false
            }
        }
        return true
    }

    componentDidMount() {
        if (this.props.user.token && ! this.checkData()) {
            Options.getAll()
        }
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
        options: state.options
    }
}

export default connect(
    mapStateToProps
)(Home);