import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Landing from './landing.js'
import { Girls, SuccessStories } from 'containers'

class PublicHome extends Component {
    render() {
        return (
            <div className="shadow">
                <Switch>
                    <Route path="/" exact component={Landing} />
                    <Route path="/girls" exact component={Girls} />
                    <Route path="/success-stories" exact component={SuccessStories} />
                </Switch>
            </div>
        );
    }
}

export default PublicHome