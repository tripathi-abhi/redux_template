import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

let lastId = 0;

const userSlice = createSlice({
	name: "user",
	initialState: [],
	reducers: {
		addUser: (users, action) => {
			users.push({
				id: ++lastId,
				name: action.payload.name,
				bugIds: [],
			});
		},
	},
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
