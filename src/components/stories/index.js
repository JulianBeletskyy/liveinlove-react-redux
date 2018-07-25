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
            <div>
                <h1 className="font-bebas">Success Stories</h1>
                <p>Note: <span className="small-italic">We are glad to share great successful love stories with you, although most of couples prefer to keep Happiness in Silence. With that we post only some of those couples who gave us personal permission.</span></p>
                <hr />
            	<Row>
                    { stories.map((story, i) => this.printStories(story, i)) }
                </Row>
            </div>
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