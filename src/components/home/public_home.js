import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Registration, MainPanel } from 'components'
import { toggleModal } from 'actions'
import store from 'store'
import BtnMain from 'components/form/buttons/main_button.js'
import style from './style.css'

class PublicHome extends Component {
    showModal = () => {
        store.dispatch(toggleModal(true, 'login'))
    }

    render() {
        let activeClass = ''
        let col = 6
        if (this.props.signup.showRegistration) {
            activeClass = style.active
            col = 12
        }  

        return (
            <div className="shadow">
                <Grid>
                    <Row>
                        <Col md={col} sm={12} >
                            <div className={style.wrapRegistration + ' ' + activeClass}>
                                <MainPanel
                                    title="Registration"
                                    iconClass="fas fa-address-card"
                                    body={<Registration />}
                                />
                            </div>
                        </Col>

                        <Col md={6} sm={12} className={style.wrapLogin + ' ' + activeClass}>
                            <div>
                                <div>
                                    <h2 className="text-white">
                                        Duis aute irure dolor in reprehenderit in voluptate velit esse
                                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                                        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    </h2>
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

const mapStateToProps = (state) => {
    return {
        signup: {
            showRegistration: state.signup.showRegistration
        }
    } 
}

export default connect(
    mapStateToProps
)(PublicHome)