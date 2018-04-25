import React, { Component } from 'react'
import store, { history } from 'store'
import Block from './block.js'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import TestimonialItem from 'components/home/testimonial_item.js'
import { Registration, MainPanel } from 'components'
import { toggleRegistration, getPublicMembers, setActiveMembers } from 'actions'
import Options from 'options'
import MemberCarousel from 'components/carousel/member_carousel.js'

class Works extends Component {
	constructor(props) {
		super(props)
		store.dispatch(toggleRegistration(true))
		Options.getAll()
        store.dispatch(getPublicMembers('popular'))
        store.dispatch(getPublicMembers('new'))
	}

    toggleMembers = (type) => {
        store.dispatch(setActiveMembers(type))
    }

	printBlock = (item, i) => {
		return <Col key={i} sm={4}><Block /></Col>
	}

	printTestimonials = (item, i) => {
        if (i > 2) { return false } 
        return  <Col sm={4} key={i}>
                    <TestimonialItem onClick={this.showTestimonials} {...item} />
                </Col>
    }

    render() {
		const blocks = ['1', '2', '3', '4', '5', '6']
        const { list, type } = this.props.members.public.active
    	return (
    		<div className="pt-100">
                <Grid>
                    <div className="bg-white p-15">
                        <h1 className="font-bebas">How It Works?</h1>
                        <hr />
                        <h2 className="text-center form-group p-15 works-big-title">HIGHLY CREATIVE <span className="underline-text">WEBSITE SOLUTIONS</span></h2>
                        <div className="text-center form-group p-15 mb-35 color-888">We craft beautiful and unique digital experiences. With more than ten years of knowledge and expertise we design and code clean awesome websites and apps, we build brands and help them succeed!</div>
                        <Row>
                        	{blocks.map((item, i) => this.printBlock(item, i))}
                        </Row>
                        <div className="bg-light p-15">
                        	<Row>
                        		<Col sm={6}>
                        			<img src="http://mint.themes.tvda.pw/wp-content/uploads/2016/11/laptop-video.jpg" className="img-responsive" alt="" />
                        		</Col>
                        		<Col sm={6}>
                        			<h3 className="works-title">UNIQUE, TRULY RESPONSIVE AND FUNCTIONAL WEBSITES THAT IMPRESS!</h3>
                        			<div className="color-888">We craft unique digital experiences. With more than 10 years of knowledge and expertise we design and code clean websites and apps, we build brands and help them succeed!</div>
                        			<h3 className="works-title">START YOUR BUSINESS TODAY</h3>
                        			<div className="color-888">From startups to accounting firms to restaurateurs, we share a common goal with all our clients – to bring out the best in their brand.</div>
                        		</Col>
                        	</Row>
                        	<hr />
                        	<Row>
                        		<Col sm={4}>
                        			<div className="works-small-title">BRAND STRATEGY</div>
                        			<div className="color-888">Technology and design are the core of success for real estate related businesses. Leverage our years of experience to reach your agency’s full potential.</div>
                        		</Col>
                        		<Col sm={4}>
                        			<div className="works-small-title">BRAND STRATEGY</div>
                        			<div className="color-888">Technology and design are the core of success for real estate related businesses. Leverage our years of experience to reach your agency’s full potential.</div>
                        		</Col>
                        		<Col sm={4}>
                        			<div className="works-small-title">BRAND STRATEGY</div>
                        			<div className="color-888">Technology and design are the core of success for real estate related businesses. Leverage our years of experience to reach your agency’s full potential.</div>
                        		</Col>
                        	</Row>
                        	
                            
                        </div>
                        <div className="works-member-block clearfix">
                            <h2 className="text-center form-group p-15 works-big-title">WHAT CLIENTS SAY <span className="underline-text">ABOUT US</span></h2>
                            <div className="text-center form-group p-15 mb-35 color-888">Award winning digital agency. We bring a personal and effective approach to every project we work on, which is why our clients love us and why they keep coming back. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis eros lobortis, vestibulum turpis ac, pulvinar odio. Praesent vulputate a elit ac mollis. In sit amet ipsum turpis.</div>
                            <div className="clearfix pt-15">
                                { this.props.services.testimonials.list[0].list.map((item, i) => this.printTestimonials(item, i)) }
                            </div>
                            <div className="col-sm-12 clearfix pv-40">
                                <div className="form-group">
                                    <Row>
                                        <Col xs={4} className="text-center">
                                            <div className="member-switch" onClick={() => this.toggleMembers('new')}>
                                                <span className={type === 'new' ? 'underline-text' : ''}>New</span>
                                            </div>
                                        </Col>
                                        <Col xs={4} className="text-center">
                                            <div className="member-switch" onClick={() => this.toggleMembers('popular')}>
                                                <span className={type === 'popular' ? 'underline-text' : ''}>Popular</span>
                                            </div>
                                        </Col>
                                        <Col xs={4} className="text-center">
                                            <div className="member-switch" onClick={() => history.push('/girls')}>
                                                <span>Show more</span>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <MemberCarousel items={list} />
                            </div>
                        </div>
                        <MainPanel
                            title="Registration"
                            iconClass="fas fa-address-card"
                            body={<Registration />} />
	                </div>
	            </Grid>
            </div>
		)
    }
}

const mapStateToProps = (state) => {
    return {
        services: {
            stories: {
                list: state.services.stories.list
            },
            testimonials: state.services.testimonials
        },
        members: {
            public: state.members.public
        }
    } 
}

export default connect(
    mapStateToProps
)(Works)