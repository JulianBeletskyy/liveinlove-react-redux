import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from '../../store'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { Auth } from '../../components'

class Public extends Component {
    renderAuth() {
        return <Auth />
    }
    
    render() {
        const { user } = store.getState()
        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={12} md={6}>
                        { this.renderAuth() }
                    </Col>
                </Row>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(
    mapStateToProps
)(Public);