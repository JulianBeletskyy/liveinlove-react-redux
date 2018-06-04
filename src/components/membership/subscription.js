import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from 'store'
import { getMemberships } from 'actions'

class Subscription extends Component {
    constructor(props) {
        super(props)
        this.user = {}
        store.dispatch(getMemberships())
    }

    componentDidMount() {

    }

    createPlan = () => {
        
    }

    render() {
        return (
            <div className="row">
                <form id="createSubscription" action="https://www.sandbox.paypal.com/cgi-bin/websc" method="post" target="_top">
                    <input type="hidden" name="cmd" value="_xclick-subscriptions" />
                    <input type="hidden" name="business" value="ab-facilitator@upsale.ru" />
                    <input type="hidden" name="lc" value="GB" />

                    <input type="hidden" name="item_name" value="Service Pro" />
                    <input type="hidden" name="no_note" value="1" />
                    <input type="hidden" name="no_shipping" value="1" />
                    
                    <input type="hidden" name="return" value="http://localhost:3000/success" />

                    <input type="hidden" name="src" value="1" />
                    <input type="hidden" name="a3" value="5.00" />
                    
                    <input type="hidden" name="p3" value="1" />
                    <input type="hidden" name="t3" value="M" />

                    <input id="customData" type="hidden" name="custom" value="123123123" />
                    <input type="hidden" name="currency_code" value="USD" />

                    <button type="submit">Subscribe</button>
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
)(Subscription);