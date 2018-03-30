import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import style from './style.css'
import { connect } from 'react-redux'
import store, { history } from 'store'
import Pagination from './pagination.js'
import { setBlogPage } from 'actions'

class Blogs extends Component {
	goToBlog = (id) => {
		history.push('/blogs/' + id)
	}

	changePage = (e) => {
		store.dispatch(setBlogPage(e.target.id * 1))
	}

	printBlogs = (blog, i) => {
		return 	<div key={i} className={style.previewWrap} onClick={() => this.goToBlog(blog.id)}>
                	<Row>
                		<Col xs={6}>
                			<div className={style.imgWrap}>
                				<img src={"/assets/img/blog-"+blog.id+".jpg"} alt="" />
                			</div>
                		</Col>
                		<Col xs={6}>
                			<div className={style.popularTitle}>
                				<h3>HOW MUCH CASH IS THERE IN UKRAINE?</h3>
                			</div>
                			<div>
                				PPL sites are plagued with scams on so many levels, including immigration fraud. Fake messages sent by bots, gift deliveries replaced with cash payouts for ‘brides’, ‘translators’ that impersonate women from photos in written communication, false declarations on visa applications — it’s time for immigration departments and FBI to take a closer look into Russian-owned Ukrainian troll factories that have already extracted hundreds of millions of dollars from Americans via online scams.
                			</div>

                		</Col>
                	</Row>
                	<div className={style.date}>
        				March 21, 2018
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