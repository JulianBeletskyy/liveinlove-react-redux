import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import MemberPreview from './preview.js'

class MemberBlock extends Component {

    printList = (member, i) => {
        return (<Col key={i} sm={3} xs={6}>
                    <MemberPreview
                        options={member} />
                </Col>)
    }

    render() {
        return (
            <Row>
            { this.props.list.map((member, i) => this.printList(member, i)) }
            </Row>
        );
    }
}

export default MemberBlock