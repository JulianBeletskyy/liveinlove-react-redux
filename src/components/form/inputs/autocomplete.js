import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormControl } from 'react-bootstrap'

class Autocomplete extends Component {
    constructor(props) {
        super(props);
        console.log(this.props)
    }

    googleAutocomplete = function () {
        console.log(this.props)
    }

    render() {
        //let places = new window.google.maps.places.Autocomplete();
        return (
            <input 
                className="form-control" 
                onChange={this.googleAutocomplete} 
                ref={this.props.inputRef}
                type="text" 
                placeholder={this.props.placeholder}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(
    mapStateToProps
)(Autocomplete);