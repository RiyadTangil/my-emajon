import React from 'react';
import "./Header.css"
import logo from "../../images/logo.png"

const Header = () => {
    return (
        <div className="header">
            <img src={logo} alt="" />
            <nav>
                <ul>
                    <li><a href="/shop">Shop</a></li>
                    <li><a href="/review">Order review</a></li>
                    <li><a href="/contest">Contest</a></li>
                    <li><a href="/Dashboard/profile">Mange inventory</a></li>
                    <li><a href="/login">Log out</a> </li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;
