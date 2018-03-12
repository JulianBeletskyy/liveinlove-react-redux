import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from 'store'
import Lightbox from 'react-images'
import { getMemberInfo, addToFavorite, removeFromFavorite, addViewed, toggleLightBox } from 'actions'
import { Grid, Row, Col, FormGroup } from 'react-bootstrap'
import style from './style.css'
import AvatarImg from 'components/gallery/avatar_img.js'
import MemberInfo from 'components/members/info.js'
import Zodiac from 'components/zodiac'
import BtnMain from 'components/form/buttons/main_button.js'
import { Loader } from 'containers'

class Member extends Component {
    constructor(props) {
        super(props)
        store.dispatch(getMemberInfo(props.user.token, props.match.params.id))
    }

    openLightBox = () => {
       store.dispatch(toggleLightBox(true))
    }

    closeLightbox = () => {
        store.dispatch(toggleLightBox(false))
    }

    toggleFavorite = () => {
        if (this.props.members.data.favorite) {
            store.dispatch(removeFromFavorite(this.props.members.data.id, this.props.user.token))
        } else {
            store.dispatch(addToFavorite(this.props.members.data.id, this.props.user.token))
        }
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
            store.dispatch(addViewed(this.props.match.params.id, this.props.user.token))
        } else {
            let data = JSON.parse(localStorage.viewed)

            for (let k in data) {
                if (data[k][this.props.match.params.id] < date - 60) {
                    data.splice(k, 1)
                }
            }

            let check = data.some((element, index, array) => {
                if (this.props.match.params.id in array[index]) {
                    return true
                }
            })
            
            if (! check) {
                data.push({[this.props.match.params.id]: date})
                store.dispatch(addViewed(this.props.match.params.id, this.props.user.token))
            }
            
            localStorage.setItem('viewed', JSON.stringify(data))
        }
    }

    checkRequest = () => {
        return this.props.match.params.id * 1 === this.props.members.data.id
    }

    render() {
        return (
            <div className={style.homeWrapper}>
                <div className="pt-66 bg-blue">
                    <Grid className="bg-white pt-15">
                        {
                            ! this.checkRequest()
                            ?   <Loader />
                            :   <Row>
                                    <Col md={3}>
                                        <AvatarImg
                                            src={this.props.members.data.avatar.croped} 
                                            onClick={this.openLightBox} />
                                        <FormGroup className="text-center">
                                            <h2>
                                                <strong className="font-bebas">{this.props.members.data.first_name + ' ' + this.props.members.data.last_name}</strong>
                                            </h2>
                                            <strong className="text-grey">ID: {this.props.members.data.profile_id}</strong>
                                        </FormGroup>
                                        <FormGroup className="text-center">
                                            <span>{this.props.members.data.country}, {this.props.members.data.city}</span>
                                        </FormGroup>
                                        <FormGroup className="text-center">
                                            <span>{this.props.members.data.age} years ( {<Zodiac name={this.props.members.data.zodiac} />} )</span>
                                        </FormGroup>
                                        <FormGroup className="text-center">
                                            <BtnMain
                                                type="button"
                                                bsStyle="success"
                                                text={this.props.members.data.favorite ? "Remove from favorite" : "Add to favorite"}
                                                color="main"
                                                onClick={this.toggleFavorite}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={9}>
                                        <MemberInfo
                                            options={this.props.members.data} />
                                    </Col>
                                </Row>
                        }
                    </Grid>
                </div>
                <Lightbox
                    images={[{src: this.props.members.data.avatar.original}]}
                    isOpen={this.props.services.gallery.avatar}
                    backdropClosesModal={true}
                    showImageCount={false}
                    onClose={this.closeLightbox} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        services: {
            gallery: {
                avatar: state.services.gallery.avatar
            }
        },
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