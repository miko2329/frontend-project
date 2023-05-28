import React from 'react';
import classes from "./button.module.css";

const Button = ({text, onClick, valueButton, fontSize}) => {

    return (
        <button className={classes.button} onClick={onClick} value={valueButton} style={{fontSize}}>
            {text}
        </button>
    );
};

export default Button;