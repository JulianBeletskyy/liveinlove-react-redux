import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col, Tab, Tabs } from 'react-bootstrap'
import style from './edit_style.css'
import styleProfile from '../style.css'
import EditProfile from 'components/profile/edit_profile.js'

class EditClientProfile extends Component {
    render() {
        return (
            <div>
                <h1>Edit Client</h1>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(
    mapStateToProps
)(EditClientProfile);