import React, { Component } from 'react'
import store from 'store'
import { connect } from 'react-redux'
import { getFavoriteMembers } from 'actions'
import MemberBlock from 'components/members/member_block.js'

class Contacts extends Component {
	constructor(props) {
		super(props)
		store.dispatch(getFavoriteMembers(props.user.token))
	}

    render() {
        return (
            <div className="pt-15">
                <MemberBlock 
                    like={true}
                	list={this.props.members.favorite_list} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    	user: {
			token: state.user.token
    	},
    	members: {
    		favorite_list: state.members.favorite_list
    	}
    }
}

export default connect(
    mapStateToProps
)(Contacts)