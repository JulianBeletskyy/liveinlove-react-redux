import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import style from './middle_string.css'
import { Link } from 'react-router-dom'

class MiddleString extends Component {
    render() {
        console.log(this.props.keyName)
        return (
            <div className={style.wrap}>
                <strong>
                    <span className={style.key}>{this.props.keyName}</span>
                </strong>
                <strong>
                    <span className={style.text}>{this.props.text}</span>
                </strong>
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