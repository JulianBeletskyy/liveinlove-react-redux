import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from 'store'
import { setAlert, getSearch } from 'actions'
import { Row, Col, FormGroup } from 'react-bootstrap'
import { SelectField } from 'components/form/inputs'
import BtnMain from 'components/form/buttons/main_button.js'

class SearchBlock extends Component {
    constructor(props) {
        super(props)
        this.search = {
            match: {
                from: {},
                to: {}
            }
        }
    }

    getSearch = () => {
        if (this.search.match.from.value > this.search.match.to.value && this.search.match.to.value > 0) {
            store.dispatch(setAlert('Match is incorrect', 'error'))
            return
        }
        let data = {
            from: this.search.match.from.value,
            to: this.search.match.to.value ? (this.search.match.to.value * 1) + 1 : this.search.match.to.value,
            eyes_id: this.search.eyes.value,
            children: this.search.children.value,
            hair_color_id: this.search.hair_color.value
        }
        
        store.dispatch(getSearch(data, this.props.user.token))
    }

    getNumArray = (type, from, to) => {
        let temp = []
        if (type === 'from') {
            for (from; from <= to; from++) {
                temp.push({ 'value': from, 'name': from })
            }
            temp.unshift({ 'value': '', 'name': type })
        } else {
            for (from; from >= to; from--) {
                temp.push({ 'value': from, 'name': from })
            }
            temp.unshift({ 'value': '', 'name': type })
        }
        return temp;
    }

    getArray = (type) => {
        let name = ''
        switch(type) {
            case 'hair_colors': name = 'Hair Color'; break;
            case 'eyes': name = 'Eyes Color'; break;
            default: name = ''; break;
        }
        let temp = [{ 'value': '', 'name': name }]
        
        for (var k in this.props.options[type]) {
            temp.push({
                'value': this.props.options[type][k].id,
                'name': this.props.options[type][k].value
            })
        }
        return temp
    }

    render() {
        return (
            <Row>
                <Col sm={6}>
                    <Row>
                        <Col sm={2}>
                            <FormGroup>
                                <span className="title">Years</span>
                            </FormGroup>
                        </Col>
                        <Col sm={5}>
                            <FormGroup>
                                <SelectField
                                    componentClass="select"
                                    inputRef={ref => { this.search.match.from = ref }}
                                    options={this.getNumArray('from', 18, 99)}
                                    value={''} />
                            </FormGroup>
                        </Col>
                        <Col sm={5}>
                            <FormGroup>
                                <SelectField
                                    componentClass="select"
                                    inputRef={ref => { this.search.match.to = ref }}
                                    options={this.getNumArray('to', 99, 18)}
                                    value={''} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <SelectField
                            componentClass="select"
                            inputRef={ref => { this.search.children = ref }}
                            options={[{ 'value': '', 'name': 'Children' }, { 'value': '1', 'name': 'Yes' }, { 'value': '0', 'name': 'No' }]}
                            value={''} />
                    </FormGroup>
                </Col>
                <Col sm={6}>
                    <FormGroup>
                        <SelectField
                            componentClass="select"
                            inputRef={ref => { this.search.eyes = ref }}
                            options={this.getArray('eyes')}
                            value={''} />
                    </FormGroup>
                    <FormGroup>
                        <SelectField
                            componentClass="select"
                            inputRef={ref => { this.search.hair_color = ref }}
                            options={this.getArray('hair_colors')}
                            value={''} />
                    </FormGroup>
                </Col>
                <Col sm={12}>
                    <FormGroup className="text-right">
                        <BtnMain
                            type="button"
                            bsStyle="success"
                            text="Search"
                            onClick={this.getSearch} />
                    </FormGroup>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        options: {
            hair_colors: state.options.hair_colors,
            eyes: state.options.eyes
        },
        user: {
            token: state.user.token
        }
    }
}

export default connect(
    mapStateToProps
)(SearchBlock);