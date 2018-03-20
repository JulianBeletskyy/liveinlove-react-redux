import React, { Component } from 'react'
import { Row, Col, FormGroup } from 'react-bootstrap'
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
                {
                    this.props.more
                    ?   <Col xs={12}>
                            <FormGroup className="font-bebas text-center">
                                <a href="javascript:;" onClick={this.props.onClick}><span>see more</span></a>
                            </FormGroup>
                        </Col>
                    : ''
                }
            </Row>
        );
    }
}

export default MemberBlock