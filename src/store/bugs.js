import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

// creating slices
let lastId = 0;
const bugSlice = createSlice({
	name: "bugs",
	initialState: [],
	reducers: {
		addBug: (bugs, action) => {
			bugs.push({
				id: ++lastId,
				description: action.payload.description,
				resolved: false,
			});
		},
		removeBug: (bugs, action) => {
			const index = bugs.findIndex(bug => bug.id === action.payload.id);
			if (bugs[index]) {
				bugs.splice(index, 1);
			}
		},
		resolveBug: (bugs, action) => {
			const index = bugs.findIndex(bug => bug.id === action.payload.id);
			if (bugs[index]) {
				bugs[index].resolved = true;
			}
		},
		assignBugToUser: (bugs, action) => {
			const index = bugs.findIndex(bug => bug.id === action.payload.bugId);
			if (bugs[index]) {
				bugs[index].userId = action.payload.userId;
			}
		},
	},
});

export const {
	addBug,
	removeBug,
	resolveBug,
	assignBugToUser,
} = bugSlice.actions;
export default bugSlice.reducer;

// selectors

export const getUnresolvedBugs = createSelector(
	state => state.entities.bugs,
	bugs => bugs.filter(bug => !bug.resolved)
);

export const getBugsAssignedToUser = id =>
	createSelector(
		state => state.entities.bugs,
		state => state.entities.users,
		(bugs, users) => bugs.filter(bug => bug.userId === id)
	);
