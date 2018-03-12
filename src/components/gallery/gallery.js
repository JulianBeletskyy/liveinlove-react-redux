import React, { Component } from 'react'
import Gallery from 'react-grid-gallery'

class CustomGallery extends Component {
    render() {
        return (
            <Gallery
                images={this.props.images}
                backdropClosesModal={true}
                onSelectImage={this.props.onSelected}
                enableImageSelection={this.props.isSelected}
                onClickThumbnail={this.props.onClick ? this.props.onClick : ''}
                isOpen={this.props.isOpen}
            />
        );
    }
}

export default CustomGallery