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
import Terms from 'containers/terms/terms.js'
import { Alert } from './components'
import style from './App.css'
import { Auth, MainModal, Recovery } from 'components'
import Support from 'components/support'
import Services from 'services'

class App extends Component {
    constructor(props) {
        super(props)
        this.deviceId()
        history.listen((location, action) => {
            store.dispatch(closeNav())

            let segments = location.pathname.split('/')
            segments.shift()
            let var1, var2, var3
            [var1, var2, var3] = segments
            store.dispatch(setSegment(var1, var2, var3))
        })

        if (props.user.token) {
            Services.checkAuth()
            store.dispatch(getUserInfo(props.user.token))
            store.dispatch(getFullInfo(props.user.token))
            store.dispatch(getGallery(props.user.token))
        }
    }

    printRoutes(route, i) {
        return (<Route key={i} path={route.path} exact component={pages[route.component]} />)
    }

    chr4() {
        return Math.random().toString(16).slice(-4);
    }

    deviceId() {
        let localStorage = window.localStorage
        let deviceId = localStorage.getItem('deviceId')
        let temp = this.chr4() + this.chr4() + '-' + this.chr4() +'-' + this.chr4() +'-' + this.chr4() + '-' + this.chr4() + this.chr4() + this.chr4()
        if (! deviceId) {
            localStorage.setItem('deviceId', temp)
        }
    }
    
    render() {
        const { data, token } = this.props.user
        const key = token ? data.role : 'public'
        const routes = routing[key]
        const { login, recovery, support } = this.props.modals
        return (
            <Switch>
                <Route path="/terms" exact component={Terms} />
                <Route render={() => {
                    return  <div className="App">
                                <Header />
                                    <Switch>
                                        <Route path="/activate/:activate_hash" exact component={Home} />
                                        <Route path="/recovery/:hash" exact component={Home} />
                                        { routes.map((route, i) => this.printRoutes(route, i)) }
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
                                <MainModal
                                    body={<Support />}
                                    title="Send Request"
                                    show={support}
                                    keyModal="support" />
                                <Alert />
                            </div>
                }} />
            </Switch>
            
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
            recovery: state.modals.recovery,
            support: state.modals.support
        }
    }
}

export default connect(
    mapStateToProps
)(App);
