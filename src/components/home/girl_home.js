import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { Route, Switch } from 'react-router-dom'
import GirlRightMenu from 'components/menu/girl_right_menu.js'
import InfoProfile from 'components/profile/info.js'
import Edit from 'components/profile/edit.js'
import MainPofile from 'components/profile/main.js'
import { Contacts } from 'containers'

class GirlHome extends Component {
    componentDidUpdate() {
        let el = document.getElementById('profile')
        el.classList.remove('fadeIn', 'animated')
    }
    
    render() {
        return (
            <div className="pt-66 bg-blue">
                <Grid id="profile" className="fadeIn animated">
                    <Row>
                        <Col md={9} className="bg-white">
                            <Switch>
                                <Route path="/" exact component={MainPofile} />
                                <Route path="/contacts/:tab" exact component={Contacts} />
                                <Route path="/profile/edit/:tab" exact component={Edit} />
                                <Route path="/profile/:tab" exact component={InfoProfile} />
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