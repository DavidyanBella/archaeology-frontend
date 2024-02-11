import {useDispatch, useSelector} from 'react-redux';
import {
	updateFind,
	updateFindId,
	updateName,
	updateExpedition, updateDescription
} from "../../store/finds/findSlice";
import {useToken} from "../users/useToken";
import {api} from "../../utils/api";
import {useNavigate} from "react-router-dom"

export function useFind() {

	const {access_token} = useToken()

	const find = useSelector(state => state.find.find)
	const find_id = useSelector(state => state.find.find_id)
	const name = useSelector(state => state.find.name)
	const description = useSelector(state => state.find.description)
	const expedition = useSelector(state => state.find.expedition)

	const navigate = useNavigate()

	const is_draft = find?.status == 1

	const dispatch = useDispatch()

	const setFind = (value) => {
		dispatch(updateFind(value))
	}

	const setName = (value) => {
		dispatch(updateName(value))
	}

	const setDescription = (value) => {
		dispatch(updateDescription(value))
	}

	const setExpedition = (value) => {
		dispatch(updateExpedition(value))
	}

	const setFindId = (value) => {
		dispatch(updateFindId(value))
	}

	const sendFind = async () => {

		const response = await api.put(`finds/${find.id}/update_status_user/`, {}, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200)
		{
			setFind(undefined)
			setExpedition(undefined)
			setName(undefined)
			setDescription(undefined)
		}
	}

	const deleteFind = async () => {

		const response = await api.delete(`finds/${find.id}/delete/`, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200)
		{
			setFind(undefined)
			setName(undefined)
			setDescription(undefined)
			setExpedition(undefined)
		}

	}

	const saveFind = async () => {

		const form_data = new FormData()

		form_data.append('name', name)
		form_data.append('description', description)
		form_data.append('expedition', expedition)

		await api.put(`finds/${find.id}/update/`, form_data, {
			headers: {
				'authorization': access_token
			}
		})

	}

	const fetchFind = async (find_id) => {

		const {data} = await api.get(`finds/${find_id}/`, {
			headers: {
				'authorization': access_token
			},
		})

		setFind(data)
		setName(data["name"])
		setDescription(data["description"])
		setExpedition(data["expedition"])
	}

	const addPlaceToFind = async (place) => {
		await api.post(`places/${place.id}/add_to_find/`, {}, {
			headers: {
				'authorization': access_token
			}
		})
	}

	const deletePlaceFromFind = async (place) => {
		const response = await api.delete(`finds/${find.id}/delete_place/${place.id}/`, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200) {
			await fetchFind(find_id)
		} else if (response.status == 201) {
			navigate("/")
		}
	}

	return {
		find,
		find_id,
		is_draft,
		name,
		description,
		expedition,
		setFind,
		setName,
		setDescription,
		setExpedition,
		saveFind,
		sendFind,
		deleteFind,
		fetchFind,
		addPlaceToFind,
		deletePlaceFromFind,
		setFindId
	};
}