import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid } from 'react-bootstrap'

class Girls extends Component {
    render() {
        return (
            <Grid>
                <h1>Girls</h1>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(
    mapStateToProps
)(Girls);