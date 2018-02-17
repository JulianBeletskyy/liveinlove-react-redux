import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid } from 'react-bootstrap'

class SuccessStories extends Component {
    render() {
        return (
            <Grid>
                <h1>Success Stories</h1>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(
    mapStateToProps
)(SuccessStories);