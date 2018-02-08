import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from '../../store'
import { Grid, Row, Col, Button } from 'react-bootstrap'

class Girls extends Component {
    render() {
        return (
            <div>
                Girls
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(
    mapStateToProps
)(Girls);