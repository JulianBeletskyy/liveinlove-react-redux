import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormControl } from 'react-bootstrap'
import style from './select_field.css'

class SelectField extends Component {
    constructor(props) {
        super(props);
    }

    printOptions(option, i) {
        return (<option key={i} value={option.value}>{option.name}</option>)
    }

    render() {
        return (
            <FormControl className={style.select} componentClass={this.props.componentClass} inputRef={this.props.inputRef}>
                {
                    this.props.options.map((option, i) => this.printOptions(option, i))
                }
            </FormControl>
        );
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(
    mapStateToProps
)(SelectField);