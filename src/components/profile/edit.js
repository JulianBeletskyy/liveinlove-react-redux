import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Tabs, Tab } from 'react-bootstrap'
import store, { history } from 'store'
import { setSegment, getFullInfo } from 'actions'
import PasswordProfile from './password_profile.js'
import EditProfile from './edit_profile.js'
import EditProfileGirl from './edit_profile_girl.js'
import style from './style.css'

class Edit extends Component {

	constructor(props) {
        super(props)
        store.dispatch(getFullInfo(props.user.token))
        this.handleSelect = this.handleSelect.bind(this)
        store.dispatch(setSegment('profile', 'edit', props.match.params.tab))
    }

    handleSelect(key) {
    	history.push(key)
  	}

	render() {
		const { first, second, third } = this.props.segments
		const { role } = this.props.user.data
		return (
			<div className={style.wrapTab}>
				<Tabs id="edit" activeKey={third} onSelect={this.handleSelect}>
					<Tab 
						eventKey={'info'} 
						title="Edit"
					>
						{
							role == 'client'
							? <EditProfile />
							: <EditProfileGirl />
						}
					</Tab>
					<Tab 
						eventKey={'password'} 
						title="Password"
					>
						<PasswordProfile />
					</Tab>
				</Tabs>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		segments: state.segments,
		user: {
			token: state.user.token,
			data: {
				role: state.user.data.role
			}
		}
	}
}

export default connect(
	mapStateToProps
)(Edit);