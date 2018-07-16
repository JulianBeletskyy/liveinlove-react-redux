import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import store from 'store/'
import { toggleModal } from 'actions'
import style from './modal.css'
import BtnMain from 'components/form/buttons/main_button.js'

class MainModal extends Component {
    closeModal = () => {
        store.dispatch(toggleModal(false, this.props.keyModal))
    }
    
    render() {
        return (
            <Modal
                className={this.props.className}
                show={this.props.show} 
                onHide={this.closeModal}
                bsSize={this.props.size} >
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
                        <BtnMain
                            type="button"
                            bsStyle="success"
                            text={'Cancel'}
                            onClick={this.closeModal} />
                        <BtnMain
                            type="button"
                            bsStyle="success"
                            text={'Save'}
                            onClick={this.props.onSave} />
                    </Modal.Footer>)
                    : ''
                }
            </Modal>
        );
    }
}

export default MainModal