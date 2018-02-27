import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { Registration, MainPanel } from 'components'
import { toggleModal } from 'actions'
import store from 'store'
import BtnMain from 'components/form/buttons/main_button.js'

class PublicHome extends Component {
    showModal = () => {
        store.dispatch(toggleModal(true, 'login'))
    }

    render() {
        return (
            <div className="shadow">
                <Grid>
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
                </Grid>
            </div>
        );
    }
}

export default PublicHome