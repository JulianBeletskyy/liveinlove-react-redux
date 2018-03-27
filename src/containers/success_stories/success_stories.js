import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import SuccessPreview from 'components/stories/preview.js'
import StoriesList from 'components/stories'
import Story from 'components/stories/story.js'
import { Route, Switch } from 'react-router-dom'

class SuccessStories extends Component {
    render() {
        return (
        	<div className="pt-100">
	            <Grid>
	            	<div className="bg-white p-15">
	            		<Switch>
		            		<Route path="/success-stories" exact component={StoriesList} />
		            		<Route path="/success-stories/:id" exact component={Story} />
                    	</Switch>
	                </div>
	            </Grid>
            </div>
        );
    }
}

export default SuccessStories