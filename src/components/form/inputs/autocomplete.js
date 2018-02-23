import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from 'store'
import { getCountries, removePlaceholder, setPlaceholder } from 'actions'
import style from './autocomplete.css'

class Autocomplete extends Component {
    constructor(props) {
        super(props);
        this.input = false
        this.id = Math.round(Math.random() * 999 * 1000)
        this.handleChange()
    }

    googleAutocomplete = () => {
        let place = this.autocomplete.getPlace()
    }

    thisRef = (ref) => {
        this.props.inputRef(ref);
        this.input = ref
    }

    handleChange = () => {
        if (this.input.value || this.props.value) {
            store.dispatch(setPlaceholder(this.id))
        } else {
            store.dispatch(removePlaceholder(this.id))
        }
    }

    componentDidMount() {
        let input = document.getElementById('auocompleteInput')
        var options = {
                language: 'en-US',
                types: ['(cities)'],
                componentRestrictions: {country: this.props.signup.country}
        };
        this.autocomplete = new window.google.maps.places.Autocomplete(input, options)
    }

    render() {
        const { countries } = this.props.signup
        
        const { changed } = this.props.textField;
        
        let className = style.placeholder;
        if (changed.indexOf(this.id) >= 0) {
            className += (' ' + style.active)
        }
        return (
            <div className={style.wrap}>
                <input
                    className={style.style + ' form-control'}
                    ref={this.thisRef}
                    type="text"
                    onBlur={this.googleAutocomplete}
                    id="auocompleteInput"
                    defaultValue={this.props.value}
                    onChange={this.handleChange}
                    placeholder=" "
                />
                <div className={className}>{this.props.placeholder}</div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(
    mapStateToProps
)(Autocomplete);