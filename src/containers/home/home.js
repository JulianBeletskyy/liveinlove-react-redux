import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import { Auth, Registration, MainModal, MainPanel, Recovery } from 'components'
import { toggleModal, setRecoveryHash } from 'actions'
import store, { history } from 'store'
import BtnMain from 'components/form/buttons/main_button.js'
import style from './style.css';

class Home extends Component {
    constructor(props) {
        super(props)
        if (props.match.params.hash) {
            store.dispatch(toggleModal(true, 'recovery'))
            store.dispatch(setRecoveryHash(props.match.params.hash))
            history.push('/');
        }
    }

    showModal = () => {
        store.dispatch(toggleModal(true, 'registration'))
    }

    render() {
        const { registration, login, recovery } = this.props.modals
        return (
            <div className={style.homeWrapper} >
                <div className="shadow">
                    <Grid fluid>
                        <Row>
                            <Col md={6} sm={12} >
                                <MainPanel
                                    title="Registration"
                                    iconClass="fas fa-address-card"
                                    body={<Registration />}
                                /> 
                            </Col>

                            <Col md={6} sm={12} className="title">
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
                    keyModal="registration"
                    size="lg"
                />
                <MainModal
                    body={<Auth />}
                    title="LOg IN"
                    show={login}
                    keyModal="login"
                />
                <MainModal
                    body={<Recovery />}
                    title="Recovery"
                    show={recovery}
                    keyModal="recovery"
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