import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from 'store'
import { FormGroup } from 'react-bootstrap'
import { MainModal } from 'components'
import { toggleModal } from 'actions'
import style from './small_item.css'

class SmallItem extends Component {
    showModal = () => {
        store.dispatch(toggleModal(true, 'photo_preview'))
    }

    removePhoto = () => {
        if(window.confirm('Are you sure?')) {
            
        }
    }

    render() {
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
                        <span className={style.close} onClick={this.removePhoto}><i className="fas fa-times"></i></span>
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
    return {
        modals: {
            photo_preview: state.modals.photo_preview
        }
    }
}

export default connect(
    mapStateToProps
)(SmallItem);