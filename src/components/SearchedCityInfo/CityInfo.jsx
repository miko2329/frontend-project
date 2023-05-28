import React from 'react';
import classes from "./cityInfo.module.css";

const CityInfo = ({data}) => {
    return (
        <div className={classes.cityInfoContainer}>
            <div className={classes.nameAndCountry}>
                <p className={classes.cityName}>{data.name}</p>
                <p className={classes.country}>{data.country} - {data.countryCode}</p>
                <img src={`https://flagsapi.com/${data.countryCode}/flat/64.png`} alt={`${data.country}'s image`}/>
            </div>
            <div className={classes.info}>
                <p className="wikiDataId">Wiki data id: {data.wikiDataId}</p>
                <p className="region">Region/Region code: {data.region}/{data.regionCode}</p>
                <p className="latitude">Latitude: {data.latitude.toFixed(2)}</p>
                <p className="longitude">Longitude: {data.longitude.toFixed(2)}</p>
                <p className="population">Population: {data.population}</p>
            </div>
        </div>
    );
};

export default CityInfo;