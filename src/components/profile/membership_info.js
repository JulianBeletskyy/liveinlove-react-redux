import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from 'store'
import { FormGroup } from 'react-bootstrap'
import { toggleModal } from 'actions'
import BtnMain from 'components/form/buttons/main_button.js'

class MembershipInfo extends Component {
	toggleModal = () => {
		store.dispatch(toggleModal(true, 'plans'))
	}

	render() {
		const { membership } = this.props.user.data
		return (
			<div className="pt-15">
				<FormGroup>
					<div>
						<span className="font-bebas">Current plan: </span>
						<strong>{ membership.name + ( membership.value.id == 13 ? '(Trial)' : '' ) }</strong>
					</div>
					<div>
						<span className="font-bebas">Expression of Interest: </span>
						<strong>{ membership.likes }</strong>
					</div>
					<div>
						<span className="font-bebas">View ALL additional photos in profiles: </span>
						<strong>{ membership.view_photo }</strong>
					</div>
					<div>
						<span className="font-bebas">View ALL videos in profiles: </span>
						<strong>{ membership.view_video }</strong>
					</div>
					<div>
						<span className="font-bebas">Set photos in your profile: </span>
						<strong>{ membership.my_photo }</strong>
					</div>
					<div>
						<span className="font-bebas">Send 1st free letter to any girl: </span>
						<strong>{ membership.free_leter }</strong>
					</div>
					<div>
						<span className="font-bebas">Accept/send private photos: </span>
						<strong>{ membership.private_photo }</strong>
					</div>
					<div>
						<span className="font-bebas">Discount on ALL additional communicative services: </span>
						<strong>{ membership.discount }%</strong>
					</div>
					<div>
						<span className="font-bebas">Value: </span>
						<strong>{membership.value.month + ' months - $' + membership.value.month_payment.toFixed(2) + ' per month (billed in one payment $' + membership.value.one_payment.toFixed(2) + ')'}</strong>
					</div>
				</FormGroup>
				<div>
					<BtnMain
                        type="button"
                        bsStyle="success"
                        text={'Upgrade'}
                        onClick={this.toggleModal}
                    />
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: {
			data: {
				membership: state.user.data.membership
			}
		}
	}
}

export default connect(
	mapStateToProps
)(MembershipInfo);