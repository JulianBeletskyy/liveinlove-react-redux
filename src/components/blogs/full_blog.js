import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from 'store'
import { setComment } from 'actions'
import { Row, Col, FormGroup } from 'react-bootstrap'
import { TextField, Textarea } from 'components/form/inputs'
import { BtnMain } from 'components/form/buttons'
import style from './style.css'
import Validator from 'validate'

class FullBlog extends Component {
	setComment = () => {
		let error = 1
		error *= Validator.check(this.name.value, ['required'], 'Name')
		error *= Validator.check(this.comment.value, ['required'], 'Comment')
		if (error) {
			const data = {
				name: this.name.value,
				text: this.comment.value,
				date: new Date().toISOString()
			}
			store.dispatch(setComment(data, this.props.match.params.id))
			this.name.value = ''
			this.comment.value = ''
		}
	}

	printComments = (comment, i) => {
		return 	<div key={i} className={style.commentWrap}>
					<div>
						<strong className="text-uppercase">{comment.name}</strong>
					</div>
					<div>{ comment.text }</div>
					<div className="text-right">
						<span className="small-italic"><i>{comment.date}</i></span>
					</div>
				</div>
	}
    
    render() {
    	const comments = this.props.services.blogs.active.comments
        return (
        	<div>
                <FormGroup>
                	<h1>Full Blog</h1>
                	<hr />
                </FormGroup>
                <div>
            		<p className={style.popularTitle}>Comments:</p>
            	</div>
            	<div>
            		{ comments.map((comment, i) => this.printComments(comment, i)) }
            	</div>
                <Row className="pt-15">
                	<Col sm={6} smOffset={6}>
		                <FormGroup>
		                	<TextField
                                type="text"
                                placeholder="First Name"
                                inputRef={ref => { this.name = ref }}
                                name="Name"
                                key="name" />
		                </FormGroup>
		                <FormGroup>
                            <Textarea
                                inputRef={ref => { this.comment = ref }}
                                placeholder="Comment" />
                        </FormGroup>
                        <FormGroup className="text-right">
                            <BtnMain
		                        type="button"
		                        bsStyle="success"
		                        text="Comment"
		                        onClick = {this.setComment} />
                        </FormGroup>
	                </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        services: {
            blogs: {
            	active: {
            		comments: state.services.blogs.active.comments
            	}
            }
        }
    }
}

export default connect(
    mapStateToProps
)(FullBlog)