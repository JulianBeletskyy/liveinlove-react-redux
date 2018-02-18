import React, { Component } from 'react'
import { connect } from 'react-redux'
import style from './block_small.css'
import store from 'store/'
import { setActiveBlock, removeActiveBlock } from 'actions'

class BlockSmall extends Component {
    
    toggleState = () => {
        if (this.props.signup.data[this.props.type].indexOf(this.props.id) + 1) {
            store.dispatch(removeActiveBlock(this.props.id, this.props.type))
        } else {
            store.dispatch(setActiveBlock(this.props.id, this.props.type))
        }
    }

    render() {
        let className = style.block + ' title'

        if (this.props.signup.data[this.props.type].indexOf(this.props.id) + 1) {
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