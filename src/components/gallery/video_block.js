import React, { Component } from 'react'
import store from 'store'
import { toggleModal, setAlert, buyVideo } from 'actions'
import style from './small_item.css'
import VideoPreview from './video_preview.js'
import VideoModal from 'components/modal/video_modal.js'
import { connect } from 'react-redux'
import { confirmAlert } from 'react-confirm-alert'
import Plans from 'components/membership/plans.js'
import MainModal from 'components/modal/modal.js'
import Credits from 'components/membership/credits.js'

class VideoBlock extends Component {
    constructor(props) {
        super(props)
        this.videoSrc = ''
    }

    printVideo = (video, i) => {
        return <VideoPreview key={i} video={video} info={this.props.info} profile={this.props.profile} onClick={(video) => this.showVideo(video)} />
    }

    showVideo = (video) => {
        if (! this.props.profile) {
            if (video.private) {
                if (this.props.user.data.membership.view_video === 'Unlimited') {
                    if (! video.purchased) {
                        confirmAlert({
                            title: '',
                            message: 'You can\'t see this video',
                            buttons: [
                                {
                                    label: 'Cancel'
                                }, {
                                    label: 'Use Credits',
                                    onClick: () => {
                                        if (this.props.user.data.credits < 3) {
                                            store.dispatch(toggleModal(true, 'credits'))
                                        } else {
                                            store.dispatch(buyVideo(video.id, this.props.user.token, this.props.memberId))
                                        }
                                    }
                                }, {
                                    label: 'Upgrade Membership',
                                    onClick: () => {
                                        store.dispatch(toggleModal(true, 'plans'))
                                    }
                                }
                            ]
                        })
                        return
                    }
                }
            }
        }
        
        this.videoSrc = video.src || video.video
        store.dispatch(toggleModal(true, 'video'))
    }

    render() {
        const { plans, credits } = this.props.modals
        return (
            <div className={style.galleryWrap}>
                { this.props.video.map((video, i) => this.printVideo(video, i)) }
                <VideoModal 
                    body={<video controlsList="nodownload" src={this.videoSrc} controls></video>}
                    show={this.props.modals.video} />
                <MainModal
                    body={<Plans />}
                    title="Membership"
                    show={plans}
                    keyModal="plans"
                    size="lg" />
                <MainModal
                    body={<Credits />}
                    title="Credits"
                    show={credits}
                    keyModal="credits" />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        modals: {
            video: state.modals.video,
            plans: state.modals.plans,
            credits: state.modals.credits
        },
        user: {
            token: state.user.token,
            data: {
                membership: state.user.data.membership,
                credits: state.user.data.credits,
            }
        }
    }
}

export default connect(
    mapStateToProps
)(VideoBlock)