/* eslint-disable */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from 'store'
import { getMail, setActiveTab } from 'actions'
import { FormGroup } from 'react-bootstrap'
import style from './right_menu.css'
import SmallDivider from 'components/divider/small_divider.js'
import MiddleItem from 'components/list/middle_item.js'
import MiddleString from 'components/list/middle_string.js'
import Avatar from 'components/gallery/avatar.js'
import { Link } from 'react-router-dom'

class GirlRightMenu extends Component {
	goToInbox = () => {
		store.dispatch(getMail('incoming', 'inbox', this.props.user.token))
        store.dispatch(setActiveTab('inbox', 'mail'))
	}

	render() {
		const { data } = this.props.user
		return (
			<div className={style.wrapGirl + " p-15"}>
				<FormGroup className="px-15 text-center">
					<Avatar src={data.avatar.croped} />
				</FormGroup>
				<FormGroup className={style.name + " text-center"}>
					<h3>
						<strong>{data.first_name + ' ' + data.last_name}</strong>
					</h3>
					<MiddleString
						text={data.profile_id}
						keyName="ID:" />
				</FormGroup>
				<FormGroup>
					<SmallDivider text="Activity" />
				</FormGroup>
				<FormGroup>
					<MiddleString
						text={data.view_profile}
						keyName="Profile viewed:" />
				</FormGroup>
				<FormGroup>
					<MiddleString
						text={<Link style={{color: '#fff'}} to={{pathname: "/mail/main"}} onClick={this.goToInbox}>{data.count_interest}</Link>}
						keyName="Interests received:" />
				</FormGroup>
				<FormGroup>
					<MiddleString
						text={data.count_favorite}
						keyName="Favorited me:" />
				</FormGroup>
				<FormGroup>
					<SmallDivider text="Profile" />
				</FormGroup>
				<FormGroup>
					<MiddleItem
						text="View Profile"
						icon="fas fa-user"
						link="/profile/info"
						role="girl" />
					<MiddleItem
						text="Edit Profile"
						icon="fas fa-cog"
						link="/profile/edit/info"
						role="girl" />
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
				count_interest: state.user.data.count_interest,
				count_favorite: state.user.data.count_favorite,
				profile_id: state.user.data.profile_id,
			},
			token: state.user.token
		}
	}
}

export default connect(
	mapStateToProps
)(GirlRightMenu);