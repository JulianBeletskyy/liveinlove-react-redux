import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getNewMembers } from 'actions'
import MemberBlock from 'components/members/member_block.js'
import store from 'store'
import Tabs from 'components/tabs'

class MainProfile extends Component {
    constructor(props) {
        super(props)
        store.dispatch(getNewMembers(props.user.token))
    }

	render() {
        const { new_list, popular_list } = this.props.members

		return (
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
                        eventKey: 'girls-link', 
                        title: 'Advanced Search', 
                        content: ''
                    }
                ]}
                activeKey="popular" />
		);
	}
}

const mapStateToProps = (state) => {
    return {
        members: {
            new_list: state.members.new_list,
            popular_list: state.members.popular_list,
        },
        user: {
            token: state.user.token
        }
    }
}

export default connect(
    mapStateToProps
)(MainProfile)