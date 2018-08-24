import React, { Component } from 'react'
import { connect } from 'react-redux'
import store, { history } from 'store'
import Lightbox from 'react-images'
import { gotoPrevImg, gotoNextImg, toggleModal, getMemberInfo, addToFavorite, removeFromFavorite, addViewed, toggleLightBox, setReceiverToShop, getContactsDetails, addToInterest, removeFromInterest } from 'actions'
import { Grid, Row, Col, FormGroup } from 'react-bootstrap'
import style from './style.css'
import AvatarImg from 'components/gallery/avatar_img.js'
import AvatarMember from 'components/gallery/avatar_member.js'
import MemberInfo from 'components/members/info.js'
import Zodiac from 'components/zodiac'
import BtnMain from 'components/form/buttons/main_button.js'
import { Loader } from 'containers'
import MemberGallery from 'components/gallery/member_gallery.js'
import { MONTH } from 'config'
import { LinkIcon } from 'components/form/buttons'
import MessageBlock from 'components/members/message_block.js'
import { MainModal } from 'components'
import VideoBlock from 'components/gallery/video_block.js'
import FullScreenSlider from 'components/gallery/full_screen_slider.js'

class Member extends Component {
    constructor(props) {
        super(props)
        store.dispatch(getMemberInfo(props.user.token, props.match.params.id))
        this.state = {
            showSlider: false
        }

        document.oncontextmenu = this.disabledSave
    }

    disabledSave = e => {
        if (e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO') {
            return false
        }
    }

    activateSave = () => {
        return true
    }

    componentWillUnmount() {
        document.oncontextmenu = this.activateSave
    }

    openLightBox = () => {
       store.dispatch(toggleLightBox('avatar', 0))
    }

    closeLightbox = () => {
        store.dispatch(toggleLightBox(''))
    }

    toggleFavorite = () => {
        if (this.props.members.data.favorite) {
            store.dispatch(removeFromFavorite(this.props.members.data.id, this.props.user.token))
        } else {
            store.dispatch(addToFavorite(this.props.members.data.id, this.props.user.token))
        }
    }

    toggleInterest = () => {
        if (this.props.members.data.interest) {
             store.dispatch(removeFromInterest(this.props.members.data.id, this.props.user.token))
        } else {
            store.dispatch(addToInterest(this.props.members.data.id, this.props.user.token))
        }
    }

    getContactsDetails = () => {
        store.dispatch(getContactsDetails(this.props.user.token, this.props.members.data.id))
    }

    goToShop = () => {
        store.dispatch(setReceiverToShop(this.props.members.data))
        history.push('/shop')
    }

