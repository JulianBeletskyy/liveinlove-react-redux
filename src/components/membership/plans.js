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
            <div>
            <Carousel items={plans.map((plan, i) => this.printPlans(plan, i))} />
            <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                <input type="hidden" name="cmd" value="_s-xclick" />
                <input type="hidden" name="hosted_button_id" value="NMAD9VJLMEENS" />
                <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_subscribeCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" />
                <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1" />
            </form>
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