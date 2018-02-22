import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { getClientInfo } from 'actions'
import * as pages from './containers'
import store from './store'
import routing from './config/route.js'
import PublicHeader from './components/header/public_header.js'
import PublicFooter from './components/footer/public_footer.js'
import Home from 'containers/home/home.js'
import { Alert } from './components'
import style from './App.css'

class App extends Component {
    constructor(props) {
        super(props)

        if (props.user.token) {
            store.dispatch(getClientInfo(props.user.token))
        }
    }

    printRoutes(route, i) {
        return (<Route key={i} path={route.path} exact component={pages[route.component]} />)
    }
    
    render() {
        const { data, token } = this.props.user
        const key = token ? data.role : 'public'
        const routes = routing[key]
        
        return (
            <div className="App">
                <PublicHeader />
                    <Switch>
                        <Route path="/activate/:activate_hash" exact component={Home} />
                        <Route path="/recovery/:hash" exact component={Home} />
                        {
                            routes.map((route, i) => this.printRoutes(route, i))
                        }
                    </Switch>
                <PublicFooter />
                <Alert />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(
    mapStateToProps
)(App);
