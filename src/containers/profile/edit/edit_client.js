import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col, Tab, Tabs } from 'react-bootstrap'
import style from './edit_style.css'
import styleProfile from '../style.css'
import EditProfile from 'components/profile/edit_profile.js'

class EditClientProfile extends Component {
    handleSelect = (selectedKey) => {
        console.log(selectedKey);
    }

    getUserInfo = () => {
        return {
            firstName: 'Example',
            middleName: 'mname',
            lastName: 'lastName',
            birthDate: '12.02.1993'
        };
    }
    render() {
        return (
            <div className={styleProfile.wrapper}>
                <div className="shadow">
                    <Grid fluid className="title">
                        <Row>
                            <Col sm={12} md={10} mdOffset={1} className={styleProfile.panel}>
                                <Row>
                                    <Col sm={12} md={4}>
                                        <div className={styleProfile.bigImageHolder}>
                                            <img src="/assets/img/default-avatar.jpg" alt="profile image" />
                                        </div>
                                    </Col>

                                    <Col sm={12} md={8}>
                                        <Tabs defaultActiveKey={1} id="profile-tabs" className={style.navs}>
                                            <Tab eventKey={1} title="Profile">
                                                <EditProfile info={this.getUserInfo()}></EditProfile>
                                            </Tab>

                                            <Tab eventKey={2} title="My Gallery">
                                                Tab 2 content
                                            </Tab>

                                            <Tab eventKey={3} title="Contact Details">
                                                Tab 3 content
                                            </Tab>
                                        </Tabs>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(
    mapStateToProps
)(EditClientProfile);