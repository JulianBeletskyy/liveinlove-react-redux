import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import MemberPreview from './preview.js'

class MemberBlock extends Component {

    printList = (member, i) => {
        return (<Col key={i} sm={3}>
                    <MemberPreview
                        options={member} />
                </Col>)
    }

    render() {
        return (
        	<div>
	            <Row>
                { this.props.list.map((member, i) => this.printList(member, i)) }
                </Row>
            </div>
        );
    }
}

export default MemberBlock