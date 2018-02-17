import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Checkbox } from 'react-bootstrap'

class CheckboxField extends Component {
    render() {
        return (
            <Checkbox 
                inputRef={this.props.inputRef} 
                defaultChecked={this.props.value}
            >
                {this.props.text}
            </Checkbox>
        );
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(
    mapStateToProps
)(CheckboxField);