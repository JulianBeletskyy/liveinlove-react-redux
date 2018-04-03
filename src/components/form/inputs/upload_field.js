import React, { Component } from 'react'
import style from './select_field.css'
import BtnMain from 'components/form/buttons/main_button.js'

class UploadField extends Component {
    
    render() {
        return (
            <div>
                <input type="file" id="upload" onChange={this.props.onChange} className={style.uploadField} />
                <BtnMain
                    type="button"
                    bsStyle="success"
                    text={this.props.text || 'Upload photo'}
                    onClick={this.props.onClick} />
            </div>
        );
    }
}

export default UploadField