import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import SuccessPreview from 'components/stories/preview.js'

class SuccessStories extends Component {
    render() {
        return (
            <Grid>
            	<div className="bg-white p-15">
	            	<Row>
	            		<Col sm={6}>
	            			<SuccessPreview />
	                	</Col>
	                	<Col sm={6}>
	                		<SuccessPreview />
	                	</Col>
	                </Row>
                </div>
            </Grid>
        );
    }
}

export default SuccessStories