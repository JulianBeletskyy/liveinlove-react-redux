import React, { Component } from 'react'
import { connect } from 'react-redux'

class Autocomplete extends Component {
    constructor(props) {
        super(props);
        console.log(this.props)
        this.handleKeyUp = this.keyUpHandler.bind(this);
    }

    googleAutocomplete = function () {
        console.log(this.props)
    }

    printOptions = (option, i) => {
         return (<span key={i}>{option.name}</span>)
    }

    keyUpHandler = (refName, e) => {
        console.log(refName)
        console.log(e)
    }

    render() {
        const { options } = this.props.autocomplete
        return (
            <div>
                <input 
                    className="form-control"
                    ref={this.props.inputRef}
                    type="text" 
                    placeholder={this.props.placeholder}
                    onKeyUp={this.handleKeyUp}
                />
                <div>
                {
                    options.map((option, i) => this.printOptions(option, i))
                }
                </div>
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