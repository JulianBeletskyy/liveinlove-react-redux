import React, { Component } from 'react'
import store, { history } from 'store'
import { Grid, Row, Col } from 'react-bootstrap'
import { Route, Switch } from 'react-router-dom'
import { getPopularBlogs, getBlog, addViewBlog } from 'actions'
import Blogs from 'components/blogs'
import FullBlog from 'components/blogs/full_blog.js'
import SideBlog from 'components/blogs/side.js'

class Blog extends Component {
	constructor(props) {
		super(props)
		store.dispatch(getPopularBlogs())
	}

	getBlog = (id) => {
		store.dispatch(getBlog(id))
		store.dispatch(addViewBlog(id))
	}

	goToBlog = (id) => {
		this.getBlog(id)
		history.push('/blogs/' + id)
	}

    render() {
        return (
        	<div className="pt-100">
	            <Grid>
	            	<div className="bg-white p-15">
	            		<Row>
		            		<Col sm={9}>
	            			 	<h1 className="font-bebas">Blog</h1>
                                <p className="text-justify">Another concept car that caught attention in Frankfurt was the Mercedes Intelligent Aerodynamic Automobile. A one-off showcase of the brand’s aerodynamic prowess, it boasts a drag coefficient of just 0.19. To accomplish this unprecedented level of slipperiness, Mercedes has developed a dynamic, adaptable body structure that literally changes shape with the push of a button.</p>
                                <hr />
			            		<Switch>
				            		<Route path="/blogs" exact component={Blogs} />
				            		<Route path="/blogs/:id" exact render={(props) => <FullBlog {...props} goToBlog={(id) => this.getBlog(id)} />} />
		                    	</Switch>
	                    	</Col>
	                    	<Col sm={3}>
	                    		<SideBlog goToBlog={(id) => this.goToBlog(id)} />
	                    	</Col>
                    	</Row>
	                </div>
	            </Grid>
            </div>
        );
    }
}

export default Blog