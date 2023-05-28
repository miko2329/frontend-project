import React, {useState} from 'react';
import {api_url as distanceApi_url, options as distanceApiOptions} from "../../api/apiDistance.js";
import classes from "./distance.module.css";
import {api_url, options as apiOptions} from "../../api/apiSearchCity.js";
import Header from "../Header/Header.jsx";
import Search from "../Search/Search.jsx";
import DistanceButton from "../DistanceButton/DistanceButton.jsx";

const Distance = () => {

    const [dataA, setDataA] = useState(null)
    const [dataB, setDataB] = useState(null)
    const [distance, setDistance] = useState(null)

    const handleOnSearchChangeA = (searchData) => {
        setDataA(searchData.value)
    }

    const handleOnSearchChangeB = (searchData) => {
        setDataB(searchData.value)
    }

    const getDistance = async () => {
        const result = await fetch(`${distanceApi_url}/${dataA.wikiDataId}/distance?distanceUnit=KM&toCityId=${dataB.wikiDataId}`, distanceApiOptions)
            .then(response => response.json())
            .then(response => response.data)
            .catch(err => console.error(err));
        setDistance(result)
    }

    const loadOptions = (inputValue) => {
        return fetch(`${api_url}?types=CITY&namePrefix=${inputValue}&sort=%2Bname`, apiOptions)
            .then(response => response.json())
            .then(response => {
                return {
                    options: response.data.map((city) => {
                        return {
                            label: `${city.name}, ${city.region}, ${city.country}`,
                            value: {
                                name: city.name,
                                wikiDataId: city.wikiDataId
                            }
                        }
                    })
                }

            }).catch(err => console.error(err));
    }

    return (
        <div>
            <Header title={"Distance between city A and city B"}/>
            <Search placeholder={"Enter name of city A"} onSearchChange={handleOnSearchChangeA} loadOptions={loadOptions} autoReset={false}/>
            <br/>
            <Search placeholder={"Enter name of city B"} onSearchChange={handleOnSearchChangeB} loadOptions={loadOptions} autoReset={false}/>
            {dataA && dataB && <DistanceButton onClick={getDistance}/>}
            {distance && <p className={classes.result}>Distance between the {`${dataA.name} and ${dataB.name}`} is {distance} Km</p>}
        </div>
    );
};

export default Distance;