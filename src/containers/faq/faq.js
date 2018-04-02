import React, { Component } from 'react'
import { Grid, FormGroup, Row, Col } from 'react-bootstrap'
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion'
import 'react-accessible-accordion/dist/fancy-example.css';
import 'react-accessible-accordion/dist/minimal-example.css';
import SideBlog from 'components/blogs/side.js'
import { BtnMain } from 'components/form/buttons'

class Faq extends Component {
    render() {
        return (
            <div className="pt-100">
	            <Grid>
	            	<div className="bg-white p-15">
                        <Row>
                            <Col sm={9}>
                                <h1>FAQ</h1>
                                <Accordion>
                                    <AccordionItem>
                                        <AccordionItemTitle>
                                            <p className="u-position-relative">Simple title
                                                <div className="accordion__arrow" role="presentation"></div>
                                            </p>
                                        </AccordionItemTitle>
                                        <AccordionItemBody>
                                            <p>Body content</p>
                                        </AccordionItemBody>
                                    </AccordionItem>

                                    <AccordionItem>
                                        <AccordionItemTitle>
                                            <p className="u-position-relative">Simple title
                                                <div className="accordion__arrow" role="presentation"></div>
                                            </p>
                                        </AccordionItemTitle>
                                        <AccordionItemBody>
                                            <p>Body content</p>
                                        </AccordionItemBody>
                                    </AccordionItem>

                                    <AccordionItem>
                                        <AccordionItemTitle>
                                            <p className="u-position-relative">Simple title
                                                <div className="accordion__arrow" role="presentation"></div>
                                            </p>
                                        </AccordionItemTitle>
                                        <AccordionItemBody>
                                            <p>Body content</p>
                                        </AccordionItemBody>
                                    </AccordionItem>
                                </Accordion>
                            </Col>
                            <Col sm={3}>
                                <FormGroup className="text-center">
                                    <h1>advertisement</h1>
                                </FormGroup>
                                <FormGroup className="text-center">
                                    <BtnMain
                                        type="button"
                                        bsStyle="success"
                                        text="Sign Up"
                                        onClick = {this.getSignUp} />
                                </FormGroup>
                            </Col>
                        </Row>
	                </div>
	            </Grid>
            </div>
        );
    }
}

export default Faq