import React, { Component } from 'react'
import Tabs from 'components/tabs'
import store from 'store'
import { setGallery } from 'actions'
import CustomGallery from 'components/gallery/gallery.js'
import { Row, Col } from 'react-bootstrap'
import TabItem from 'components/list/tab_item.js'

class GalleryBlock extends Component {

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

    setGallery(key) {
        store.dispatch(setGallery(key))
    }
	
    render() {
        return (
            <Row>
                <Col sm={12}>
                    <div className="clearfix form-group">
                        <CustomGallery images={this.getGallery()} isSelected={false} />
                    </div>
                </Col>
            </Row>
        );
    }
}

export default GalleryBlock