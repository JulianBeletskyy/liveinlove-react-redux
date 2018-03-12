import React, { Component } from 'react'
import style from './main_button.css'
import ImageUploader from 'react-images-upload'

class BtnUpload extends Component {
    
    render() {
        return (
            <div className={style.uploadWrap} onClick={this.props.onClick}>
                <ImageUploader
                    buttonText={this.props.title}
                    onChange={this.props.onChange}
                    imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                    maxFileSize={5242880}
                    withPreview={false}
                    withIcon={false}
                    withLabel={false}
                    buttonClassName={style.button}
                />
            </div>
        );
    }
}

export default BtnUpload