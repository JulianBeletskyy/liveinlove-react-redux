import React, { Component } from 'react'
import Tabs from 'components/tabs'
import CustomGallery from 'components/gallery/custom_gallery.js'
import InfoBlock from 'components/members/info_block.js'
import MessageBlock from 'components/members/message_block.js'
import VideoBlock from 'components/gallery/video_block.js'

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
                                    info={false}
                                    edit={false} />
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

export default MemberInfo