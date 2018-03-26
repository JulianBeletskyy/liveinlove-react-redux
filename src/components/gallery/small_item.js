import React, { Component } from 'react'
import style from './small_item.css'

class SmallItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        };
        const app = document.getElementById('root')
        app.addEventListener('click', () => {
            this.setState({active: false})
        })
    }

    showMenu = (event) => {
        event.stopPropagation()
        this.setState({active: ! this.state.active})
    }

    closeMenu = (event) => {
        event.stopPropagation()
        this.setState({active: false})
    }

    render() {
        const activeClass = this.state.active ? style.active : ''
        const hiddenClass = this.props.image.private && ! this.props.profile ? style.hidden : ''
        let text = ''
        let classInfo = ''
        let textMenu = ''
        switch (this.props.client) {
            case true: 
                text = this.props.image.active ? 'active' : 'unactive';
                textMenu =  this.props.image.active ? 'unactive' : 'active';
                classInfo = this.props.image.active ? style.success : style.danger;
                break;
            case false: 
                text = ! this.props.image.private ? 'public' : 'private';
                textMenu = ! this.props.image.private ? 'private' : 'public';
                classInfo = ! this.props.image.private ? style.success : style.danger;
                break;
            default: text = ''
        }
        
        if (this.props.forClient) {
            text = ! this.props.image.private ? 'public' : 'private';
            textMenu = ! this.props.image.private ? 'private' : 'public';
            classInfo = ! this.props.image.private ? style.success : style.danger;
        }
        return (
            <div className={style.wrap} onClick={this.props.onClick}>
                <img src={this.props.image.src || this.props.image.image} className={style.img + ' ' + hiddenClass} alt="" />
                {
                    this.props.edit
                    ?   <span className={style.icon} onClick={this.showMenu}>
                            <i className="fas fa-pen-square fa-2x"></i>
                        </span>
                    : ''
                }
                <ul className={style.menu + ' ' + activeClass}>
                    <span onClick={this.closeMenu} className={style.closeBtn}><i className="fas fa-times"></i></span>
                    <li onClick={(e) => {this.showMenu(e); this.props.removePhoto(e)}} className={style.menuItem + ' ' + 'font-bebas'}>Remove Photo</li>
                    <li onClick={(e) => {this.showMenu(e); this.props.client ? this.props.toggleActive(e) : this.props.togglePrivate(e)}} className={style.menuItem + ' ' + 'font-bebas'}>Make {textMenu}</li>
                </ul>
                {
                    this.props.info
                    ? <span className={style.infoImg + ' ' + classInfo}>{text}</span>
                    : ''
                }
            </div>
        );
    }
}

export default SmallItem