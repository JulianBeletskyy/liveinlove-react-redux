import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from 'store'
import { setActiveCategory } from 'actions'
import { Grid, Row, Col, FormGroup } from 'react-bootstrap'
import style from './style.css'
import AvatarImg from 'components/gallery/avatar_img.js'
import SmallDivider from 'components/divider/small_divider.js'
import ProductsBlock from 'components/shop/products_block.js'
import ProductInfo from 'components/shop/product_info.js'
import CategoryLink from 'components/shop/category_link.js'
import { Route, Switch } from 'react-router-dom'


class Shop extends Component {
    constructor(props) {
        super(props)
        this.member = props.location.state
    }

    setCategory = (e) => {
        store.dispatch(setActiveCategory(e.target.id * 1))
    }

    printCategory = (category, i) => {
        return <CategoryLink key={i} text={category.name} id={category.id} active={this.props.shop.active_category} onClick={this.setCategory} />
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
                                    <Route path="/member/:id/shop" exact render={() => <ProductsBlock member={this.member} products={this.props.shop.products_list} />} />
                                    <Route path="/member/:id/shop/:prodKey" exact render={(props) => <ProductInfo product={this.props.shop.products_list[props.match.params.prodKey]} />} />
                                </Switch>
                            </Col>
                            <Col sm={2} className="text-center">
                                <FormGroup>
                                    <strong>Receiver</strong>
                                </FormGroup>
                                <FormGroup>
                                    <AvatarImg src={this.member.avatar.croped} />
                                </FormGroup>
                                <FormGroup>
                                    <span className="font-bebas">{this.member.first_name + ' ' + this.member.last_name}</span>
                                </FormGroup>
                                <SmallDivider text="Cart" />
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