import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Panel, FormGroup } from 'react-bootstrap'
import style from './right_menu.css'
import { Link } from 'react-router-dom'
import SmallDivider from 'components/divider/small_divider.js'
import MiddleItem from 'components/list/middle_item.js'
import MiddleString from 'components/list/middle_string.js'
import Avatar from 'components/gallery/avatar.js'

class GirlRightMenu extends Component {
	render() {
		const { data } = this.props.user
		return (
			<div className="p-15">
				<FormGroup className="px-15">
					<Avatar 
						src={data.avatar.original}
					/>
				</FormGroup>

				<FormGroup className="text-center">
					<div>
						<h2><strong>{data.first_name + ' ' + data.last_name}</strong></h2>
					</div>
				</FormGroup>

				<FormGroup>
					<MiddleString
						text={data.profile_id}
						keyName="ID:"
					/>
				</FormGroup>
				<FormGroup>
					<MiddleString
						text={data.view_profile}
						keyName="Profile viewed by boys:"
					/>
				</FormGroup>
				<FormGroup>
					<SmallDivider
						text="Profile"
					/>
				</FormGroup>
				<FormGroup>
					<MiddleItem
						text="View Profile"
						icon="fas fa-user"
						link="/profile/info"
					/>
					<MiddleItem
						text="Edit Profile"
						icon="fas fa-cog"
						link="/profile/edit"
					/>
				</FormGroup>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return state
}

export default connect(
	mapStateToProps
)(GirlRightMenu);