import React, { Component } from 'react'
import SmallItem from './small_item.js'
import { connect } from 'react-redux'
import store from 'store'
import { toggleLightBox, gotoPrevImg, gotoNextImg, removePhotos, toggleActive, togglePrivate } from 'actions'
import Lightbox from 'react-images'
import style from './small_item.css'
import { confirmAlert } from 'react-confirm-alert'

class CustomGallery extends Component {
    constructor(props) {
        super(props)
        this.images = []
    }

    printPreview = (image, i) => {
        return (<SmallItem 
                    onClick={() => {this.props.onClick ? this.props.onClick(image) : this.openLightBox(image, i)}} 
                    removePhoto={(e) => {this.removePhoto(image, e)}} 
                    toggleActive={(e) => {this.toggleActive(image, e)}}
                    togglePrivate={(e) => {this.togglePrivate(image, e)}}
                    client={this.props.user.data.role === 'client'} 
                    key={i} 
                    image={image}
                    profile={this.props.profile}
                    edit={this.props.edit}
                    info={this.props.info} />)
    }
    
    openLightBox = (image, i) => {
        store.dispatch(toggleLightBox('main', i))
    }

    closeLightbox = () => {
        store.dispatch(toggleLightBox(''))
    }

    gotoPrevious = () => {
        store.dispatch(gotoPrevImg())
    }

    gotoNext = () => {
        store.dispatch(gotoNextImg())
    }

    toggleActive = (image, e) => {
        e.stopPropagation()
        let url = image.active ? 'hide' : 'show'
        store.dispatch(toggleActive({'images': [image.id]}, url, this.props.user.token))
    }

    togglePrivate = (image, e) => {
        e.stopPropagation()
        let url = image.private ? 'public' : 'private'
        store.dispatch(togglePrivate({'images': [image.id]}, url, this.props.user.token))
    }

    removePhoto = (image, e) => {
        e.stopPropagation()
        confirmAlert({
            title: '',
            message: 'Are you sure to remove this photos?',
            confirmLabel: 'Confirm',                        
            cancelLabel: 'Cancel',                           
            onConfirm: () => {
                store.dispatch(removePhotos({'images': [image.id]}, this.props.user.token))
            }
        })
    }

    render() {
        return (
            <div className={style.galleryWrap}>
                {this.props.images.map((image, i) => this.printPreview(image, i))}
                <Lightbox
                    images={this.props.images}
                    isOpen={this.props.services.gallery.show_light_box == 'main'}
                    backdropClosesModal={true}
                    showImageCount={true}
                    currentImage={this.props.services.gallery.img_light_box}
                    onClickPrev={this.gotoPrevious}
                    onClickNext={this.gotoNext}
                    showThumbnails={true}
                    onClickThumbnail={(e) => {this.openLightBox('', e)}}
                    onClose={this.closeLightbox} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        services: {
            gallery: {
                show_light_box: state.services.gallery.show_light_box,
                img_light_box: state.services.gallery.img_light_box
            }
        },
        members: {
            data: state.members.data
        },
        user: {
            token: state.user.token,
            data: {
                role: state.user.data.role
            }
        }
    }
}

export default connect(
    mapStateToProps
)(CustomGallery)