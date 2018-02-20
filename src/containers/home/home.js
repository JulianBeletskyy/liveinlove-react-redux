import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import { Auth, Registration, MainModal } from 'components'
import { toggleModal } from 'actions'
import store from 'store/'
import BtnMain from 'components/form/buttons/main_button.js'
import style from './style.css';

class Home extends Component {
    showModal = () => {
        store.dispatch(toggleModal(true, 'registration'))
    }

    render() {
        const { registration } = this.props.modals
        return (
            <div className={style.homeWrapper} >
                <div className="shadow">
                    <Grid fluid>
                        <Row>
                            <Col md={3} sm={12} >
                                <Auth/>
                            </Col>

                            <Col md={6} sm={12} mdOffset={3} className="title">
                                <div className={style.bigDesc}>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit
                                </div>

                                <div className={style.smallDesc}>
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse
                                   cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                                   proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                   <div>
                                    <BtnMain
                                        type="button"
                                        bsStyle="success"
                                        text="Registration"
                                        onClick={this.showModal}
                                    />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Grid>
                </div>
                <MainModal
                    body={<Registration />}
                    title="Registration"
                    show={registration}
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