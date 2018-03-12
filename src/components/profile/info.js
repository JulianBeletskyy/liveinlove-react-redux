import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Tabs, Tab, Row, Col, FormGroup } from 'react-bootstrap'
import store, { history } from 'store'
import { setSegment, setGallery, setSelected, addToGallery, removePhotos, setUpload, setAlert } from 'actions'
import AboutMe from './about_me.js'
import style from './style.css'
import CustomGallery from 'components/gallery/gallery.js'
import MembershipInfo from './membership_info.js'
import BtnMain from 'components/form/buttons/main_button.js'
import BtnUpload from 'components/form/buttons/button_upload.js'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import TabItem from 'components/list/tab_item.js'
import UploadField from 'components/form/inputs/upload_field'

class InfoProfile extends Component {

	constructor(props) {
        super(props)
        store.dispatch(setSegment('profile', props.match.params.tab))
    }

    handleSelect(key) {
    	history.push(key)
  	}

  	setGallery(key) {
  		store.dispatch(setGallery(key))
  	}

  	onSelected(index, image) {
  		let images = this.props.images.slice()
        let img = images[index]
        if(img.hasOwnProperty("isSelected")) {
        	img.isSelected = !img.isSelected
        } else {
        	img.isSelected = true
        }
        let selected = []
        for(let i = 0; i < images.length; i++) {
            if(this.props.images[i].isSelected === true) {
                selected.push(this.props.images[i].id);
            }  
        }
        store.dispatch(setSelected(selected))
  	}

  	removePhoto = () => {
  		if (this.props.user.data.selected_img.length) {
  			confirmAlert({
	  			title: '',
			    message: 'Are you sure to remove this photos?',      
			    confirmLabel: 'Confirm',                        
			    cancelLabel: 'Cancel',                           
			    onConfirm: () => {
			    	store.dispatch(removePhotos({'images': this.props.user.data.selected_img}, this.props.user.token))
			    }
		    })
  		}
  	}

  	addToPrivate = () => {
  		console.log(this.props.user.data.selected_img)
  	}

  	onDrop = (e) => {
        if (e) {
            store.dispatch(addToGallery(e.target.files[0], this.props.user.token))
        }
    }

    checkLimit = () => {
    	let count = 0
    	for (let k in this.props.user.data.images) {
    		count += this.props.user.data.images[k].length
    	}
    	
    	if (count >= this.props.user.data.membership.my_photo) {
    		store.dispatch(setAlert('You can\'t upload more photos in your membership', 'error'))
    	} else {
    		let el = document.getElementById('upload')
        	el.click()
    	}
    }

    getButton = (selected) => {
    	let text = ''
    	switch(this.props.user.data.active_gallery) {
    		case 'main': text =  'Make private'; break;
			case 'private': text = 'Make public'; break;
			default: text = ''; break;
    	}
    	if (text) {
    		return <BtnMain
	            type="button"
	            bsStyle="success"
	            text={text}
	            onClick={this.addToPrivate}
	            disabled={! selected.length} />
    	}
    }

	render() {
		const { second } = this.props.segments
		const { role } = this.props.user.data
		let images = []
		let selected = this.props.user.data.selected_img

		switch (this.props.user.data.active_gallery) {
			case 'main': images =  this.props.user.data.images.public; break;
			case 'private': images = this.props.user.data.images.privat; break;
			case 'video': images = this.props.user.data.images.video; break;
			default: images = []
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
									<TabItem 
										onClick={(e) => this.setGallery('main')}
										title="Main"
										activeClass={this.props.user.data.active_gallery === 'main'} />
									<TabItem 
										onClick={(e) => this.setGallery('private')} 
										title="Private"
										activeClass={this.props.user.data.active_gallery === 'private'} />
									<TabItem 
										onClick={(e) => this.setGallery('video')}
										title="Video"
										activeClass={this.props.user.data.active_gallery === 'video'} />
								</Col>
								<Col sm={10}>
									<div className="clearfix form-group">
										<CustomGallery
											images={images}
											onSelected={this.onSelected}
											isSelected={true}
										/>
									</div>
									<Row>
										<Col sm={4}>
										{
											this.props.user.data.active_gallery === 'main'
											?	/*<FormGroup className="text-center">
								                    <BtnUpload
								                        onChange={this.onDrop}
								                        title="Upload photo"
								                        onClick={this.checkGalleryLimit}
								                    />
							                    </FormGroup>*/
							                    <FormGroup className="text-center">
							                    	<UploadField
							                    		onClick={this.checkLimit}
							                    		check={this.props.services.upload}
							                    		onChange={this.onDrop} />
							                    </FormGroup>
											: ''
										}
					                    </Col>
										<Col sm={4}>
											{
												this.props.user.data.active_gallery === 'main'
												? 	<FormGroup className="text-center">
														<BtnMain
									                        type="button"
									                        bsStyle="success"
									                        text={'Remove ' + selected.length + ' photos'}
									                        onClick={this.removePhoto}
									                        disabled={! selected.length} />
							                        </FormGroup>
												: ''
											}
											
					                    </Col>
					                    <Col sm={4}>
					                    	<FormGroup className="text-center">
					                    		{ this.getButton(selected) }
					                        </FormGroup>
					                    </Col>
				                    </Row>
								</Col>
							</Row>
						</div>
					</Tab>
					{
						role === 'client'
						? 	<Tab 
								eventKey={'membership'}
								title="Membership"
							>
								<MembershipInfo />
							</Tab>
						: ''
					}
					{
						role === 'client'
						?	<Tab 
								eventKey={'credits'} 
								title="Credits & Bonuses"
							>
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
				private_images: state.user.data.private_images,
				active_gallery: state.user.data.active_gallery,
				selected_img: state.user.data.selected_img,
				membership: state.user.data.membership
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