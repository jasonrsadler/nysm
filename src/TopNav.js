import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Nav, Navbar} from "react-bootstrap";
import RouteNavItem from './components/RouteNavItem';
import './style.css';
    
export default class TopNav extends Component {
    
    render() {
        return (
            <div id="index">
                <Navbar fixedTop collapseOnSelect inverse>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to="/" className='site-title'>Not Your Super Mommy</Link>                        
                        </Navbar.Brand> 
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>                    
                        <Nav pullRight> 
                            <RouteNavItem eventKey={3} href="/Counseling">Counseling</RouteNavItem>
                            <RouteNavItem eventKey={4} href="/Food Allergies">Food Allergies</RouteNavItem>
                            <RouteNavItem eventKey={5} href="/Parenting">Parenting</RouteNavItem>                      
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
          </div>            
        );            
    }    
}