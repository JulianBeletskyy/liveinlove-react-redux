import React, { Component } from 'react'
import { Grid, Row, Col, FormGroup } from 'react-bootstrap'

class Services extends Component {
    printServices = (item, i) => {
        return  <div>
                    <FormGroup>
                        <Row>
                            <Col sm={4}>
                                <div className="bg-gray text-center">
                                    <span className="title-service">EASY WAY TO BUILD PERFECT AND CREATIVE WEBSITES</span>
                                </div>
                            </Col>
                            <Col sm={8} xsHidden>
                                <div className="serviceBackground">
                                </div>
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col sm={8} xsHidden>
                                <div className="serviceBackground">

                                </div>
                            </Col>
                            <Col sm={4}>
                                <div className="bg-gray text-center">
                                    <span className="title-service">BEAUTIFULLY HANDCRAFTED TEMPLATES FOR WEBSITES</span>
                                </div>
                            </Col>
                        </Row>
                    </FormGroup>
                </div>
    }

    render() {
        const list = [1, 2, 3]
        return (
            <div className="pt-100">
	            <Grid>
	            	<div className="bg-white p-15">
	            		<h1 className="font-bebas">Services</h1>
                        <hr />
                        { list.map((item, i) => this.printServices(item, i)) }
	                </div>
	            </Grid>
            </div>
        );
    }
}

export default Services