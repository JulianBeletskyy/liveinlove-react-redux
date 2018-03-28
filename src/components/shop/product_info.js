import React, { Component } from 'react'
import store from 'store'
import { getProduct } from 'actions'
import { Row, Col, FormGroup } from 'react-bootstrap'
import style from './style.css'
import BtnMain from 'components/form/buttons/main_button.js'
import { connect } from 'react-redux'
import { Loader } from 'containers'

class ProductInfo extends Component {
    constructor(props) {
        super(props)
        if (props.match.params.prodId) {
            store.dispatch(getProduct(props.match.params.prodId, props.user.token))
        }
    }

	render() {
        return (
                this.props.match.params.prodId * 1 !== this.props.shop.product.id
                ?   <Loader />
                :   <Row>
                        <Col sm={6}>
                            <img className={style.bigImg} src={this.props.shop.product.image} alt="" />
                        </Col>
                        <Col sm={6}>
                            <div className="font-bebas">
                                <h1 className={style.title}>{this.props.shop.product.name}</h1>
                            </div>
                            <div className="font-bebas">
                                <strong className={style.infoPrice}>${this.props.shop.product.price}</strong>
                            </div>
                            <FormGroup>
                                <span>{this.props.shop.product.description}</span>
                            </FormGroup>
                            <BtnMain
                                type="button"
                                bsStyle="success"
                                icon={<i className="fas fa-gift"></i>}
                                text="Add to cart"
                                onClick={() => this.props.addToCart(this.props.shop.product)} />
                        </Col>
                    </Row>
                );
    }
}

const mapStateToProps = (state) => {
    return {
        shop: {
            product: state.shop.product
        },
        user: {
            token: state.user.token
        }
    }
}

export default connect(
    mapStateToProps
)(ProductInfo)