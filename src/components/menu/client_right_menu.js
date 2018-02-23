import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Panel, FormGroup } from 'react-bootstrap'
import style from './right_menu.css'
import { Link } from 'react-router-dom'
import SmallDivider from 'components/divider/small_divider.js'
import MiddleItem from 'components/list/middle_item.js'
import MiddleString from 'components/list/middle_string.js'

class ClientRightMenu extends Component {
	render() {
		const { data } = this.props.user
		return (
			<div className="p-15">
				<FormGroup className="px-15">
					<img src={data.avatar[0].original} alt="profile image" className="rounded-avatar img-responsive" />
				</FormGroup>

				<FormGroup className="text-center">
					<div>
						<h2><strong>{data.first_name + ' ' + data.last_name}</strong></h2>
					</div>
				</FormGroup>

				<FormGroup className="text-center">
					<strong className="text-blue">ID: {data.profile_id}</strong>
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
						link="/profile"
					/>
					<MiddleItem
						text="Edit Profile"
						icon="fas fa-cog"
						link="/client-edit"
					/>
					<MiddleItem
						text="Upgrade"
						icon="fas fa-cloud-upload-alt"
						link="/plans"
					/>
				</FormGroup>
				<FormGroup>
					<SmallDivider
						text="Info"
					/>
				</FormGroup>
				<FormGroup>
					<MiddleString
						text="0"
						keyName="Money Balance:"
					/>
					<MiddleString
						text="0"
						keyName="Bonus Balance:"
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
)(ClientRightMenu);