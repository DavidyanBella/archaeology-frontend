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
		}
	}
})

export const {
	updatePlace
} = placeSlice.actions;

export default placeSlice.reducer;