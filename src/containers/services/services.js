import React, { Component } from 'react'
import { Grid, Row, Col, FormGroup } from 'react-bootstrap'

class Services extends Component {
    printServices = (item, i) => {
        return  <div key={i}>
                    <FormGroup>
                        <Row>
                            <Col sm={4}>
                                <div className="bg-gray service-wrap-title">
                                    <div className="service-number">0{i+i+1}.</div>
                                    <span className="title-service">EASY WAY TO BUILD PERFECT AND CREATIVE WEBSITES</span>
                                    <div className="content-service color-888">We are a branding, design & digital creative agency. We bring new brands to life & breathe new life into existing ones.</div>
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
                                <div className="bg-gray service-wrap-title">
                                    <div className="service-number">0{i+i+2}.</div>
                                    <span className="title-service">BEAUTIFULLY HANDCRAFTED TEMPLATES FOR WEBSITES</span>
                                    <div className="content-service color-888">We are a branding, design & digital creative agency. We bring new brands to life & breathe new life into existing ones.</div>
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
                        <div className="form-group">
                            <Row>
                                <Col sm={4}>
                                    <div className="service-title-left">
                                        WE CRAFT <span className="underline-text">BEAUTIFUL AND UNIQUE</span> DIGITAL EXPERIENCES
                                    </div>
                                </Col>
                                <Col sm={8} xsHidden>
                                    <div className="service-title-right">
                                        WE’RE FULL SERVICE WHICH MEANS WE’VE GOT YOU COVERED ON DESIGN AND CONTENT RIGHT THROUGH TO DIGITAL. YOU’LL FORM A LASTING RELATIONSHIP WITH US, COLLABORATION IS CENTRAL TO WE DO.
                                    </div>
                                    <div className="color-888">
                                        Vivamus eu neque ut sem malesuada consectetur sed sed felis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae. ullam et eros ornare, porttitor urna sed, auctor lacus. Morbi viverra lorem at neque tincidunt consequat. Aenean massa. Lorem ipsum dolor sit amet, consec tetuer adipis elit, aliquam eget nibh etlibura.
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        { list.map((item, i) => this.printServices(item, i)) }
                        <div className="bottom-service">
                            <div className="text-center service-small-title form-group">OUR SERVICE</div>
                            <div className="bottom-service-title text-center form-group">HIGHLY CREATIVE WEBSITE SOLUTIONS</div>
                            <div className="text-center service-middle-title pv-40">We craft beautiful and unique digital experiences. With more than ten years of knowledge and expertise we design and code clean awesome websites and apps, we build brands and help them succeed!</div>
                            <div className="clearfix black-service">
                                <div className="col-sm-6">
                                    <div className="service-black-wrap">
                                        <div className="service-black-icon">
                                            <i className="far fa-thumbs-up fa-3x"></i>
                                        </div>
                                        <div className="service-black-title">
                                            <span>USER EXPERIENCE</span>
                                            <div className="service-black-content">Mint comes packed with flexible content blocks and Visual Composer – this makes building your perfect layout easier than ever before.</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="service-black-wrap">
                                        <div className="service-black-icon">
                                            <i className="fas fa-tags fa-3x"></i>
                                        </div>
                                        <div className="service-black-title">
                                            <span>WOOCOMMERCE</span>
                                            <div className="service-black-content">Mint comes packed with flexible content blocks and Visual Composer – this makes building your perfect layout easier than ever before.</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="service-black-wrap">
                                        <div className="service-black-icon">
                                            <i className="fas fa-sliders-h fa-3x"></i>
                                        </div>    
                                        <div className="service-black-title">
                                            <span>POWERFUL OPTIONS</span>
                                            <div className="service-black-content">Mint comes packed with flexible content blocks and Visual Composer – this makes building your perfect layout easier than ever before.</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="service-black-wrap">
                                        <div className="service-black-icon">
                                            <i className="far fa-heart fa-3x"></i>
                                        </div>
                                        <div className="service-black-title">
                                            <span>MADE WITH LOVE</span>
                                            <div className="service-black-content">Mint comes packed with flexible content blocks and Visual Composer – this makes building your perfect layout easier than ever before.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
	                </div>
	            </Grid>
            </div>
        );
    }
}

export default Services