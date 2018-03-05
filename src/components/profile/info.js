import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Tabs, Tab, Row, Col } from 'react-bootstrap'
import store, { history } from 'store'
import { setSegment, getFullInfo, setGallery, setSelected, addToGallery, removePhotos } from 'actions'
import AboutMe from './about_me.js'
import style from './style.css'
import CustomGallery from 'components/gallery/gallery.js'
import MembershipInfo from './membership_info.js'
import BtnMain from 'components/form/buttons/main_button.js'
import BtnUpload from 'components/form/buttons/button_upload.js'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'

class InfoProfile extends Component {

	constructor(props) {
        super(props)
        store.dispatch(getFullInfo(props.user.token))
        //this.handleSelect = this.handleSelect.bind(this)
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
            if(this.props.images[i].isSelected == true) {
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

  	onDrop = (picture) => {
        if (picture) {
            store.dispatch(addToGallery(picture[0], this.props.user.token))
        }
    }

	render() {
		const { first, second } = this.props.segments
		const { role } = this.props.user.data
		let images = []
		let selected = this.props.user.data.selected_img

		switch (this.props.user.data.active_gallery) {
			case 'main': images =  this.props.user.data.images.public; break;
			case 'private': images = this.props.user.data.images.privat; break;
		}

		console.log(images)
		
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
				                    <a onClick={(e) => this.setGallery('video')}>Video</a> <br/>
								</Col>
								<Col sm={10}>
									<CustomGallery
										images={images}
										onSelected={this.onSelected}
										isSelected={true}
									/>
								</Col>
								<Col sm={10} smOffset={2}>
				                    <BtnMain
				                        type="button"
				                        bsStyle="success btn"
				                        text={"Remove " + selected.length + ' photos'}
				                        onClick={this.removePhoto}
				                        disabled={! selected.length}
				                    />
				                    <BtnUpload
				                        onChange={this.onDrop}
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
				active_gallery: state.user.data.active_gallery,
				selected_img: state.user.data.selected_img
			},
			token: state.user.token
		}
	}
}

export default connect(
	mapStateToProps
)(InfoProfile);