import React from 'react';
import classes from './header.module.css';
const Header = ({title}) => {
    return (
        <header className={classes.headerMain}>
            <a href="https://github.com/miko2329" target={"_blank"}>Author of project</a>
            <h1>{title}</h1>
        </header>
    );
};

export default Header;