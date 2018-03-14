import React, { Component } from 'react'
import Tabs from 'components/tabs'
import CustomGallery from 'components/gallery/custom_gallery.js'
import InfoBlock from 'components/members/info_block.js'
import MessageBlock from 'components/members/message_block.js'
import GalleryBlock from './gallery_block.js'

class MemberInfo extends Component {
	
    render() {
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
                    }, {
                        eventKey: 'video', 
                        title: 'Video', 
                        content: <div></div>
                    }, {
                        eventKey: 'message', 
                        title: 'Send Message', 
                        content: <MessageBlock />
                    }
        		]}
            	activeKey="info"
                tabKey="member_profile" />
        );
    }
}

export default MemberInfo