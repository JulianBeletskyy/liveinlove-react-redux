import React, { Component } from 'react'
import store from 'store'
import { Grid, Row, Col } from 'react-bootstrap'
import { getAllPublicMembers } from 'actions'
import SearchBlock from 'components/members/search_block.js'
import MemberBlock from 'components/members/member_block.js'
import { connect } from 'react-redux'

class Girls extends Component {
    constructor(props) {
        super(props)
        store.dispatch(getAllPublicMembers())
    }

    getRegistration = () => {
        console.log('registration')
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