import React, { Component } from 'react'
import { Grid, Row, Col, FormGroup } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Registration, MainPanel, MainModal } from 'components'
import { toggleModal, toggleRegistration, changeStep, setActiveSection, getPublicMembers, setActiveMembers, getStories } from 'actions'
import store, { history } from 'store'
import BtnMain from 'components/form/buttons/main_button.js'
import style from './style.css'
import Advantages from './advantages.js'
import MemberBlock from 'components/members/member_block.js'
import ScrollToTop from './scroll_btn.js'
import { animateScroll as scroll } from 'react-scroll'
import Options from 'options'
import TestimonialItem from './testimonial_item.js'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Landing extends Component {
    constructor(props) {
        super(props)
        store.dispatch(getPublicMembers('new'))
        store.dispatch(getPublicMembers('popular'))
        store.dispatch(getStories())
    }

    showModal = () => {
        store.dispatch(toggleModal(true, 'login'))
    }

    showTestimonials = () => {
        store.dispatch(toggleModal(true, 'testimonials'))
    }

    goToTestimonials = () => {
        store.dispatch(toggleModal(false, 'testimonials'))
        scroll.scrollToTop({duration: 0})
        history.push('/testimonials')
    }

    closeRegistration = () => {
        store.dispatch(toggleRegistration(false))
        store.dispatch(changeStep(0))
    }

    componentDidMount = () => {
        window.onscroll = () => {
            this.advantagesAnimate()
            this.toggleScrollBtn()
        }
    }

    printStories = (story, i) => {
        if (i > 2) { return false }
        let description = story.story.slice(0, 250)
        return  <div className={style.storyWrap} key={i} onClick={() => this.goToStory(story.id)}>
                    <div className="row">
                        <div className="col-xs-4">
                            <img src={story.image} alt={story.client_name} className={style.imgCarousel} />
                        </div>
                        <div className="col-sm-8">
                            <h3 className={style.carouselName}>
                                <span>{story.client_name}</span>
                                &nbsp; & &nbsp;
                                <span>{story.girl_name}</span>
                            </h3>
                            <p>
                                {description}...
                            </p>
                        </div>
                    </div>
                </div>
    }

    printTestimonials = (item, i) => {
        //if (i > 2) { return false } 
        return  <Col sm={4} key={i}>
                    <TestimonialItem onClick={this.showTestimonials} {...item} />
                </Col>
    }

    goToStories = () => {
        scroll.scrollToTop({duration: 0});
        history.push('success-stories')
    }

    goToStory = (id) => {
        scroll.scrollToTop({duration: 0});
        history.push('success-stories/' + id)
    }

    getRegistration = () => {
        Options.getAll()
        store.dispatch(toggleRegistration(true))
        scroll.scrollToTop({duration: 300});
    }

    toggleScrollBtn = () => {
        const el = document.getElementById('scrollBtn')
        if (el) {
            if (document.documentElement.scrollTop >= 600) {
                if (el.className.indexOf('active') + 1 === 0) {
                    el.className = el.className + ' active'
                }
            } else {
                el.className = el.className.replace(' active', '')
            }
        }   
    }

    advantagesAnimate = () => {
        const el = document.getElementById('advantages')
        if (el) {
            if (el.scrollHeight >= document.documentElement.scrollTop) {
                store.dispatch(setActiveSection(true, 'advantages'))
            }
        }
    }

    toggleMembers = (type) => {
        store.dispatch(setActiveMembers(type))
    }

    render() {
        let activeClass = ''
        let col = 6
        if (this.props.signup.showRegistration) {
            activeClass = style.active
            col = 12
        }

        const { list, type } = this.props.members.public.active
        const { testimonials } = this.props.modals

        const settings = {
            slidesToShow: 3,
            dots: false,
            infinite: true,
            autoplay: false,

            responsive: [
                {
                    breakpoint: 1120, 
                    settings: {slidesToShow: 2}
                },{
                    breakpoint: 798, 
                    settings: {slidesToShow: 1}
                }
            ]
        };

        return (
            <div>
                <div className={style.mainPart}>
                    <Grid className={style.innerMain}>
                        <Row>
                            <Col md={col} sm={12} >
                                <div className={style.wrapRegistration + ' ' + activeClass}>
                                    <MainPanel
                                        title="Free Sign Up"
                                        iconClass="fas fa-address-card"
                                        onClick={this.closeRegistration}
                                        showClose={(this.props.signup.step === 0 || this.props.signup.step === 4) && this.props.signup.showRegistration}
                                        body={<Registration />} />
                                </div>
                            </Col>
                            <Col md={6} sm={12} className={style.wrapLogin + ' ' + activeClass}>
                                <div>
                                    <div>
                                        <h1 className="text-white main">
                                            Premier Matchmaking agency to Find Your Ukrainian Lady
                                        </h1>
                                        <h2 className="text-white text-center">
                                            We are not Gods to predict your future but we have something to make you closer to your dream come true.
                                            <br />
                                            <a className={style.joinLink} onClick={this.getRegistration} href="javascript:;"> Join Now</a>
                                        </h2>
                                   </div>
                                   <div className="btn-login text-center">
                                        <BtnMain
                                            type="button"
                                            bsStyle="success"
                                            text="Sign Up"
                                            onClick={this.getRegistration} />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Grid>
                </div>
                {
                    !this.props.signup.showRegistration
                    ? <div>
                        <Advantages />
                        <div className={style.secondPart}>
                            <div className={style.secondPartInner}>
                                <h2 className={style.advantTitle}><span className={style.underlineText}>Girls</span></h2>
                                <Grid>
                                    <div className="pb-50">
                                        <Row>
                                            <Col xs={4} className="text-center">
                                                <div className={style.groupSwitch} onClick={() => this.toggleMembers('new')}>
                                                    <span className={type === 'new' ? style.underlineText : ''}>New</span>
                                                </div>
                                            </Col>
                                            <Col xs={4} className="text-center">
                                                <div className={style.groupSwitch} onClick={() => this.toggleMembers('popular')}>
                                                    <span className={type === 'popular' ? style.underlineText : ''}>Popular</span>
                                                </div>
                                            </Col>
                                            <Col xs={4} className="text-center">
                                                <div className={style.groupSwitch} onClick={() => history.push('/girls')}>
                                                    <span>Show more</span>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <MemberBlock like={false} onClickItem={this.getRegistration} list={list} />
                                </Grid>
                            </div>
                        </div>
                        <div className={style.thirdPart}>
                            <Grid>
                                <h2 className="text-center">
                                    Hundreds of real verified profiles of Ukrainian Ladies! Say YES to the only one among many ladies waiting for fiance's confess:)
                                    <br />
                                    <a className={style.searchLink} onClick={() => history.push('/girls')} href="javascript:;"> Search Now!</a>
                                </h2>
                                <FormGroup className="text-center">
                                    <BtnMain
                                        type="button"
                                        bsStyle="success"
                                        text="Sign Up"
                                        onClick={this.getRegistration} />
                                </FormGroup>
                            </Grid>
                        </div>
                        <div className={style.storiesPart}>
                            <h2 className={style.advantTitle}>
                                <span className={style.underlineText}>Success Stories</span>
                            </h2>

                            <div className={style.carouselWrap}>
                                <Grid>
                                    <div className={style.storyWrap}>
                                        <div className="row">
                                            <div className="col-sm-4">
                                                <div className={style.succesMore}>More then 2000 couples</div>
                                            </div>
                                            <div className="col-sm-8">
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                                consequat. Duis aute irur
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        { this.props.services.stories.list.map((story, i) => this.printStories(story, i)) }
                                    </div>
                                    <div className="form-group text-center">
                                        <BtnMain
                                            type="button"
                                            bsStyle="success"
                                            text="More stories"
                                            onClick={this.goToStories} />
                                    </div>
                                </Grid>
                            </div>
                        </div>
                        <div className={style.thirdPart}>
                            <Grid>
                                <h2 id="hiw" className={style.advantTitle}>
                                    How it <span className={style.underlineText}>works?</span>
                                </h2>
                                <h2 className="text-center">Brick to brick. Step to step. Your choice is made and you feel great:)</h2>
                                <h2 className="text-center">Take 3 Easy Steps to Start Your Story:</h2>
                                <div className={style.stepsWrap}>
                                    <Row>
                                        <Col xs={4}>
                                            <div className={style.stepWrap}>
                                                <div className="text-center">
                                                    <i className="fas fa-user fa-4x"></i>
                                                    <div className={style.stepDesc}>
                                                        <span className="font-arial">Create your profile, add photos</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col xs={4}>
                                            <div className={style.stepWrap}>
                                                <div className="text-center">
                                                    <i className="fas fa-images fa-4x"></i>
                                                    <div className={style.stepDesc}>
                                                        <span className="font-arial">Browse our Gallery</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col xs={4}>
                                            <div className={style.stepWrap}>
                                                <div className="text-center">
                                                    <i className="fas fa-comments fa-4x"></i>
                                                    <div className={style.stepDesc}>
                                                        <span className="font-arial">Start Communication</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <h2 className="text-center">Any questions? Apply to Our Friendly Staff</h2>
                            </Grid>
                        </div>
                        <div className={style.testimonialsPart}>
                            <div className={style.secondPartInner}>
                                <h2 className={style.advantTitle}><span className={style.underlineText}>Testimonials</span></h2>
                                <Grid>
                                    <Row>
                                        <Slider {...settings}>
                                            { this.props.services.testimonials.list[0].list.map((item, i) => this.printTestimonials(item, i)) }
                                        </Slider>
                                    </Row>
                                    <div className="form-group text-center">
                                        <BtnMain
                                            type="button"
                                            bsStyle="success"
                                            text="More testimonials"
                                            onClick={this.goToTestimonials} />
                                    </div>
                                </Grid>
                            </div>
                        </div>
                    </div>
                    : ''
                }
                
                <MainModal
                    body={  
                        <div>
                            <img src="http://mint.themes.tvda.pw/wp-content/uploads/2016/11/profile04.jpg" className="img-responsive" alt="" />
                            <div className="text-center font-bebas pt-15"><a href="javascript:;" onClick={this.goToTestimonials}>View All Testimonials</a></div>
                        </div>
                    }
                    title="Testimonials"
                    show={testimonials}
                    keyModal="testimonials" />
                <ScrollToTop />
            </div>
            
        )
    }
}

const mapStateToProps = (state) => {
    return {
        signup: {
            showRegistration: state.signup.showRegistration,
            step: state.signup.step
        },
        members: {
            public: {
                active: state.members.public.active
            }
        },
        services: {
            stories: {
                list: state.services.stories.list
            },
            testimonials: state.services.testimonials
        },
        modals: {
            testimonials: state.modals.testimonials
        }
    } 
}

export default connect(
    mapStateToProps
)(Landing)