import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import style from './style.css'

class About extends Component {
    render() {
        return (
            <div className="pt-100">
                <Grid>
                    <div className="bg-white p-15">
                        <h1 className="font-bebas">About Company</h1>
                        <hr />
                        <div className="text-center">
                            <h2 className={style.title}>Unique, truly responsive and functional websites that impress!</h2>
                        </div>
                        <div className={style.secondPart}>
                            <Row>
                                <Col xs={4}>
                                    <div>
                                        <span className={style.counts}>672</span>
                                        <div>FINISHED PROJECTS</div>
                                    </div>
                                </Col>
                                <Col xs={4}>
                                    <div>
                                        <span className={style.counts}>561</span>
                                        <div>HAPPY CLIENTS</div>
                                    </div>
                                </Col>
                                <Col xs={4}>
                                    <div>
                                        <span className={style.counts}>278</span>
                                        <div>CUPS OF COFFEE</div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className={style.thirdPart}>
                            <p>Williamsburg cardigan Helvetica Banksy mustache quinoa. Roof party duis pariatur master cleanse, small batch Brooklyn trust fund forage raw denim church-key ennui. Ennui viral pour-over dolore typewriter messenger bag. Laboris farm-to-table Neutra gastropub.</p>
                            <Row>
                                <Col xs={6}>
                                    In the past several years his work has been awarded by the Emmy Awards, the One Show Interactive, the European Design Awards, TheFWA and Awwwards among others. Roof party duis pariatur master cleanse, small batch Brooklyn trust.
                                </Col>
                                <Col xs={6}>
                                    His work has been featured in magazines including .Net Magazine, Communication Arts, Web Designer Mag, WebDesign Index and prestigious design sites like FastCoDesign, CreativeBloq, Computer Arts, TheFwa and Awwwards.
                                </Col>
                            </Row>
                        </div>
                        <div className={style.lastPart}>
                            <hr />
                            <h2 className={style.title}>Contacts</h2>
                            <Row>
                                <Col sm={4}>
                                    <i className="fas fa-map-marker-alt"></i>
                                    &nbsp;
                                    <span>172 14th Street, Office 503, NY</span>
                                </Col>
                                <Col sm={4}>
                                    <i className="fas fa-phone"></i>
                                    &nbsp;
                                    <span>987.654.3210</span>
                                </Col>
                                <Col sm={4}>
                                    <i className="fas fa-envelope"></i>
                                    &nbsp;
                                    <span>lifein.love@gmail.com</span>
                                </Col>
                            </Row>
                        </div>
	                </div>
	            </Grid>
            </div>
        );
    }
}

export default About