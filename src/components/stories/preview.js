import React, { Component } from 'react'
import style from './style.css'
import { history } from 'store'

class SuccessPreview extends Component {
    goToStory = () => {
        history.push(history.location.pathname + '/1')
    }

    render() {
        return (
        	<div className={style.wrap} onClick={this.goToStory}>
    			<div className={style.imgBlock}>
    				<img className={style.imgPreview} src="/assets/img/image.jpg" alt="" />
    				<div className={style.textBlock}>
	        			<span>&nbsp;Graham&nbsp;</span>
	        			<i className="fas fa-plus"></i>
	        			<span>&nbsp;Nicole&nbsp;</span>
	    			</div>
        		</div>
            </div>
        );
    }
}

export default SuccessPreview