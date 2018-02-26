import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from 'store'
import { Row, Col, FormGroup } from 'react-bootstrap'
import { MainModal } from 'components'
import { Link } from 'react-router-dom'
import { toggleModal } from 'actions'
import style from './small_item.css'
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

class SmallItem extends Component {
    showModal = () => {
        store.dispatch(toggleModal(true, 'photo_preview'))
    }

    render() {
        const { data } = this.props.user
        const { photo_preview } = this.props.modals
        return (
            <div>
                <FormGroup>
                    <div className={style.wrap}>
                        <div>
                            <img src={this.props.croped} className={style.img} />
                            <div className={style.hover}>
                                <a href="javascript:;" className={style.addMain}>Add Main</a>
                                <a href="javascript:;" onClick={this.showModal} className={style.preview}>Preview</a>
                            </div>
                        </div>
                        <span className={style.close}><i className="fas fa-times"></i></span>
                    </div>
                </FormGroup>
                <MainModal
                    body={<div><img src={this.props.original} className={style.img} /></div>}
                    title="Photo Preview"
                    show={photo_preview}
                    keyModal="photo_preview"
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(
    mapStateToProps
)(SmallItem);