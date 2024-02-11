import "./PlaceList.sass"
import SearchBar from "../SearchBar/SearchBar";
import React, {useEffect, useState} from "react";
import PlaceCard from "./PlaceCard/PlaceCard";
import {iPlacesMock, requestTime} from "../../Consts";
import {Place} from "../../Types";

const PlaceList = () => {

    const [places, setPlaces] = useState<Place[]>([]);

    const [query, setQuery] = useState<string>("");

    const [isMock, setIsMock] = useState<boolean>(false);

    const searchPlaces = async () => {

        try {

            const response = await fetch(`http://127.0.0.1:8000/api/places/search?&query=${query}`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            })

            if (!response.ok){
                createMock();
                return;
            }

            const raw = await response.json()
            const places = raw["places"]

            setPlaces(places)
            setIsMock(false)

        } catch (e) {

            createMock()

        }
    }

    const createMock = () => {

        setIsMock(true);
        setPlaces(iPlacesMock.filter(place => place.name.toLowerCase().includes(query.toLowerCase())))

    }

    useEffect(() => {
        searchPlaces()
    }, [])

    const cards = places.map(place  => (
        <PlaceCard place={place} key={place.id} isMock={isMock}/>
    ))

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await searchPlaces()
    }

    return (
        <div className="cards-list-wrapper">

            <form className="top" onSubmit={handleSubmit}>

                <h2>Поиск мест раскопок</h2>

                <SearchBar query={query} setQuery={setQuery} />

            </form>

            <div className="bottom">

                { cards }

            </div>

        </div>
    )
}

export default PlaceList;