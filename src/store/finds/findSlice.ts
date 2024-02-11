import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	find: undefined,
	find_id: undefined,
	name: undefined,
	description: undefined,
	expedition: undefined
};

const findSlice = createSlice({
	name: 'find',
	initialState: initialState,
	reducers: {
		updateFind(state, action) {
			state.find = action.payload
		},
		updateName(state, action) {
			state.name = action.payload
		},
		updateDescription(state, action) {
			state.description = action.payload
		},
		updateExpedition(state, action) {
			state.expedition = action.payload
		},
		updateFindId(state, action) {
			state.find_id = action.payload
		}
	}
})

export const {
	updateFind,
	updateName,
	updateDescription,
	updateExpedition,
	updateFindId
} = findSlice.actions;

export default findSlice.reducer;