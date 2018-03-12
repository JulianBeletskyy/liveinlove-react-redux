import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormGroup, Col, Row } from 'react-bootstrap'
import { getNewMembers, getMembers } from 'actions'
import MemberBlock from 'components/members/member_block.js'
import store from 'store'
import Tabs from 'components/tabs'
import SearchBlock from 'components/members/search_block.js'
import { TextField } from 'components/form/inputs'
import BtnMain from 'components/form/buttons/main_button.js'

class MainProfile extends Component {
    constructor(props) {
        super(props)
        store.dispatch(getNewMembers(props.user.token))
        store.dispatch(getMembers(props.user.token))
    }

	render() {
        const { new_list, popular_list, list } = this.props.members

		return (
            <div className="pt-15">
                <Row>
                    <Col sm={8}>
                        <FormGroup className="pt-17">
                            <TextField
                                type="text"
                                placeholder="Profile ID"
                                inputRef={ref => { this.profile_id = ref }}
                                value={''}
                                name="Profile ID"
                                key="first_name"
                            />
                        </FormGroup>
                    </Col>
                    <Col sm={4}>
                        <FormGroup className="text-right">
                            <BtnMain
                                type="button"
                                bsStyle="success"
                                text="Search by Profile ID"
                                onClick={this.getSearch} />
                        </FormGroup>
                    </Col>
                </Row>
                <Tabs 
                    tabs={[
                        {
                            eventKey: 'popular', 
                            title: 'Popular', 
                            content: <MemberBlock list={popular_list} />
                        }, {
                            eventKey: 'new', 
                            title: 'New', 
                            content: <MemberBlock list={new_list} />
                        }, {
                            eventKey: 'girls', 
                            title: 'Advanced Search', 
                            content: <div><SearchBlock /><MemberBlock list={list} /></div>
                        }
                    ]}
                    activeKey="popular"
                    tabKey="main" />
            </div>
		);
	}
}

const mapStateToProps = (state) => {
    return {
        members: {
            new_list: state.members.new_list,
            popular_list: state.members.popular_list,
            list: state.members.list
        },
        user: {
            token: state.user.token
        }
    }
}

export default connect(
    mapStateToProps
)(MainProfile)