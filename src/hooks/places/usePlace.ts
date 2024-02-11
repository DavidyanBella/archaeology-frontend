import {useDispatch, useSelector} from 'react-redux';
import {
	updatePlace,
	updateName,
	updateDescription,
	updateOpenHours,
	updateImage, updateCloseHours
} from "../../store/places/placeSlice";
import {api} from "../../utils/api";

export function usePlace() {
	const place = useSelector(state => state.place.place);

	const dispatch = useDispatch()

	const setPlace = (value) => {
		dispatch(updatePlace(value))
	}

	const setName = (value) => {
		dispatch(updateName(value))
	}

	const setDescription = (value) => {
		dispatch(updateDescription(value))
	}

	const setOpenHours = (value) => {
		dispatch(updateOpenHours(value))
	}

	const setCloseHours = (value) => {
		dispatch(updateCloseHours(value))
	}

	const setImage = (value) => {
		dispatch(updateImage(value))
	}

	const fetchPlace = async (id) => {

		const {data} = await api.get(`places/${id}`);

		setPlace(data)

	};

	return {
		place,
		setPlace,
		fetchPlace,
		setName,
		setDescription,
		setOpenHours,
		setCloseHours,
		setImage
	};
}