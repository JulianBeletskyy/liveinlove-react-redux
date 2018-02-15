import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import style from './button.css'

class Btn extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Button 
                type={this.props.type} 
                bsStyle={this.props.bsStyle}
                bsClass={style.button}
            >
                {this.props.text}
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