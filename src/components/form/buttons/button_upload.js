import React, { Component } from 'react'
import store from 'store'
import style from './main_button.css'
import ImageUploader from 'react-images-upload';
import { saveImage, saveFile } from 'actions'

class BtnUpload extends Component {
    
    render() {
        return (
            <ImageUploader
                buttonText={this.props.title}
                onChange={this.props.onChange}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
                withPreview={false}
                withIcon={false}
                withLabel={false}
                buttonClassName={style.button}
            />
        );
    }
}

export default BtnUpload