import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	places: [],
	query: ""
};

const placesSlice = createSlice({
	name: 'places',
	initialState: initialState,
	reducers: {
		updatePlaces(state, action) {
			state.places = action.payload
		},
		updateQuery(state, action) {
			state.query = action.payload
		}
	}
})

export const {
	updatePlaces,
	updateQuery
} = placesSlice.actions;

export default placesSlice.reducer;