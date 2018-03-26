import React, { Component } from 'react'
import { Row, Col, Grid } from 'react-bootstrap'
import style from './style.css'
import store from 'store'
import { setActiveSection } from 'actions'
import { connect } from 'react-redux'

class Advantages extends Component {
	constructor(props) {
		super(props)
		this.scroll = 0
		this.elements = {}
		this.firstTime = false
		this.delay = 0
		this.classAnimated = {
			first: ' slideInUp', // //bounceInLeft
			second: ' slideInUp',
			third: ' slideInUp',
			forth: ' slideInUp',
			fifth: ' slideInUp',
			sixth: ' slideInUp',
			seventh: ' slideInUp',
			eighth: ' slideInUp',
			ninth: ' slideInUp'
		}
	}

	componentDidMount() {
		window.onscroll = () => {
			const el = document.getElementById('advantages')
			if (el) {
				if (el.scrollHeight >= document.documentElement.scrollTop) {
					store.dispatch(setActiveSection(true, 'advantages'))
				}
			}
		}
	}

	getClass = () => {
		if (this.props.services.sections.advantages && ! this.firstTime) {
			this.firstTime = true
			for (let k in this.elements) {
				this.delay += 50
				window.setTimeout(() => {
					this.elements[k].className = this.elements[k].className + this.classAnimated[k] + ' animated'
				}, this.delay)
			}
		}
	}

	render() {
		this.getClass()
		return (
			<div id="advantages" className={style.advantWrap}>
				<Row>
					<Col xs={12}>
						<h2 className={style.advantTitle}>Competitive <span className={style.underlineText}>Advantages</span></h2>
					</Col>
					<Col xs={12} sm={4}>
						<div ref={(ref) => this.elements.first = ref} className={style.advantItem}>
							<span>Free registration with full professional service</span>
						</div>
					</Col>
					<Col xs={12} sm={4}>
						<div ref={(ref) => this.elements.second = ref} className={style.advantItem}>
							<span>All letters from ladies are free to read</span>
						</div>
					</Col>
					<Col xs={12} sm={4}>
						<div ref={(ref) => this.elements.third = ref} className={style.advantItem}>
							<span>All ladies' profiles real and verified</span>
						</div>
					</Col>
					<Col xs={12} sm={4}>
						<div ref={(ref) => this.elements.forth = ref} className={style.advantItem}>
							<span>Upgrade your membership and get access to all additional photos and videos of all ladies</span>
						</div>
					</Col>
					<Col xs={12} sm={4}>
						<div ref={(ref) => this.elements.fifth = ref} className={style.advantItem}>
							<span>Live Video Chat and Video Conference that will help you to become closer inspite of distance</span>
						</div>
					</Col>
					<Col xs={12} sm={4}>
						<div ref={(ref) => this.elements.sixth = ref} className={style.advantItem}>
							<span>You can find the One among hundreds of beautiful Ukrainian brides</span>
						</div>
					</Col>
					<Col xs={12} sm={4}>
						<div ref={(ref) => this.elements.seventh = ref} className={style.advantItem}>
							<span>We've helped many couples to find each other</span>
						</div>
					</Col>
					<Col xs={12} sm={4}>
						<div ref={(ref) => this.elements.eighth = ref} className={style.advantItem}>
							<span>Verify your profile and share direct contact with ladies</span>
						</div>
					</Col>
					<Col xs={12} sm={4}>
						<div ref={(ref) => this.elements.ninth = ref} className={style.advantItem}>
							<span>Personal assistant support</span>
						</div>
					</Col>
				</Row>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
    return {
        services: {
            sections: state.services.sections
        }
    } 
}

export default connect(
    mapStateToProps
)(Advantages)