import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from 'store'
import { FormControl } from 'react-bootstrap'
import style from './textarea.css'
import { toggleTextarea } from 'actions'

class Textarea extends Component {
    constructor(props) {
        super(props);

        this.input = false
        this.handleChange()
    }

    thisRef = (ref) => {
        this.props.inputRef(ref);
        this.input = ref
    }

    handleChange = () => {
        if (this.input.value || this.props.value) {
            store.dispatch(toggleTextarea(true))
        } else {
            store.dispatch(toggleTextarea(false))
        }
    }

    render() {
        const { changed } = this.props.textarea
        let className = ''
        if (changed) {
            className = style.active
        }
        return (
            <div className={style.wrap}>
                <FormControl 
                    componentClass="textarea"
                    inputRef={this.thisRef}
                    bsClass={style.main + ' form-control'}
                    onChange={this.handleChange}
                    defaultValue={this.props.value}
                />
                <span className={style.placeholder + ' ' + className}>{this.props.placeholder}</span>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(
    mapStateToProps
)(Textarea);