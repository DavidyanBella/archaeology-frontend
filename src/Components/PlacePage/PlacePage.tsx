import "./PlacePage.sass"
import {Dispatch, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {iPlacesMock, requestTime} from "../../Consts";
import {Place} from "../../Types";
import mockImage from "/src/assets/mock.jpg"

const PlacePage = ({ selectedPlace, setSelectedPlace }: { selectedPlace:Place | undefined, setSelectedPlace: Dispatch<Place| undefined>}) => {

    const { id } = useParams<{id: string}>();

    if (id == undefined){
        return;
    }

    useEffect(() => {
        return () => {
            setSelectedPlace(undefined)
        }
    }, [])


    const [isMock, setIsMock] = useState<boolean>(false);

    const fetchData = async () => {

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/places/${id}`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            });

            if (!response.ok)
            {
                CreateMock()
                return;
            }

            const place: Place = await response.json()

            setSelectedPlace(place)

            setIsMock(false)
        } catch
        {
            CreateMock()
        }

    };

    const CreateMock = () => {
        setSelectedPlace(iPlacesMock.find((place:Place) => place?.id == parseInt(id)))
        setIsMock(true)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const img = `http://127.0.0.1:8000/api/places/${id}/image/`

    return (
        <div className="page-details-wrapper">

            <Link className="return-link" to="/">
                Назад
            </Link>

            <div className="left">

                <img src={isMock ? mockImage : img} />

            </div>

            <div className="right">

                <div className="info-container">

                    <h2>{selectedPlace?.name}</h2>

                    <br />

                    <span>Описание: {selectedPlace?.description}</span>

                </div>

            </div>

        </div>
    )
}

export default PlacePage;