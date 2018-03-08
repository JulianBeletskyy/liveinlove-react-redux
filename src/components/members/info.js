import React, { Component } from 'react'
import Tabs from 'components/tabs'
import CustomGallery from 'components/gallery/gallery.js'

class MemberInfo extends Component {
	
    render() {
    	const member = this.props.options
    	const images = []
        return (
            <Tabs
            	tabs={[
            		{
            			eventKey: 'info', 
            			title: 'Info', 
            			content: <div><h1>Info</h1></div>
            		}, {
            			eventKey: 'gallery', 
            			title: 'Gallery', 
            			content: <div><CustomGallery images={images} isSelected={false} /></div>}
        		]}
            	activeKey="info" />
        );
    }
}

export default MemberInfo