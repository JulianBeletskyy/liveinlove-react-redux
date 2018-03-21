import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from 'store'
import { setActiveCategory, setCart } from 'actions'
import { Grid, Row, Col } from 'react-bootstrap'
import { history } from 'store'
import style from './style.css'
import ProductsBlock from 'components/shop/products_block.js'
import ProductInfo from 'components/shop/product_info.js'
import CategoryLink from 'components/shop/category_link.js'
import { Route, Switch } from 'react-router-dom'
import Cart from 'components/shop/cart.js'


class Shop extends Component {
    setCategory = (e) => {
        store.dispatch(setActiveCategory(e.target.id * 1))
        history.push('/shop')
    }

    printCategory = (category, i) => {
        return <CategoryLink key={i} text={category.name} id={category.id} active={this.props.shop.active_category} onClick={this.setCategory} />
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

    getCart = () => {
        const data = window.localStorage.getItem('cart');
        return JSON.parse(data ? data : '[]');
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
    
    render() {
        return (
            <div className={style.homeWrapper}>
                <div className="pt-66 bg-blue">
                    <Grid className="bg-white pt-15">
                        <Row>
                            <Col sm={2}>
                                { this.props.shop.categories_list.map((category, i) => this.printCategory(category, i)) }
                            </Col>
                            <Col sm={8}>
                                <Switch>
                                    <Route 
                                        path="/shop" exact 
                                        render={() => <ProductsBlock 
                                            member={this.member} 
                                            products={this.props.shop.products_list} 
                                            addToCart={(e) => this.addToCart(e)} />} />
                                    <Route 
                                        path="/shop/cart" exact 
                                        render={(props) => <Cart 
                                            addToCart={(e) => this.addToCart(e)} 
                                            removeItemCart={(e) => this.removeItemCart(e)} 
                                            removeFromCart={(e) => this.removeFromCart(e)} />} />
                                    <Route 
                                        path="/shop/:prodKey" exact 
                                        render={(props) => <ProductInfo 
                                            product={this.props.shop.products_list[props.match.params.prodKey]} 
                                            addToCart={(e) => this.addToCart(e)} />} />
                                </Switch>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </div>
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