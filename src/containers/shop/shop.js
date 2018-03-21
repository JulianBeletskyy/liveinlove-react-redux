import React, { Component } from 'react'
import style from './style.css'
import { Grid } from 'react-bootstrap'
import { Route, Switch } from 'react-router-dom'
import Cart from 'components/shop/cart.js'
import Shoping from 'components/shop/shop.js'


class Shop extends Component {
    render() {
        return (
            <div className={style.homeWrapper}>
                <div className="pt-66 bg-blue">
                    <Grid className="bg-white pt-15">
                        <Switch>
                            <Route path="/shop" exact component={Shoping} />
                            <Route path="/shop/cart" exact component={Cart} />
                            <Route path="/shop/:prodId" exact component={Shoping} />
                        </Switch>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default Shop