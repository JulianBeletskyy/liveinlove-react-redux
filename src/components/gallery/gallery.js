import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import SmallItem from './small_item.js'

class Gallery extends Component {
    constructor(props) {
        super(props)
    }

    photoArray = (avtars) => {
        let array = [avtars]
        return array
    }

    printPhoto = (photo, i) => {
        return (<Col key={i} sm={3}><SmallItem croped={photo.original} original={photo.croped} /></Col>)
    }

    render() {
        const { data } = this.props.user
        return (
            <div>
                <Row>
                {
                    this.photoArray(data.avatar).map((photo, i) => this.printPhoto(photo, i))
                }
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(
    mapStateToProps
)(Gallery);