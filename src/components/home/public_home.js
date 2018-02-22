import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import { Auth, Registration, MainModal, MainPanel, Recovery } from 'components'
import { toggleModal, setRecoveryHash, activateUser } from 'actions'
import store, { history } from 'store'
import BtnMain from 'components/form/buttons/main_button.js'
import style from './style.css';

class PublicHome extends Component {
    constructor(props) {
        super(props)
    }

    showModal = () => {
        store.dispatch(toggleModal(true, 'login'))
    }

    render() {
        const { registration, login, recovery } = this.props.modals
        return (
            <div className="shadow">
                <Row>
                    <Col md={6} sm={12} >
                        <MainPanel
                            title="Registration"
                            iconClass="fas fa-address-card"
                            body={<Registration />}
                        /> 
                    </Col>

                    <Col md={6} sm={12} className="title">
                        <div>
                            <div>
                                <h3>
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse
                                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </h3>
                           </div>
                           <div className="btn-login text-center">
                                <BtnMain
                                    type="button"
                                    bsStyle="success"
                                    text="Login"
                                    onClick={this.showModal}
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(
    mapStateToProps
)(PublicHome);