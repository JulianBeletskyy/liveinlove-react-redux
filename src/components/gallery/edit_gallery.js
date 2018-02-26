import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from 'store'
import { Row, Col } from 'react-bootstrap'
import { MainModal } from 'components'
import { Link } from 'react-router-dom'
import { toggleModal } from 'actions'
import style from './avatar.css'
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import Gallery from './gallery.js'

class EditGallery extends Component {

    _crop() {
        //this.refs.cropper.getCroppedCanvas().toDataURL()
    }

    getUrl = () => {
       return this.props.user.data.avatar.original + '?' + Date.now()
    }

    save = () => {
        let crop = this.refs.cropper.getData()
    }

    render() {
        const { data } = this.props.user
        console.log(data)
        return (
            <div>
                <Row>
                    <Col sm={4}>
                        <Cropper
                            ref='cropper'
                            src={this.getUrl()}
                            style={{ height: '200px', width: '100%', margin: '0 auto' }}
                            aspectRatio={1 / 1}
                            guides={false}
                        />
                    </Col>
                    <Col sm={8}>
                       <Gallery />
                    </Col>
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
)(EditGallery);