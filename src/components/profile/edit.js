import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Tabs, Tab } from 'react-bootstrap'
import store, { history } from 'store'
import { setSegment } from 'actions'
import PasswordProfile from './password_profile.js'
import EditProfile from './edit_profile.js'
import EditProfileContact from './edit_profile_contact.js'
import EditProfileOther from './edit_profile_other.js'
import style from './style.css'

class Edit extends Component {

	constructor(props) {
        super(props)
        this.handleSelect = this.handleSelect.bind(this)
        store.dispatch(setSegment('profile', 'edit', props.match.params.tab))
    }

    handleSelect(key) {
    	history.push(key)
  	}

	render() {
		const { third } = this.props.segments
		const { role } = this.props.user.data
		return (
			<div className={style.wrapTab}>
				<Tabs id="edit" activeKey={third} onSelect={this.handleSelect}>
					<Tab eventKey={'info'} title="Edit" >
						<EditProfile />
					</Tab>
					<Tab eventKey={'other'} title="Other Information" >
						<EditProfileOther />
					</Tab>
					<Tab eventKey={'contact'} title="Contact Info" >
						<EditProfileContact />
					</Tab>
					{
						role === 'client'
						? 	<Tab eventKey={'password'} title="Password" >
								<PasswordProfile />
							</Tab>
						: 	''
					}
				</Tabs>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		segments: {
			third: state.segments.third,
		},
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