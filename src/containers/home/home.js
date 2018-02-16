import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Modal, Row, Col } from 'react-bootstrap'
import { Auth, Registration, MainModal } from 'components'
import { toggleModal } from 'actions'
import store from 'store/'
import Btn from 'components/form/buttons/button.js'
import style from './style.css';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    showModal = () => {
        store.dispatch(toggleModal(true))
    }

    render() {
        const { showModal } = this.props.signup
        return (
            <div className={style.homeWrapper} >
                <div className={style.shadow}>
                    <Grid fluid>
                        <Row>
                            <Col md={5} sm={12} >
                                <Auth/>
                            </Col>

                            <Col md={6} sm={12} mdOffset={1} className="title">
                                <div className={style.bigDesc}>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit
                                </div>

                                <div className={style.smallDesc}>
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse
                                   cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                                   proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    <Btn
                                        type="button"
                                        bsStyle="success"
                                        text="Show modal"
                                        onClick={this.showModal}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Grid>
                </div>
                <MainModal
                    body={<Registration />}
                    title="Registration"
                    show={showModal}
                />
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