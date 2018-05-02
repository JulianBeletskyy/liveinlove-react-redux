import React, { Component } from 'react'
import store, { history } from 'store'
import { connect } from 'react-redux'
import { getFavoriteMembers, getInterestsMembers } from 'actions'
import MemberBlock from 'components/members/member_block.js'

class Contacts extends Component {
	constructor(props) {
		super(props)
        if (props.match.params.tab) {
            this.getMembers(props.match.params.tab)
        }

        history.listen((location, action) => {
            let segments = location.pathname.split('/')
            segments.shift()
            this.getMembers(segments[1])
        })
	}

    getMembers(members) {
        switch(members) {
            case 'favorite':
                store.dispatch(getFavoriteMembers(this.props.user.token))
                break
            case 'interests':
                store.dispatch(getInterestsMembers(this.props.user.token))
                break
        }
    }

    render() {
        const list = this.props.members.active_list
        return (
            <div className="pt-15">
                <MemberBlock 
                    like={true}
                	list={list} />
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
            favorite_list: state.members.favorite_list,
    		interest_list: state.members.interest_list,
            active_list: state.members.active_list
    	}
    }
}

export default connect(
    mapStateToProps
)(Contacts)