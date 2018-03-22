import React, { Component } from 'react'
import Tabs from 'components/tabs'
import CustomGallery from 'components/gallery/custom_gallery.js'
import InfoBlock from 'components/members/info_block.js'
import MessageBlock from 'components/members/message_block.js'
import VideoBlock from 'components/gallery/video_block.js'
import { connect } from 'react-redux'

class MemberInfo extends Component {
	
    render() {
        const videoTab = this.props.client ? {eventKey: 'video', title: 'Video', content: <VideoBlock video={this.props.options.video} />} : {}
        return (
            <Tabs
            	tabs={[
            		{
            			eventKey: 'info', 
            			title: 'Info', 
            			content: <InfoBlock member={this.props.options} />
            		}, {
            			eventKey: 'gallery', 
            			title: 'Gallery', 
            			content: <CustomGallery 
                                    images={this.props.options.gallery}
                                    info={this.props.user.data.role === 'client'}
                                    edit={false}
                                    forClient={true} />
                    }, 
                    videoTab, 
                    {
                        eventKey: 'message', 
                        title: 'Send Message', 
                        content: <MessageBlock memberId={this.props.options.id} />
                    }
        		]}
            	activeKey="info"
                tabKey="member_profile" />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: {
            data: {
                role: state.user.data.role,
            }
        }
    }
}

export default connect(
    mapStateToProps
)(MemberInfo)