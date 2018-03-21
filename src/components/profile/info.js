import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Tabs, Tab, Row, Col, FormGroup } from 'react-bootstrap'
import store, { history } from 'store'
import { setSegment, addToGallery, setAlert, getVideo } from 'actions'
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

    handleSelect(key) {
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
										info={true} />
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
								Credits & Bonuses
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
			data: {
				role: state.user.data.role,
				images: state.user.data.images,
				video: state.user.data.video
			},
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