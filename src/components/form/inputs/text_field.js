import React, { Component } from 'react'
import store from 'store/'
import { connect } from 'react-redux'
import { FormControl } from 'react-bootstrap'
import style from './text_field.css'
import { setPlaceholder, removePlaceholder } from 'actions'

class TextField extends Component {
    constructor(props) {
        super(props)
        this.input = false
        this.id =  Math.round(Math.random() * 999 * 1000)
        this.handleChange()
    }

    thisRef = (ref) => {
        this.props.inputRef(ref);
        this.input = ref
    }

    handleChange = (ref) => {
        if (this.input.value || this.props.value) {
            store.dispatch(setPlaceholder(this.id))
        } else {
            store.dispatch(removePlaceholder(this.id))
        }
    }

    render() {
        const { changed } = this.props.textField
        let className = style.placeholder

        if (changed.indexOf(this.id) >= 0) {
            className += (' ' + style.active)
        }

        return (
            <div className={style.wrap}>
                {this.props.label ? <label>{this.props.placeholder}</label> : ''}
                <FormControl
                    type={this.props.type}
                    inputRef={this.thisRef}
                    name={this.props.name}
                    className={style.style}
                    onChange={this.handleChange}
                    defaultValue={this.props.value} />
                {this.props.label ? '' : <div className={className}>{this.props.placeholder}</div>}
                
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        textField: {
            changed: state.textField.changed
        }
    }
}

export default connect(
    mapStateToProps
)(TextField);