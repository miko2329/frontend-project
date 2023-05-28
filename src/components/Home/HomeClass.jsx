import React, { Component } from 'react';
import classes from './home.module.css';
import {TextContext} from "../../context/TextContextProvider.jsx";

class HomeClass extends Component {
    static contextType = TextContext;

    state = {
        hasError: false,
    };

    componentDidMount() {
        console.log('Component mounted');
    }

    componentDidUpdate() {
        console.log('Component updated');
    }

    componentWillUnmount() {
        console.log('Component will unmount');
    }

    componentDidCatch(error, info) {
        console.error('Error occurred:', error);
        console.error('Error info:', info);
        this.setState({ hasError: true });
    }

    render() {
        const { homeText, linkText } = this.context;

        return (
            <div className={classes.home}>
                <p className={classes.text}>{homeText}</p>
                <a className={classes.link} href="https://github.com/miko2329">
                    {linkText}
                </a>
            </div>
        );
    }
}

export default HomeClass;
