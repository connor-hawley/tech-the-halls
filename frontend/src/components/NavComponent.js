import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

const NavComponent = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <Navbar color="faded" light>
      <NavbarBrand href="/" className="mr-auto">Tech the Halls</NavbarBrand>
      <NavbarToggler onClick={toggleNavbar} className="mr-2" />
      <Collapse isOpen={!collapsed} navbar>
        <Nav navbar>
          <NavItem>
            <NavLink tag={Link} to="/">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/login">Login</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/register">Register</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/requirements">Mentor Requirements</NavLink>       
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/admin">Admin</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
}

// NavbarToggler.propTypes = {
//   type: PropTypes.string,
//   tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
//   // pass in custom element to use
// }

export default NavComponent;