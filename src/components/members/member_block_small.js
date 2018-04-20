import React, { Component } from 'react'
import MemberPreview from './preview.js'
import style from './style.css'

class MemberBlockSmall extends Component {
    constructor(props) {
        super(props)
        this.state = {
            active: 0
        }
    }

    printList = (member, i) => {
        let activeClass = i == this.state.active ? style.wrapItem + ' active fadeInRight' : style.wrapItem
        
        return (<div key={i} className={activeClass}>
                    <MemberPreview
                        onClick={this.props.onClickItem}
                        options={member} />
                </div>)
    }

    next = () => {
        let active = this.state.active == this.props.list.length - 1 ? 0 : this.state.active+1
        this.setState({
            active: active
        })
    }

    prev = () => {
        let active = this.state.active == 0 ? this.props.list.length - 1 : this.state.active-1
        this.setState({
            active: active
        })
    }

    render() {
        return (
            <div className={style.wrapper}>
                <div className={style.arrows} onClick={this.prev}>
                    <i className="fas fa-chevron-left"></i>
                </div>
                <div>
                    { this.props.list.map((member, i) => this.printList(member, i)) }
                </div>
                <div className={style.arrows} onClick={this.next}>
                    <i className="fas fa-chevron-right"></i>
                </div>
            </div>
        );
    }
}

export default MemberBlockSmall