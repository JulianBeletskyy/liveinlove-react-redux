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
                <div className={style.wrapScroll}>
                    <div className={style.front}>
                        <span className={style.innerScroll}>to top</span>
                    </div>
                    <div className={style.back}>
                        <span className={style.innerScroll}><i className="fas fa-chevron-up"></i></span>
                    </div>
                </div>
            </div>
        );
    }
}

export default ScrollToTop