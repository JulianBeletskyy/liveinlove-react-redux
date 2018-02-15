import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Checkbox } from 'react-bootstrap'

class CheckboxField extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Checkbox 
                inputRef={this.props.inputRef} 
                defaultChecked={false}>{this.props.text}</Checkbox>
        );
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(
    mapStateToProps
)(CheckboxField);