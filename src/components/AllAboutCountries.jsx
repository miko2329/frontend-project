import React, {useEffect, useState} from 'react';
import {api_url, options as apiOptions} from "../api/apiSearchCountry.js";
import {countryDetail_url, countryDetail_options} from "../api/apiCountryDetails.js";
import Header from "./Header/Header.jsx";
import Search from "./Search/Search.jsx";
import CountryInfo from "./SearchedCountryInfo/CountryInfo.jsx";
import Button from "./Button/Button.jsx";
import CountryListInfo from "./CountryListInfo/CountryListInfo.jsx";
import {addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where} from "firebase/firestore";
import {useAuth} from "../hooks/useAuth.js";
import dataBase from "../firebase/firestore.js";

const AllAboutCountries = () => {

    const {isAuth, id} = useAuth();

    const [data, setData] = useState(null)

    const collectionRef = collection(dataBase, 'countries');

    const [countryList, setCountryList] = useState([])

    useEffect(() => {
        const fetchCountries = async () => {
            if (isAuth) {
                const countryQuery = query(
                    collectionRef,
                    where("userId", "==", id)
                );

                const querySnapshot = await getDocs(countryQuery);
                const fetchedCountries = [];
                querySnapshot.forEach((doc) => fetchedCountries.push({...doc.data()}))
                setCountryList(fetchedCountries)
            }
        }

        fetchCountries()
    }, [id])

    const addCountryToList = () => {
        if(!countryList.filter(element => element.wikiDataId === data.wikiDataId).length){
            setCountryList([...countryList, data])

            alert(`${data.name} added to list`)

            isAuth && addDoc(collectionRef, {
                userId: id,
                capital: data.capital,
                code: data.code,
                callingCode: data.callingCode,
                currencyCode: data.currencyCode,
                flagImageUri: data.flagImageUri,
                name: data.name,
                numRegions: data.numRegions,
                wikiDataId: data.wikiDataId
            }).then(() => alert(`${data.name} added to database!`)).catch(err => console.log(err.code, err.message))
        }
        else {
            alert(`${data.name} already exist in list`)
        }
        setData(null)
    }

    const updateCountry = async (e) => {
        const code = e.target.value

        const url = `${countryDetail_url}/${code}`

        try{
            const response = await fetch(url, countryDetail_options)
            const result = await response.json()
            const data = simplifyData(result.data)

            const index = countryList.findIndex(element => element.code === code)
            const newArray = [...countryList]
            newArray[index] = {code, ...data}
            setCountryList(newArray)
            alert('Updated successfully from GEO DB!')

            if (isAuth) {
                const countryQuery = query(
                    collectionRef,
                    where("code", "==", code), where("userId", "==", id)
                );

                const querySnapshot = await getDocs(countryQuery);
                const fetchedCountries = [];
                querySnapshot.forEach((doc) => fetchedCountries.push(doc))

                updateDoc(doc(collectionRef, fetchedCountries[0].id), data).then(() => alert('Updated successfully on database!')).catch(err => console.log(err.code, err.message))
            }

        } catch (err) {
            console.log(err)
        }
    }

    const deleteCountryFromList = async (e) => {
        const permission = confirm(`Are sure about deleting?`)

        if (permission) {
            const index = countryList.findIndex(element => element.wikiDataId === e.target.value)
            const newArray = [...countryList]
            const [deletedCountry] = newArray.splice(index, 1)
            setCountryList(newArray)
            alert('Deleted successfully from list!')

            if (isAuth) {
                const countryQuery = query(
                    collectionRef,
                    where("wikiDataId", "==", deletedCountry.wikiDataId), where("userId", "==", id)
                );

                const querySnapshot = await getDocs(countryQuery);
                const fetchedCountries = [];
                querySnapshot.forEach((doc) => fetchedCountries.push(doc))

                deleteDoc(doc(collectionRef, fetchedCountries[0].id)).then(() => alert('Deleted successfully from database!')).catch(err => console.log(err.code, err.message))
            }
        }
    }

    const handleOnSearchChange = async (searchData) => {
        const cityInfo = await fetch(`${api_url}/${searchData.value.code}`, apiOptions)
            .then(response => response.json())
            .then(response => {
                return {
                    capital: response.data.capital,
                    code: response.data.code,
                    callingCode: response.data.callingCode,
                    currencyCode: response.data.currencyCodes[0],
                    flagImageUri: response.data.flagImageUri,
                    name: response.data.name,
                    numRegions: response.data.numRegions,
                    wikiDataId: response.data.wikiDataId
                }

            }).catch(err => console.error(err));

        setData(cityInfo)
        console.log(cityInfo)
    }

    const simplifyData = (original) => {
        return {
            capital: original.capital,
            callingCode: original.callingCode,
            currencyCode: original.currencyCodes[0],
            flagImageUri: original.flagImageUri,
            name: original.name,
            numRegions: original.numRegions,
            wikiDataId: original.wikiDataId
        }
    }

    const loadOptions = (inputValue) => {
        return fetch(`${api_url}?namePrefix=${inputValue}&sort=%2Bname`, apiOptions)
            .then(response => response.json())
            .then(response => {
                return {
                    options: response.data.map((country) => {
                        return {
                            label: `${country.name}, ${country.code}`,
                            value: {
                                name: country.name,
                                code: country.code
                            }
                        }
                    })
                }

            }).catch(err => console.error(err));
    }

    return (
        <div>
            <Header title={"All about countries"}/>
            <Search placeholder={"Enter name of county"} onSearchChange={handleOnSearchChange} loadOptions={loadOptions}/>
            {data && <CountryInfo data={data}/>}
            {data && <Button text={`Add ${data.name} to list`} onClick={addCountryToList}/>}
            <CountryListInfo countryList={countryList} deleteCountry={deleteCountryFromList} updateCountry={updateCountry}/>
        </div>
    )
};

export default AllAboutCountries;