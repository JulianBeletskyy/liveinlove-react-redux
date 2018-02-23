import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col, FormGroup } from 'react-bootstrap'
import style from './style.css';
import InfoBlock from 'components/profile/info_block.js'
import AboutMe from 'components/profile/about_me.js'
import BtnMain from 'components/form/buttons/main_button.js'


class ClientProfile extends Component {
    render() {
        const { data } = this.props.user
        return (
            <div className="shadow">
                <Grid>
            		<Row>
                    	<Col sm={3}>
                            <FormGroup>
                    			<img 
                                    src={data.avatar[0].original} 
                                    alt="profile big image" 
                                    className="img-responsive"
                                />
                            </FormGroup>
                            <FormGroup>
                                <BtnMain 
                                    type="button"
                                    bsStyle="success btn-block"
                                    text="Edit Profile"
                                    onClick={this.showModal}
                                />
                            </FormGroup>
                    	</Col>

                    	<Col sm={6}>
                            <FormGroup>
                                <div className="title">
                                    <span className={style.bigTitle}>{data.first_name + ' ' + data.last_name}</span>
                                    <span className="small-italic">
                                        <i className="fas fa-map-marker-alt blue-color"></i>&nbsp;&nbsp;
                                        {data.country + ', ' + data.city}
                                    </span>
                                    <div><strong>Profile ID:</strong> {data.profile_id}</div>
                                    <div>{data.age}<span> years</span></div>
                                </div>
                                <div className={style.divider}>
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <div>
                                    <span className={style.middleTitle + ' title'}>Personal message</span>
                                </div>

                                <span className="small-italic">{data.message}</span>
                                <div className={style.divider}>
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <div>
                                    <span className={style.middleTitle + ' title'}>Interests</span>
                                </div>
                                <span className="small-italic">{data.interests.join(', ')}</span>
                                <div className={style.divider}>
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <div>
                                    <span className={style.middleTitle + ' title'}>I am looking for a wooman</span>
                                </div>
                                <div>
                                    <span className="title">Age: &nbsp;</span><span className="small-italic">from {data.match.from} to {data.match.to}</span>
                                </div>
                                <div>
                                    <span className="title">Ethnicity: &nbsp;</span><span className="small-italic">{data.female_ethnicity.join(', ')}</span>
                                </div>
                                <div className={style.divider}>
                                </div>
                            </FormGroup>
                    	</Col>

                    	<Col sm={3}>
                            <span className={style.middleTitle + ' title'}>About me</span>
                            <div className={style.divider}>
                            </div>
                            <div>
                                <span className="title">Birthday: &nbsp;&nbsp;</span>
                                <span className="small-italic">{data.birthday.day + '.' + data.birthday.month + '.' + data.birthday.year}</span>
                            </div>
                            <div>
                                <span className="title">Ethnicity: &nbsp;&nbsp;</span>
                                <span className="small-italic">{data.ethnicity}</span>
                            </div>
                             <div>
                                <span className="title">Height: &nbsp;&nbsp;</span>
                                <span className="small-italic">{data.height.cm + ' cm'} / {data.height.inch + ' inch'}</span>
                            </div>
                             <div>
                                <span className="title">Weight: &nbsp;&nbsp;</span>
                                <span className="small-italic">{data.weight.kg + ' kg'} / {data.weight.lbs + ' lbs'}</span>
                            </div>
                             <div>
                                <span className="title">Eyes color: &nbsp;&nbsp;</span>
                                <span className="small-italic">{data.eyes}</span>
                            </div>
                            <div>
                                <span className="title">Hair Color: &nbsp;&nbsp;</span>
                                <span className="small-italic">{data.hair_color}</span>
                            </div>
                            <div>
                                <span className="title">Hair Length: &nbsp;&nbsp;</span>
                                <span className="small-italic">{data.hair_length}</span>
                            </div>
                            <div>
                                <span className="title">Marital Status: &nbsp;&nbsp;</span>
                                <span className="small-italic">{data.marital_status}</span>
                            </div>
                            <div>
                                <span className="title">Have Children: &nbsp;&nbsp;</span>
                                <span className="small-italic">{data.children}</span>
                            </div>
                    	</Col>
            		</Row>
                </Grid>
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