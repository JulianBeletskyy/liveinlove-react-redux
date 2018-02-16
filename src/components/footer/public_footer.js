import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import style from './style.css';

class PublicFooter extends Component {
    render() {
        return (
            <div className={style.footer}>
                <Grid>
                    <Row>
                        <Col md={3} sm={12}> 
                            <div className="title">
                                footer content
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(
    mapStateToProps
)(PublicFooter);