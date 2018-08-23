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

    getAge = date => {
        const [d,m,y] = date.split('/')
        const birthday = new Date(`${y}-${m}-${d}`)
        const ageDifMs = Date.now() - birthday.getTime()
        const ageDate = new Date(ageDifMs)
        return `${Math.abs(ageDate.getUTCFullYear() - 1970)} y.o.`
    }

    render() {
        const { data } = this.props.user
        let classRole = data.role === 'client' ? 'client' : 'girl'
       	return (
       		<div className={style.wrapper + ' ' + classRole}>
                <Row>
                    <Col sm={6}>
                        <Col sm={12}>
                            <FormGroup>
                                <SmallDivider text="Main Information" />
                            </FormGroup>
                        </Col>
                        <Col sm={6}>
                            <FormGroup>
                                <div>
                                    <span className={style.middleTitle + ' title'}>First Name</span>
                                </div>
                                <span className="small-italic">{data.first_name}</span>
                            </FormGroup>
                            <FormGroup>
                                <div>
                                    <span className={style.middleTitle + ' title'}>Last Name</span>
                                </div>
                                <span className="small-italic">{data.last_name}</span>
                            </FormGroup>
                            <FormGroup>
                                <div>
                                    <span className={style.middleTitle + ' title'}>Birthday</span>
                                </div>
                                <span className="small-italic">{data.birth.day + '.' + data.birth.month + '.' + data.birth.year} ({data.age} years)</span>
                            </FormGroup>
                            <FormGroup>
                                <div>
                                    <span className={style.middleTitle + ' title'}>Star sign</span>
                                </div>
                                <span className="small-italic">{data.zodiac}</span>
                            </FormGroup>
                            <FormGroup>
                                <div>
                                    <span className={style.middleTitle + ' title'}>Country</span>
                                </div>
                                <span className="small-italic">{data.country.country_name}</span>
                            </FormGroup>
                            <FormGroup>
                                <div>
                                    <span className={style.middleTitle + ' title'}>City</span>
                                </div>
                                <span className="small-italic">{data.city}</span>
                            </FormGroup>
                        </Col>
                        <Col sm ={6}>
                            <FormGroup>
                                <div>
                                    <span className={style.middleTitle + ' title'}>Email</span>
                                </div>
                                <span className="small-italic">{data.email}</span>
                            </FormGroup>
                            <FormGroup>
                                <div>
                                    <span className={style.middleTitle + ' title'}>Phone</span>
                                </div>
                                <span className="small-italic">{data.mobile}</span>
                            </FormGroup>
                        </Col>
                        {
                        data.role === 'girl'
                        ?
                        <Col sm={6}>
                            <FormGroup>
                                <div>
                                    <span className={style.middleTitle + ' title'}>Facebook</span>
                                </div>
                                <span className="small-italic">{data.facebook}</span>
                            </FormGroup>
                            <FormGroup>
                                <div>
                                    <span className={style.middleTitle + ' title'}>VK</span>
                                </div>
                                <span className="small-italic">{data.vk}</span>
                            </FormGroup>
                            <FormGroup>
                                <div>
                                    <span className={style.middleTitle + ' title'}>Other Social Media</span>
                                </div>
                                <span className="small-italic">{data.other_social}</span>
                            </FormGroup>
                        </Col> 
                        :''}
                    </Col>

                    <Col sm={6}>
                            <Col sm={12}>
                                <FormGroup>
                                    <SmallDivider text="Appearance" />
                                </FormGroup>
                            </Col>
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
                                        <span className={style.middleTitle + ' title'}>Body Style</span>
                                    </div>
                                    <span className="small-italic">{data.body_style.value}</span>
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
                                <FormGroup>
                                    <div>
                                        <span className={style.middleTitle + ' title'}>Eyes color</span>
                                    </div>
                                    <span className="small-italic">{data.eyes.value}</span>
                                </FormGroup>
                            </Col>
                            <Col sm ={6}>
                                <FormGroup>
                                    <div>
                                        <span className={style.middleTitle + ' title'}>Eye Wear</span>
                                    </div>
                                    <span className="small-italic">{data.eye_wear.value}</span>
                                </FormGroup>
                                <FormGroup>
                                    <div>
                                        <span className={style.middleTitle + ' title'}>Ethnicity</span>
                                    </div>
                                    <span className="small-italic">{data.ethnicity.value}</span>
                                </FormGroup>
                            </Col>
                        </Col>

                            <Col sm={6}>
                                <Col sm={12}>
                                    <FormGroup>
                                        <SmallDivider text="Lifestyle" />
                                    </FormGroup>
                                </Col>
                                <Col sm={6}>
                                    <FormGroup>
                                        <div>
                                            <span className={style.middleTitle + ' title'}>Marital Status</span>
                                        </div>
                                        <span className="small-italic">{data.marital_status.value}</span>
                                    </FormGroup>
                                    <FormGroup>
                                        <div>
                                            <span className={style.middleTitle + ' title'}>Religion</span>
                                        </div>
                                        <span className="small-italic">{data.religion.value}</span>
                                    </FormGroup>
                                    <FormGroup>
                                        <div>
                                            <span className={style.middleTitle + ' title'}>Smoke</span>
                                        </div>
                                        <span className="small-italic">{data.smoke.value}</span>
                                    </FormGroup>
                                    <FormGroup>
                                        <div>
                                            <span className={style.middleTitle + ' title'}>Drink</span>
                                        </div>
                                        <span className="small-italic">{data.drink.value}</span>
                                    </FormGroup>
                                </Col>
                                <Col sm={6}>                      
                                    <FormGroup>
                                        <div>
                                            <span className={style.middleTitle + ' title'}>Children</span>
                                        </div>
                                        <span className="small-italic">{data.children.value}</span>
                                    </FormGroup>
                                    {
                                    data.about_children.length && data.children.id != 2
                                    ?
                                    <FormGroup>
                                        <div>
                                            <span className={style.middleTitle + ' title'}>About Children</span>
                                        </div>
                                        <span className="small-italic">{data.about_children.map((item, i) => <div className="small-italic" key={i}>{item.sex} - {this.getAge(item.birth)}</div>)}</span>
                                    </FormGroup>
                                    :""}
                                    <FormGroup>
                                        <div>
                                            <span className={style.middleTitle + ' title'}>Want Children</span>
                                        </div>
                                        <span className="small-italic">{data.want_children.value}</span>
                                    </FormGroup>
                                    <FormGroup>
                                        <div>
                                            <span className={style.middleTitle + ' title'}>Ideal Match</span>
                                        </div>
                                        <span className="small-italic">From {data.match.from} to {data.match.to} </span>
                                    </FormGroup>
                                </Col>
                            </Col>

                            <Col sm={6}>
                                <Col sm = {12}>
                                    <FormGroup>
                                            <SmallDivider text="Work and Background" />
                                        </FormGroup>
                                    </Col>
                                <Col sm={6}>
                                    <FormGroup>
                                        <div>
                                            <span className={style.middleTitle + ' title'}>Living Situation</span>
                                        </div>
                                        <span className="small-italic">{data.living_situation.value}</span>
                                    </FormGroup>
                                    <FormGroup>
                                        <div>
                                            <span className={style.middleTitle + ' title'}>Education</span>
                                        </div>
                                        <span className="small-italic">{data.education.value}</span>
                                    </FormGroup>
                                    <FormGroup>
                                        <div>
                                            <span className={style.middleTitle + ' title'}>Field of Work</span>
                                        </div>
                                        <span className="small-italic">{data.field_of_work.value}</span>
                                    </FormGroup>
                                    <FormGroup>
                                        <div>
                                            <span className={style.middleTitle + ' title'}>Employment Status</span>
                                        </div>
                                        <span className="small-italic">{data.employment_status.value}</span>
                                    </FormGroup>
                                </Col>                          
                                <Col sm={6}>
                                    <FormGroup>
                                        <div>
                                            <span className={style.middleTitle + ' title'}>Languages</span>
                                        </div>
                                        <span className="small-italic">{data.languages.map((item, i) => <div key={i}>{item.name} - {item.level_value}</div>)}</span>
                                    </FormGroup>
                                </Col>
                            </Col>
                            <Col sm={6}>
                                <Col sm={12}>
                                    <FormGroup>
                                        <SmallDivider text="Interests" />
                                    </FormGroup>
                                    <FormGroup>
                                        <span className="small-italic">{data.interests_value.join(', ')}</span>
                                    </FormGroup>
                                </Col>
                            </Col>

                            <Col sm={6}>
                                <Col sm={12}>
                                    <FormGroup>
                                        <SmallDivider text="Other Information" />
                                    </FormGroup>
                                    <FormGroup>
                                        <div>
                                            <span className={style.middleTitle + ' title'}>More about me</span>
                                        </div>
                                        <span className="small-italic">{data.about_me}</span>
                                    </FormGroup>
                                    {
                                    data.role === 'girl'
                                    ? <div>
                                    <FormGroup>
                                        <div>
                                            <span className={style.middleTitle + ' title'}>About my family</span>
                                        </div>
                                        <span className="small-italic">{data.about_family}</span>
                                    </FormGroup>
                                    <FormGroup>
                                        <div>
                                            <span className={style.middleTitle + ' title'}>More about my Leisure time</span>
                                        </div>
                                        <span className="small-italic">{data.leisure_time}</span>
                                    </FormGroup>
                                    <FormGroup>
                                        <div>
                                            <span className={style.middleTitle + ' title'}>My future goals</span>
                                        </div>
                                        <span className="small-italic">{data.future_goals}</span>
                                    </FormGroup>
                                    </div>
                                : ""}                      
                                    <FormGroup>
                                        <div>
                                            <span className={style.middleTitle + ' title'}>The one I would like to meet</span>
                                        </div>
                                        <span className="small-italic">{data.like_to_meet}</span>
                                    </FormGroup>
                                </Col>
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