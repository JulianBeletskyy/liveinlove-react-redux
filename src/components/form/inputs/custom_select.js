import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormControl } from 'react-bootstrap'
import styleCustom from './custom_select.css'
import style from './select_field.css'

class CustomSelect extends Component {
    constructor(props) {
        super(props);
    }

    printOptions(option, i) {
        return (<option key={i} value={option.value}>{option.name}</option>)
    }

/*    movePlaceholder(el) {
    var next = document.getElementById(el).nextElementSibling;
    next.style.top = "-10px";
    next.style.fontSize = "12px";
    }*/

    render() {
        return (
            <div className={styleCustom.selectWrapper} >
                <FormControl className={style.select} componentClass={this.props.componentClass} inputRef={this.props.inputRef}>
                    <option value="" defaultValue hidden></option>
                    {
                        this.props.options.map((option, i) => this.printOptions(option, i))
                    }
                </FormControl>

                <div className={styleCustom.placeholder + ' title'}> { this.props.placeholder } </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(
    mapStateToProps
)(CustomSelect);