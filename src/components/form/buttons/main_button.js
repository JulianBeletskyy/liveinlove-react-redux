import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import style from './main_button.css'

class BtnMain extends Component {
    render() {
        return (
            <Button
                type={this.props.type}
                bsStyle={this.props.bsStyle}
                bsClass={style.button}
                onClick={this.props.onClick}
            >
                <span>{this.props.text}</span>
            </Button>
        );
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(
    mapStateToProps
)(BtnMain);