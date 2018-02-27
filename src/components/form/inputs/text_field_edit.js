import React, { Component } from 'react'
import store from 'store/'
import { connect } from 'react-redux'
import { FormControl } from 'react-bootstrap'
import style from './text_field_edit.css'
import { setPlaceholder, removePlaceholder } from 'actions'

class TextFieldEdit extends Component {
    constructor(props) {
        super(props)
        this.input = false
    }

    thisRef = (ref) => {
        this.props.inputRef(ref);
        this.input = ref
    }

    render() {
        const { data } = this.props.user

        return (
            <div className={style.wrap}>
                <label>{this.props.placeholder}</label>
                <input
                    type={this.props.type}
                    ref={this.thisRef}
                    name={this.props.name}
                    className={style.style + ' form-control'}
                    value={this.props.inputRef}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(
    mapStateToProps
)(TextFieldEdit);