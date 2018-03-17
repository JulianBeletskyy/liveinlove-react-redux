import React, { Component } from 'react'
import style from './small_item.css'
import VideoPreview from './video_preview.js'

class VideoBlock extends Component {
    printVideo = (video, i) => {
        return <VideoPreview key={i} video={video} />
    }

    render() {
        return (
            <div className={style.galleryWrap}>
                { this.props.video.map((video, i) => this.printVideo(video, i)) }
            </div>
        );
    }
}

export default VideoBlock