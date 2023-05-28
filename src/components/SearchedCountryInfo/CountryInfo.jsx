import React from 'react';
import classes from "./countryInfo.module.css";

const CountryInfo = ({data}) => {
    return (
        <div className={classes.countryInfoContainer}>
            <div className={classes.nameCodeAndCapital}>
                <p className={classes.nameCode}>{data.name} - {data.code}</p>
                <p className={classes.capital}>{data.capital}</p>
            </div>
            <img className={classes.flag} src={data.flagImageUri} alt={`${data.name}'s image`}/>
            <div className={classes.info}>
                <p className="wikiDataId">Wiki data id: {data.wikiDataId}</p>
                <p className="regions">Number of regions: {data.numRegions}</p>
                <p className="callCode">Calling code: {data.callingCode}</p>
                <p className="currencyCode">Currency code: {data.currencyCode}</p>
            </div>
        </div>
    );
};

export default CountryInfo;