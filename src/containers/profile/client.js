import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid } from 'react-bootstrap'


class ClientProfile extends Component {
    render() {
        const { data } = this.props.user
        return (
            <div className="bg-blue pt-66">
                <Grid className="bg-white">
                    
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
)(ClientProfile);