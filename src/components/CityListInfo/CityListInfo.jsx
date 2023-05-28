import React from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel
} from "react-accessible-accordion";
import classes from './cityListInfo.module.css';
import Button from "../Button/Button.jsx";

const CityListInfo = ({cityList, deleteCity, updateCity}) => {

    return (
        <>
            <label className={classes.title}>Saved cities</label>
            <Accordion allowZeroExpanded>
                {cityList.map(element => {

                    return (<AccordionItem className={classes.accordionItem} key={element.wikiDataId}>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <div className={classes.header}>
                                    <p>{element.name}</p>

                                    <div className={classes.codeAndFlag}>
                                        <p>
                                            {element.country}/{element.countryCode}
                                        </p>
                                        <img src={`https://flagsapi.com/${element.countryCode}/flat/64.png`} alt={`${element.country}'s image`}/>
                                    </div>

                                </div>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel className={classes.accordionPanel}>
                            <div className={classes.body}>
                                <p className="wikiDataId">Wiki data id: {element.wikiDataId}</p>
                                <p className="region">Region/Region code: {element.region}/{element.regionCode}</p>
                                <p className="latitude">Latitude: {element.latitude.toFixed(2)}</p>
                                <p className="longitude">Longitude: {element.longitude.toFixed(2)}</p>
                                <p className="population">Population: {element.population}</p>
                            </div>
                            <Button text={`Delete ${element.name} from list`} onClick={deleteCity} valueButton={element.wikiDataId}></Button>
                            <Button text={`Update ${element.name} from GEO DB`} onClick={updateCity} valueButton={element.wikiDataId}></Button>
                        </AccordionItemPanel>
                    </AccordionItem>)

                })}
            </Accordion>
        </>
    );
};

export default CityListInfo;