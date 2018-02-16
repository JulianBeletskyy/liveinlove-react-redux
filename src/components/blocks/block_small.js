import React, { Component } from 'react'
import { connect } from 'react-redux'
import style from './block_small.css'
import store from 'store/'
import { setActiveAthnicity, removeActiveAthnicity } from 'actions'

class BlockSmall extends Component {
    constructor(props) {
        super(props);
    }

    toggleState = () => {
        if (this.props.ethnicity.active.indexOf(this.props.id) + 1) {
            store.dispatch(removeActiveAthnicity(this.props.id))
        } else {
            store.dispatch(setActiveAthnicity(this.props.id))
        }
        
    }

    render() {
        const { active } = this.props.ethnicity
        let className = style.block + ' title'
        if (active.indexOf(this.props.id) + 1) {
            className += (' ' + style.active)
        }
        return (
            <div 
                className={className}
                onClick={this.toggleState}
            >
                {this.props.text}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(
    mapStateToProps
)(BlockSmall);