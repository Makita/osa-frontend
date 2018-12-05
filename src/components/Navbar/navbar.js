// @flow
import React from 'react';
import {
  Navbar as Navibar,
  Nav,
  NavItem
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Navbar = () => {
  return (
    <Navibar fixedTop inverse>
      <Navibar.Header>
        <Navibar.Brand>
          <LinkContainer to="/">
            <span>One Stop Auto and Hitch</span>
          </LinkContainer>
        </Navibar.Brand>
        <Navibar.Toggle />
      </Navibar.Header>
      <Navibar.Collapse>
        <Nav>
          <LinkContainer to="/" exact>
            <NavItem>Home</NavItem>
          </LinkContainer>
          <LinkContainer to="/book" exact>
            <NavItem>Make an Appointment</NavItem>
          </LinkContainer>
          <LinkContainer to="schedule" exact>
            <NavItem>Current Bookings</NavItem>
          </LinkContainer>
        </Nav>
      </Navibar.Collapse>
    </Navibar>
  );
}

export default Navbar;