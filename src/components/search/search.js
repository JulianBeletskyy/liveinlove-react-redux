import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import store, { history } from 'store'
import BtnMain from 'components/form/buttons/main_button.js'
import style from './search.css';
import TextField from 'components/form/inputs/text_field.js'
import CheckboxField from 'components/form/inputs/checkbox_field.js'
import SelectField from 'components/form/inputs/select_field.js'

class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.search = {
            search: {},
            isAdvanced: {},
            age: {},
            eyeColor: {},
            hairColor: {},
            children: {}

        };
    }

    getEyeColors = () => {
        return [
            {value: 'green', name: 'Green'},
            {value: 'blue', name: 'Blue'},
            {value: 'brown', name: 'Brown'}
        ];
    }

    getChildren = () => {
        return [
            {value: 'no', name: 'no'},
            {value: 'yes', name: 'yes'}
        ];
    }
    render() {
        return (
            <div>
                <div className={style.searchHolder}>
                    <TextField
                        type="text"
                        placeholder="Search"
                        inputRef={ref => { this.search.search = ref }}
                        value={this.search.search.value}
                        name="Search"
                    />

                    <button>
                        <i className="fas fa-search"></i>
                    </button>
                </div>

                <CheckboxField
                    inputRef={ref => { this.search.isAdvanced = ref }}
                    text='Advanced Search'
                    value={this.search.isAdvanced.checked}
                />

                <div className={style.dNone}>
                    <Row>
                        <Col sm={12} md={3}>
                            <Row>
                                <Col xs={6} md={4} className={style.searchTitle}>
                                    Age:
                                </Col>

                                <Col xs={6} md={5}>
                                    <SelectField
                                        componentClass="select"
                                        inputRef={ref => { this.search.eyeColor = ref }}
                                        options={this.getEyeColors()}
                                        value={this.search.eyeColor.value}
                                    />
                                </Col>
                            </Row>
                        </Col>

                        <Col sm={12} md={3}>
                            <Row>
                                <Col xs={6} md={4} className={style.searchTitle}>
                                    Hair Color:
                                </Col>

                                <Col xs={6} md={5}>
                                    <SelectField
                                        componentClass="select"
                                        inputRef={ref => { this.search.hairColor = ref }}
                                        options={this.getEyeColors()}
                                        value={this.search.hairColor.value}
                                    />
                                </Col>
                            </Row>
                        </Col>

                        <Col sm={12} md={3}>
                            <Row>
                                <Col xs={6} md={4} className={style.searchTitle}>
                                    Eyes Color:
                                </Col>

                                <Col xs={6} md={5}>
                                    <SelectField
                                        componentClass="select"
                                        inputRef={ref => { this.search.eyeColor = ref }}
                                        options={this.getEyeColors()}
                                        value={this.search.eyeColor.value}
                                    />
                                </Col>
                            </Row>
                        </Col>

                        <Col sm={12} md={3}>
                            <Row>
                                <Col xs={6} md={4} className={style.searchTitle}>
                                    children:
                                </Col>

                                <Col xs={6} md={5}>
                                    <SelectField
                                        componentClass="select"
                                        inputRef={ref => { this.search.children = ref }}
                                        options={this.getChildren()}
                                        value={this.search.children.value}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
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
)(SearchBar);