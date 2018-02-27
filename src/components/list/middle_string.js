import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import style from './middle_string.css'
import { Link } from 'react-router-dom'

class MiddleString extends Component {
    render() {
        const link = this.props.link ? style.link : '' 
        return (
            <div className={style.wrap}>
                    <span className={style.key}>{this.props.keyName}</span>
                <span>
                    <span className={style.text + ' ' + link} onClick={this.props.onClick}>{this.props.text}</span>
                </span>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(
    mapStateToProps
)(MiddleString);