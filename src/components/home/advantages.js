import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import style from './style.css'
import { connect } from 'react-redux'

class Advantages extends Component {
	constructor(props) {
		super(props)
		this.elements = {}
		this.firstTime = false
		this.delay = 100
	}

	componentDidMount() {
		this.firstTime = false
	}

	getClass = () => {
		if (this.props.services.sections.advantages && ! this.firstTime) {
			this.firstTime = true
			for (let k in this.elements) {
				this.delay += 50
				window.setTimeout(() => {
					if (this.elements[k]) {
						this.elements[k].className = this.elements[k].className + ' slideInUp animated'
					}
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
							<span><i className="fas fa-clipboard-list fa-3x"></i><br />Free registration with full professional service</span>
						</div>
					</Col>
					<Col xs={12} sm={4}>
						<div ref={(ref) => this.elements.second = ref} className={style.advantItem}>
							<span><i className="fas fa-clipboard-list fa-3x"></i><br />All letters from ladies are free to read</span>
						</div>
					</Col>
					<Col xs={12} sm={4}>
						<div ref={(ref) => this.elements.third = ref} className={style.advantItem}>
							<span><i className="fas fa-clipboard-list fa-3x"></i><br />All ladies' profiles real and verified</span>
						</div>
					</Col>
					<Col xs={12} sm={4}>
						<div ref={(ref) => this.elements.forth = ref} className={style.advantItem}>
							<span><i className="fas fa-clipboard-list fa-3x"></i><br />Upgrade your membership and get access to all additional photos and videos of all ladies</span>
						</div>
					</Col>
					<Col xs={12} sm={4}>
						<div ref={(ref) => this.elements.fifth = ref} className={style.advantItem}>
							<span><i className="fas fa-clipboard-list fa-3x"></i><br />Live Video Chat and Video Conference that will help you to become closer inspite of distance</span>
						</div>
					</Col>
					<Col xs={12} sm={4}>
						<div ref={(ref) => this.elements.sixth = ref} className={style.advantItem}>
							<span><i className="fas fa-clipboard-list fa-3x"></i><br />You can find the One among hundreds of beautiful Ukrainian brides</span>
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