import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import SuccessPreview from 'components/stories/preview.js'
import { getStories } from 'actions'
import store from 'store'
import { connect } from 'react-redux'

class StoriesList extends Component {
    constructor(props) {
        super(props)
        store.dispatch(getStories())
    }

    printStories = (story, i) => {
        return  <Col key={i} sm={6}>
                    <SuccessPreview {...story} />
                </Col>
    }

    render() {
        const stories = this.props.services.stories.list
        return (
        	<Row>
                { stories.map((story, i) => this.printStories(story, i)) }
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        services: {
            stories: {
                list: state.services.stories.list
            }
        }
    }
}

export default connect(
    mapStateToProps
)(StoriesList)