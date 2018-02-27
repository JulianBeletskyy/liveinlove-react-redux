import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormControl } from 'react-bootstrap'
import store from 'store'
import style from './select_field.css'
import { setCountry } from 'actions'

class SelectField extends Component {
    printOptions(option, i) {
        return (<option key={i} id={option.value} value={option.value}>{option.name}</option>)
    }

    handleChange = (event) => {
        if (this.props.name) {
            store.dispatch(setCountry(event.target.value))
        }
    }

    render() {
        let classSelect = this.props.placeholder ? ' title' : ''
        return (
            <div className={style.wrap}>
                {this.props.label ? <label>{this.props.placeholder}</label> : ''}
                <FormControl 
                    className={style.select + classSelect} 
                    componentClass={this.props.componentClass} 
                    inputRef={this.props.inputRef}
                    defaultValue={this.props.value}
                    onChange={this.handleChange.bind(this)}
                >
                    {
                        this.props.options.map((option, i) => this.printOptions(option, i))
                    }
                </FormControl> 
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(
    mapStateToProps
)(SelectField);