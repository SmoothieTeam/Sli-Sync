import React from "react";
import { Link } from 'react-router-dom';

import './Header.css';
import './HeaderIcon.css';

function Header({ children }) {
    return (
        <header className='header'>
            {children}
        </header>
    );
}

function HeaderIcon() {
    return (
        <Link to='/' className='header-icon'>
            <div></div>
            <div></div>
            <div></div>
        </Link>
    );
}

function HeaderBuilder() {
    const childern = [];
    
    this.addIcon = () => {
        childern.push(HeaderIcon());
        return this;
    };

    this.build = () => {
        return (
            <Header>
                { childern }
            </Header>
        );
    };
}

export default HeaderBuilder;