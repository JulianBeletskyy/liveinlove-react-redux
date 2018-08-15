import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import ProductPreview from './product_preview.js'

class ProductsBlock extends Component {
	printProducts = (product, i) => {
		return  <Col xs={6} key={i}>
                    <ProductPreview 
                        product={product} 
                        prodKey={i}
                        addToCart={() => this.props.addToCart(product)}
                        member={this.props.member} />
                </Col>
	}

    render() {
        return (
            <div>
                <Row>
                   {this.props.products.map((product, i) => this.printProducts(product, i))}
                </Row>
                {
                    this.props.more
                    ?   <div className="form-group font-bebas text-center fs-18">
                            <a href="javascript:;" onClick={this.props.seeMore}><strong>see more</strong></a>
                        </div>
                    :   null
                }
            </div>
        );
    }
}

export default ProductsBlock