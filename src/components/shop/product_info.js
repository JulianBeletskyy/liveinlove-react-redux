import React, { Component } from 'react'
import { Row, Col, FormGroup } from 'react-bootstrap'
import style from './style.css'
import BtnMain from 'components/form/buttons/main_button.js'

class ProductInfo extends Component {
	render() {
        return (
            <Row>
                <Col sm={6}>
                    <img className={style.bigImg} src={this.props.product.image} alt="" />
                </Col>
                <Col sm={6}>
                    <div className="font-bebas">
                        <h1 className={style.title}>{this.props.product.name}</h1>
                    </div>
                    <div className="font-bebas">
                        <strong className={style.infoPrice}>{this.props.product.price}</strong>
                    </div>
                    <FormGroup>
                        <span>{this.props.product.description}</span>
                    </FormGroup>
                    <BtnMain
                        type="button"
                        bsStyle="success"
                        icon={<i className="fas fa-gift"></i>}
                        text="Add to cart"
                        onClick={() => this.props.addToCart(this.props.product)} />
                </Col>
            </Row>
        );
    }
}

export default ProductInfo