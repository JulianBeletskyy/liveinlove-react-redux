import React, { Component } from 'react'
import { Grid, FormGroup, Row, Col } from 'react-bootstrap'
import store, { history } from 'store'
import Options from 'options'
import { animateScroll as scroll } from 'react-scroll'
import { toggleRegistration } from 'actions'
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
    printAccordion = (item, i) => {
        return  <AccordionItem key={i}>
                    <AccordionItemTitle>
                        <p className="u-position-relative">Question {item}?
                            <div className="accordion__arrow" role="presentation"></div>
                        </p>
                    </AccordionItemTitle>
                    <AccordionItemBody>
                        <p>Body content</p>
                    </AccordionItemBody>
                </AccordionItem>
    }

    getSignUp = () => {
        Options.getAll()
        store.dispatch(toggleRegistration(true))
        scroll.scrollToTop({duration: 0});
        history.push('/')
    }

    render() {
        const list = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']
        return (
            <div className="pt-100">
	            <Grid>
	            	<div className="bg-white p-15">
                        <Row>
                            <Col sm={9}>
                                <h1 className="font-bebas">FAQ</h1>
                                <hr />
                                <Accordion>
                                    { list.map((item, i) => this.printAccordion(item, i)) }
                                </Accordion>
                            </Col>
                            <Col sm={3}>
                                <FormGroup className="text-center">
                                    <img className="img-responsive" src="assets/img/offer.png" alt="" />
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