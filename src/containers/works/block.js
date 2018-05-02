import React, { Component } from 'react'
import style from './block.css'

class Block extends Component {
    render() {
    	return (
    		<div className={style.wrap}>
    			<div className={style.leftBlock}>
    				<div className={style.icon}>
    					<i className={this.props.icon}></i>
    				</div>
    			</div>
    			<div className={style.rightBlock}>
    				<div className={style.header}>
    					{this.props.title}
    				</div>
    				<div className={style.content}>
    					With more than ten years of knowledge and expertise we design and code clean awesome websites and apps!
    				</div>
    			</div>
    		</div>
		)
	}
}

export default Block