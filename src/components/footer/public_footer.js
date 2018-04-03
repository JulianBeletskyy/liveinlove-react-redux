import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import style from './style.css'

class PublicFooter extends Component {
    render() {
        return (
            <div className={style.footer} >
                <Grid>
                    <Row className="title">
                        <Col xs={4}>
                            <ul>
                                <li><a href="javascript:;">About Us</a></li>
                                <li><a href="javascript:;">Live Chat</a></li>
                                <li><a href="javascript:;">Membership</a></li>                            
                                <li><a href="javascript:;">Join Free</a></li>
                            </ul>
                        </Col>
                        <Col xs={4}>
                            <ul>
                                <li><a href="javascript:;">FAQ</a></li>
                                <li><a href="javascript:;">How it works</a></li>
                                <li><a href="javascript:;">Blogs</a></li>                            
                                <li><a href="javascript:;">Online Safety</a></li>
                            </ul>
                        </Col>
                        <Col xs={4}>
                            <ul>
                                <li><a href="javascript:;">iPhone Dating App</a></li>
                                <li><a href="javascript:;">Android Dating App</a></li>
                                <li><a href="javascript:;">Success Stories</a></li>                            
                                <li><a href="javascript:;">Member Login</a></li>
                            </ul>
                        </Col>
                    </Row>
                    <div className={style.bottomFooter}>
                        Copyright &copy; Lifeinlove - All Rights Reserved 2018
                    </div>
                </Grid>
            </div>
        );
    }
}

export default PublicFooter