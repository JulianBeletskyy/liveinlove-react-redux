import React, { Component } from 'react'
import style from 'components/profile/about_me.css'
import { Row, Col, FormGroup } from 'react-bootstrap'
import SmallDivider from 'components/divider/small_divider.js'

class InfoBlock extends Component {
    render() {
        const data = this.props.member
        let classRole = data.role === 'client' ? 'client' : 'girl'
       	return (
       		<div className={style.wrapper + ' ' + classRole}>
                <Row>
                    <Col sm={6}>
                        <FormGroup>
                            <SmallDivider
                                text="About Me"
                            />
                        </FormGroup>
                        <Row>
                            <Col sm={12}>
                                <FormGroup>
                                    <div>
                                        <span className={style.middleTitle + ' title'}>Personal message</span>
                                    </div>
                                  <span className="small-italic">{data.message}</span>
                                </FormGroup>
                                <FormGroup>
                                    <SmallDivider
                                        text={'I am looking for a ' + (data.role === 'client' ? 'woman' : 'man')}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <div>
                                        <span className={style.middleTitle + ' title'}>Age</span>
                                    </div>
                                    <span className="small-italic">from {data.match.from} to {data.match.to}</span>
                                </FormGroup>
                                <FormGroup>
                                    <div>
                                        <span className={style.middleTitle + ' title'}>Ethnicity</span>
                                    </div>
                                    <span className="small-italic">{data.find_ethnicity_value.join(', ')}</span>
                                </FormGroup>
                            </Col>
                            
                        </Row>
                    </Col>
                    <Col sm={6}>
                        <FormGroup>
                            <SmallDivider
                                text={'Info'}
                            />
                        </FormGroup>
                        <Row>
                            <Col sm={6}>
                                <FormGroup>
                                    <div>
                                        <span className={style.middleTitle + ' title'}>Birthday</span>
                                    </div>
                                  <span className="small-italic">{data.birthday.day + '.' + data.birthday.month + '.' + data.birthday.year}</span>
                                </FormGroup>
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
                                    <span className="small-italic">{data.eyes}</span>
                                </FormGroup>
                                <FormGroup>
                                    <div>
                                        <span className={style.middleTitle + ' title'}>Hair Color</span>
                                    </div>
                                    <span className="small-italic">{data.hair_color}</span>
                                </FormGroup>
                                <FormGroup>
                                    <div>
                                        <span className={style.middleTitle + ' title'}>Hair Length</span>
                                    </div>
                                    <span className="small-italic">{data.hair_length}</span>
                                </FormGroup>
                            </Col>
                            <Col sm={6}>
                                <FormGroup>
                                    <div>
                                        <span className={style.middleTitle + ' title'}>Ethnicity</span>
                                    </div>
                                    <span className="small-italic">{data.ethnicity}</span>
                                </FormGroup>
                                {
                                    data.role === 'girl'
                                    ? <FormGroup>
                                        <div>
                                            <span className={style.middleTitle + ' title'}>Religion</span>
                                        </div>
                                        <span className="small-italic">{data.religion}</span>
                                    </FormGroup>
                                    : ''
                                }
                                <FormGroup>
                                    <div>
                                        <span className={style.middleTitle + ' title'}>Marital Status</span>
                                    </div>
                                    <span className="small-italic">{data.marital_status}</span>
                                </FormGroup>  
                                <FormGroup>
                                    <div>
                                        <span className={style.middleTitle + ' title'}>Have Children</span>
                                    </div>
                                    <span className="small-italic">{data.children}</span>
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
                   {
                        data.role === 'girl'
                        ?   <Col sm={6} smOffset={6}>
                                <FormGroup>
                                    <SmallDivider
                                        text="Education"
                                    />
                                </FormGroup>
                                <Row>
                                    <Col sm={6}>
                                        <FormGroup>
                                            <div>
                                                <span className={style.middleTitle + ' title'}>Education</span>
                                            </div>
                                            <span className="small-italic">{data.education}</span>
                                        </FormGroup>
                                        <FormGroup>
                                            <div>
                                                <span className={style.middleTitle + ' title'}>Ocupation</span>
                                            </div>
                                            <span className="small-italic">{data.occupation}</span>
                                        </FormGroup>
                                        <FormGroup>
                                            <div>
                                                <span className={style.middleTitle + ' title'}>Profession</span>
                                            </div>
                                            <span className="small-italic">{data.profession}</span>
                                        </FormGroup>
                                    </Col>
                                    <Col sm={6}>
                                        <FormGroup>
                                            <div>
                                                <span className={style.middleTitle + ' title'}>Primary Language</span>
                                            </div>
                                            <span className="small-italic">{data.primary_language}</span>
                                        </FormGroup>
                                        <FormGroup>
                                            <div>
                                                <span className={style.middleTitle + ' title'}>Russian Language</span>
                                            </div>
                                            <span className="small-italic">{data.russian_language}</span>
                                        </FormGroup>
                                        <FormGroup>
                                            <div>
                                                <span className={style.middleTitle + ' title'}>English Language</span>
                                            </div>
                                            <span className="small-italic">{data.english_language}</span>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Col>
                        : ''
                   }
                   
                </Row>
       		</div>
       	);
    }
}

export default InfoBlock