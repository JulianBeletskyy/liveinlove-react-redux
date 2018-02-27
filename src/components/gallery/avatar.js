import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from 'store'
import { MainModal } from 'components'
import { Link } from 'react-router-dom'
import { toggleModal } from 'actions'
import style from './avatar.css'
import EditGallery from './edit_gallery.js'

class Avatar extends Component {

    showModal = () => {
        store.dispatch(toggleModal(true, 'avatar'))
    }

    render() {
        const { avatar } = this.props.modals
        return (
            <div className={style.wrap}>
                <img
                    src={this.props.src}
                    className={style.img}
                />
                <div 
                    className={style.hover}
                    onClick={this.showModal}
                >
                    <span className={style.span}>edit</span>
                </div>
                <MainModal
                    body={<EditGallery />}
                    title="Avatar"
                    show={avatar}
                    keyModal="avatar"
                    footer={true}
                    size="lg"
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        modals: {
            avatar: state.modals.avatar
        }
    }
}

export default connect(
    mapStateToProps
)(Avatar);