import React, { Component } from 'react'
import Tabs from 'components/tabs'
import CustomGallery from 'components/gallery/gallery.js'
import InfoBlock from 'components/members/info_block.js'
import MessageBlock from 'components/members/message_block.js'

class MemberInfo extends Component {

    getGallery = () => {
        let images = []
        for (let k in this.props.options.gallery) {
            images.push({
                id: this.props.options.gallery[k].id,
                src: this.props.options.gallery[k].image,
                thumbnail: this.props.options.gallery[k].image,
                thumbnailWidth: 150,
                thumbnailHeight: 150})
            
        }
        return images
    }
	
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
            			content: <div><CustomGallery images={this.getGallery()} isSelected={false} /></div>
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