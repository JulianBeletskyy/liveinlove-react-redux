import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import style from './middle_item.css'
import { Link } from 'react-router-dom'

class MiddleItem extends Component {
    render() {
        let orientationStyle = ''
        const orientation = this.props.orientation
        orientationStyle = orientation === 'right' ? style.right : style.left

        return (
            <div className={style.infoItem}>
                <i className={this.props.icon}></i>
                <strong>
                    <Link to={this.props.link}>{this.props.text}</Link>
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
)(MiddleItem);