import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchBar = (props) => {
    const [searchType, setSearchType] = useState("");
    const [searchID, setSearchID] = useState(1);
    const [resourseList, setResourseList] = useState([]);

    const getResourcesLink = "https://swapi.dev/api/";
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${getResourcesLink}`)
            .then(res => {
                setResourseList(Object.keys(res.data));
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    useEffect(() => {
        setSearchType(resourseList[0]);
    }, [resourseList]);

    const searchHandler = (event) => {
        event.preventDefault();
        navigate(`/${searchType}/${searchID}`)
    }

    return(
        <form onSubmit={searchHandler}>
            <label htmlFor="type">Search for: </label>
            <select name="type" id="type" onChange={e => setSearchType(e.target.value)}>
                {resourseList.map((resource, idx) => {
                    if(idx === 0){
                        return(
                            <option key={idx} value={resource}>{resource}</option>
                        );
                    }
                    return(
                        <option key={idx} value={resource}>{resource}</option>
                    );
                })}
            </select>
            <label htmlFor="id">ID: </label>
            <input type="number" name="id" id="id" value={searchID} onChange={e => setSearchID(e.target.value)}/>
            <button>Search</button>
        </form>
    );
}

export default SearchBar;