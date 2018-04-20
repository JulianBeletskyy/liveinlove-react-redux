import React, { Component } from 'react'
import { Grid, Row, Col, FormGroup } from 'react-bootstrap'
import { connect } from 'react-redux'
import TestimonialBig from 'components/home/testimonial_big.js'
import store, { history } from 'store'
import Options from 'options'
import { animateScroll as scroll } from 'react-scroll'
import { toggleRegistration } from 'actions'
import { BtnMain } from 'components/form/buttons'
import Pagination from 'components/blogs/pagination.js'
import { MainModal } from 'components'
import { toggleModal, getPublicMembers } from 'actions'
import MemberBlockSmall from 'components/members/member_block_small.js'

class Testimonials extends Component {
    constructor(props) {
        super(props)
        store.dispatch(getPublicMembers('popular'))
        this.state = {
            last_page: 2,
            current_page: 1
        }
    }

    printTestimonials = (item, i) => {
        return  <Col sm={12} key={i}>
                    <TestimonialBig onClick={this.showTestimonials} {...item} />
                </Col>
    }

    showTestimonials = () => {
        store.dispatch(toggleModal(true, 'testimonials'))
    }

    getSignUp = () => {
        Options.getAll()
        store.dispatch(toggleRegistration(true))
        scroll.scrollToTop({duration: 0})
        history.push('/')
    }

    changePage = (e) => {
        this.setState({current_page: e.target.id * 1})
    }

    render() {
        const list = this.props.services.testimonials
        return (
        	<div className="pt-100">
                <Grid>
                    <div className="bg-white p-15">
                        <Row>
                            <Col sm={9}>
                                <h1 className="font-bebas">Testimonials</h1>
                                <p className="text-justify">Another concept car that caught attention in Frankfurt was the Mercedes Intelligent Aerodynamic Automobile. A one-off showcase of the brand’s aerodynamic prowess, it boasts a drag coefficient of just 0.19. To accomplish this unprecedented level of slipperiness, Mercedes has developed a dynamic, adaptable body structure that literally changes shape with the push of a button.</p>
                                <hr />
                                <Row>
                                    { list.list[this.state.current_page - 1].list.map((item, i) => this.printTestimonials(item, i)) }
                                </Row>
                                <Pagination {...this.state} onClick={this.changePage} />
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
                                <hr />
                                <MemberBlockSmall {...this.props.members.public.active} onClickItem={this.getSignUp} />
                            </Col>
                        </Row>
	                </div>
	            </Grid>
                <MainModal
                    body={  
                        <div>
                            <img src="http://mint.themes.tvda.pw/wp-content/uploads/2016/11/profile04.jpg" className="img-responsive" alt="" />
                        </div>
                    }
                    title="Testimonials"
                    show={this.props.modals.testimonials}
                    keyModal="testimonials" />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        services: {
            testimonials: state.services.testimonials
        },
        modals: {
            testimonials: state.modals.testimonials
        },
        members: {
            public: {
                active: state.members.public.active
            }
        }
    } 
}

export default connect(
    mapStateToProps
)(Testimonials)