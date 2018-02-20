import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from 'store'
import style from './main_button.css'
import ImageUploader from 'react-images-upload';
import { saveImage, saveFile } from 'actions'

class BtnUpload extends Component {
    onDrop = (picture) => {
        if (picture) {
            store.dispatch(saveFile(picture[0]))
            let reader = new FileReader();
            reader.readAsDataURL(picture[0])
            reader.onload = function() {
                store.dispatch(saveImage(reader.result))
            }
        }
    }
    render() {
        return (
            <div>
                <ImageUploader
                    buttonText='Choose images'
                    onChange={this.onDrop}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
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

const mapStateToProps = (state) => {
    return state
}

export default connect(
    mapStateToProps
)(BtnUpload);