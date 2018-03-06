import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from 'store'
import { getMemberships } from 'actions'
import PlanItem from './plan_item.js'
import Carousel from 'components/carousel'

class Plans extends Component {
    constructor(props) {
        super(props)
        this.user = {}
        store.dispatch(getMemberships())
    }

    printPlans(plan, i) {
        return (<PlanItem key={i} options={plan} />)
    }

    render() {
        const { plans } = this.props.memberships

        return (
            <Carousel
                items={plans.map((plan, i) => this.printPlans(plan, i))}
            />
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