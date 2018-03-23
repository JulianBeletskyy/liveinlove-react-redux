import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import SearchBlock from 'components/members/search_block.js'
import MemberBlock from 'components/members/member_block.js'
import { connect } from 'react-redux'

class Girls extends Component {
    render() {
        return (
            <Grid>
            	<div className="bg-white p-15">
	            	<Row>
	            		<Col sm={12}>
	                		<SearchBlock />
	                		<MemberBlock list={this.props.members.search_list} />
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
            search_list: state.members.search_list
        }
    }
}

export default connect(
    mapStateToProps
)(Girls)