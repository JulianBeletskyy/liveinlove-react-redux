import React, { Component } from 'react'
import { Row, Col, FormGroup } from 'react-bootstrap'
import { BtnMain } from 'components/form/buttons'
import store, { history } from 'store'
import { connect } from 'react-redux'
import { animateScroll as scroll } from 'react-scroll'
import { toggleRegistration } from 'actions'
import Options from 'options'
import SmallDivider from 'components/divider/small_divider.js'
import style from './style.css'

class SideBlog extends Component {
	getSignUp = () => {
		Options.getAll()
        store.dispatch(toggleRegistration(true))
        scroll.scrollToTop({duration: 0});
		history.push('/')
	}

	goToBlog = (id) => {
		history.push('/blogs/' + id)
	}

	printPopular = (blog, i) => {
		return 	<FormGroup key={i}>
					<div className={style.popularWrap} onClick={() => this.goToBlog(blog.id)}>
						<Row>
							<Col xs={1}>
								<span className={style.popularTitle}>
									<span className={style.number}>#{i+1}:&nbsp;</span>
								</span>
							</Col>
							<Col xs={10}>
								<span className={style.popularTitle}>{blog.text}</span>
								<div>
									<span>110 views</span>
									<span className="pull-right">29 comments</span>
								</div>
							</Col>
						</Row>
					</div>
				</FormGroup>
	}

    render() {
    	const list = this.props.services.blogs.list
        return (
        	<div>
        		<FormGroup className="text-center">
                	<h1>advertisement</h1>
                </FormGroup>
                <FormGroup className="text-center">
                	<BtnMain
                        type="button"
                        bsStyle="success"
                        text="Sign Up"
                        onClick = {this.getSignUp} />
                </FormGroup>
                <FormGroup>
					<SmallDivider text="Popular Blogs" />
				</FormGroup>
				{ list.map((blog, i) => this.printPopular(blog, i)) }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        services: {
            blogs: state.services.blogs
        }
    }
}

export default connect(
    mapStateToProps
)(SideBlog)