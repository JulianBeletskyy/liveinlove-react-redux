import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import store from 'store/'
import { toggleModal } from 'actions'
import style from './modal.css'

class MainModal extends Component {
    closeModal = () => {
        store.dispatch(toggleModal(false, this.props.keyModal))
    }
    
    render() {
        return (
            <Modal 
                show={this.props.show} 
                onHide={this.closeModal}
                bsSize={this.props.size}
            >
                <Modal.Header bsClass={style.headerModal + ' modal-header'} closeButton>
                    <h3 className="modal-title title">
                        <i className="fas fa-address-card"></i>
                        &nbsp;
                        {this.props.title}
                    </h3>
                </Modal.Header>
                <Modal.Body>
                    {this.props.body}
                </Modal.Body>
                {
                    this.props.footer
                    ? (<Modal.Footer bsClass={style.headerModal + ' modal-footer'}>
                        <button 
                            className="btn btn-default" 
                            onClick={this.closeModal}
                        >
                            Cancel
                        </button>
                        <button 
                            className="btn btn-default" 
                            onClick={this.props.onSave}
                        >
                            Save
                        </button>
                    </Modal.Footer>)
                    : ''
                }
            </Modal>
        );
    }
}

export default MainModal