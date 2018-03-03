import React, { Component } from 'react'
import store from 'store'
import { addCredits, toggleModal } from 'actions'
import { FormGroup } from 'react-bootstrap'
import TextField from 'components/form/inputs/text_field.js'
import BtnMain from 'components/form/buttons/main_button.js'
import Validator from 'validate'

class Credits extends Component {
    constructor(props) {
        super(props)
        this.user = {}
    }

    addCredits = () => {
        let error = 1
        error *= Validator.check(this.user.credits.value, ['integer', 'plus'], 'Credits')
        if (error) {
            store.dispatch(addCredits(this.user.credits.value))
            store.dispatch(toggleModal(false, 'credits'))
        }
    }

    render() {
        return (
            <div>
                <FormGroup>
                    <TextField
                        type="text"
                        placeholder="Add Credits"
                        inputRef={ref => { this.user.credits = ref }}
                    />
                </FormGroup>
                <FormGroup className="text-center">
                    <BtnMain
                        type="button"
                        bsStyle="success"
                        text="Add Credits"
                        onClick = {this.addCredits}
                    />
                </FormGroup>
            </div>
        );
    }
}

export default Credits