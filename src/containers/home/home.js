import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Modal } from 'react-bootstrap'
import { Auth, Registration, MainModal } from 'components'
import { toggleModal } from 'actions'
import store from 'store/'
import Btn from 'components/form/buttons/button.js'

class Home extends Component {
    constructor(props) {
        super(props);
    }

    showModal = () => {
        store.dispatch(toggleModal(true))
    }

    render() {
        const { showModal } = this.props.signup
        return (
            <div>
                <h1>Home</h1>
                <Btn
                    type="button"
                    bsStyle="success"
                    text="Show modal"
                    onClick={this.showModal}
                />
                <MainModal 
                    body={<Registration />}
                    title="Registration"
                    show={showModal}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(
    mapStateToProps
)(Home);