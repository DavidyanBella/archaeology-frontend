import {usePlaces} from "../../../hooks/places/usePlaces";
import {useQuery} from "react-query";
import PlacesTable from "./PlacesTable/PlacesTable";

const PlacesTableWrapper = () => {

    const {searchPlaces} = usePlaces()

    const { isLoading, data, isSuccess, refetch } = useQuery(
        ["places"],
        () => searchPlaces(),
        {
            keepPreviousData: true,
        }
    )

    if (isLoading) {
        return (
            <div>

            </div>
        )
    }

    return (
        <div>
            <PlacesTable isLoading={isLoading} data={data} isSuccess={isSuccess} refetch={refetch} />
        </div>
    )
}

export default PlacesTableWrapper