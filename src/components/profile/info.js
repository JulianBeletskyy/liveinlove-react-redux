import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Tabs, Tab, Row, Col } from 'react-bootstrap'
import store, { history } from 'store'
import { setSegment, getFullInfo, setGallery } from 'actions'
import AboutMe from './about_me.js'
import style from './style.css'
import CustomGallery from 'components/gallery/gallery.js'
import MembershipInfo from './membership_info.js'

class InfoProfile extends Component {

	constructor(props) {
        super(props)
        store.dispatch(getFullInfo(props.user.token))
        this.handleSelect = this.handleSelect.bind(this)
        store.dispatch(setSegment('profile', props.match.params.tab))
    }

    handleSelect(key) {
    	history.push(key)
  	}

  	setGallery(key) {
  		store.dispatch(setGallery(key))
  	}

	render() {
		const { first, second } = this.props.segments
		const { role } = this.props.user.data
		let images = []
		switch (this.props.user.data.active_gallery) {
			case 'main': images =  this.props.user.data.images; break;
			case 'private': images = this.props.user.data.private_images; break;
		}

		return (
			<div className={style.wrapTab}>
				<Tabs id="info" activeKey={second} onSelect={this.handleSelect}>
					<Tab 
						eventKey={'info'} 
						title="Info"
					>
						<AboutMe />
					</Tab>
					<Tab 
						eventKey={'gallery'} 
						title="Gallery"
					>
						<div className="pt-15">
							<Row>
								<Col sm={2}>
									<a onClick={(e) => this.setGallery('main')}>Main</a> <br/>
				                    <a onClick={(e) => this.setGallery('private')}>Private</a> <br/>
				                    Video<br/>
								</Col>
								<Col sm={10}>
									<CustomGallery
										images={images}
									/>
								</Col>
							</Row>
							
						</div>
					</Tab>
					{
						role == 'client'
						? 	<Tab 
								eventKey={'membership'}
								title="Membership"
							>
								<MembershipInfo />
							</Tab>
						: ''
					}
					{
						role == 'client'
						?	<Tab 
								eventKey={'credits'} 
								title="Cradits & Bonuses"
							>
								Cradits & Bonuses
							</Tab>	
						: ''
					}
				</Tabs>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		segments: {
			first: state.segments.first,
			second: state.segments.second
		},
		user: {
			data: {
				role: state.user.data.role,
				images: state.user.data.images,
				private_images: state.user.data.private_images,
				active_gallery: state.user.data.active_gallery
			},
			token: state.user.token
		}
	}
}

export default connect(
	mapStateToProps
)(InfoProfile);