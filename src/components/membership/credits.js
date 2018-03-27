import React, { Component } from 'react'
import store from 'store'
import { connect } from 'react-redux'
import { toggleModal, getPackages, setActivePackage, buyPackage } from 'actions'
import { FormGroup } from 'react-bootstrap'
import PackageItem from './package_item.js'

class Credits extends Component {
    constructor(props) {
        super(props)
        this.user = {}
        store.dispatch(getPackages(this.props.user.token))
    }

    setPackage = (item) => {
        const data = {
            id: item.id,
            price: (item.price - (item.price / 100 * this.props.user.data.membership.discount)).toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]
        }
        store.dispatch(setActivePackage(data))
    }

    renderPayPal = () => {
        window.paypal.Button.render({
            env: 'sandbox', // sandbox | production
            commit: true,
            style: {
                label: 'paypal',
                size:  'large',    // small | medium | large | responsive
                shape: 'rect',     // pill | rect
                color: 'blue',     // gold | blue | silver | black
                tagline: false    
            },
            client: {
                sandbox:    'AXacobXZw7juas6mFNcZ5pJ0jcVEbKuY78wH8zd8_s3955vUJ0uD-muT2NyKd1TzLV-bKgGx5yaaXI2I',
                production: '<insert production client id>'
            },

            payment: (data, actions) => {
                return actions.payment.create({
                    payment: {
                        transactions: [
                            {
                                amount: { total: this.props.memberships.active_package.price, currency: 'USD' }
                            }
                        ]
                    }
                });
            },
            onAuthorize: (data, actions) => {
                return actions.payment.execute().then(() => {
                    const mas = {
                        paypal_id: data.paymentID,
                        package_id: this.props.memberships.active_package.id
                    }
                    store.dispatch(buyPackage(mas, this.props.user.token))
                    store.dispatch(toggleModal(false, 'credits'))
                });
            }
        }, '#paypal-button');
    }
    
    componentDidMount() {
       this.renderPayPal()
    }

    printPackages = (item, i) => {
        return <PackageItem item={item} key={i} active={this.props.memberships.active_package} discount={this.props.user.data.membership} onClick={() => this.setPackage(item)} />
    }

    render() {
        const hiddenClass = this.props.memberships.active_package.id ? '' : 'hidden'
        return (
            <div>
                <FormGroup>
                    { this.props.memberships.packages.map((item, i) => this.printPackages(item, i))}
                </FormGroup>
                <div className={hiddenClass + " text-center"} id="paypal-button"></div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        memberships: {
            packages: state.memberships.packages,
            active_package: state.memberships.active_package
        },
        user: {
            token: state.user.token,
            data: {
                membership: state.user.data.membership
            }
        }
    }
}

export default connect(
    mapStateToProps
)(Credits);