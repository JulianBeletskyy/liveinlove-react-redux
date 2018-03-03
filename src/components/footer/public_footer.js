import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import style from './style.css'

class PublicFooter extends Component {
    render() {
        return (
            <div className={style.footer} >
                <Grid>
                    <Row className="title">
                        <Col xs={6}>
                            Copyright &copy; Liveinlove - All Rights Reserved
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