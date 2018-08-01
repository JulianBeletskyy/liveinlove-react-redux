import React, { Component } from 'react'

class Terms extends Component {

    render() {
        return (
        	<div style={{height: '100vh', marginTop: -3}}>
	            <embed src="/terms.pdf" type="application/pdf" width="100%" height="100%" />
			</div>
        );
    }
}

export default Terms