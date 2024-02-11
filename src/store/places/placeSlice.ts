import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	place: undefined,
};

const placeSlice = createSlice({
	name: 'place',
	initialState: initialState,
	reducers: {
		updatePlace(state, action) {
			state.place = action.payload
		},
		updateName(state, action) {
			state.place.name = action.payload
		},
		updateDescription(state, action) {
			state.place.description = action.payload
		},
		updateOpenHours(state, action) {
			state.place.open_hours = action.payload
		},
		updateCloseHours(state, action) {
			state.place.close_hours = action.payload
		},
		updateImage(state, action) {
			state.place.image = action.payload
		}
	}
})

export const {
	updatePlace,
	updateName,
	updateDescription,
	updateOpenHours,
	updateCloseHours,
	updateImage
} = placeSlice.actions;

export default placeSlice.reducer;