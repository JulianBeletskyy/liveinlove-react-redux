import React, { Component } from 'react'
import { connect } from 'react-redux'
import store, { history } from 'store'
import { Row, Col } from 'react-bootstrap'
import { setActiveCategory, setCart } from 'actions'
import ProductsBlock from 'components/shop/products_block.js'
import ProductInfo from 'components/shop/product_info.js'
import { Route, Switch } from 'react-router-dom'
import CategoryLink from 'components/shop/category_link.js'

class Shop extends Component {
    setCategory = (e) => {
        store.dispatch(setActiveCategory(e.target.id * 1))
        history.push('/shop')
    }

    printCategory = (category, i) => {
        return <CategoryLink key={i} text={category.name} id={category.id} active={this.props.shop.active_category} onClick={this.setCategory} />
    }

    getById = (id) => {
        for (let prod of this.props.shop.products_list) {
            if (prod.id === id * 1) {
                return prod
            }
        }
    }

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

	render() {
        return (
            <Row>
                <Col sm={2}>
                    {this.props.shop.categories_list.map((category, i) => this.printCategory(category, i))}
                </Col>
                <Col sm={10}>
                    <Switch>
                        <Route path="/shop" exact render={() => <ProductsBlock products={this.props.shop.products_list} addToCart={(e) => this.addToCart(e)} />} />
                        <Route path="/shop/:prodId" exact render={(props) => <ProductInfo product={this.getById(props.match.params.prodId)} addToCart={(e) => this.addToCart(e)} />} />
                    </Switch>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        shop: {
            categories_list: state.shop.categories_list,
            products_list: state.shop.products_list,
            active_category: state.shop.active_category
        }
    }
}

export default connect(
    mapStateToProps
)(Shop)