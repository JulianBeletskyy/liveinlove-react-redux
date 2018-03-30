import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { Route, Switch } from 'react-router-dom'
import Blogs from 'components/blogs'
import FullBlog from 'components/blogs/full_blog.js'
import SideBlog from 'components/blogs/side.js'

class Blog extends Component {
    render() {
        return (
        	<div className="pt-100">
	            <Grid>
	            	<div className="bg-white p-15">
	            		<Row>
		            		<Col sm={9}>
			            		<Switch>
				            		<Route path="/blogs" exact component={Blogs} />
				            		<Route path="/blogs/:id" exact component={FullBlog} />
		                    	</Switch>
	                    	</Col>
	                    	<Col sm={3}>
	                    		<SideBlog />
	                    	</Col>
                    	</Row>
	                </div>
	            </Grid>
            </div>
        );
    }
}

export default Blog