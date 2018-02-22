import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
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
        const { data } = this.props.user
        console.log(data)
        return (
            <div className={style.wrapper}>
                <div className="shadow">
                    <Grid fluid className="title">
                        <Row>
                        	<Col xs={12} md={10} mdOffset={1} className={style.panel}>
                        		<Row>
        		                	<Col sm={12} md={4} >
        		                		<div className={style.bigImageHolder}>
        		                			<img 
                                                src={data.avatar[0].croped} 
                                                alt="profile big image" 
                                            />
        		                		</div>
        		                	</Col>

        		                	<Col sm={12} md={4} className={style.xBorders}>
                                        <InfoBlock title="Name" value={[data.first_name + ' ' + data.last_name]}></InfoBlock>
                                        <InfoBlock title="Adress" value={[data.country + ', ' + data.city]}></InfoBlock>
                                        <InfoBlock title="Personal Message" value={[data.message]}></InfoBlock>
                                        <InfoBlock title="Interests" value={data.interests}></InfoBlock>
        		                	</Col>

        		                	<Col sm={12} md={4}>
                                        <AboutMe 
                                            info={this.getInfo()} 
                                        />
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