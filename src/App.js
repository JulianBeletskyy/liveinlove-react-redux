import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { setSegment, getUserInfo, getFullInfo, getGallery, closeNav } from 'actions'
import * as pages from './containers'
import store, { history } from './store'
import routing from './config/route.js'
import Header from './containers/header/header.js'
import PublicFooter from './components/footer/public_footer.js'
import Home from 'containers/home/home.js'
import { Alert } from './components'
import style from './App.css'
import { Auth, MainModal, Recovery } from 'components'

class App extends Component {
    constructor(props) {
        super(props)
        history.listen((location, action) => {
            store.dispatch(closeNav())

            let segments = location.pathname.split('/')
            segments.shift()
            let var1, var2, var3
            [var1, var2, var3] = segments
            store.dispatch(setSegment(var1, var2, var3))
        })

        if (props.user.token) {
            store.dispatch(getUserInfo(props.user.token))
            store.dispatch(getFullInfo(props.user.token))
            store.dispatch(getGallery(props.user.token))
        }
    }

    printRoutes(route, i) {
        return (<Route key={i} path={route.path} exact component={pages[route.component]} />)
    }
    
    render() {
        const { data, token } = this.props.user
        const key = token ? data.role : 'public'
        const routes = routing[key]
        const { login, recovery } = this.props.modals
        return (
            <div className="App">
                <Header />
                    <Switch>
                        <Route path="/activate/:activate_hash" exact component={Home} />
                        <Route path="/recovery/:hash" exact component={Home} />
                        {
                            routes.map((route, i) => this.printRoutes(route, i))
                        }
                    </Switch>
                <PublicFooter />
                <MainModal
                    body={<Auth />}
                    title="Log In"
                    show={login}
                    keyModal="login" />
                <MainModal
                    body={<Recovery />}
                    title="Recovery"
                    show={recovery}
                    keyModal="recovery" />
                <Alert />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: {
            data: {
                role: state.user.data.role
            },
            token: state.user.token
        },
        modals: {
            login: state.modals.login,
            recovery: state.modals.recovery
        }
    }
}

export default connect(
    mapStateToProps
)(App);
