import {useDispatch, useSelector} from 'react-redux';
import {
	updatePlace
} from "../../store/places/placeSlice";
import {api} from "../../utils/api";

export function usePlace() {
	const place = useSelector(state => state.place.place);

	const dispatch = useDispatch()

	const setPlace = (value) => {
		dispatch(updatePlace(value))
	}

	const fetchPlace = async (id) => {

		const {data} = await api.get(`places/${id}`);

		setPlace(data)

	};

	return {
		place,
		setPlace,
		fetchPlace
	};
}