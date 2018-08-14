import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Tabs, Tab } from 'react-bootstrap'
import store, { history } from 'store'
import { setActiveTab, getMail } from 'actions'
import style from './style.css'

class CustomTabs extends Component {

    handleSelect = (key) => {
		switch (key) {
    		case 'inbox':
    			store.dispatch(getMail('incoming', 'inbox', this.props.user.token))
    			break
			case 'sent':
				store.dispatch(getMail('outgoing', 'sent', this.props.user.token))
				break
			case 'drafts':
				store.dispatch(getMail('draft', 'drafts', this.props.user.token))
				break
			case 'deleted':
				store.dispatch(getMail('deleted', 'deleted', this.props.user.token))
    	}

    	if (key.indexOf('link') + 1) {
    		let temp = key.split('-')
    		history.push(temp[0])
    	} else {
    		store.dispatch(setActiveTab(key, this.props.tabKey))
    	}
  	}

  	printTabs = (tab, i) => {
  		return (<Tab key={i} eventKey={tab.eventKey} title={tab.title}><div className="pt-15">{tab.content}</div></Tab>)
  	}

	render() {
		const tabs = this.props.services.tabs
		
		return (
			<div className={style.wrapTab}>
				<Tabs id="tab" activeKey={tabs[this.props.tabKey]} onSelect={this.handleSelect}>
				{
					this.props.tabs.map((tab, i) => this.printTabs(tab, i))
				}	
				</Tabs>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		services: {
			tabs: state.services.tabs
		},
		user: {
			token: state.user.token
		}
	}
}

export default connect(
	mapStateToProps
)(CustomTabs);