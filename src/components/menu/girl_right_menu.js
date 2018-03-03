import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormGroup } from 'react-bootstrap'
import style from './right_menu.css'
import SmallDivider from 'components/divider/small_divider.js'
import MiddleItem from 'components/list/middle_item.js'
import MiddleString from 'components/list/middle_string.js'
import Avatar from 'components/gallery/avatar.js'

class GirlRightMenu extends Component {
	render() {
		const { data } = this.props.user
		return (
			<div className={style.wrapGirl + " p-15"}>
				<FormGroup className="px-15 text-center">
					<Avatar 
						src={data.avatar.croped}
					/>
				</FormGroup>

				<FormGroup className={style.name + " text-center"}>
					<div>
						<h2><strong>{data.first_name + ' ' + data.last_name}</strong></h2>
						<MiddleString
							text={data.profile_id}
							keyName="ID:"
						/>
					</div>
				</FormGroup>
				<FormGroup>
					<SmallDivider
						text=""
					/>
				</FormGroup>
				<FormGroup>
					<MiddleString
						text={data.view_profile}
						keyName="Profile viewed:"
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
						role="girl"
					/>
					<MiddleItem
						text="Edit Profile"
						icon="fas fa-cog"
						link="/profile/edit/info"
						role="girl"
					/>
					<MiddleItem
						text="Change password"
						icon="fas fa-unlock-alt"
						link="/profile/edit/password"
						role="girl"
					/>
				</FormGroup>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: {
			data: {
				avatar: state.user.data.avatar,
				first_name: state.user.data.first_name,
				last_name: state.user.data.last_name,
				view_profile: state.user.data.view_profile,
				profile_id: state.user.data.profile_id
			}
		}
	}
}

export default connect(
	mapStateToProps
)(GirlRightMenu);