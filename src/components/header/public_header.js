import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from './style.css';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, MenuItem } from 'react-bootstrap';

class PublicHeader extends Component {
    render() {
        return (
            <Navbar className={style.navbarDefault + ' title'} fixedTop>
                 <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">
                            <img alt="Brand" src="/assets/img/logo.png"/>
                        </Link>
                    </Navbar.Brand>

                    <Navbar.Toggle />
                 </Navbar.Header>

                <Navbar.Collapse> 
                    <Nav className={style.navBar} pullRight >
                        <NavDropdown role="presentation" eventKey={1} title="About" id="about-nav-dropdown">
                          <MenuItem eventKey={1.1}>About Agency</MenuItem>
                          <MenuItem eventKey={1.2}>How it works?</MenuItem>
                          <MenuItem eventKey={1.3}>Testimonials</MenuItem>
                          <MenuItem eventKey={1.3}>Success stories</MenuItem>
                        </NavDropdown>

                        <li role="presentation">
                            <Link to="/girls">Girls</Link>
                        </li>

                        <li role="presentation">
                            <Link to="/services">Services</Link>
                        </li>

                        <li role="presentation">
                            <Link to="/success-stories">Success Stories</Link>
                        </li>

                        <li role="presentation">
                            <Link to="/blog">Blog</Link>
                        </li>

                        <NavDropdown role="presentation" eventKey={2} title="Support" id="support-nav-dropdown">
                          <MenuItem eventKey={2.1}>Send Request</MenuItem>
                          <MenuItem eventKey={2.2}>FAQ</MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse> 
            </Navbar>
        );
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(
    mapStateToProps
)(PublicHeader);