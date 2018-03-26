import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import style from './style.css'

class SuccessPreview extends Component {
    render() {
        return (
        	<div className={style.wrap}>
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