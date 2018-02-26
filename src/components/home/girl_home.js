import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import { Auth, Registration, MainModal, MainPanel, Recovery } from 'components'
import { toggleModal, setRecoveryHash, activateUser } from 'actions'
import store, { history } from 'store'
import BtnMain from 'components/form/buttons/main_button.js'
import style from './style.css'
import GirlRightMenu from 'components/menu/girl_right_menu.js'

class GirlHome extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { data } = this.props.user
        return (
            <div className="pt-66 bg-blue">
                <Grid>
                    <Row>
                        <Col md={9} className="bg-white">
                            <div>
                            </div>
                        </Col>

                        <Col md={3}>
                            <GirlRightMenu />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(
    mapStateToProps
)(GirlHome);