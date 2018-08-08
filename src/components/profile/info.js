import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Tabs, Tab, Row, Col, FormGroup } from 'react-bootstrap'
import store, { history } from 'store'
import { setSegment, addToGallery, setAlert, getVideo, getUserInfo } from 'actions'
import AboutMe from './about_me.js'
import style from './style.css'
import CustomGallery from 'components/gallery/custom_gallery.js'
import MembershipInfo from './membership_info.js'
import 'react-confirm-alert/src/react-confirm-alert.css'
import UploadField from 'components/form/inputs/upload_field'
import VideoBlock from 'components/gallery/video_block.js'

class InfoProfile extends Component {

	constructor(props) {
        super(props)
        store.dispatch(setSegment('profile', props.match.params.tab))
        if (props.user.data.role === 'girl') {
        	store.dispatch(getVideo(props.user.token))
        }
    }

    handleSelect = (key) => {
    	if (key === 'credits') {
    		store.dispatch(getUserInfo(this.props.user.token))
    	}
    	history.push(key)
  	}

  	onDrop = (e) => {
        if (e) {
            store.dispatch(addToGallery(e.target.files[0], this.props.user.token))
        }
    }

    checkLimit = () => {
    	if (this.props.user.data.role === 'client') {
    		if (this.props.user.data.images.length >= 11) {
    			store.dispatch(setAlert('You can\'t upload more photos in your membership', 'error'))
    			return
    		}
    	}
    	let el = document.getElementById('upload')
    	el.click()
    }

    getCreditsInfo = () => {
    	const { membership, membership_count } = this.props.user.data
    	return 	<div>
    				<span className="font-bebas">Credits: </span><strong>{this.props.user.data.credits}</strong>
    				<div>
    					<span className="font-bebas">Send 1st free letter to any girl: </span>
    					<strong>{membership_count.free_letter} / {membership.free_leter}</strong>
					</div>
    				<div>
    					<span className="font-bebas">Accept/send private photos: </span>
    					<strong>{membership_count.private_photo} / {membership.private_photo}</strong>
					</div>
					<div>
    					<span className="font-bebas">Set photos in your profile: </span>
    					<strong>{membership_count.my_photo} / {membership.my_photo}</strong>
					</div>
					<div>
    					<span className="font-bebas">View photos in profiles: </span>
    					<strong>{membership_count.view_photo}</strong>
					</div>
					<div>
    					<span className="font-bebas">View videos in profiles: </span>
    					<strong>{membership_count.view_video}</strong>
					</div>
					<div>
    					<span className="font-bebas">Expression of Interest: </span>
    					<strong>{membership_count.likes}</strong>
					</div>
					<div>
    					<span className="font-bebas">Discount on ALL services: </span>
    					<strong>{membership.discount} %</strong>
					</div>
					<div>
    					<span className="font-bebas">Share contact details: </span>
    					<strong>{membership_count.contact_details} / {membership.contact_details}</strong>
					</div>
				</div>
    }

	render() {
		const { second } = this.props.segments
		const { role } = this.props.user.data
		return (
			<div className={style.wrapTab}>
				<Tabs id="info" activeKey={second} onSelect={this.handleSelect}>
					<Tab 
						eventKey={'info'} 
						title="Info" >
						<AboutMe />
					</Tab>
					<Tab 
						eventKey={'gallery'} 
						title="Gallery" >
						<div className="pt-15">
							<Row>
								<Col sm={12}>
									<FormGroup className="text-right">
				                    	<UploadField
				                    		onClick={this.checkLimit}
				                    		check={this.props.services.upload}
				                    		onChange={this.onDrop} />
				                    </FormGroup>
								</Col>
								<Col sm={12}>
									<CustomGallery 
										images={this.props.user.data.images}
										info={true}
										edit={true}
										profile={true} />
								</Col>
							</Row>
						</div>
					</Tab>
					{
						role === 'girl'
						?	<Tab 
								eventKey={'video'}
								title="Video">
								<div className="pt-15">
									<VideoBlock
										video={this.props.user.data.video}
										info={true}
										profile={true} />
								</div>
							</Tab>
							
						: ''
					}
					{
						role === 'client'
						? 	<Tab 
								eventKey={'membership'}
								title="Membership">
								<MembershipInfo />
							</Tab>
						: ''
					}
					{
						role === 'client'
						?	<Tab 
								eventKey={'credits'} 
								title="Credits & Bonuses">
								<div className="pt-15">
									{this.getCreditsInfo()}
								</div>
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
			second: state.segments.second
		},
		user: {
			data: state.user.data,
			token: state.user.token
		},
		services: {
			upload: state.services.upload
		}
	}
}

export default connect(
	mapStateToProps
)(InfoProfile);