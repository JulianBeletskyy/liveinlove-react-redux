import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from 'store'
import { MainModal } from 'components'
import { toggleModal, getGallery } from 'actions'
import style from './avatar.css'
import EditGallery from './edit_gallery.js'

class Avatar extends Component {
    constructor(props) {
        super(props)
        store.dispatch(getGallery(props.user.token))
    }

    showModal = () => {
        store.dispatch(toggleModal(true, 'avatar'))
    }

    save = () => {
        console.log(this.props.user.data.cropped_data)
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
                    onSave={this.save}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        modals: {
            avatar: state.modals.avatar
        },
        user: {
            data: {
                cropped_data: state.user.data.cropped_data
            },
            token: state.user.token
        }
    }
}

export default connect(
    mapStateToProps
)(Avatar);