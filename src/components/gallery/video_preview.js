import React, { Component } from 'react'
import style from './small_item.css'
import VideoModal from 'components/modal/video_modal.js'
import { toggleModal, setAlert } from 'actions'
import store from 'store'
import { connect } from 'react-redux'

class VideoPreview extends Component {

    showVideo = () => {
        if (this.props.video.private && ! this.props.profile) {
            store.dispatch(setAlert('You can\'t see this video', 'error'))
        } else {
            store.dispatch(toggleModal(true, 'video'))
        }
    }

    render() {
        const hiddenClass = this.props.video.private && ! this.props.profile ? style.hiddenVideo : ''
        const text = ! this.props.video.private ? 'public' : 'private'
        const classInfo = ! this.props.video.private ? style.success : style.danger
        return (
            <div className={style.wrap}>
                <video className={style.imgVideo + ' ' + hiddenClass} height="200" src={this.props.video.src || this.props.video.video}></video>
                <span className={style.videoIcon} onClick={this.showVideo}><i className="far fa-play-circle fa-3x"></i></span>
                {
                    this.props.info
                    ? <span className={style.infoImg + ' ' + classInfo}>{text}</span>
                    : ''
                }
                <VideoModal 
                    body={<video controlsList="nodownload" src={this.props.video.src || this.props.video.video} controls></video>}
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
)(VideoPreview)