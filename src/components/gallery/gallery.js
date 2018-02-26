import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from 'store'
import { Row, Col, FormGroup } from 'react-bootstrap'
import { MainModal } from 'components'
import { Link } from 'react-router-dom'
import { toggleModal } from 'actions'
import style from './avatar.css'
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import SmallItem from './small_item.js'

class Gallery extends Component {
    constructor(props) {
        super(props)
    }

    photoArray = (avtars) => {
        let array = [avtars]
        return array
    }

    printPhoto = (photo, i) => {
        return (<Col key={i} sm={3}><SmallItem croped={photo.original} original={photo.croped} /></Col>)
    }

    render() {
        const { data } = this.props.user
        return (
            <div>
                <Row>
                {
                    this.photoArray(data.avatar).map((photo, i) => this.printPhoto(photo, i))
                }
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(
    mapStateToProps
)(Gallery);