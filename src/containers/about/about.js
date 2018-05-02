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
            count: false
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
                    <div className="works-title color-green">
                        <CountUp 
                            start={0} 
                            end={option.count} 
                            decimal="," 
                            decimals={3} 
                            duration={2} />
                    </div>
                    <div>
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

    render() {
        const settings = {
            slidesToShow: 1,
            accessibility: false,
            dots: false,
            infinite: true,
            autoplay: true,
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
                        <h2 className="text-center form-group p-15 works-big-title">WE CRAFT <span className="underline-text">ELEGANT SOLUTIONS</span></h2>
                        <div className="text-center form-group p-15 mb-35 color-888">We craft beautiful and unique digital experiences. With more than ten years of knowledge and expertise we design and code clean awesome websites and apps, we build brands and help them succeed!</div>
                        <Row>
                            { this.getArray(6).map((item, i) => this.printBlock(item, i)) }
                        </Row>
                        <div className="about-slider pt-50">
                            <Slider {...settings}>
                                { this.getArray(3).map((item, i) => this.printSlider(item, i)) }
                            </Slider>
                        </div>
                        <div className="pt-50 pb-50" id="count-block">
                            <Row>
                                { 
                                    this.state.count
                                    ?   this.getArray(4).map((item, i) => this.printCount(item, i))
                                    :   ''
                                } 
                            </Row>
                        </div>
                        <hr />

                        <div className="pt-50">
                            <Row>
                                <Col sm={6}>
                                    <div className="works-title works-big-title">
                                        UNIQUE, TRULY RESPONSIVE AND FUNCTIONAL WEBSITES THAT IMPRESS!
                                    </div>
                                    <div className="color-888 pt-15">
                                        We craft unique digital experiences. With more than 10 years of knowledge and expertise we design and code clean websites and apps, we build brands and help them succeed!
                                    </div>
                                    <div className="works-big-title color-green pt-15">
                                        START YOUR BUSINESS TODAY
                                    </div>
                                    <div className="color-888 pt-15">
                                        From startups to accounting firms to restaurateurs, we share a common goal with all our clients – to bring out the best in their brand.
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
                            <Row>
                                <Col sm={4}>
                                    <div className="works-small-title">WE ARE AWESOME</div>
                                    <div className="color-888">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis eros lobortis, vestibulum turpis ac, pulvinar odio. Praesent vulputate a elit ac mollis. In sit amet ipsum turpis.</div>
                                </Col>
                                <Col sm={4}>
                                    <div className="works-small-title">WE ARE CREATIVE</div>
                                    <div className="color-888">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis eros lobortis, vestibulum turpis ac, pulvinar odio. Praesent vulputate a elit ac mollis. In sit amet ipsum turpis.</div>
                                </Col>
                                <Col sm={4}>
                                    <div className="works-small-title">WE ARE PERFECT</div>
                                    <div className="color-888">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis eros lobortis, vestibulum turpis ac, pulvinar odio. Praesent vulputate a elit ac mollis. In sit amet ipsum turpis.</div>
                                </Col>
                            </Row>
                        </div>

                        <div className={style.backgroundGrey}>
                            <Row>
                                <Col sm={6}>
                                    <img src="/assets/img/about-4.jpg" alt="" className="img-responsive" />
                                </Col>
                                <Col sm={6}>
                                    <div className="works-title works-big-title pt-50">
                                        SEE WHAT <span className="underline-text">EVERYONE IS WORKING ON</span>
                                    </div>
                                    <div className="color-888 pt-15 form-group">
                                        We craft unique digital experiences. With more than 10 years of knowledge and expertise we design and code clean websites and apps, we build brands and help them succeed!
                                    </div>
                                    <BtnMain
                                        type="button"
                                        bsStyle="success"
                                        text="Sign Up"
                                        onClick = {this.getSignUp} />
                                </Col>
                            </Row>
                        </div>

                        <div className="pt-50 px-15 testimonials-slider">
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