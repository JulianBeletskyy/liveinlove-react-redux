import React, { Component } from 'react'
import store from 'store'
import { FormGroup } from 'react-bootstrap'
import { getStory } from 'actions'
import { connect } from 'react-redux'
import style from './style.css'


class Story extends Component {
	constructor(props) {
		super(props)
		store.dispatch(getStory(props.match.params.id))
	}

    render() {
        const story = this.props.services.stories.story
        return (
        	<div>
        		<div className={style.wrapHead}>
                    <div>
                        <FormGroup>
                            <img className="img-responsive" src={story.image} alt="" />
                        </FormGroup>
                    </div>
                    <div>
                        <FormGroup className="text-center">
                            <div className={style.storyName}>
                                <span className={style.manName}>{ story.client_name }</span>
                                &nbsp; & &nbsp;
                                <span className={style.girlName}>{ story.girl_name }</span>
                            </div>
                        </FormGroup>
                    </div>
                </div>
                <div>
                    <p>{story.story}</p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        services: {
            stories: {
                story: state.services.stories.story
            }
        }
    }
}

export default connect(
    mapStateToProps
)(Story)