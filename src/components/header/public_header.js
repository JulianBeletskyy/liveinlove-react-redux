import React, { Component } from 'react'
import { connect } from 'react-redux'
import style from './style.css'
import { Link } from 'react-router-dom'

class PublicHeader extends Component {
    render() {
        return (
            <div className={style.header}>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/girls">Girls</Link>
                <Link to="/services">Services</Link>
                <Link to="/success-stories">Success Stories</Link>
                <Link to="/blog">Blog</Link>
                <Link to="/support">Support</Link>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(
    mapStateToProps
)(PublicHeader);