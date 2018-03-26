import React, { Component } from 'react'
import store from 'store'
import { connect } from 'react-redux'
import { toggleModal, getPackages, setActivePackage, setAlert } from 'actions'
import { FormGroup } from 'react-bootstrap'
import PackageItem from './package_item.js'

class Credits extends Component {
    constructor(props) {
        super(props)
        this.user = {}
        store.dispatch(getPackages(this.props.user.token))
    }

    setPackage = (item) => {
        store.dispatch(setActivePackage(item))
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
                sandbox:    'AXacobXZw7juas6mFNcZ5pJ0jcVEbKuY78wH8zd8_s3955vUJ0uD-muT2NyKd1TzLV-bKgGx5yaaXI2I', //AXacobXZw7juas6mFNcZ5pJ0jcVEbKuY78wH8zd8_s3955vUJ0uD-muT2NyKd1TzLV-bKgGx5yaaXI2I //AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R
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
                return actions.payment.execute().then(function() {
                    store.dispatch(toggleModal(false, 'credits'))
                    console.log(data)
                    console.log(actions)
                });
            }
        }, '#paypal-button');
    }
    
    componentDidMount() {
       this.renderPayPal()
    }

    printPackages = (item, i) => {
        return <PackageItem item={item} key={i} active={this.props.memberships.active_package} onClick={() => this.setPackage(item)} />
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
            token: state.user.token
        }
    }
}

export default connect(
    mapStateToProps
)(Credits);