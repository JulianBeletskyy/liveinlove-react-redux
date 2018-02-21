import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'
import store from 'store/'
import { toggleModal } from 'actions'
import style from './modal.css'
import { changeStep } from 'actions';

class MainModal extends Component {
    closeModal = () => {
        store.dispatch(toggleModal(false, this.props.keyModal))
        store.dispatch(changeStep(0))
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
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(
    mapStateToProps
)(MainModal);