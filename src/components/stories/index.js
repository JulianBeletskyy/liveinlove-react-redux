import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import SuccessPreview from 'components/stories/preview.js'

class StoriesList extends Component {
    render() {
        return (
        	<Row>
        		<Col sm={6}>
        			<SuccessPreview />
            	</Col>
            	<Col sm={6}>
            		<SuccessPreview />
            	</Col>
            </Row>
        );
    }
}

export default StoriesList