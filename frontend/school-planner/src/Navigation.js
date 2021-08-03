import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

export class Navigation extends React.Component{
    render() {
        return (
            <Navbar bg='dark' expand='lg'>
                <Navbar.Toggle aria-controls='basic-navbar-nav'></Navbar.Toggle>
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav>
                        <NavLink className='d-inline p-2 bg-dark text-white' to='/'>Home</NavLink>
                        <NavLink className='d-inline p-2 bg-dark text-white' to='/rooms'>Rooms</NavLink>
                        <NavLink className='d-inline p-2 bg-dark text-white' to='/teachers'>Teachers</NavLink>
                        <NavLink className='d-inline p-2 bg-dark text-white' to='/groups'>Groups</NavLink>
                        <NavLink className='d-inline p-2 bg-dark text-white' to='/subjects'>Subjects</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
    
}