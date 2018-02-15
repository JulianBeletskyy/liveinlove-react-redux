import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid } from 'react-bootstrap'

class PublicFooter extends Component {
    render() {
        return (
            <div>
                <Grid>
                    <h1>Footer</h1>
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
)(PublicFooter);