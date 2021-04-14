import React, { Component } from 'react'
import { Navvar, NavbarBrand, Jumbotron } from 'reactstrap';
import Navbar from 'reactstrap/lib/Navbar';

class Header extends Component {
    render () {
        return (
            <React.Fragment>
                <Jumbotron fluid>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <h1>NuCamp</h1>
                                <h2>a better way to camp</h2>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <Navbar dark stick="top">
                    <div className="container">
                        <NavbarBrand href="/">NuCamp</NavbarBrand>
                    </div>
                </Navbar>
            </React.Fragment>
        );
    }
}

export default Header; 