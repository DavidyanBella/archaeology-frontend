import "./PlacesList.sass"
import PlaceCard from "../../../components/PlaceCard/PlaceCard";
import {usePlaces} from "../../../hooks/places/usePlaces";
import {useQuery} from "react-query";
import PlacesFilters from "../PlacesFilters/PlacesFilters";

const PlacesList = () => {

    const {searchPlaces} = usePlaces()

    const { isLoading, data, refetch } = useQuery(
        ["places"],
        () => searchPlaces(),
        {
            keepPreviousData: false,
        }
    )

    if (isLoading) {
        return (
            <div>

            </div>
        )
    }

    const cards = data.map(place  => (
        <PlaceCard place={place} key={place.id} refetch={refetch}/>
    ))

    return (
        <div className="places-list-wrapper">

            <PlacesFilters refetch={refetch}/>

            <div className="places-list">
                { cards }
            </div>

        </div>
    )
}

export default PlacesList;