import React, { Component } from 'react'
import store, { history } from 'store'
import { connect } from 'react-redux'
import { Grid, Row, Col, FormGroup } from 'react-bootstrap'
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
                        <div className="form-group">
                            <Row>
                                <Col sm={4}>
                                    <div className="service-title-left">
                                        <span className="underline-text">Life In Love</span> is pleased to present the crème de la crème of Ukrainian and Russian beauties.
                                    </div>
                                </Col>
                                <Col sm={8} xsHidden className="form-group">
                                    <div className="service-title-right">
                                        The ladies in our portfolio have all been pre-screened to verify their background, marital status and their eligibility to enter a committed relationship. All ladies have been cleared and are 100% ready and available to enter a relationship with our clients.
                                    </div>
                                    <div className="color-888">
                                        To connect with your future soul mate, you must take the first step by completing the questionnaire on this site. Once you’ve submitted your information, you may be granted access to view our active library of interested ladies. Each file provides statistical information and other details to help you select the lady that most closely fits your desire for the ideal partner. 
                                        Are you ready to meet your Love? Follow the steps below:
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <FormGroup>
                            <Row>
                                <Col sm={4}>
                                    <div className="bg-gray service-wrap-title">
                                        <div className="service-number">01.</div>
                                        <span className="title-service">COMPLETE YOUR PROFILE</span>
                                    </div>
                                </Col>
                                <Col sm={8}>
                                    <div>
                                        Developing a sincere and honest relationship begins with transparency. We want to know the true you. The list of questions is provided to help our clients get to know you better. What are your likes? Your hobbies? How would you describe your personality? What do you do for work? The more honest your responses, the more likely it is that you’ll find a compatible match.
                                    </div>
                                </Col>
                            </Row>
                        </FormGroup>

                        <FormGroup>
                            <Row>
                                <Col sm={8} xsHidden>
                                    <div>
                                        We want to see you! Our initial attraction to an individual, is almost exclusively based on appearance. It’s human nature. Within the first seconds of seeing someone, we decide if the person seems friendly, interesting, kind or fun. That’s why it’s imperative that you upload a profile picture. Statistics show that profiles without a photo have a lower chance of being viewed. To increase the likelihood of being selected, upload a recent (within the last 2 years), clear, photo of yourself. You must be the only person in the shot. Make sure the background is not distracting. Smile.
                                    </div>
                                    <div>
                                        Your potential mate will be interested in learning more about your home life also. Include pictures of your family, your hobbies, pets, activities that you participate in, where you live, your work and other things that interest you. Upload as many pictures as you can.
                                    </div>
                                </Col>
                                <Col sm={4}>
                                    <div className="bg-gray service-wrap-title">
                                        <div className="service-number">02.</div>
                                        <span className="title-service">UPLOAD A PHOTO</span>
                                    </div>
                                </Col>
                                <Col sm={8} smHidden mdHidden lgHidden>
                                    <div>
                                        We want to see you! Our initial attraction to an individual, is almost exclusively based on appearance. It’s human nature. Within the first seconds of seeing someone, we decide if the person seems friendly, interesting, kind or fun. That’s why it’s imperative that you upload a profile picture. Statistics show that profiles without a photo have a lower chance of being viewed. To increase the likelihood of being selected, upload a recent (within the last 2 years), clear, photo of yourself. You must be the only person in the shot. Make sure the background is not distracting. Smile.
                                        Your potential mate will be interested in learning more about your home life also. Include pictures of your family, your hobbies, pets, activities that you participate in, where you live, your work and other things that interest you. Upload as many pictures as you can.
                                    </div>
                                </Col>
                            </Row>
                        </FormGroup>

                        <FormGroup>
                            <Row>
                                <Col sm={4}>
                                    <div className="bg-gray service-wrap-title">
                                        <div className="service-number">03.</div>
                                        <span className="title-service">CHOOSE A PACKAGE</span>
                                    </div>
                                </Col>
                                <Col sm={8}>
                                    <div>
                                        Our goal at <strong>Life In Love</strong>, is to help you navigate the intricacies of communicating with your foreign connections. We want to simplify the process of finding lasting love. Since you’re checking out our site, we assume you’ve done your research and you’ve discovered that <strong>Life In Love</strong> is an ethical organization that’s made up of caring people who are genuinely interested in helping you find Love that Lasts. Maybe there are other areas that you need help with - such as the language and geographic barriers? We offer various services to assist with those needs. Please see further information under the “Services” tab.
                                    </div>
                                </Col>
                            </Row>
                        </FormGroup>

                        <FormGroup>
                            <Row>
                                <Col sm={8} xsHidden>
                                    <div>
                                        You’re looking for the single female of your dreams - someone who is ready to build a real relationship and start a family. Our platform is just the right place to find her! We have tons of eligible ladies waiting to meet you. Select one of our Membership plans and start communicating with your potential mate.
                                    </div>
                                    <br />
                                    <div>
                                        When you find a lady that’s interested, and you want to set-up a personal meeting, <strong>Life in Love</strong> is ready to orchestrate the meeting of your dreams. Please see further information under the “Services” tab.
                                    </div>
                                </Col>
                                <Col sm={4}>
                                    <div className="bg-gray service-wrap-title">
                                        <div className="service-number">04.</div>
                                        <span className="title-service">THE LADY OF YOUR DREAMS AWAITS!</span>
                                    </div>
                                </Col>
                                <Col sm={8} smHidden mdHidden lgHidden>
                                    <div>
                                        You’re looking for the single female of your dreams - someone who is ready to build a real relationship and start a family. Our platform is just the right place to find her! We have tons of eligible ladies waiting to meet you. Select one of our Membership plans and start communicating with your potential mate.
                                    </div>
                                    <br />
                                    <div>
                                        When you find a lady that’s interested, and you want to set-up a personal meeting, <strong>Life in Love</strong> is ready to orchestrate the meeting of your dreams. Please see further information under the “Services” tab.
                                    </div>
                                </Col>
                            </Row>
                        </FormGroup>

                        <FormGroup>
                            <Row>
                                <Col sm={4}>
                                    <div className="bg-gray service-wrap-title">
                                        <div className="service-number">05.</div>
                                        <span className="title-service">YOUR HAPPINESS IS OUR PRIORITY</span>
                                    </div>
                                </Col>
                                <Col sm={8}>
                                    <div>
                                        The <strong>Life In Love</strong> team is focused on delivering exceptional customer service. We want to be sure you’re happy with your connections and satisfied with your experience. If you have any questions or concerns, please contact us immediately. You may message us via the contacts option provided on this site.
                                    </div>
                                </Col>
                            </Row>
                        </FormGroup>
                        
                        <div className="works-member-block clearfix">
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
                        <hr />
                        <div className="color-888 fs-12">
                            Disclaimer:<br />
                            Although all clients are properly vetted to ensure honest connections, <strong>Life in Love</strong> is not responsible for connections that do not result in a successful bond or a lasting relationship. The <strong>Life in Love</strong> staff will make every effort to assist our clients in securing genuine contacts; but clients are advised they enter into the contract at their own risk. <strong>Life In Love</strong> does not implicitly or explicitly guarantee clients will find their soul mate or lasting love using any marriage service.
                        </div>
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