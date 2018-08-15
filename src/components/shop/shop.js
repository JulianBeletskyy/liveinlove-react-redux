import React, { Component } from 'react'
import { connect } from 'react-redux'
import store, { history } from 'store'
import { Row, Col } from 'react-bootstrap'
import { setCart, getCategories, getProducts, setActiveCategory, getMoreProducts } from 'actions'
import ProductsBlock from 'components/shop/products_block.js'
import ProductInfo from 'components/shop/product_info.js'
import { Route, Switch } from 'react-router-dom'
import CategoryLink from 'components/shop/category_link.js'

class Shop extends Component {
    constructor(props) {
        super(props)
        store.dispatch(getCategories(props.user.token)).then((res) => {
            if (res.length) {
                let cat_id = 0
                if (! this.props.shop.active_category) {
                    cat_id = res[0].id
                } else {
                    cat_id = this.props.shop.active_category
                }
                store.dispatch(setActiveCategory(cat_id))
                store.dispatch(getProducts(cat_id, props.user.token))
            }
        })
    }

    setCategory = (e) => {
        store.dispatch(setActiveCategory(e.target.id * 1))
        store.dispatch(getProducts(e.target.id * 1, this.props.user.token))
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

    seeMore = () => {
        store.dispatch(getMoreProducts(this.props.shop.products.next_link, this.props.user.token))
    }

	render() {
        const {list, last_page, current_page} = this.props.shop.products

        return (
            <Row>
                <Col sm={3}>
                    {this.props.shop.categories_list.map((category, i) => this.printCategory(category, i))}
                </Col>
                <Col sm={9}>
                    <Switch>
                        <Route path="/shop" exact render={() => <ProductsBlock more={current_page < last_page} seeMore={this.seeMore} products={list} addToCart={(e) => this.addToCart(e)} />} />
                        <Route path="/shop/:prodId" exact render={(props) => <ProductInfo {...props} addToCart={(e) => this.addToCart(e)} />} />
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
            products: state.shop.products,
            active_category: state.shop.active_category
        },
        user: {
            token: state.user.token
        }
    }
}

export default connect(
    mapStateToProps
)(Shop)