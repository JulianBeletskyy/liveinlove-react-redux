import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import style from './style.css'

class PublicFooter extends Component {
    render() {
        return (
            <div className={style.footer} >
                <Grid>
                    <Row className="title">
                        <Col xs={12}>
                            <span>About Us </span>
                            <span>Live Chat </span>
                            <span>Membership </span>
                            <span>FAQ </span>
                            <span>How it works </span>
                            <span>Blog </span>
                            <span>iPhone Dating App </span>
                            <span>Android Dating App </span>
                            <span>Success Stories </span>
                            <span>Online Safety </span>
                            <span>Member Login </span>
                            <span>Join Free </span>
                        </Col>
                        <Col xs={6}>
                            Copyright &copy; Lifeinlove - All Rights Reserved
                        </Col>

                        <Col xs={6} className="text-right">
                            2018
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default PublicFooter