import React, { Component } from 'react'
import { FormGroup } from 'react-bootstrap'
import { connect } from 'react-redux'
import style from './style.css'
import BtnMain from 'components/form/buttons/main_button.js'
import SmallDivider from 'components/divider/small_divider.js'

class Cart extends Component {
    sendGift = () => {

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
                            <span onClick={() => this.props.removeFromCart(item.product)} className={style.minus}>
                                <i className="fas fa-minus"></i>
                            </span>
                            {item.count}
                            <span onClick={() => this.props.addToCart(item.product)} className={style.plus}>
                                <i className="fas fa-plus"></i>
                            </span> 
                        </span>
                    </td>
                    <td className="text-center">
                        <strong>${item.count * item.product.price}</strong>
                    </td>
                    <td>
                        <span onClick={() => this.props.removeItemCart(item.product)}>
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

	render() {
        return (
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
                </table>
                    
                    <SmallDivider />
                    <FormGroup className="text-right">
                        <strong className="font-bebas">Total: {this.getTotal()}</strong>
                    </FormGroup>
                    <FormGroup className="text-center">
                        <BtnMain
                            type="button"
                            bsStyle="success"
                            icon={<i className="fas fa-gift"></i>}
                            text="Send gift"
                            onClick={this.sendGift} />
                    </FormGroup>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        shop: {
            cart: state.shop.cart
        }
    }
}

export default connect(
    mapStateToProps
)(Cart)