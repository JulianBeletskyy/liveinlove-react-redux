import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from 'store'
import { toggleModal, buyPhoto } from 'actions'
import BtnMain from 'components/form/buttons/main_button.js'
import Slider from 'react-slick'
import { confirmAlert } from 'react-confirm-alert'

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
        <i className="fas fa-chevron-right" style={{ ...style, 
                                                    position: "absolute", 
                                                    transform: "translateY(-50%)", 
                                                    top: "50%",
                                                    fontSize: "40px",
                                                    left: '15px',
                                                    color: "#fff" }}></i>
    </div>
  );
}

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
        <i className="fas fa-chevron-left" style={{ ...style, 
                                                    position: "absolute", 
                                                    transform: "translateY(-50%)", 
                                                    top: "50%",
                                                    fontSize: "40px",
                                                    color: "#fff",
                                                    right: '15px' }}></i>
    </div>
  );
}

class FullScreenSlider extends Component {
	printItems = (item, i) => {
		return 	<div key={i} className="text-center" style={{position: 'relative'}}>
					<img src={item.src} className="img-responsive full-screen-slider-img" />
					{
						this.getButton(item)
						? 	<div className="full-screen-slider-button">
								<BtnMain
			                        type="button"
			                        bsStyle="success"
			                        text="Buy photo"
			                        onClick = {this.buyPhoto(item)} />
		                    </div>
						: 	''
					}
						
				</div>
	}

	buyPhoto = item => e => {
		confirmAlert({
            title: '',
            message: 'You can\'t see this photo',
            buttons: [
                {
                    label: 'Cancel'
                }, {
                    label: 'Use Credits',
                    onClick: () => {
                        if (this.props.user.data.credits < 3) {
                            store.dispatch(toggleModal(true, 'credits'))
                        } else {
                            store.dispatch(buyPhoto(item.id, this.props.user.token, this.props.memberId))
                        }
                    }
                }, {
                    label: 'Upgrade Membership',
                    onClick: () => {
                        store.dispatch(toggleModal(true, 'plans'))
                    }
                }
            ]
        })
	}

	getButton = item => {
		if (item.private && ! item.purchased && this.props.user.data.membership.view_photo === 'Limited') {
			return true
		}
		return false
	}

	close = e => {
		e.preventDefault()
		if (e.target.id === 'backdrop') {
			this.props.backDrop()
		}
	}

	render() {
		const settings = {
            slidesToShow: 1,
            dots: false,
            infinite: true,
            autoplay: false,
            draggable: false,
            adaptiveHeight: false,
            initialSlide: this.props.initialSlide,
            nextArrow: <NextArrow />,
            prevArrow: <PrevArrow />,
            ...this.props.settings
        };

		return 	<div id="backdrop" className="wrap-full-screen-slider" onClick={this.close}>
					<div className="container">
						<div className="wrap-full-screen-list">
							<Slider {...settings}>
				                { this.props.list.map((item, i) => this.printItems(item, i))}
				            </Slider>
			            </div>
		            </div>
				</div>
	}
}

const mapStateToProps = (state) => {
    return {
        user: {
        	token: state.user.token,
            data: {
                role: state.user.data.role,
                membership: state.user.data.membership,
                credits: state.user.data.credits
            }
        }
    }
}

export default connect(
    mapStateToProps
)(FullScreenSlider)