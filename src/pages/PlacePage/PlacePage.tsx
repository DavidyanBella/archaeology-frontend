import "./PlacePage.sass"
import {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {usePlace} from "../../hooks/places/usePlace";

const PlacePage = () => {

    const { id } = useParams<{id: string}>();
    
    const {place, fetchPlace} = usePlace()
    
    useEffect(() => {
        id && fetchPlace(id)
    }, [])

    if (place == undefined) {
        return (
            <div>

            </div>
        )
    }

    const img = `http://127.0.0.1:8000/api/places/${id}/image/`

    return (
        <div className="page-details-wrapper">

            <Link className="return-link" to="/">
                Назад
            </Link>

            <div className="left">

                <img src={img}  alt=""/>

            </div>

            <div className="right">

                <div className="info-container">

                    <h2>{place?.name}</h2>

                    <br />

                    <span>Описание: {place?.description}</span>

                </div>

            </div>

        </div>
    )
}

export default PlacePage;