import React, {useState, useEffect} from 'react';
import Header from "./Header/Header.jsx";
import Search from "./Search/Search.jsx";
import CityInfo from "./SearchedCityInfo/CityInfo.jsx";
import CityListInfo from "./CityListInfo/CityListInfo.jsx";
import {api_url, options as apiOptions} from "../api/apiSearchCity.js";
import {cityDetail_options, cityDetail_url} from "../api/apiCityDetails.js";
import Button from "./Button/Button.jsx";
import dataBase from '../firebase/firestore'
import {collection, addDoc, deleteDoc, query, getDocs, where, doc, updateDoc} from 'firebase/firestore'
import {useAuth} from "../hooks/useAuth.js";

const AllAboutCities = () => {

    const {isAuth, id} = useAuth()

    const [data, setData] = useState(null)

    const collectionRef = collection(dataBase, 'cities');

    const [cityList, setCityList] = useState([])

    useEffect( () => {
        const fetchCities = async () => {
            if (isAuth) {
                const cityQuery = query(
                    collectionRef,
                    where("userId", "==", id)
                );

                const querySnapshot = await getDocs(cityQuery);
                const fetchedCities = [];
                querySnapshot.forEach((doc) => fetchedCities.push({...doc.data()}))
                setCityList(fetchedCities)
            }
        }

        fetchCities();
    }, [id]);

    const addCityToList = () => {
        if(!cityList.filter(element => element.wikiDataId === data.wikiDataId).length){
            setCityList([...cityList, data])

            alert(`${data.name} added to list!`)

            isAuth && addDoc(collectionRef, {
                userId: id,
                wikiDataId: data.wikiDataId,
                name: data.name,
                country: data.country,
                countryCode: data.countryCode,
                region: data.region,
                regionCode: data.regionCode,
                latitude: data.latitude,
                longitude: data.longitude,
                population: data.population,
            }).then(() => alert(`${data.name} added to database!`)).catch(err => console.log(err.code, err.message))
        }
        else {
            alert(`${data.name} already exist in list!`)
        }
        setData(null)
    }

    const updateCity = async (e) => {
        const wikiDataId = e.target.value

        const url = `${cityDetail_url}/${wikiDataId}`

        try{
            const response = await fetch(url, cityDetail_options)
            const result = await response.json()
            const data = simplifyData(result.data)

            const index = cityList.findIndex(element => element.wikiDataId === wikiDataId)
            const newArray = [...cityList]
            newArray[index] = {wikiDataId, ...data}
            setCityList(newArray)
            alert('Updated successfully from GEO DB!')

            if (isAuth) {
                const cityQuery = query(
                    collectionRef,
                    where("wikiDataId", "==", wikiDataId), where("userId", "==", id)
                );

                const querySnapshot = await getDocs(cityQuery);
                const fetchedCities = [];
                querySnapshot.forEach( (doc) => fetchedCities.push(doc))

                updateDoc(doc(collectionRef, fetchedCities[0].id), data).then(() => alert('Updated successfully on database!')).catch(err => console.log(err.code, err.message))
            }

        } catch (err) {
            console.log(err)
        }
    }

    const deleteCityFromList = async (e) => {
        const permission = confirm(`Are sure about deleting?`)

        if (permission) {
            const index = cityList.findIndex(element => element.wikiDataId === e.target.value)
            const newArray = [...cityList]
            const [deletedCity] = newArray.splice(index, 1)
            setCityList(newArray)
            alert('Deleted successfully from list!')

            if (isAuth) {
                const cityQuery = query(
                    collectionRef,
                    where("wikiDataId", "==", deletedCity.wikiDataId), where("userId", "==", id)
                );

                const querySnapshot = await getDocs(cityQuery);
                const fetchedCities = [];
                querySnapshot.forEach( (doc) => fetchedCities.push(doc))

                deleteDoc(doc(collectionRef, fetchedCities[0].id)).then(() => alert('Deleted successfully from database!')).catch(err => console.log(err.code, err.message))
            }
        }
    }

    const handleOnSearchChange = (searchData) => {
        setData(searchData.value)
    }

    const simplifyData = (original) => {
        return {
            name: original.name,
            country: original.country,
            countryCode: original.countryCode,
            region: original.region,
            regionCode: original.regionCode,
            latitude: original.latitude,
            longitude: original.longitude,
            population: original.population
        }
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
                                wikiDataId: city.wikiDataId,
                                name: city.name,
                                country: city.country,
                                countryCode: city.countryCode,
                                region: city.region,
                                regionCode: city.regionCode,
                                latitude: city.latitude,
                                longitude: city.longitude,
                                population: city.population
                            }
                        }
                    })
                }

            }).catch(err => console.error(err));
    }

    return (
        <div>
            <Header title={"All about cities"}/>
            <Search placeholder={"Enter name of city"} onSearchChange={handleOnSearchChange} loadOptions={loadOptions}/>
            {data && <CityInfo data={data}/>}
            {data && <Button text={`Add ${data.name} to list`} onClick={addCityToList}/>}
            <CityListInfo cityList={cityList} deleteCity={deleteCityFromList} updateCity={updateCity}/>
        </div>
    );
};

export default AllAboutCities;