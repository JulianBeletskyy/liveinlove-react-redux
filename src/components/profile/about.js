import React, { Component } from 'react'
import { connect } from 'react-redux'
import { MONTH } from 'config'

class About extends Component {

    getBirthday = date => {
        return `${date.day} ${MONTH[date.month - 1]}`
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

        return (
            <div className="pt-15 mb-5">
            	<div className="row">
            		<div className="col-sm-6">
	            		<div className="row">
		                    <div className="col-xs-5">
		                        <span className="font-bebas fs-18">From: </span>
		                    </div>
		                    <div className="col-xs-7">
		                        <div>{data.city}, {data.country.country_name}</div>
		                    </div>	                </div>
		                <div className="row">
		                    <div className="col-xs-5">
		                        <span className="font-bebas fs-18">Seeking: </span>
		                    </div>
		                    <div className="col-xs-7">
		                        <div>
		                        	{this.props.user.data.role === 'client' ? 'woman' : 'man'} from {data.match.from} to {data.match.to}
		                    	</div>
		                    </div>
		                </div>
		                <div className="row">
		                    <div className="col-xs-5">
		                        <span className="font-bebas fs-18">Birthdate: </span>
		                    </div>
		                    <div className="col-xs-7">
		                        <div>{this.getBirthday(data.birth)}</div>
		                    </div>
		                </div>
		                <div className="row">
		                    <div className="col-xs-5">
		                        <span className="font-bebas fs-18">Star sign: </span>
		                    </div>
		                    <div className="col-xs-7">
		                        <div>{data.zodiac}</div>
		                    </div>
		                </div>
		                <div className="row">
		                    <div className="col-xs-5">
		                        <span className="font-bebas fs-18">Height: </span>
		                    </div>
		                    <div className="col-xs-7">
		                        <div>{data.height.cm} cm / {data.height.inch}</div>
		                    </div>
		                </div>
		                <div className="row">
		                    <div className="col-xs-5">
		                        <span className="font-bebas fs-18">Weight: </span>
		                    </div>
		                    <div className="col-xs-7">
		                        <div>{data.weight.kg} kg / {data.weight.lbs} lbs</div>
		                    </div>
		                </div>
		                <div className="row">
		                    <div className="col-xs-5">
		                        <span className="font-bebas fs-18">Body style: </span>
		                    </div>
		                    <div className="col-xs-7">
		                        <div>{data.body_style.value || 'N/A'}</div>
		                    </div>
		                </div>
		                <div className="row">
		                    <div className="col-xs-5">
		                        <span className="font-bebas fs-18">Eye color: </span>
		                    </div>
		                    <div className="col-xs-7">
		                        <div>{data.eyes.value}</div>
		                    </div>
		                </div>
		                <div className="row">
		                    <div className="col-xs-5">
		                        <span className="font-bebas fs-18">Eyewear: </span>
		                    </div>
		                    <div className="col-xs-7">
		                        <div>{data.eye_wear.value || 'N/A'}</div>
		                    </div>
		                </div>
		                <div className="row">
		                    <div className="col-xs-5">
		                        <span className="font-bebas fs-18">Hair Color: </span>
		                    </div>
		                    <div className="col-xs-7">
		                        <div>{data.hair_color.value}</div>
		                    </div>
		                </div>
		                <div className="row">
		                    <div className="col-xs-5">
		                        <span className="font-bebas fs-18">Hair Length: </span>
		                    </div>
		                    <div className="col-xs-7">
		                        <div>{data.hair_length.value}</div>
		                    </div>
		                </div>
		                {
		                    this.props.user.data.role === 'client'
		                    ?   <div className="row">
		                            <div className="col-xs-5">
		                                <span className="font-bebas fs-18">Ethnicity: </span>
		                            </div>
		                            <div className="col-xs-7">
		                                <div>{data.ethnicity.value || 'N/A'}</div>
		                            </div>
		                        </div>
		                    :   null
		                }
		                <div className="row">
		                    <div className="col-xs-5">
		                        <span className="font-bebas fs-18">Religion: </span>
		                    </div>
		                    <div className="col-xs-7">
		                        <div>{data.religion.value}</div>
		                    </div>
		                </div>
		                <div className="row">
		                    <div className="col-xs-5">
		                        <span className="font-bebas fs-18">Marital Status: </span>
		                    </div>
		                    <div className="col-xs-7">
		                        <div>{data.marital_status.value}</div>
		                    </div>
		                </div>
		                <div className="row">
		                    <div className="col-xs-5">
		                        <span className="font-bebas fs-18">Children: </span>
		                    </div>
		                    <div className="col-xs-7">
		                        <div>{data.children.value}</div>
		                    </div>
		                </div>
		                {
		                    data.about_children.length
		                    ?   <div className="row">
		                            <div className="col-xs-5">
		                                <span className="font-bebas fs-18">About Children: </span>
		                            </div>
		                            <div className="col-xs-7">
		                                <div>{data.about_children.map((item, i) => <div><span className="text-capitalize">{item.sex}</span> - {this.getAge(item.birth)}</div>)}</div>
		                            </div>
		                        </div>
		                    :   null
		                }
		                <div className="row">
		                    <div className="col-xs-5">
		                        <span className="font-bebas fs-18">Want children: </span>
		                    </div>
		                    <div className="col-xs-7">
		                        <div>{data.want_children.value}</div>
		                    </div>
		                </div>
		                <div className="row">
		                    <div className="col-xs-5">
		                        <span className="font-bebas fs-18">Education: </span>
		                    </div>
		                    <div className="col-xs-7">
		                        <div>{data.education.value}</div>
		                    </div>
		                </div>
		                <div className="row">
		                    <div className="col-xs-5">
		                        <span className="font-bebas fs-18">Field of work: </span>
		                    </div>
		                    <div className="col-xs-7">
		                        <div>{data.field_of_work.value || 'N/A'}</div>
		                    </div>
		                </div>
		                <div className="row">
		                    <div className="col-xs-5">
		                        <span className="font-bebas fs-18">Employment Status: </span>
		                    </div>
		                    <div className="col-xs-7">
		                        <div>{data.employment_status.value || 'N/A'}</div>
		                    </div>
		                </div>
		                <div className="row">
		                    <div className="col-xs-5">
		                        <span className="font-bebas fs-18">Smoke: </span>
		                    </div>
		                    <div className="col-xs-7">
		                        <div>{data.smoke.value}</div>
		                    </div>
		                </div>
		                <div className="row">
		                    <div className="col-xs-5">
		                        <span className="font-bebas fs-18">Drink: </span>
		                    </div>
		                    <div className="col-xs-7">
		                        <div>{data.drink.value}</div>
		                    </div>
		                </div>
		                {
		                	data.languages.length
		                	? 	<div className="row">
				                    <div className="col-xs-5">
				                        <span className="font-bebas fs-18">Languages: </span>
				                    </div>
				                    <div className="col-xs-7">
				                        <div>{data.languages.map((item, i) => <div key={i}>{item.name} - {item.level_value}</div>)}</div>
				                    </div>
				                </div>
		                	: 	null 
		                }
	                </div>
	                <div className="col-sm-6">
	                	<div>
                            <h4 className="text-dark-blue"><strong>Interests</strong></h4>
                            <div>
                                {data.interests_value.length ? data.interests_value.join(', ') : null}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-dark-blue"><strong>More about me</strong></h4>
                            <div>{data.about_me}</div>
                        </div>
                        <div>
                            <h4 className="text-dark-blue"><strong>The one I would like to meet</strong></h4>
                            <div>
                                {data.like_to_meet}
                            </div>
                        </div>
                        {
                            this.props.user.data.role === 'girl'
                            ?   <div>
                                    <div>
                                        <h4 className="text-dark-blue"><strong>More about my leisure time</strong></h4>
                                        <div>
                                            {data.leisure_time}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-dark-blue"><strong>About my family</strong></h4>
                                        <div>
                                            {data.about_family}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-dark-blue"><strong>My Future Goals</strong></h4>
                                        <div>
                                            {data.future_goals}
                                        </div>
                                    </div>
                                </div>
                            :   null
                        }
	                </div>
                </div>
            </div>
        )
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
)(About)
