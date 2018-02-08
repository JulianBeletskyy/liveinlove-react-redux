import React, { Component } from 'react'
import { Route } from 'react-router'
import { connect } from 'react-redux'
import { Public, Clients, Girls } from './containers'
import store from './store'

class App extends Component {

    render() {
        const { user } = store.getState()
        return (
            <div className="App">
                { user.token ? (
                    <div>
                        <Route exact path="/" component={Clients} />
                        <Route exact path="girls" component={Girls} />
                    </div>
                 ) : (
                    <Route exact path="/" component={Public} />
                 )}
                
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
