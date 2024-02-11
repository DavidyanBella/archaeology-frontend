import {useDispatch, useSelector} from 'react-redux';
import {
	updatePlaces,
	updateQuery
} from "../../store/places/placesSlice";
import {api} from "../../utils/api";
import {useFind} from "../finds/useFind";
import {useToken} from "../users/useToken";

export function usePlaces() {
	const places = useSelector(state => state.places.places);
	const query = useSelector(state => state.places.query);

	const {access_token} = useToken()

	const {setFind, setFindId} = useFind()

	const dispatch = useDispatch()

	const setPlaces = (value) => {
		dispatch(updatePlaces(value))
	}

	const setQuery = (value) => {
		dispatch(updateQuery(value))
	}

	const searchPlaces = async (navigate=null) => {

		const {data} = await api.get(`places/search/`, {
			params: {
				query: query
			},
			headers: {
				'authorization': access_token
			}
		})

		const draft_find_id = data["draft_find_id"]
		setFindId(draft_find_id)

		if (!draft_find_id) {
			setFind(undefined)
			navigate && navigate("/")
		}

		return data["places"]
	}

	const deletePlace = async (place_id) => {
		await api.delete(`places/${place_id}/delete/`, {
			headers: {
				'authorization': access_token
			}
		})
	}


	return {
		places,
		setPlaces,
		query,
		setQuery,
		searchPlaces,
		deletePlace
	};
}