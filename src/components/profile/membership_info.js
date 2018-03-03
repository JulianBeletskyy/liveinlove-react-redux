import React, { Component } from 'react'
import { connect } from 'react-redux'

class MembershipInfo extends Component {
	render() {
		const { membership } = this.props.user.data
		return (
			<div className="pt-15">
				<div><span className="font-bebas">Current plan: </span><strong>{ membership.name }</strong></div>
				<div><span className="font-bebas">Expression of Interest: </span><strong>{ membership.likes }</strong></div>
				<div><span className="font-bebas">View ALL additional photos in profiles: </span><strong>{ membership.view_photo }</strong></div>
				<div><span className="font-bebas">View ALL videos in profiles: </span><strong>{ membership.view_video }</strong></div>
				<div><span className="font-bebas">Set photos in your profile: </span><strong>{ membership.my_photo }</strong></div>
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