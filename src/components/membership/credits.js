import React, { Component } from 'react'
import store, { history } from 'store'
import { connect } from 'react-redux'
import { toggleModal, getPackages, setMembershipsData, buyPackage, setSendingMessage, setActiveTab, buyMessage, buyAttach, setBuyingAttach } from 'actions'
import { FormGroup } from 'react-bootstrap'
import PackageItem from './package_item.js'
import { confirmAlert } from 'react-confirm-alert'

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
        store.dispatch(setMembershipsData(data, 'active_package'))
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
                sandbox:    'AfDGqe6kXnSsTM9gDI2OZdUXxrydoxVCG7CZbp76Nr-NdDvHjyKs7W52X7n8s8_i4k6cQqwF7gor72f_',
                production: 'AUjZF0corGMnwDfnp4_EGJkFESZn6u96_wnxqVL2XNQ_RCkqnHjLJaNRKSB9j4Ypn4LniWukXuSJ_bF7'
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
                    .then(res => {
                        if (Object.keys(this.props.messages.sendingMessage).length && res) {
                            const totalCredits = this.props.memberships.packages.find(item => item.id === mas.package_id).credits + this.props.user.data.credits
                            if (totalCredits >= this.props.messages.sendingMessage.letterPrice) {
                                store.dispatch(buyMessage(this.props.messages.sendingMessage, this.props.user.token))
                                .then(res => {
                                    store.dispatch(setSendingMessage({}))
                                    store.dispatch(setActiveTab('sent', 'mail'))
                                    store.dispatch(toggleModal(false, 'credits'))
                                    history.push('/mail/main')
                                })
                                return
                            } else {
                                confirmAlert({
                                    title: '',
                                    message: 'You do not have enough dibs to send message. Click Buy Dibs to chose the package.',
                                    buttons: [
                                        {
                                            label: 'Cancel',
                                            onClick: () => {
                                                store.dispatch(setSendingMessage({}))
                                            }
                                        }, {
                                            label: 'Buy Dibs',
                                            onClick: () => {
                                                store.dispatch(toggleModal(true, 'credits'))
                                            }
                                        }
                                    ]
                                })
                            }
                        } else if (Object.keys(this.props.messages.buyingAttach).length && res) {
                            store.dispatch(buyAttach(this.props.messages.buyingAttach, this.props.user.token))
                            store.dispatch(setBuyingAttach({}))
                            store.dispatch(toggleModal(false, 'credits'))
                        }
                    })
                    store.dispatch(toggleModal(false, 'credits'))
                });
            }
        }, '#paypal-button');
    }

    componentWillUnmount() {
        store.dispatch(setMembershipsData({id: 0, price: ''}, 'active_package'))
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
                membership: state.user.data.membership,
                credits: state.user.data.credits,
            }
        },
        messages: {
            sendingMessage: state.messages.sendingMessage,
            buyingAttach: state.messages.buyingAttach,
        }
    }
}

export default connect(
    mapStateToProps
)(Credits);