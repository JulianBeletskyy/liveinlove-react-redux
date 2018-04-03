import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import style from './style.css'
import { connect } from 'react-redux'
import store, { history } from 'store'
import Pagination from './pagination.js'
import { setBlogPage, getBlogs } from 'actions'

class Blogs extends Component {
    constructor(props) {
        super(props)
        store.dispatch(getBlogs())
    }

	goToBlog = (id) => {
		history.push('/blogs/' + id)
	}

	changePage = (e) => {
        store.dispatch(getBlogs('?page=' + e.target.id * 1))
		store.dispatch(setBlogPage(e.target.id * 1))
	}

	printBlogs = (blog, i) => {
		return 	<div key={i} className={style.previewWrap} onClick={() => this.goToBlog(blog.id)}>
                	<Row>
                		<Col sm={6}>
                			<div className={style.imgWrap}>
                				<img src={blog.image} alt="" />
                			</div>
                		</Col>
                		<Col sm={6}>
                			<div className={style.popularTitle}>
                				<h3>{blog.title}</h3>
                			</div>
                			<div>
                				{blog.description}
                                <br />
                                <br />
                			</div>
                		</Col>
                	</Row>
                	<div className={style.date}>
        				{blog.created_at}
        			</div>
                </div>
	}

    render() {
    	const { list, pages } = this.props.services.blogs
        return (
        	<div>
        		{ list.map((blog, i) => this.printBlogs(blog, i)) }
        		<Pagination {...pages} onClick={this.changePage} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        services: {
            blogs: {
            	list: state.services.blogs.list,
            	pages: state.services.blogs.pages
            }
        }
    }
}

export default connect(
    mapStateToProps
)(Blogs)