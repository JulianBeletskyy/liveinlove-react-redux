import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { Grid, Row, Col, FormGroup } from 'react-bootstrap'
import style from './style.css'
import AboutMe from 'components/profile/about_me.js'
import BtnMain from 'components/form/buttons/main_button.js'
import EditProfile from 'components/profile/edit_profile.js'
import PasswordProfile from 'components/profile/password_profile.js'
import { NotFound } from 'containers'


class ClientProfile extends Component {
    render() {
        const { data } = this.props.user
        return (
            <div className="bg-blue pt-66">
                <Grid className="bg-white">
                    <Switch>
                        <Route path="/profile/info" exact component={AboutMe} />
                        <Route path="/profile/edit" exact component={EditProfile} />
                        <Route path="/profile/password" exact component={PasswordProfile} />
                        <Route path="*" component={ NotFound } />
                    </Switch>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(
    mapStateToProps
)(ClientProfile);