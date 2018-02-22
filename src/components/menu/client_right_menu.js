import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Panel } from 'react-bootstrap'
import style from './right_menu.css'
import { Link } from 'react-router-dom'

class ClientRightMenu extends Component {
	getUserInfo = () => {
		return {
			userId: '434234234',
			credits: '0',
			country: 'Ukraine',
			fname: 'Ivan',
			lname: 'Syla',
			regDate: '12.12.12'
		};
	}
	render() {
		return (
			<Panel className={style.wrapper}>
				<Panel.Body>
					<div className={style.profileImage}>
						<img src="/assets/img/default-avatar.jpg" alt="profile image" />
					</div>

					<Row className={style.itemHolder}>
						<Col xs={6}>
							your ID:
						</Col>

						<Col xs={6}>
							<span className={style.userId}>{this.getUserInfo().userId}</span>
						</Col>
					</Row>

					<Row className={style.itemHolder}>
						<Col xs={6}>
							Credits:
						</Col>

						<Col xs={6}>
							{this.getUserInfo().credits}
						</Col>
					</Row>

					<Row className={style.itemHolder}>
						<Col xs={6}>
							Name:
						</Col>

						<Col xs={6}>
							{this.getUserInfo().fname + ' ' + this.getUserInfo().lname}
						</Col>
					</Row>

					<Row className={style.itemHolder}>
						<Col xs={6}>
							date:
						</Col>

						<Col xs={6}>
							{this.getUserInfo().regDate}
						</Col>
					</Row>

					<Row className={style.itemHolder}>
						<Col xs={6}>
							Country:
						</Col>

						<Col xs={6}>
							{this.getUserInfo().country}
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