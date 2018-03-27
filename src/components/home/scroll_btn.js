import React, { Component } from 'react'
import style from './style.css'
import { animateScroll as scroll } from 'react-scroll'

class ScrollToTop extends Component {
    goToTop = () => {
        scroll.scrollToTop({duration: 300});
    }

    componentDidMount() {
        /*window.onscroll = () => {
            console.log(document.documentElement.scrollTop)
        }*/
    }

    render() {
        return (
            <div id="scrollBtn" className={style.scrollBtn} onClick={this.goToTop}>
                <i className="fas fa-chevron-up"></i><br />
                <span>top</span>
            </div>
        );
    }
}

export default ScrollToTop