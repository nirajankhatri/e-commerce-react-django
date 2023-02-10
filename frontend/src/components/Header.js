import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Container, Nav, Form, FormControl, Button, NavDropdown } from 'react-bootstrap'
import { logout } from '../actions/userActions'
import SearchBox from './SearchBox'


const Header = () => {

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
  }
  if (userInfo && userInfo.isAdmin) {
    return (
      <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
          <Container>
            <LinkContainer to='/admin'>
              <Navbar.Brand>Admin</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >

                {userInfo ? (
                  <NavDropdown title={userInfo.name} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>

                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to="/login">
                    <Nav.Link><i className="fas fa-user"></i>Login</Nav.Link>
                  </LinkContainer>
                )
                }

                <LinkContainer to='/admin/userlist' activeStyle={{color: "white",background:"#0288d1"}}>
                  <Nav.Link className='adminLinks'>Users</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/admin/productlist' activeStyle={{color: "white",background:"#0288d1"}}>
                  <Nav.Link className='adminLinks'>Products</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/admin/orderlist' activeStyle={{color: "white",background:"#0288d1"}}>
                  <Nav.Link className='adminLinks'>Orders</Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
  else {
    return (
      <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
          <Container fluid>
            <LinkContainer to='/'>
              <Navbar.Brand>Aama Art</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <LinkContainer to='/'>
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>

                <LinkContainer to="/cart">
                  <Nav.Link><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
                </LinkContainer>

                {userInfo ? (
                  <NavDropdown title={userInfo.name} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>

                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to="/login">
                    <Nav.Link><i className="fas fa-user"></i>Login</Nav.Link>
                  </LinkContainer>
                )
                }

              </Nav>
              <SearchBox />
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }

};

export default Header;
