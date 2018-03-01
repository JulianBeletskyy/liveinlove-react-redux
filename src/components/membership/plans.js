import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from 'store'
import {  Row, Col } from 'react-bootstrap'
import style from './plans.css'
import { getMemberships } from 'actions'
import PlanItem from './plan_item.js'

class Plans extends Component {
    constructor(props) {
        super(props)
        this.user = {}
        store.dispatch(getMemberships())
    }

    printPlans(plan, i) {
        if (plan.name !== 'Free') {
            return (<Col key={i} sm={4}><PlanItem options={plan}  /></Col>)
        }
    }

    render() {
        const { plans } = this.props.memberships
        return (
            <Row>
                { plans.map((plan, i) => this.printPlans(plan, i)) }
            </Row>
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