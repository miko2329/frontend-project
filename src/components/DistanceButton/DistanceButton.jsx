import React from 'react';
import classes from "./distanceButton.module.css";

const DistanceButton = ({onClick}) => {
    return (
        <button className={classes.distanceButton} onClick={onClick}>
            Calculate distance
        </button>
    );
};

export default DistanceButton;