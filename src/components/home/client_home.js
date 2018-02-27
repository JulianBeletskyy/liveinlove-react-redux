import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import ClientRightMenu from 'components/menu/client_right_menu.js'
import { Route, Switch } from 'react-router-dom'
import EditProfile from 'components/profile/edit_profile.js'
import AboutMe from 'components/profile/about_me.js'
import PasswordProfile from 'components/profile/password_profile.js'

class ClientHome extends Component {
    render() {
        return (
            <div className="pt-66 bg-blue">
                <Grid>
                    <Row>
                        <Col md={9} className="bg-white">
                            <Switch>
                                <Route path="/profile/info" exact component={AboutMe} />
                                <Route path="/profile/edit" exact component={EditProfile} />
                                <Route path="/profile/password" exact component={PasswordProfile} />
                            </Switch>
                        </Col>

                        <Col md={3}>
                            <ClientRightMenu />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default ClientHome