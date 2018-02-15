import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import { Auth, Registration } from 'components'
import style from './style.css';

class Home extends Component {
    render() {
        return (
            <div className={style.homeWrapper} >
                <div className={style.shadow}>
                    <Grid className="title">
                        <Row className={style.flexRow}>
                            <Col md={5} sm={12} >
                                <Auth/>
                            </Col>

                            <Col md={6} sm={12} mdOffset={1} className={style.flexCol}>
                                <div className={style.bigDesc}>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit
                                </div>

                                <div className={style.smallDesc}>
                                     Duis aute irure dolor in reprehenderit in voluptate velit esse
                                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </div>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(
    mapStateToProps
)(Home);