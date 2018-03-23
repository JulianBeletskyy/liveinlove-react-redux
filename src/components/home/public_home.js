import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Registration, MainPanel } from 'components'
import { toggleModal, toggleRegistration, changeStep } from 'actions'
import store from 'store'
import BtnMain from 'components/form/buttons/main_button.js'
import style from './style.css'
import Advantages from './advantages.js'
import { Route, Switch } from 'react-router-dom'
import Landing from './landing.js'
import { Girls } from 'containers'

class PublicHome extends Component {
    render() {
        return (
            <div className="shadow">
                <Switch>
                    <Route path="/" exact component={Landing} />
                    <Route path="/girls" exact component={Girls} />
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        signup: {
            showRegistration: state.signup.showRegistration,
            step: state.signup.step
        }
    } 
}

export default connect(
    mapStateToProps
)(PublicHome)