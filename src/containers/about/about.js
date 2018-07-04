import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import store, { history } from 'store'
import { connect } from 'react-redux'
import Options from 'options'
import { animateScroll as scroll } from 'react-scroll'
import style from './style.css'
import Block from 'containers/works/block.js'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CountUp from 'react-countup';
import { toggleRegistration } from 'actions'
import { BtnMain } from 'components/form/buttons'
import TestimonialItem from 'components/home/testimonial_item.js'

class About extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count: false,
            activeSlide: 0
        }

        document.addEventListener('scroll', this.checkScroll)
    }

    getSignUp = () => {
        Options.getAll()
        store.dispatch(toggleRegistration(true))
        scroll.scrollToTop({duration: 0});
        history.push('/')
    }

    printBlock = (item, i) => {
        return <Col key={i} sm={4}><Block icon="fas fa-at fa-3x" title="POWERFUL THEME OPTIONS" /></Col>
    }

    checkScroll = () => {
        const countBlock = document.getElementById('count-block')
        if (countBlock) {
            const rect = countBlock.getBoundingClientRect();
            const elemTop = rect.top;
            const elemBottom = rect.bottom;
            const isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
            if (isVisible && ! this.state.count) {
                this.setState({count: isVisible})
            }
        }
    }

    printSlider = (item, i) => {
        return  <div key={i} className={style['sliderItem' + i]}>
                    <div className="row">
                        <div className="col-md-5">
                            <div className={style.sliderInner}>
                                <h3>Creative Solutions</h3>
                                <p style={{color: "#fff"}}>We’re full service which means we’ve got you covered on design and content right through to digital. You’ll form a lasting relationship with us, collaboration is central to we do. With more than ten years of knowledge and expertise we design and code clean awesome websites and apps!</p>
                            </div>
                        </div>
                    </div>
                </div>
    }

    printMainSlider = (item, i) => {
        let className = i == this.state.activeSlide ? 'fadeInDown animated' : 'fade-slide'
        return  <div key={i} className={style['sliderItem' + i]}>
                    <div className={style.mainSliderInner}>
                        <div className="font-bebas fs-48 letter-4">
                            <div style={{color: '#fff'}} className={className}><strong>Complete & <span className="underline-text">Highly Creative</span> Website Solutions</strong></div>
                        </div>
                        <div className="lh-18 fs-18 hidden-xs form-group">
                            <div style={{color: '#fff'}} className={className}>After years of evolution in the digital space, we've produced cutting-edge creative for start ups and Fortune 500 companies spanning tech, e-commerce, hospitality, healthcare, and beyond.</div>
                        </div>
                        <div className={className + ' text-center'}>
                            <BtnMain
                                type="button"
                                bsStyle="success"
                                text="Free Sign Up"
                                onClick = {this.getSignUp} />
                        </div>
                    </div>
                </div>
    }

    printCount = (item, i) => {
        let option = {}
        switch(i) {
            case 0: 
                option = { count: 6.893, title: 'HAPPY CLIENTS' }
                break
            case 1: 
                option = { count: 1.645, title: 'CUPS OF COFFEE' }
                break
            case 2: 
                option = { count: 2.093, title: 'PROJECTS FINISHED' }
                break
            case 3: 
                option = { count: 1.206, title: 'TICKETS CLOSED' }
                break
        }
        return  <Col key={i} sm={3} className="text-center works-big-title">
                    <div className="works-title color-green fs-36">
                        <CountUp 
                            start={0} 
                            end={option.count} 
                            decimal="," 
                            decimals={3} 
                            duration={2} />
                    </div>
                    <div className="fs-18">
                        {option.title}
                    </div>
                </Col>
    }

    printTestimonials = (item, i) => {
        return  <Col sm={4} key={i}>
                    <TestimonialItem onClick={this.showTestimonials} {...item} />
                </Col>
    }

    getArray = (num) => {
        return Array.apply(null, Array(num))
    }

    addFadeClass = (index) => {
        this.setState({activeSlide: index})
    }

    render() {
        const settings = {
            slidesToShow: 1,
            accessibility: false,
            dots: false,
            infinite: true,
            autoplay: true,
        }

        const mainSettings = {
            slidesToShow: 1,
            accessibility: false,
            dots: false,
            infinite: true,
            autoplay: true,
            afterChange: this.addFadeClass
        }

        const testimonialsSettings = {
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
            <div className="pt-100" id="about-container">
                <Grid>
                    <div className="bg-white p-15">
                        <h1 className="font-bebas">About Company</h1>
                        <hr />

                        <h2 className="text-center form-group p-15 works-big-title fs-48">
                            <span className="text-uppercase"><span className="underline-text">Life In Love</span> has been in business for several years.</span>
                        </h2>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="text-center form-group p-15 mb-35 color-888 fs-18 lh-18">
                                    We’ve witnessed the successful union of countless couples. Our clients’ satisfaction stems from the fact that we have an earnest desire to break down barriers –  geographical, cultural or language – and connect individuals across borders. We have programs and procedures in place to assist our clients with making a connection with the person of their dreams. We’ve also developed a comprehensive vetting procedure for all individuals that we accept as clients. Whether you employ our services as a gentleman in search of his soul mate, or a lady seeking her ‘knight’; the process of carefully screening clients to validate each person’s legitimacy, is carefully executed for every applicant. Our organization is reputable, responsible and ethical in our business dealings. We value relationships, respect your time and most of all, we appreciate you as our valued client.
                                </div>
                            </div>
                        </div>
                        
                        <hr />

                        <div className="pt-50">
                            <Row>
                                <Col sm={6}>
                                    <div className="works-title works-big-title fs-36">
                                        <span className="text-uppercase"><span className="underline-text">Life In Love</span> maintains an impressive roster of Ukrainian and Russian women.</span>
                                    </div>
                                    <div className="color-888 pt-15 fs-18 lh-18 form-group">
                                        We’ve often been asked “what’s so special about a Ukrainian or Russian woman?” … The answer? Everything! In addition to their obvious beauty, Ukrainian and Russian women are educated and intelligent. They’re also smart enough to know that family matters. They’re loving mothers, attentive & caring partners and they’re well versed in the domestic, emotional and physical responsibilities of a wife.
                                    </div>
                                </Col>
                                <Col sm={6}>
                                    <Row>
                                        <Col xs={6}>
                                            <div className={style.infoItemImg1}>
                                            </div>
                                        </Col>
                                        <Col xs={6}>
                                            <div className={style.infoItemImg2}>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>

                        <div className="pt-50 pb-50">
                        </div>

                        <div className={style.backgroundGrey}>
                            <Row>
                                <Col sm={6}>
                                    <img src="/assets/img/about-4.jpg" alt="" className="img-responsive" />
                                </Col>
                                <Col sm={6}>
                                    <div className="works-title works-big-title pt-50 fs-36">
                                        <span className="text-uppercase">If you’re ready to meet the lady of your dreams; we’re ready to connect you!</span>
                                    </div>
                                    <div className="color-888 pt-15 form-group fs-18 lh-18">
                                        Take the first step – complete the questionnaire on this site. Need more information? Please review the How it works and Services pages on our site, and feel free to Contact Us if you have further questions.
                                    </div>
                                    <div className="form-group">
                                        <BtnMain
                                            type="button"
                                            bsStyle="success"
                                            text="Free Sign Up"
                                            onClick = {this.getSignUp} />
                                    </div>
                                </Col>
                            </Row>
                        </div>

                        <div className="pt-50 pb-50 px-15 testimonials-slider">
                            <Slider {...testimonialsSettings}>
                                { this.props.services.testimonials.list[0].list.map((item, i) => this.printTestimonials(item, i)) }
                            </Slider>
                        </div>
                        <div className={style.lastPart}>
                            <h4>SO WHAT’S NEXT?</h4>
                            <h1>ARE YOU READY? <a href="javascript:;" onClick={this.getSignUp}>LET’S WORK!</a></h1>
                            
                        </div>
	                </div>
	            </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        services: {
            testimonials: state.services.testimonials
        }
    } 
}

export default connect(
    mapStateToProps
)(About)