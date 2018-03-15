import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import store from 'store/'
import { toggleModal } from 'actions'
import style from './video_modal.css'

class VideoModal extends Component {
    closeModal = () => {
        store.dispatch(toggleModal(false, 'video'))
    }
    
    render() {
        return (
            <Modal 
                show={this.props.show} 
                onHide={this.closeModal}
                backdrop={true}
                className={style.modalWrap} >
                <Modal.Body>
                    <div className="text-center">{this.props.body}</div>
                </Modal.Body>
            </Modal>
        );
    }
}

export default VideoModal