import React, { Component } from 'react'
import style from './small_item.css'

class VideoPreview extends Component {

    render() {
        const hiddenClass = this.props.video.private && ! this.props.video.purchased && ! this.props.profile && this.props.view_video != 'Unlimited' ? style.hiddenVideo : ''
        const text = ! this.props.video.private ? 'public' : 'private'
        const classInfo = ! this.props.video.private ? style.success : style.danger
        return (
            <div className={style.wrap}>
                <div className={style.wrapInner}>
                    <video className={style.imgVideo + ' ' + hiddenClass} height="200" src={this.props.video.src || this.props.video.video}></video>
                    <span className={style.videoIcon} onClick={() => this.props.onClick(this.props.video)}><i className="far fa-play-circle fa-3x"></i></span>
                    {
                        this.props.info
                        ? <span className={style.infoImg + ' ' + classInfo}>{text}</span>
                        : ''
                    }
                </div>
            </div>
        );
    }
}

export default VideoPreview