import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from 'store'
import { sendComment, getBlog } from 'actions'
import { Row, Col, FormGroup } from 'react-bootstrap'
import { TextField, Textarea } from 'components/form/inputs'
import { BtnMain } from 'components/form/buttons'
import style from './style.css'
import Validator from 'validate'
import { Loader } from 'containers'

class FullBlog extends Component {
    constructor(props) {
        super(props)
        props.goToBlog(props.match.params.id)
        console.log(props.user.data.first_name)
    }

	setComment = () => {
		let error = 1
		error *= Validator.check(this.name.value, ['required'], 'Name')
		error *= Validator.check(this.comment.value, ['required'], 'Comment')
		if (error) {
			const data = {
				name: this.name.value,
				comment: this.comment.value,
				post_id: this.props.match.params.id
			}
			store.dispatch(sendComment(data, this.props.match.params.id))
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

    componentWillUnmount() {
        console.log('destroy')
    }
    
    render() {
    	const blog = this.props.services.blogs.active
        let html = ''
        if (blog.post) {
            html = blog.post.replace(/&nbsp;/g, ' ')
        }

        const name = this.props.user.token ? this.props.user.data.first_name : ''
        return (
                    this.props.match.params.id != blog.id
                    ?   <Loader />
                    :   <div>
                            <FormGroup>
                                <h2>{blog.title}</h2>
                            </FormGroup>
                            <FormGroup>
                                <img className="img-responsive" src={blog.image} alt="" />
                                <hr />
                            </FormGroup>
                            <FormGroup>
                                <div dangerouslySetInnerHTML={{__html: html}} />
                            </FormGroup>
                            <hr />
                            <div>
                                <p className={style.popularTitle}>Comments:</p>
                            </div>
                            <div>
                                { blog.comments.map((comment, i) => this.printComments(comment, i)) }
                            </div>
                            <Row className="pt-15">
                                <Col sm={6} smOffset={6}>
                                    <FormGroup>
                                        <TextField
                                            type="text"
                                            placeholder="First Name"
                                            inputRef={ref => { this.name = ref }}
                                            value={name}
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
            	active: state.services.blogs.active
            }
        },
        user: {
            token: state.user.token,
            data: state.user.data
        }
    }
}

export default connect(
    mapStateToProps
)(FullBlog)