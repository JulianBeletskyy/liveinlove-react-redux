import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Panel, FormGroup } from 'react-bootstrap'
import style from './right_menu.css'
import { Link } from 'react-router-dom'

class ClientRightMenu extends Component {
	render() {
		const { data } = this.props.user
		return (
			<div className="p-15">
				<FormGroup className="p-15">
					<img src={data.avatar[0].original} alt="profile image" className="rounded-avatar img-responsive" />
				</FormGroup>

				<FormGroup className="text-center">
					<div>
						<h2><strong>{data.first_name + ' ' + data.last_name}</strong></h2>
					</div>
				</FormGroup>

				<FormGroup className="text-center">
					<strong className="text-info">ID: {data.profile_id}</strong>
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