import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Landing from './landing.js'
import { Girls } from 'containers'

class PublicHome extends Component {
    render() {
        return (
            <div className="pt-100">
                <Switch>
                    <Route path="/" exact component={Landing} />
                    <Route path="/girls" exact component={Girls} />
                </Switch>
            </div>
        );
    }
}

export default PublicHome