import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from 'store'
import { getMemberships } from 'actions'
import PlanItem from './plan_item.js'
import Carousel from 'components/carousel'
import style from './plans.css'

class Plans extends Component {
    constructor(props) {
        super(props)
        this.user = {}
        store.dispatch(getMemberships())
    }

    printPlans(plan, i) {
        return (<div className="col-lg-3 col-md-6" key={i}><PlanItem options={plan} /></div>)
    }

    render() {
        const { plans } = this.props.memberships

        return (
            <div className="row">
                {plans.map((plan, i) => this.printPlans(plan, i))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        memberships: {
            plans: state.memberships.plans
        }
    }
}

export default connect(
    mapStateToProps
)(Plans);