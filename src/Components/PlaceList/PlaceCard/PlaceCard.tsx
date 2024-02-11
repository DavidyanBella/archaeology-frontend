import "./PlaceCard.sass"
import {Place} from "../../../Types";
import {Link} from "react-router-dom";
import mockImage from "/src/assets/mock.jpg"

const PlaceCard = ({ place, isMock }: {place:Place, isMock:boolean }) => {

    const img = `http://127.0.0.1:8000/api/places/${place.id}/image/`

    return (
        <div className="card-wrapper">

            <div className="preview">
                <img src={isMock ? mockImage : img} />
            </div>

            <div className="card-content">

                <div className="content-top">

                    <h3 className="title"> {place.name} </h3>

                </div>

                <div className="content-bottom">

                    <Link to={`/places/${place.id}`}>
                        Подробнее
                    </Link>

                </div>

            </div>

        </div>
    )
}

export default PlaceCard;