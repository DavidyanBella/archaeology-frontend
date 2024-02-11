import {configureStore} from "@reduxjs/toolkit";

import placeReducer from "./places/placeSlice"
import draftFindReducer from "./finds/findSlice"
import authReducer from "./users/authSlice"
import findsReducer from "./finds/findsSlice"
import placesReducer  from "./places/placesSlice"

export default configureStore({
	reducer: {
		place: placeReducer,
		places: placesReducer,
		find: draftFindReducer,
		finds: findsReducer,
		user: authReducer
	}
});