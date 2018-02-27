import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { Route, Switch } from 'react-router-dom'
import GirlRightMenu from 'components/menu/girl_right_menu.js'
import EditProfileGirl from 'components/profile/edit_profile_girl.js'
import AboutMe from 'components/profile/about_me.js'
import PasswordProfile from 'components/profile/password_profile.js'

class GirlHome extends Component {
    render() {
        return (
            <div className="pt-66 bg-blue">
                <Grid>
                    <Row>
                        <Col md={9} className="bg-white">
                            <Switch>
                                <Route path="/profile/info" exact component={AboutMe} />
                                <Route path="/profile/edit" exact component={EditProfileGirl} />
                                <Route path="/profile/password" exact component={PasswordProfile} />
                            </Switch>
                        </Col>

                        <Col md={3}>
                            <GirlRightMenu />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default GirlHome