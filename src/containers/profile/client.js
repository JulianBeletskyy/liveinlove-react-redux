import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Modal, Row, Col } from 'react-bootstrap'
import style from './style.css';
import InfoBlock from 'components/profile/info_block.js'
import AboutMe from 'components/profile/about_me.js'


class ClientProfile extends Component {
    getInterests = () => {
        return ['Guitar, Drums, vue.js'];
    }

    getMessage = () => {
        return ['message  very personal'];
    }

    getPersonality = () => {
        return ['sdfsdfsdfsdfsdfsdf'];
    }

    getName = () => {
        return ['John Doe'];
    }

    getAdress = () => {
        return ['33, Kiev, Ukraine'];
    }

    getLanguages = () => {
        return ['Russian: Good, English: Good'];
    }

    getEducation = () => {
        return ['Trade school'];
    }

    getRecord= () => {
        return ['NA'];
    }

    getInfo = () => {
        return {
            sign: 'Vodoley',
            height: '153',
            weight: '50kg',
            eyeColor: 'Light Blue',
            hairColor: 'Blond',
            hairLength: 'very short (2-3c m)',
            ethnisity: 'White/European',
            martialStatus: 'Never Married',
            children: 'no',
            wantsChildren: 'yes',
            proffesion: 'teacher',
            occupation: 'teacher',
            religion: 'Christian',
            smoking: 'no',
            drinking: 'no',
            lookFor: 'Girl',
            lookAge: '18 to 50',
            lookEthnicity: 'NA',
            lookOther: 'NA'
        }
    }
    render() {
        return (
            <div className={style.wrapper}>
                <div className="shadow">
                    <Grid fluid className="title">
                        <Row>
                        	<Col xs={12} md={10} mdOffset={1} className={style.panel}>
                        		<Row>
        		                	<Col sm={12} md={4} >
        		                		<div className={style.bigImageHolder}>
        		                			<img src="/assets/img/default-avatar.jpg" alt="profile big image" />
        		                		</div>
        		                	</Col>

        		                	<Col sm={12} md={4} className={style.xBorders}>
                                        <InfoBlock title="Name" value={this.getName()}></InfoBlock>
                                        <InfoBlock title="Adress" value={this.getAdress()}></InfoBlock>
                                        <InfoBlock title="Personal Message" value={this.getMessage()}></InfoBlock>
                                        <InfoBlock title="Interests" value={this.getInterests()}></InfoBlock>
                                        <InfoBlock title="Languages" value={this.getLanguages()}></InfoBlock>
                                        <InfoBlock title="Criminal Record" value={this.getRecord()}></InfoBlock>
                                        <InfoBlock title="Education" value={this.getEducation()}></InfoBlock>
        		                	</Col>

        		                	<Col sm={12} md={4}>
                                        <AboutMe info={this.getInfo()}></AboutMe>
        		                	</Col>
                        		</Row>
                        	</Col>
                        </Row>
                    </Grid>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(
    mapStateToProps
)(ClientProfile);