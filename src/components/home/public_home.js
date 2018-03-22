import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Registration, MainPanel } from 'components'
import { toggleModal, toggleRegistration } from 'actions'
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
                                    body={<Registration />} />
                            </div>
                        </Col>

                        <Col md={6} sm={12} className={style.wrapLogin + ' ' + activeClass}>
                            <div>
                                <div>
                                    <h1 className="text-white main">
                                        Premier Matchmaking agency to Find Your Ukrainian Lady
                                    </h1>
                                    <h2 className="text-white text-center">
                                        We are not Gods to predict your future but we have something to make you closer to your dream come true.
                                        <br />
                                        <a className={style.joinLink} onClick={() => store.dispatch(toggleRegistration(true))} href="javascript:;"> Join Now</a>!
                                    </h2>
                               </div>
                               <div className="btn-login text-center">
                                    <BtnMain
                                        type="button"
                                        bsStyle="success"
                                        text="Login"
                                        onClick={this.showModal} />
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