import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from 'store'
import { removePlaceholder, setPlaceholder } from 'actions'
import style from './autocomplete.css'

class Autocomplete extends Component {
    constructor(props) {
        super(props);
        this.input = false
        this.id = Math.round(Math.random() * 999 * 1000)
        this.handleChange()
    }

    googleAutocomplete = () => {
        //let place = this.autocomplete.getPlace()
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

    render() {
        const { changed } = this.props.textField
        var options = {
                types: ['(cities)'],
                componentRestrictions: {country: this.props.country}
        };
        let autocomplete = new window.google.maps.places.Autocomplete(this.input, options)
        
        window.google.maps.event.addListener(autocomplete, 'place_changed', () => {
           var place = autocomplete.getPlace()
           this.input.value = place.vicinity
        });

        let className = style.placeholder
        if (changed.indexOf(this.id) >= 0) {
            className += (' ' + style.active)
        }
        return (
            <div className={style.wrap}>
                {this.props.label ? <label>{this.props.placeholder}</label> : ''}
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
                {this.props.label ? '' : <div className={className}>{this.props.placeholder}</div>}
               
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        country: state.signup.country,
        textField: state.textField
    }
}

export default connect(
    mapStateToProps
)(Autocomplete);