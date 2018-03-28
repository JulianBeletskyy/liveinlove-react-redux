import React, { Component } from 'react'
import store, { history } from 'store'
import { Grid, Row, Col } from 'react-bootstrap'
import { getAllPublicMembers, toggleRegistration } from 'actions'
import SearchBlock from 'components/members/search_block.js'
import MemberBlock from 'components/members/member_block.js'
import { connect } from 'react-redux'
import { animateScroll as scroll } from 'react-scroll'
import Options from 'options'

class Girls extends Component {
    constructor(props) {
        super(props)
        store.dispatch(getAllPublicMembers())
        Options.get('hair_colors')
        Options.get('eyes')
    }

    getRegistration = () => {
        Options.getAll()
        history.push('/')
        store.dispatch(toggleRegistration(true))
        scroll.scrollToTop({duration: 0});
    }

    render() {
        return (
            <Grid>
            	<div className="bg-white p-15">
	            	<Row>
	            		<Col sm={12}>
	                		<SearchBlock />
	                		<MemberBlock like={false} onClickItem={this.getRegistration} list={this.props.members.public.all} />
	                	</Col>
	                </Row>
                </div>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        members: {
            public: {
                all: state.members.public.all
            }
        }
    }
}

export default connect(
    mapStateToProps
)(Girls)