import React, { Component } from 'react'
import { Grid, Row, Col, FormGroup } from 'react-bootstrap'
import style from './style.css'
import AvatarImg from 'components/gallery/avatar_img.js'
import SmallDivider from 'components/divider/small_divider.js'


class Shop extends Component {
    constructor(props) {
        super(props)
        this.member = props.location.state
        console.log(this.member)
    }
    
    render() {
        return (
            <div className={style.homeWrapper}>
                <div className="pt-66 bg-blue">
                    <Grid className="bg-white pt-15">
                        <Col sm={2}>
                            Categories
                        </Col>
                        <Col sm={8}>

                        </Col>
                        <Col sm={2} className="text-center">
                            <FormGroup >
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
                    </Grid>
                </div>
            </div>
        );
    }
}

export default Shop