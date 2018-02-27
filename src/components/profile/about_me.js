import React, { Component } from 'react'
import { connect } from 'react-redux'
import { history } from 'store'
import style from './about_me.css'
import { Row, Col, FormGroup } from 'react-bootstrap'
import SmallDivider from 'components/divider/small_divider.js'

class AboutMe extends Component {
    editProfile = () => {
        history.push('edit')
    }
    render() {
        const { data } = this.props.user
        let classRole = data.role == 'client' ? 'client' : 'girl'
       	return (
       		<div className={style.wrapper + ' ' + classRole}>
                <Row>
                    <Col sm={6}>
                        <FormGroup>
                            <SmallDivider
                                text="Main Information"
                            />
                        </FormGroup>
                        <FormGroup>
                            <div>
                                <span className={style.middleTitle + ' title'}>Address</span>
                            </div>
                             <span className="small-italic">{data.country + ' ' + data.city}</span>
                        </FormGroup>
                        <FormGroup>
                            <div>
                                <span className={style.middleTitle + ' title'}>Email</span>
                            </div>
                            <span className="small-italic">{data.email}</span>
                        </FormGroup>
                        <FormGroup>
                            <div>
                                <span className={style.middleTitle + ' title'}>Birthday</span>
                            </div>
                          <span className="small-italic">{data.birthday.day + '.' + data.birthday.month + '.' + data.birthday.year} ({data.age} years)</span>
                        </FormGroup>
                        <FormGroup>
                            <div>
                                <span className={style.middleTitle + ' title'}>Personal message</span>
                            </div>
                          <span className="small-italic">{data.message}</span>
                        </FormGroup>
                    </Col>

                    <Col sm={6}>
                        <FormGroup>
                            <SmallDivider
                                text="About Me"
                            />
                        </FormGroup>
                        <Row>
                            <Col sm={6}>
                                <FormGroup>
                                    <div>
                                        <span className={style.middleTitle + ' title'}>Height</span>
                                    </div>
                                    <span className="small-italic">{data.height.cm + ' cm'} / {data.height.inch + ' inch'}</span>
                                </FormGroup>
                                <FormGroup>
                                    <div>
                                        <span className={style.middleTitle + ' title'}>Weight</span>
                                    </div>
                                    <span className="small-italic">{data.weight.kg + ' kg'} / {data.weight.lbs + ' lbs'}</span>
                                </FormGroup>
                                <FormGroup>
                                    <div>
                                        <span className={style.middleTitle + ' title'}>Eyes color</span>
                                    </div>
                                    <span className="small-italic">{data.eyes.value}</span>
                                </FormGroup>
                                <FormGroup>
                                    <div>
                                        <span className={style.middleTitle + ' title'}>Hair Color</span>
                                    </div>
                                    <span className="small-italic">{data.hair_color.value}</span>
                                </FormGroup>
                                <FormGroup>
                                    <div>
                                        <span className={style.middleTitle + ' title'}>Hair Length</span>
                                    </div>
                                    <span className="small-italic">{data.hair_length.value}</span>
                                </FormGroup>
                            </Col>
                            <Col sm={6}>
                                <FormGroup>
                                    <div>
                                        <span className={style.middleTitle + ' title'}>Ethnicity</span>
                                    </div>
                                    <span className="small-italic">{data.ethnicity.value}</span>
                                </FormGroup>
                                {
                                    data.role === 'girl'
                                    ? <FormGroup>
                                        <div>
                                            <span className={style.middleTitle + ' title'}>Religion</span>
                                        </div>
                                        <span className="small-italic">{data.religion.value}</span>
                                    </FormGroup>
                                    : ''
                                }
                                <FormGroup>
                                    <div>
                                        <span className={style.middleTitle + ' title'}>Marital Status</span>
                                    </div>
                                    <span className="small-italic">{data.marital_status.value}</span>
                                </FormGroup>  
                                <FormGroup>
                                    <div>
                                        <span className={style.middleTitle + ' title'}>Have Children</span>
                                    </div>
                                    <span className="small-italic">{data.children.value}</span>
                                </FormGroup>
                                {
                                    data.role === 'girl'
                                    ? <FormGroup>
                                        <div>
                                            <span className={style.middleTitle + ' title'}>About Children</span>
                                        </div>
                                        <span className="small-italic">{data.about_children}</span>
                                    </FormGroup>
                                    : ''
                                }
                                <FormGroup>
                                    <div>
                                        <span className={style.middleTitle + ' title'}>Interests</span>
                                    </div>
                                    <span className="small-italic">{data.interests_value.join(', ')}</span>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={6}>
                        <FormGroup>
                            <SmallDivider
                                text={'I am looking for a ' + (data.role == 'client' ? 'woman' : 'man')}
                            />
                        </FormGroup>
                        <FormGroup>
                            <div>
                                <span className={style.middleTitle + ' title'}>Age</span>
                            </div>
                            <span className="small-italic">from {data.match.from} to {data.match.to}</span>
                        </FormGroup>
                        {
                            data.role === 'client'
                            ? <FormGroup>
                                <div>
                                    <span className={style.middleTitle + ' title'}>Ethnicity</span>
                                </div>
                                <span className="small-italic">{data.female_ethnicity_value.join(', ')}</span>
                            </FormGroup>
                            : ''
                        }
                   </Col>
                </Row>
       		</div>
       	);
    }
}

const mapStateToProps = (state) => {
    return {
        user: {
            data: state.user.data
        }
    }
}

export default connect(
    mapStateToProps
)(AboutMe);