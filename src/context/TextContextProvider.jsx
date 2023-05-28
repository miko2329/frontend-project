import React from 'react';

export const TextContext = React.createContext();

const TextContextProvider = ({ children }) => {
    const textData = {
        homeText: 'Welcome to my GEO React Application. This app done with 4 API. APIs: GEO DB Cities, GEO DB Countries, GEO DB Distance, Flag API. Also the app done with Firebase, React Redux, React Router, React Select Async Paginate, React Accessible Accordion. I hope you will enjoy with this app. All the best!',
        linkText: 'GitHub of author',
    };

    return (
        <TextContext.Provider value={textData}>
            {children}
        </TextContext.Provider>
    );
};

export default TextContextProvider;