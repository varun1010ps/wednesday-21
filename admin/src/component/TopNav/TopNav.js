import React, { Component } from 'react';
import Logo from "../Logo/Logo"
import './TopNav.css'

class TopNav extends Component {
    state = {}
    render() {
        return (<div className="TopNav">
            <nav className="navbar">
                <div className="Nav_logo">
                    <Logo />
                </div>
            </nav>
        </div>);
    }
}

export default TopNav;