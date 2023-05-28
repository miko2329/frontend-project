import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setDataA, setDataB, setDistance } from '../../redux/distanceActions';
import { api_url as distanceApi_url, options as distanceApiOptions } from '../../api/apiDistance.js';
import classes from './distance.module.css';
import { api_url, options as apiOptions } from '../../api/apiSearchCity.js';
import Header from '../Header/Header.jsx';
import Search from '../Search/Search.jsx';
import DistanceButton from '../DistanceButton/DistanceButton.jsx';

const DistanceWithRedux = (props) => {

    const handleOnSearchChangeA = (searchData) => {
        props.setDataA(searchData.value);
        console.log(props)
    };

    const handleOnSearchChangeB = (searchData) => {
        props.setDataB(searchData.value);
    };

    const getDistance = async () => {
        const { dataA, dataB } = props;

        const result = await fetch(
            `${distanceApi_url}/${dataA.wikiDataId}/distance?distanceUnit=KM&toCityId=${dataB.wikiDataId}`,
            distanceApiOptions
        )
            .then((response) => response.json())
            .then((response) => response.data)
            .catch((err) => console.error(err));

        props.setDistance(result);
    };

    const loadOptions = (inputValue) => {
        return fetch(`${api_url}?types=CITY&namePrefix=${inputValue}&sort=%2Bname`, apiOptions)
            .then((response) => response.json())
            .then((response) => {
                return {
                    options: response.data.map((city) => {
                        return {
                            label: `${city.name}, ${city.region}, ${city.country}`,
                            value: {
                                name: city.name,
                                wikiDataId: city.wikiDataId,
                            },
                        };
                    }),
                };
            })
            .catch((err) => console.error(err));
    };

    const { dataA, dataB, distance } = props;

    return (
        <div>
            <Header title={'Distance between city A and city B'} />
            <Search placeholder={'Enter name of city A'} onSearchChange={handleOnSearchChangeA} loadOptions={loadOptions} autoReset={false} />
            <br />
            <Search placeholder={'Enter name of city B'} onSearchChange={handleOnSearchChangeB} loadOptions={loadOptions} autoReset={false} />
            {dataA && dataB && <DistanceButton onClick={getDistance} />}
            {distance && (
                <p className={classes.result}>
                    Distance between the {`${dataA.name} and ${dataB.name}`} is {distance} Km
                </p>
            )}
        </div>
    );
};

const mapStateToProps = (state) => ({
    dataA: state.dataA,
    dataB: state.dataB,
    distance: state.distance,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            setDataA,
            setDataB,
            setDistance,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(DistanceWithRedux);
