import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Tabs, Tab } from 'react-bootstrap'
import store, { history } from 'store'
import { setActiveTab } from 'actions'
import style from './style.css'

class CustomTabs extends Component {

    handleSelect(key) {
    	if (key.indexOf('link') + 1) {
    		let temp = key.split('-')
    		history.push(temp[0])
    	} else {
    		store.dispatch(setActiveTab(key))
    	}
  	}

  	printTabs = (tab, i) => {
  		return (<Tab key={i} eventKey={tab.eventKey} title={tab.title}><div className="pt-15">{tab.content}</div></Tab>)
  	}

	render() {
		const active_tab = this.props.services.active_tab || this.props.activeKey

		return (
			<div className={style.wrapTab}>
				<Tabs id="tab" activeKey={active_tab} onSelect={this.handleSelect}>
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
			active_tab: state.services.active_tab
		}
	}
}

export default connect(
	mapStateToProps
)(CustomTabs);