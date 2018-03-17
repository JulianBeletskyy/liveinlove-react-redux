import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import ProductPreview from './product_preview.js'

class ProductsBlock extends Component {
	printProducts = (product, i) => {
		return <Col xs={6}><ProductPreview key={i} product={product} prodKey={i} /></Col>
	}

    render() {
        return (
            <Row>
               {this.props.products.map((product, i) => this.printProducts(product, i))}
            </Row>
        );
    }
}

export default ProductsBlock