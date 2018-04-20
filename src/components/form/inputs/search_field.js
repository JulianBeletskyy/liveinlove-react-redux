import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from 'store'
import { removePlaceholder, setPlaceholder } from 'actions'
import style from './autocomplete.css'

class SearchField extends Component {
    constructor(props) {
        super(props);
        this.input = false
        this.state = {
            active: false
        }
    }

    thisRef = (ref) => {
        this.props.inputRef(ref);
        this.input = ref
    }

    handleChange = () => {
        this.setState({active: this.props.value.length > 0})
    }

    render() {
        let className = this.state.active ? style.placeholder + ' ' + style.active : style.placeholder
        
        return (
            <div className={style.wrap}>
                {this.props.label ? <label>{this.props.placeholder}</label> : ''}
                <input
                    className={style.style + ' form-control'}
                    ref={this.thisRef}
                    type="text"
                    defaultValue={this.props.value}
                    onChange={this.handleChange}
                    onBlur={this.handleChange}
                    onInput={this.props.onInput}
                    placeholder=" " />
                {this.props.label ? '' : <div className={className}>{this.props.placeholder}</div>}
               
            </div>
        );
    }
}

export default SearchField;