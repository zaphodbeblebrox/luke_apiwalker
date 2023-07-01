import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Display = (props) => {
    const {type, id} = useParams();
    const getResourcesLink = "https://swapi.dev/api/";
    const [swData, setSwData] = useState({});
    const [swKeys, setSwKeys] = useState({});
    const [homeworldId, setHomeworldId] = useState({});

    const blacklistKeys = ["homeworld","created", "edited", "url", "opening_crawl"]

    useEffect(() => {
        if(type !== undefined){
            axios.get(`${getResourcesLink}${type}/${id}`)
                .then(res => {
                    setSwData(res.data);
                })
                .catch(err => {
                    setSwData({name:"These aren't the droids you're looking for"})
                    console.log(err);
                })
        }
    }, [type, id]);

    useEffect(() => {
        setSwKeys(Object.keys(swData));
    }, [swData]);

    useEffect(() => {
        axios.get(`${swData.homeworld}`)
                .then(res => {
                    const id = parseInt(swData.homeworld.match(/\d+/)[0]);
                    const hwData = {"name":res.data.name, "path":`/planets/${id}`};
                    setHomeworldId(hwData);
                })
                .catch(err => {
                    setHomeworldId({})
                    console.log(err);
                })
    }, [swKeys]);

    if(type === undefined){
        return(
            <div>
                <h1>Enter a search parameter</h1>
            </div>
        );
    }

    return(
        <div>
            <h1>{swData.name}</h1>
            {swKeys.map((key,idx) => {
                if(key !== "name" && 
                    !Array.isArray(swData[key]) && 
                    typeof swData[key] !== 'object' &&
                    !blacklistKeys.includes(key)){
                        return(<p key={idx}>{key.replace(/_/g,' ')}: {swData[key]}</p>);
                } else if(key === "homeworld"){
                    return(<p key={idx}>{key}: <Link to={homeworldId.path}>{homeworldId.name}</Link></p>)
                }
            })}
        </div>
    );
}

export default Display;