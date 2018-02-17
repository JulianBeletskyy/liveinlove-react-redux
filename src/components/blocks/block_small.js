import React, { Component } from 'react'
import { connect } from 'react-redux'
import style from './block_small.css'
import store from 'store/'
import { setActiveAthnicity, removeActiveAthnicity, setActiveInterest, removeActiveInterest } from 'actions'

class BlockSmall extends Component {
    

    toggleState = () => {
        let setMethod = setActiveAthnicity
        let removeMethod = removeActiveAthnicity
        switch (this.props.type) {
            case 'female_ethnicity':
                setMethod = setActiveAthnicity
                removeMethod = removeActiveAthnicity
                break;
            case 'interest': 
                setMethod = setActiveInterest
                removeMethod = removeActiveInterest
                break;
        }
        if (this.props.signup.data[this.props.type].indexOf(this.props.id) + 1) {
            store.dispatch(removeMethod(this.props.id))
        } else {
            store.dispatch(setMethod(this.props.id))
        }
    }

    render() {
        const { female_ethnicity, interest } = this.props.signup.data
        let className = style.block + ' title'
        switch (this.props.type) {
            case 'female_ethnicity': 
                if (female_ethnicity.indexOf(this.props.id) + 1) {
                    className += (' ' + style.active)
                }
                break;
            case 'interest': 
                if (interest.indexOf(this.props.id) + 1) {
                    className += (' ' + style.active)
                }
                break;
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