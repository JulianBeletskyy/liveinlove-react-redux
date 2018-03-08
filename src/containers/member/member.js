import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from 'store'
import { getMemberInfo } from 'actions'
import { Grid, Row, Col } from 'react-bootstrap'
import style from './style.css'
import AvatarImg from 'components/gallery/avatar_img.js'
import MemberInfo from 'components/members/info.js'

class Member extends Component {
    constructor(props) {
        super(props)
        store.dispatch(getMemberInfo(props.user.token, props.match.params.id))
    }

    showModal = () => {

    }

    componentDidMount() {
        let localStorage = window.localStorage
        let date = new Date();
        date = date.getTime() / 1000
        date = date.toFixed(0)
        localStorage.getItem('viewed')
        if (! localStorage.length) {
            let data = [{[this.props.match.params.id]: date}]
            localStorage.setItem('viewed', JSON.stringify(data))
        } else {
            let data = JSON.parse(localStorage.viewed)

            for (let k in data) {
                if (data[k][this.props.match.params.id] < date - 60) {
                    data.splice(k, 1)
                }
            }

            let check = false
            for (let k = 0; k < data.length; k++) {
                if (this.props.match.params.id in data[k]) {
                    check = true
                }
            }
            if (! check) {
                data.push({[this.props.match.params.id]: date})
            }
            localStorage.setItem('viewed', JSON.stringify(data))
        }
    }

    render() {
        return (
            <div className={style.homeWrapper}>
                <div className="pt-66 bg-blue">
                    <Grid className="bg-white pt-15">
                        <Row>
                            <Col md={3}>
                                <AvatarImg
                                    src={this.props.members.data.avatar.croped} 
                                    onClick={this.showModal} />
                            </Col>
                            <Col md={9}>
                                <MemberInfo
                                    options={this.props.members.data} />
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        members: {
            data: state.members.data
        },
        user: {
            token: state.user.token
        }
    }
}

export default connect(
    mapStateToProps
)(Member)