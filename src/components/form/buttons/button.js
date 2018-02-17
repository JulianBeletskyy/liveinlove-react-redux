import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import style from './button.css'

class Btn extends Component {
    render() {
        let orientationStyle = ''
        const orientation = this.props.orientation
        orientationStyle = orientation === 'right' ? style.right : style.left

        return (
            <Button 
                type={this.props.type} 
                bsStyle={this.props.bsStyle}
                bsClass={style.button}
                onClick={this.props.onClick}
            >
                <span className={style.btnText + ' ' + orientationStyle}>{this.props.text}</span>
                <i className={style.btnIcon + ' ' + orientationStyle + " fas fa-angle-" + orientation}></i>
                <span className={style.btnHover}></span>
            </Button>
        );
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(
    mapStateToProps
)(Btn);