import React, { Component } from 'react'
import style from './link_button.css'

class LinkButton extends Component {
	constructor(props) {
        super(props);
        this.state = {
            active: false
        };
    }

    showMenu = (event) => {
        event.stopPropagation()
        this.setState({active: ! this.state.active})
    }

    render() {
    	const activeClass = this.state.active ? style.active : ''
        return (
            <span className={style.wrap}>
            	<a className="font-bebas" href={'javascript:;'} onClick={this.showMenu} onBlur={this.showMenu}>Add photo</a>
            	<ul className={style.menu + ' ' + activeClass}>
                    <li className={style.menuItem + ' ' + 'font-bebas'}>Choose from gallery</li>
                    <li className={style.menuItem + ' ' + 'font-bebas'}>Upload photo</li>
                </ul>
        	</span>
        );
    }
}

export default LinkButton