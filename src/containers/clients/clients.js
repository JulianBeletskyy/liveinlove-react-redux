import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from '../../store'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { logout } from '../../actions'

class Clients extends Component {
    handleLogout() {
        store.dispatch(logout())
    }

    render() {
        return (
           <div>
               Clients
               <Button onClick={this.handleLogout} type="button" bsStyle="success">Log Out</Button>
            </div> 
        );
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(
    mapStateToProps
)(Clients);