import React from 'react';
import classes from "./countryListInfo.module.css";
import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel
} from "react-accessible-accordion";
import Button from "../Button/Button.jsx";

const CountryListInfo = ({countryList, deleteCountry, updateCountry}) => {
    return (
        <>
            <label className={classes.title}>Saved countries</label>
            <Accordion allowZeroExpanded>
                {countryList.map(element => {
                    return (<AccordionItem className={classes.accordionItem} key={element.wikiDataId}>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <div className={classes.header}>
                                    <p>{element.name}</p>

                                    <div className={classes.codeAndFlag}>
                                        <p>
                                            {element.code}
                                        </p>
                                        <img src={`https://flagsapi.com/${element.code}/flat/64.png`} alt={`${element.country}'s image`}/>
                                    </div>

                                </div>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel className={classes.accordionPanel}>
                            <div className={classes.body}>
                                <p className="wikiDataId">Wiki data id: {element.wikiDataId}</p>
                                <p className="regions">Number of regions: {element.numRegions}</p>
                                <p className="callCode">Calling code: {element.callingCode}</p>
                                <p className="currencyCode">Currency code: {element.currencyCode}</p>
                            </div>
                            <Button text={`Delete ${element.name} from list`} onClick={deleteCountry} valueButton={element.wikiDataId}></Button>
                            <Button text={`Update ${element.name} from GEO DB`} onClick={updateCountry} valueButton={element.code}></Button>
                        </AccordionItemPanel>
                    </AccordionItem>)

                })}
            </Accordion>
        </>
    );
};

export default CountryListInfo;