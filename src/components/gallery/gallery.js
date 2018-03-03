import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import SmallItem from './small_item.js'
import Gallery from 'react-grid-gallery'

class CustomGallery extends Component {
    constructor(props) {
        super(props)
        //this.onSelectImage = this.onSelectImage.bind(this);
        //this.getSelectedImages = this.getSelectedImages.bind(this);
    }

    render() {

        let onSelectImage = (index, image) => {
            var images = this.props.images.slice();
            var img = images[index];
            if(img.hasOwnProperty("isSelected"))
                img.isSelected = !img.isSelected;
            else
                img.isSelected = true;
            getSelectedImages()
        }

        let getSelectedImages = () => {
            var selected = [];
            for(var i = 0; i < this.props.images.length; i++) {
                if(this.props.images[i].isSelected == true) {
                    selected.push(i);
                }
                    
            }
            return selected;
        }

        const selected_image = getSelectedImages().toString()
        return (
            <div>
                <Gallery
                    images={this.props.images}
                    //enableImageSelection={false}
                    backdropClosesModal={true}
                    onSelectImage={onSelectImage}
                />
                <button className="btn btn default">Remove: {selected_image}</button>
            </div>
        );
    }
}

export default CustomGallery