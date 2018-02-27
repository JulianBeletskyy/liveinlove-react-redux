import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import Gallery from './gallery.js'

class EditGallery extends Component {
    getUrl = () => {
       return this.props.user.data.avatar.original + '?' + Date.now()
    }

    save = () => {
        //let crop = this.refs.cropper.getData()
    }

    render() {
        console.log('render')
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
                            background={false}
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
    return {
        user: {
            data: {
                avatar: state.user.data.avatar
            }
        }
    }
}

export default connect(
    mapStateToProps
)(EditGallery);