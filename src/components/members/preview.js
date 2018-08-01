import React, { Component } from 'react'
import style from './preview.css'
import store from 'store'
import { connect } from 'react-redux'
import { history } from 'store'
import { addToFavorite, removeFromFavorite, getMostViewedMembers, getNewMembers, getPopularMembers, getMembers } from 'actions'
import { Link } from 'react-router-dom'

class MemberPreview extends Component {
	goToMember = e => {
        e.preventDefault()
        if (e.target.id !== 'heart') {
            history.push('/member/' + this.props.options.id.toString())
        }
    }

    addToFavorite = e => {
        e.preventDefault()
    	store.dispatch(addToFavorite(this.props.options.id, this.props.user.token))
        .then(res => {
            if (res) {
                this.getMembers(this.props.services.tabs.main)
            }
        })
    }

    removeFromFavorite = e => {
        e.preventDefault()
        store.dispatch(removeFromFavorite(this.props.options.id, this.props.user.token))
        .then(res => {
            if (res) {
                this.getMembers(this.props.services.tabs.main)
            }
        })
    }

    getMembers = type => {
        switch (type) {
            case 'all':
                store.dispatch(getMostViewedMembers(this.props.user.token))
                break
            case 'new':
                store.dispatch(getNewMembers(this.props.user.token))
                break
            case 'popular':
                store.dispatch(getPopularMembers(this.props.user.token))
                break
            case 'girls':
                store.dispatch(getMembers(this.props.user.token))
                break
            default: return
        }
    }

    render() {
    	const member = this.props.options
        return (
        	<div className="form-group">
                
	            <div className={style.wrap}>
                    <Link to={'/member/' + this.props.options.id.toString()} onClick={this.props.onClick || this.goToMember}>
    	            	<div className={style.imgWrap}>
    	                	<img src={member.avatar} className={style.img} alt="" />
    	            	</div>
    	            	<div className={style.infoWrap}>
    		                <div className="text-center">
    		                	<div className="font-bebas">
    		                		<strong className={style.infoName}>{member.first_name}</strong>
    		            		</div>
    		                	<div>{member.age + ' years'}</div>
    		                	<div className="ellipsis" title={member.country + ', ' + member.city}>{member.country + ', ' + member.city}</div>
    		                </div>
    	                </div>
                        {
                            this.props.like
                            ?   member.favorite
                                ? <i className="fas fa-star" id="heart" onClick={this.removeFromFavorite}></i>
                                : <i className="far fa-star" id="heart" onClick={this.addToFavorite}></i>
                            : ''
                        }
                    </Link>
	            </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: {
            token: state.user.token
        },
        services: {
            tabs: state.services.tabs
        }
    }
}

export default connect(
    mapStateToProps
)(MemberPreview)