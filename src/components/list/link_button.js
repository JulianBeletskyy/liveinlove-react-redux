import React, { Component } from 'react'
import style from './link_button.css'
import MainModal from 'components/modal/modal.js'
import { connect } from 'react-redux'
import store from 'store'
import { toggleModal, setAttachMessage, clearAttach } from 'actions'
import CustomGallery from 'components/gallery/custom_gallery.js'

class LinkButton extends Component {
	constructor(props) {
        super(props);
        this.state = {
            active: false
        };
    }

    showMenu = (event) => {
        event.stopPropagation()
        this.setState({active: ! this.state.active})
    }

    upload = (event) => {
        event.preventDefault()
        const el = document.getElementById('upload')
        el.click()
    }

    clearAttach = (index) => (e) => {
        e.stopPropagation()
        store.dispatch(clearAttach(index))
    }

    showModal = () => {
        store.dispatch(toggleModal(true, 'gallery'))
    }

    choosePhoto = (e) => {
        store.dispatch(setAttachMessage([e]))
        store.dispatch(toggleModal(false, 'gallery'))
        this.setState({active: ! this.state.active})
    }

    onChange = (e) => {
        if (e) {
            store.dispatch(setAttachMessage(e.target.files))
            this.setState({active: ! this.state.active})
        }
    }

    createName = (attach) => {
        if (attach.name) {
            return attach.name
        }
        return 'photo ' + attach.id
    }

    render() {
    	const activeClass = this.state.active ? style.active : ''
        const gallery = this.props.modals.gallery
        return (
            <div className={style.wrap}>
                
                <span>
                	<a className="font-bebas" href={'javascript:;'} onClick={this.showMenu}>Add photo</a>
                	<ul className={style.menu + ' ' + activeClass}>
                        <li onClick={this.showModal} className={style.menuItem + ' ' + 'font-bebas'}>Choose from gallery</li>
                        <li onClick={this.upload} className={style.menuItem + ' ' + 'font-bebas'}>Upload photo</li>
                    </ul>
                    <input type="file" id="upload" multiple onChange={this.onChange} className={style.uploadField} />
                    <MainModal
                        body={<CustomGallery 
                                images={this.props.user.data.images}
                                info={false}
                                edit={false}
                                onClick={(e) => {this.choosePhoto(e)}}
                                profile={true} />}
                        title="Gallery"
                        show={gallery}
                        size="lg"
                        keyModal="gallery" />
            	</span>
                <br />
                {   
                    this.props.messages.attach_message.length
                    ?   this.props.messages.attach_message.map((item, i) => {
                        return  <span key={i} style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                                    <span className={style.name}>{this.createName(item)}</span>
                                    <i onClick={this.clearAttach(i)} className={style.close + " fas fa-times text-danger"}></i>
                                </span>
                    })
                            
                    : ''
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        modals: {
            gallery: state.modals.gallery
        },
        messages: {
            attach_message: state.messages.attach_message
        },
        user: {
            data: {
                images: state.user.data.images
            }
        }
    }
}

export default connect(
    mapStateToProps
)(LinkButton)