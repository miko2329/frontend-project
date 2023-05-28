import React from 'react';
import classes from "./home.module.css";

const Home = () => {
    return (
        <div className={classes.home}>
            <p className={classes.text}>Welcome to my GEO React Application. This app done with 4 API. APIs: GEO DB Cities, GEO DB Countries, GEO DB Distance, Flag API. Also the app done with Firebase, React Redux, React Router, React Select Async Paginate, React Accessible Accordion. I hope you will enjoy with this app. All the best!</p>
            <a className={classes.link} href="https://github.com/miko2329">GitHub of author</a>
        </div>
    );
};

export default Home;