    componentDidMount() {
        let localStorage = window.localStorage
        let date = new Date();
        date = date.getTime() / 1000
        date = date.toFixed(0)
        let viewed = localStorage.getItem('viewed')
        if (! viewed) {
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

    getBirthday = date => {
        return `${date.day} ${MONTH[date.month - 1]}`
    }

    openMemberImages = i => e => {
        this.setState({showSlider: true, initialSlide: i+1})
    }

    closeSlider = () => {
        this.setState({showSlider: false})
    }

    gotoPrevious = () => {
        store.dispatch(gotoPrevImg())
    }

    gotoNext = () => {
        store.dispatch(gotoNextImg())
    }

    openModal = () => {
        store.dispatch(toggleModal(true, 'message'))
    }

    getAge = date => {
        const [d,m,y] = date.split('/')
        const birthday = new Date(`${y}-${m}-${d}`)
        const ageDifMs = Date.now() - birthday.getTime()
        const ageDate = new Date(ageDifMs)
        return `${Math.abs(ageDate.getUTCFullYear() - 1970)} y.o.`
    }

    getImages = () => this.props.members.data.gallery.map(item => {src: item.src})


    render() {
        const member = this.props.members.data
        const { message } = this.props.modals
        return (
            <div className={style.homeWrapper}>
                <div className="pt-66 bg-blue">
                    <Grid className="bg-white pt-15 pb-50">
                        {
                            ! this.checkRequest()
                            ?   <Loader />
                            :   <Row>
                                    <Col md={3} lg={4}>
                                        <div className="form-group">
                                            <AvatarMember
                                                className="margin-auto"
                                                src={this.props.members.data.avatar.croped} 
                                                onClick={this.openMemberImages(-1)} />
                                        </div>
                                        {
                                            this.props.members.data.gallery.length
                                            ?   <div className="form-group"><MemberGallery list={[...this.props.members.data.gallery, ...this.props.members.data.video]} onClick={this.openMemberImages} /></div>
                                            :   null
                                        }
                                        {
                                            member.video.length
                                            ?   <div>
                                                    <div className="font-bebas">Video</div>
                                                    <VideoBlock memberId={member.id} video={member.video} />
                                                </div>
                                            :   null
                                        }
                                    </Col>
                                    <Col md={5} lg={4}>
                                        <div>
                                            <strong className={`font-bebas fs-36 ${member.role}-color`}>{member.first_name}</strong>
                                            <strong className="fs-18">,&nbsp;{member.age} (age)</strong>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-xs-5">
                                                <span className="font-bebas fs-18">From: </span>
                                            </div>
                                            <div className="col-xs-7">
                                                <div>{member.city}, {member.country}</div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-5">
                                                <span className="font-bebas fs-18">Seeking: </span>
                                            </div>
                                            <div className="col-xs-7">
                                                <div>{this.props.user.data.role === 'client' ? 'man' : 'woman'} from {member.match.from} to {member.match.to}</div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-5">
                                                <span className="font-bebas fs-18">Birthdate: </span>
                                            </div>
                                            <div className="col-xs-7">
                                                <div>{this.getBirthday(member.birthday)}</div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-5">
                                                <span className="font-bebas fs-18">Star sign: </span>
                                            </div>
                                            <div className="col-xs-7">
                                                <div>{member.zodiac}</div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-5">
                                                <span className="font-bebas fs-18">Height: </span>
                                            </div>
                                            <div className="col-xs-7">
                                                <div>{member.height.cm} cm / {member.height.inch}</div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-5">
                                                <span className="font-bebas fs-18">Weight: </span>
                                            </div>
                                            <div className="col-xs-7">
                                                <div>{member.weight.kg} kg / {member.weight.lbs} lbs</div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-5">
                                                <span className="font-bebas fs-18">Body style: </span>
                                            </div>
                                            <div className="col-xs-7">
                                                <div>{member.body_style.value || 'N/A'}</div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-5">
                                                <span className="font-bebas fs-18">Eye color: </span>
                                            </div>
                                            <div className="col-xs-7">
                                                <div>{member.eyes}</div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-5">
                                                <span className="font-bebas fs-18">Eyewear: </span>
                                            </div>
                                            <div className="col-xs-7">
                                                <div>{member.eye_wear.value || 'N/A'}</div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-5">
                                                <span className="font-bebas fs-18">Hair Color: </span>
                                            </div>
                                            <div className="col-xs-7">
                                                <div>{member.hair_color}</div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-5">
                                                <span className="font-bebas fs-18">Hair Length: </span>
                                            </div>
                                            <div className="col-xs-7">
                                                <div>{member.hair_length}</div>
                                            </div>
                                        </div>
                                        
                                            {
                                                this.props.user.data.role === 'client'
                                                ?   null
                                                :   <div className="row">
                                                        <div className="col-xs-5">
                                                            <span className="font-bebas fs-18">Ethnicity: </span>
                                                        </div>
                                                        <div className="col-xs-7">
                                                            <div>{member.ethnicity || 'N/A'}</div>
                                                        </div>
                                                    </div>
                                            }
                                            
                                        <div className="row">
                                            <div className="col-xs-5">
                                                <span className="font-bebas fs-18">Religion: </span>
                                            </div>
                                            <div className="col-xs-7">
                                                <div>{member.religion}</div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-5">
                                                <span className="font-bebas fs-18">Marital Status: </span>
                                            </div>
                                            <div className="col-xs-7">
                                                <div>{member.marital_status}</div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-5">
                                                <span className="font-bebas fs-18">Children: </span>
                                            </div>
                                            <div className="col-xs-7">
                                                <div>{member.children}</div>
                                            </div>
                                        </div>
                                        {
                                            member.about_children.length
                                            ?   <div className="row">
                                                    <div className="col-xs-5">
                                                        <span className="font-bebas fs-18">About Children: </span>
                                                    </div>
                                                    <div className="col-xs-7">
                                                        <div>{member.about_children.map((item, i) => <div><span className="text-capitalize">{item.sex}</span> - {this.getAge(item.birth)}</div>)}</div>
                                                    </div>
                                                </div>
                                            :   null
                                        }
                                            
                                        <div className="row">
                                            <div className="col-xs-5">
                                                <span className="font-bebas fs-18">Want children: </span>
                                            </div>
                                            <div className="col-xs-7">
                                                <div>{member.want_children}</div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-5">
                                                <span className="font-bebas fs-18">Education: </span>
                                            </div>
                                            <div className="col-xs-7">
                                                <div>{member.education}</div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-5">
                                                <span className="font-bebas fs-18">Field of work: </span>
                                            </div>
                                            <div className="col-xs-7">
                                                <div>{member.field_of_work.value || 'N/A'}</div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-5">
                                                <span className="font-bebas fs-18">Employment Status: </span>
                                            </div>
                                            <div className="col-xs-7">
                                                <div>{member.employment_status.value || 'N/A'}</div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-5">
                                                <span className="font-bebas fs-18">Smoke: </span>
                                            </div>
                                            <div className="col-xs-7">
                                                <div>{member.smoke}</div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-5">
                                                <span className="font-bebas fs-18">Drink: </span>
                                            </div>
                                            <div className="col-xs-7">
                                                <div>{member.drink}</div>
                                            </div>
                                        </div>
                                        {
                                            member.languages.length
                                            ?   <div className="row">
                                                    <div className="col-xs-5">
                                                        <span className="font-bebas fs-18">Languages: </span>
                                                    </div>
                                                    <div className="col-xs-7">
                                                        <div>{member.languages.map((item, i) => <div key={i}>{item.name} - {item.level_value}</div>)}</div>
                                                    </div>
                                                </div>
                                            :   null
                                        }
                                    </Col>
                                    <Col md={4}>
                                        <div className="row">
                                            <div className="col-sm-6 col-lg-6 col-md-12">
                                                <LinkIcon 
                                                    text={this.props.members.data.interest ? "Remove from interest" : "Express the interest"}
                                                    onClick={this.toggleInterest}
                                                    color="#FF8DA1" 
                                                    icon="fas fa-heart" />
                                            </div>
                                            <div className="col-sm-6 col-lg-6 col-md-12">
                                                <LinkIcon 
                                                    text={member.favorite ? "Remove from favorite" : "Add to favorite"}
                                                    onClick={this.toggleFavorite}
                                                    color="#FFD700"
                                                    icon="fas fa-star" />
                                            </div>
                                            <div className="col-sm-6 col-lg-6 col-md-12">
                                                <LinkIcon
                                                    onClick={this.openModal}
                                                    text="Send Letter"
                                                    color="#27C2D3"
                                                    icon="fas fa-envelope" />
                                            </div>
                                            {/*<div className="col-sm-6 col-lg-6 col-md-12">
                                                <LinkIcon text="Invite to Video-Chat" icon="fas fa-comment" color="#FF0000" />
                                            </div>*/}
                                            {
                                                this.props.user.data.role === 'client'
                                                ?   <div>
                                                        <div className="col-sm-6 col-lg-6 col-md-12">
                                                            <LinkIcon 
                                                                text="Share contact details"
                                                                onClick={this.getContactsDetails}
                                                                color="#6A74C3"
                                                                icon="fas fa-address-card" />
                                                        </div>
                                                        <div className="col-sm-6 col-lg-6 col-md-12">
                                                            <LinkIcon 
                                                                text="Send gift"
                                                                color="#40E0D0"
                                                                onClick={this.goToShop}
                                                                icon="fas fa-gift" />
                                                        </div>
                                                    </div>
                                                :   null
                                            }
                                        </div>
                                        <hr />
                                        <div>
                                            <h4 className="text-dark-blue"><strong>Interests</strong></h4>
                                            <div>
                                                {member.interests_value.join(', ')}
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-dark-blue"><strong>More about me</strong></h4>
                                            <div>{member.about_me}</div>
                                        </div>
                                        <div>
                                            <h4 className="text-dark-blue"><strong>The one I would like to meet</strong></h4>
                                            <div>
                                                {member.like_to_meet}
                                            </div>
                                        </div>
                                        {
                                            this.props.user.data.role === 'client'
                                            ?   <div>
                                                    <div>
                                                        <h4 className="text-dark-blue"><strong>More about my leisure time</strong></h4>
                                                        <div>
                                                            {member.leisure_time}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-dark-blue"><strong>About my family</strong></h4>
                                                        <div>
                                                            {member.about_family}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-dark-blue"><strong>My Future Goals</strong></h4>
                                                        <div>
                                                            {member.future_goals}
                                                        </div>
                                                    </div>
                                                </div>
                                            :   null
                                        }
                                    </Col>
                                </Row>
                        }
                    </Grid>
                </div>
                <Lightbox
                    images={[{src: this.props.members.data.avatar.original}]}
                    isOpen={this.props.services.gallery.show_light_box === 'avatar'}
                    backdropClosesModal={true}
                    showImageCount={false}
                    onClose={this.closeLightbox} />
                <Lightbox
                    images={this.getImages()}
                    isOpen={this.props.services.gallery.show_light_box === 'member'}
                    currentImage={this.props.services.gallery.img_light_box}
                    onClickPrev={this.gotoPrevious}
                    onClickNext={this.gotoNext}
                    backdropClosesModal={true}
                    showImageCount={false}
                    onClose={this.closeLightbox} />
                <MainModal
                    body={<MessageBlock memberId={member.id} />}
                    title="Send Message"
                    show={message}
                    keyModal="message" />
                    {
                        this.state.showSlider
                        ?   <FullScreenSlider backDrop={this.closeSlider} initialSlide={this.state.initialSlide} memberId={this.props.members.data.id} list={[{src: this.props.members.data.avatar.original}, ...this.props.members.data.gallery]} />
                        :   null
                    }
                
            </div>
        );
    }
}

const mapStateToProps = state =>
    ({
        services: {
            gallery: {
                show_light_box: state.services.gallery.show_light_box,
                avatar: state.services.gallery.avatar,
                img_light_box: state.services.gallery.img_light_box
            }
        },
         modals: {
            message: state.modals.message
        },
        members: {
            data: state.members.data
        },
        user: {
            token: state.user.token,
            data: {
                role: state.user.data.role
            }
        }
    })

export default connect(
    mapStateToProps
)(Member)