import React, { Component } from 'react'
import { Row, Col, FormGroup } from 'react-bootstrap'
import MemberPreview from './preview.js'

class MemberBlock extends Component {

    printList = (member, i) => {
        return (<Col key={i} sm={3} xs={6}>
                    <MemberPreview
                        like={this.props.like}
                        onClick={this.props.onClickItem}
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
                            <FormGroup className="font-bebas text-center fs-18">
                                <a href="javascript:;" onClick={this.props.onClick}><strong>see more</strong></a>
                            </FormGroup>
                        </Col>
                    : ''
                }
            </Row>
        );
    }
}

export default MemberBlock