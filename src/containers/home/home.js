import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid } from 'react-bootstrap'
import { Auth, Registration } from 'components'

class Home extends Component {
    render() {
        return (
            <div>
                <h1>Home</h1>
                <Auth/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(
    mapStateToProps
)(Home);