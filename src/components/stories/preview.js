import React, { Component } from 'react'
import style from './style.css'
import { history } from 'store'

class SuccessPreview extends Component {
    goToStory = (id) => {
        history.push(history.location.pathname + '/' + id)
    }

    render() {
        const text = this.props.story.slice(0, 72) + '...'
        return (
        	<div className={style.wrap} onClick={() => this.goToStory(this.props.id)}>
    			<div className={style.imgBlock}>
    				<img className={style.imgPreview} src={this.props.image} alt="" />
    				<div className={style.textBlock}>
	        			<span>&nbsp;{ this.props.client_name }&nbsp;</span>
	        			<i className="fas fa-plus"></i>
	        			<span>&nbsp;{ this.props.girl_name }&nbsp;</span>
	    			</div>
        		</div>
                <div className={style.description}>
                    { text }
                </div>
            </div>
        );
    }
}

export default SuccessPreview