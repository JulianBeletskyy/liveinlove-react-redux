import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import style from './button.css'

class Btn extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const orientation = this.props.orientation
        return (
            <Button 
                type={this.props.type} 
                bsStyle={this.props.bsStyle}
                bsClass={style.button}
                onClick={this.props.onClick}
            >
                <span className={style.btnText}>{this.props.text}</span>
                <i className={style.btnIcon + " fas fa-angle-" + orientation}></i>
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