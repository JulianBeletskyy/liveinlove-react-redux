import React, { Component } from 'react'
import style from './receiver.css'

class ReceiverInfo extends Component {
	constructor(props) {
		super(props)
		this.state = {
            tempList: []
        };
	}
	thisRef = (ref) => {
        this.props.inputRef(ref);
        this.input = ref
    }

    handleChange = () => {
    	let tempList = []
    	if (this.input.value) {
    		tempList = this.props.list.filter((item) => {
	    		return (item.first_name).toLowerCase().indexOf(this.input.value.toLowerCase().replace(' ', '')) + 1 || (item.last_name).toLowerCase().indexOf(this.input.value.toLowerCase().replace(' ', '')) + 1
	    	})
    	}
    	
    	this.setState({tempList: tempList})
    }

    choose = (item) => {
    	this.input.value = ''
    	this.setState({tempList: []})
    	this.props.onClick(item)
    }

    printList = (item, i) => {
    	return 	<div key={i} className={style.wrapItem} onClick={() => this.choose(item)}>
    				<img className={style.img} src={item.avatar} alt="" />
    				<span>{item.first_name + ' ' + item.last_name}</span>
				</div>
    }

    render() {
    	const receiver = this.props.value
        return (
            <div className={style.wrap}>
            	{
            		receiver.id
            		? 	<div>
            				<div className={style.receiver + " font-bebas"}><span className={style.underlineText}>Receiver</span></div>
		        			<img className={style.img} src={receiver.avatar.croped || receiver.avatar} alt="" />
							<span>{receiver.first_name + ' ' + receiver.last_name}</span>
							<span className={style.removeBtn} onClick={this.props.clearReceiver}><i className="fas fa-times text-danger"></i></span>
						</div>
            		: 	<div><input
		                    className={style.style + ' form-control'}
		                    ref={this.thisRef}
		                    type="text"
		                    onChange={this.handleChange}
		                    placeholder="Choose receiver" />
		                <div className={style.listWrap}>
			        		{this.state.tempList.map((item, i) => this.printList(item, i))}
			        	</div></div>
            	}
            </div>
        );
    }
}

export default ReceiverInfo