import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Tabs, Tab } from 'react-bootstrap'
import store, { history } from 'store'
import { setSegment, getFullInfo } from 'actions'
import AboutMe from './about_me.js'
import style from './style.css'
import Gallery from 'components/gallery/gallery.js'
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

	render() {
		const { first, second } = this.props.segments
		const role = this.props.user.data.role
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
							<Gallery />
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
				role: state.user.data.role
			},
			token: state.user.token
		}
	}
}

export default connect(
	mapStateToProps
)(InfoProfile);