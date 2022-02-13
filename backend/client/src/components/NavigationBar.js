import React from 'react'
//import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
//import NavDropdown from 'react-bootstrap/NavDropdown'

const NavigationBar = () => {

  return (
    <Navbar>
      <div className="navbar-container w-100">
        <Navbar.Brand href=''>Holiday Mates</Navbar.Brand>
        <Nav>
          <Nav.Link href=''></Nav.Link>
          <Nav.Link href=''></Nav.Link>
        </Nav>
      </div>
    </Navbar>
  )
}

export default NavigationBar