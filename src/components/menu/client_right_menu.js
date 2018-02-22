import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Panel } from 'react-bootstrap'
import style from './right_menu.css'
import { Link } from 'react-router-dom'

class ClientRightMenu extends Component {
	render() {
		const { data } = this.props.user
		console.log(data)
		return (
			<Panel className={style.wrapper}>
				<Panel.Body>
					<div className={style.profileImage}>
						<img src={data.avatar[0].croped} alt="profile image" />
					</div>

					<Row className={style.itemHolder}>
						<Col xs={6}>
							your ID:
						</Col>

						<Col xs={6}>
							<span className={style.userId}>{data.profile_id}</span>
						</Col>
					</Row>

					<Row className={style.itemHolder}>
						<Col xs={6}>
							Credits:
						</Col>

						<Col xs={6}>
							0
						</Col>
					</Row>

					<Row className={style.itemHolder}>
						<Col xs={6}>
							Name:
						</Col>

						<Col xs={6}>
							{data.first_name + ' ' + data.last_name}
						</Col>
					</Row>

					<Row className={style.itemHolder}>
						<Col xs={6}>
							date:
						</Col>

						<Col xs={6}>
							{data.birthday.day + '.' + data.birthday.month + '.' + data.birthday.year}
						</Col>
					</Row>

					<Row className={style.itemHolder}>
						<Col xs={6}>
							Country:
						</Col>

						<Col xs={6}>
							{data.country}
						</Col>
					</Row>

					<hr className={style.hr}/>

					<div className={style.buttonHolder}>
						<Link to="/client-profile">View Profile</Link>
					</div>

					<div className={style.buttonHolder}>
						<Link to="/change-pass">Change Password</Link>
					</div>

					<div className={style.buttonHolder}>
						<Link to="/pay">payments</Link>
					</div>

					<hr className={style.hr}/>

					favourite
				</Panel.Body>
			</Panel>
		);
	}
}

const mapStateToProps = (state) => {
	return state
}

export default connect(
	mapStateToProps
)(ClientRightMenu);