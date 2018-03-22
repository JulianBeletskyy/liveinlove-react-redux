import React, { Component } from 'react'
import { FormGroup, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import store from 'store'
import { setCart, setAlert } from 'actions'
import style from './style.css'
import BtnMain from 'components/form/buttons/main_button.js'

class Cart extends Component {
    getCart = () => {
        const data = window.localStorage.getItem('cart');
        return JSON.parse(data ? data : '[]');
    }

    addToCart = (product) => {
        let cart  = this.getCart()
        let check = false

        cart = cart.map((item) => {
            if (item.product && item.product.id === product.id) {
                item.count++
                check = true;
            }
            return item;
        });

        if ( ! check) {
            cart.push({product: product, count: 1});
        }
        
        window.localStorage.setItem('cart', JSON.stringify(cart));
        store.dispatch(setCart(this.getCart()))
    }

    removeFromCart = (product) => {
        let cart = this.getCart()
        cart = cart.map((item) => {
            if (item.product.id === product.id) {
                item.count--
            }
            return item
        })

        cart = cart.filter((item) => {
            return item.count !== 0
        })
        
        window.localStorage.setItem('cart', JSON.stringify(cart));
        store.dispatch(setCart(this.getCart()))
    }

    removeItemCart = (product) => {
         let cart = this.getCart()
         cart = cart.filter((item) => {
            return item.product.id !== product.id
        })
        window.localStorage.setItem('cart', JSON.stringify(cart));
        store.dispatch(setCart(this.getCart()))
    }

    clearCart = () => {
        window.localStorage.setItem('cart', '[]');
        store.dispatch(setCart(this.getCart()))
    }

    printCart = (item, i) => {
        return  <tr className="font-bebas" key={i}>
                    <td>
                        <img className={style.thumbnail} src={item.product.image} alt="" />
                    </td>
                    <td>
                        <span>{item.product.name}</span>
                    </td>
                    <td className="text-center">
                        <span>${item.product.price}</span>
                    </td>
                    <td className="text-center">
                        <span>
                            <span onClick={() => this.removeFromCart(item.product)} className={style.minus}>
                                <i className="fas fa-minus"></i>
                            </span>
                            {item.count}
                            <span onClick={() => this.addToCart(item.product)} className={style.plus}>
                                <i className="fas fa-plus"></i>
                            </span> 
                        </span>
                    </td>
                    <td className="text-center">
                        <strong>${item.count * item.product.price}</strong>
                    </td>
                    <td>
                        <span className={style.cross} onClick={() => this.removeItemCart(item.product)}>
                            <i className="fas fa-times text-danger"></i>
                        </span>
                    </td>
                </tr>
    }

    getTotal = () => {
        let total = 0
        this.props.shop.cart.map((item, i) => {
            total += item.product.price * item.count
        })
        return total
    }

    showMessage = () => {
        if (!this.props.receiver) {
            store.dispatch(setAlert('Choose receiver first', 'error'))
        } 
    }

    checkReceiver = (actions) => {
        return this.props.receiver ? actions.enable() : actions.disable()
    }

    componentDidMount() {
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
                sandbox:    'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
                production: '<insert production client id>'
            },

            validate: (actions) => {
                this.checkReceiver(actions)
            },

            onClick: () => {
                this.showMessage()
            },

            payment: (data, actions) => {
                return actions.payment.create({
                    payment: {
                        transactions: [
                            {
                                amount: { total: this.getTotal(), currency: 'USD' }
                            }
                        ]
                    }
                });
            },
            onAuthorize: (data, actions) => {
                return actions.payment.execute().then(function() {
                    console.log(data)
                    console.log(actions)
                });
            }
        }, '#paypal-button-cart');
    }

	render() {
        const hiddenClass = this.props.shop.cart.length ? '' : 'hidden'
        return (
            <Row>
                <Col sm={10}>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr className={style.titleTable}>
                                    <th>&nbsp;</th>
                                    <th>Products</th>
                                    <th className="text-center">Price</th>
                                    <th className="text-center">Quantity</th>
                                    <th className="text-center">Total</th>
                                    <th>&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody className={style.tableBody}>
                                {this.props.shop.cart.map((item, i) => this.printCart(item, i))}
                            </tbody>
                            <tfoot>
                                <tr className={style.titleTable}>
                                    <td></td>
                                    <td></td>
                                    <td className="text-center"></td>
                                    <td className="text-right font-bebas">
                                        <strong>Total:</strong>
                                    </td>
                                    <td className="text-center font-bebas">
                                        <strong>${this.getTotal()}</strong>
                                    </td>
                                    <td></td>
                                </tr>
                            </tfoot>
                        </table>
                        <FormGroup>
                            <div className={hiddenClass + " text-right"} id="paypal-button-cart"></div> 
                        </FormGroup>
                    </div>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        shop: {
            cart: state.shop.cart,
            receiver: state.shop.receiver
        }
    }
}

export default connect(
    mapStateToProps
)(Cart)