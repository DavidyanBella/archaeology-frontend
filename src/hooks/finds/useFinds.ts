import {useDispatch, useSelector} from 'react-redux';
import {
	updateStatus,
	updateDateStart,
	updateDateEnd,
	updateUser
} from "../../store/finds/findsSlice";
import {api} from "../../utils/api";
import {useToken} from "../users/useToken";

export function useFinds() {
	const status = useSelector(state => state.finds.status)
	const date_start = useSelector(state => state.finds.date_start)
	const date_end = useSelector(state => state.finds.date_end)
	const user = useSelector(state => state.finds.user)

	const dispatch = useDispatch()

	const {access_token} = useToken()

	const setStatus = (value) => {
		dispatch(updateStatus(value))
	}

	const setDateStart = (value) => {
		dispatch(updateDateStart(value))
	}

	const setDateEnd = (value) => {
		dispatch(updateDateEnd(value))
	}

	const setUser = (value) => {
		dispatch(updateUser(value))
	}

	const searchFinds = async () => {

		const {data} = await api.get(`finds/search/`, {
			params: {
				status: status,
				date_start: new Date(date_start),
				date_end: new Date(date_end)
			},
			headers: {
				'authorization': access_token
			}
		})

		return data.filter(find => find.owner.includes(user))

	}

	return {
		status,
		date_start,
		date_end,
		setStatus,
		searchFinds,
		setDateStart,
		setDateEnd,
		setUser
	};
}