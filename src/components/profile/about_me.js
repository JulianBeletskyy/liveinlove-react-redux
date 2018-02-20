import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from './about_me.css';
import store from 'store/'
import { Grid, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';

class AboutMe extends Component {
   render() {
   	return (
   		<div className={style.wrapper}>
            <Link to="/" className={style.editBtn + ' btn + btn-success'}>Edit</Link>

   			<div className={style.title}>
   				About Me
   			</div>

   			<Row>
   				<Col xs={6} className={style.name}>
   					<div>Star sign:</div>
   					<div>Heght:</div>
   					<div>Weght:</div>
   					<div>Eye Color:</div>
   					<div>Hair Color:</div>
   					<div>Hair Length:</div>
   					<div>Ethnisity:</div>
   					<div>Martial Status:</div>
   					<div>Children:</div>
   					<div>Wants Children:</div>
   					<div>Proffesion:</div>
   					<div>Occupation:</div>
   					<div>Religion:</div>
   					<div>Smoking:</div>
   					<div>Drinking:</div>
   				</Col>

   				<Col xs={6} className={style.value}>
   					<div>
   						{this.props.info.sign}
   					</div>

   					<div>
   						{this.props.info.height}
   					</div>

   					<div>
   						{this.props.info.weight}
   					</div>

   					<div>
   						{this.props.info.eyeColor}
   					</div>

   					<div>
   						{this.props.info.hairColor}
   					</div>

   					<div>
   						{this.props.info.hairLength}
   					</div>

   					<div>
   						{this.props.info.ethnisity}
   					</div>

   					<div>
   						{this.props.info.martialStatus}
   					</div>

   					<div>
   						{this.props.info.children}
   					</div>

   					<div>
   						{this.props.info.wantsChildren}
   					</div>

   					<div>
   						{this.props.info.proffesion}
   					</div>

   					<div>
   						{this.props.info.occupation}
   					</div>

   					<div>
   						{this.props.info.religion}
   					</div>

   					<div>
   						{this.props.info.smoking}
   					</div>

   					<div>
   						{this.props.info.drinking}
   					</div>
   				</Col>
   			</Row>

   			<Row>
   				<div className={style.title}>I Am Looking For A {this.props.info.lookFor}</div>

   				<Col xs={6} className={style.name + ' ' + style.bNone}>
   					<div>Age:</div>
   					<div>Ethnicity:</div>
   					<div>Other:</div>
   				</Col>

   				<Col xs={6} className={style.value + ' ' + style.bNone}>
   					<div>{this.props.info.lookAge}</div>
   					<div>{this.props.info.lookEthnicity}</div>
   					<div>{this.props.info.lookOther}</div>
   				</Col>
   			</Row>
   		</div>
   	);
   }
}



const mapStateToProps = (state) => {
    return state
}

export default connect(
    mapStateToProps
)(AboutMe);