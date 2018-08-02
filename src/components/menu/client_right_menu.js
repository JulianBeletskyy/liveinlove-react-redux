/* eslint-disable */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from 'store'
import { toggleModal, getMail, setActiveTab } from 'actions'
import { FormGroup } from 'react-bootstrap'
import style from './right_menu.css'
import SmallDivider from 'components/divider/small_divider.js'
import MiddleItem from 'components/list/middle_item.js'
import MiddleString from 'components/list/middle_string.js'
import Avatar from 'components/gallery/avatar.js'
import MainModal from 'components/modal/modal.js'
import Credits from 'components/membership/credits.js'
import Plans from 'components/membership/plans.js'
import PlansTable from 'components/membership/plans_table.js'
import Subscription from 'components/membership/subscription.js'
import { Link } from 'react-router-dom'

class ClientRightMenu extends Component {
	showPlans = () => {
		store.dispatch(toggleModal(true, 'plans'))
	}

	showAddCredits = () => {
		store.dispatch(toggleModal(true, 'credits'))
	}

	goToInbox = () => {
		store.dispatch(getMail('incoming', 'inbox', this.props.user.token))
        store.dispatch(setActiveTab('inbox', 'mail'))
	}

	render() {
		const { data } = this.props.user
		const { plans, credits } = this.props.modals
		return (
			<div className={style.wrapClient + " p-15"}>
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
				</FormGroup>
				<FormGroup>
					<MiddleString
						text={data.membership.value.month == 1 && data.membership.value.month_payment != 0 ? data.membership.name + ' (Trial)' : data.membership.name}
						keyName="Membership:"
						link={true}
						onClick={this.showPlans} />
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
						role="client" />
					<MiddleItem
						text="Edit Profile"
						icon="fas fa-cog"
						link="/profile/edit/info"
						role="client" />
					<MiddleItem
						text="Change password"
						icon="fas fa-unlock-alt"
						link="/profile/edit/password"
						role="client" />
					<MiddleItem
						text="Add Credits"
						icon="fas fa-credit-card"
						onClick={this.showAddCredits}
						role="client" />
				</FormGroup>
				<FormGroup>
					<SmallDivider text="Info" />
				</FormGroup>
				<FormGroup>
					<MiddleString
						text={data.credits}
						keyName="Money Balance:" />
				</FormGroup>
				<FormGroup>
				<MiddleString text="0" keyName="Bonus Balance:" />
				</FormGroup>
				<MainModal
                    body={<Plans />}
                    title="Membership"
                    show={plans}
                    keyModal="plans"
                    className="plans-modal"
                    size="lg" />
                <MainModal
                    body={<Credits />}
                    title="Credits"
                    show={credits}
                    keyModal="credits" />
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
				membership: state.user.data.membership,
				credits: state.user.data.credits,
				view_profile: state.user.data.view_profile,
				profile_id: state.user.data.profile_id,
				count_interest: state.user.data.count_interest,
				count_favorite: state.user.data.count_favorite
			},
			token: state.user.token
		},
		modals: {
			plans: state.modals.plans,
			credits: state.modals.credits
		}
	}
}

export default connect(
	mapStateToProps
)(ClientRightMenu);