import "./PlaceCard.sass"
import {Place} from "../../utils/types";
import {Link} from "react-router-dom";
import {useAuth} from "../../hooks/users/useAuth";
import {useFind} from "../../hooks/finds/useFind";
import CustomButton from "../CustomButton/CustomButton";
import {variables} from "../../utils/consts";

const PlaceCard = ({ place, refetch }: {place:Place}) => {
    
    const {is_authenticated, is_moderator} = useAuth()

    const {is_draft, addPlaceToFind, deletePlaceFromFind} = useFind()

    const handleAddPlace = async (e) => {
        e.preventDefault()
        await addPlaceToFind(place)
        refetch()
    }

    const handleDeletePlaceFromFind = async (e) => {
        e.preventDefault()
        await deletePlaceFromFind(place)
    }

    return (
        <div className="card-wrapper">

            <div className="preview">
                <img src={place.image}  alt=""/>
            </div>

            <div className="card-content">

                <div className="content-top">

                    <h3 className="title"> {place.name} </h3>

                </div>

                <div className="content-bottom">


                    <Link to={`/places/${place.id}`}>
                        <CustomButton bg={variables.primary}>
                            Подробнее
                        </CustomButton>
                    </Link>

                    {is_authenticated && !is_moderator && location.pathname.includes("places") &&
                        <CustomButton onClick={handleAddPlace} bg={variables.green}>Добавить</CustomButton>
                    }

                    {is_authenticated && !is_moderator && is_draft && location.pathname.includes("finds") &&
                        <CustomButton onClick={handleDeletePlaceFromFind} bg={variables.red}>Удалить</CustomButton>
                    }
                    
                </div>

            </div>

        </div>
    )
}

export default PlaceCard;