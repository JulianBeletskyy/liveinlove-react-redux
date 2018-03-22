import React, { Component } from 'react'
import store from 'store'
import { toggleModal, setAlert } from 'actions'
import style from './small_item.css'
import VideoPreview from './video_preview.js'
import VideoModal from 'components/modal/video_modal.js'
import { connect } from 'react-redux'

class VideoBlock extends Component {
    constructor(props) {
        super(props)
        this.videoSrc = ''
    }

    printVideo = (video, i) => {
        return <VideoPreview key={i} video={video} info={this.props.info} profile={this.props.profile} onClick={(video) => this.showVideo(video)} />
    }

    showVideo = (video) => {
        if (video.private && ! this.props.profile) {
            store.dispatch(setAlert('You can\'t see this video', 'error'))
            return
        }
        this.videoSrc = video.src || video.video
        console.log(video)
        store.dispatch(toggleModal(true, 'video'))
    }

    render() {
        return (
            <div className={style.galleryWrap}>
                { this.props.video.map((video, i) => this.printVideo(video, i)) }
                <VideoModal 
                    body={<video controlsList="nodownload" src={this.videoSrc} controls></video>}
                    show={this.props.modals.video} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        modals: {
            video: state.modals.video
        }
    }
}

export default connect(
    mapStateToProps
)(VideoBlock)