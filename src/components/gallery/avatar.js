import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from 'store'
import { MainModal } from 'components'
import { toggleModal, getGallery, updateAvatar, addToGallery } from 'actions'
import EditGallery from './edit_gallery.js'
import AvatarImg from './avatar_img.js'
import UploadField from 'components/form/inputs/upload_field'

class Avatar extends Component {
    constructor(props) {
        super(props)
        store.dispatch(getGallery(props.user.token))
    }

    showModal = () => {
        store.dispatch(toggleModal(true, 'avatar'))
    }

    save = () => {
        store.dispatch(updateAvatar(this.props.user.data.cropped_data, this.props.user.token))
    }

    onUpload = () => {
        let el = document.getElementById('upload')
        el.click()
    }

    onDrop = (e) => {
        if (e) {
            store.dispatch(addToGallery(e.target.files[0], this.props.user.token))
        }
    }

    render() {
        const { avatar } = this.props.modals
        return (
            <div>
                <AvatarImg 
                    src={this.props.src}
                    onClick={this.showModal}
                    textHover="edit" />
                
                <MainModal
                    body={<EditGallery />}
                    title="Avatar"
                    show={avatar}
                    keyModal="avatar"
                    footer={true}
                    size="lg"
                    upload={<UploadField
                                onClick={this.onUpload}
                                onChange={this.onDrop} />}
                    onSave={this.save} />
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