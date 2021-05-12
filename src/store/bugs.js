import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apicallBegan } from "./api";

// creating slices
let lastId = 0;
const bugSlice = createSlice({
	name: "bugs",
	initialState: {
		list: [],
		loading: false,
		lastFetch: null,
	},
	reducers: {
		bugsRecieved: (bugs, action) => {
			bugs.list = action.payload;
		},
		addBug: (bugs, action) => {
			bugs.list.push({
				id: ++lastId,
				description: action.payload.description,
				resolved: false,
			});
		},
		removeBug: (bugs, action) => {
			const index = bugs.list.findIndex(bug => bug.id === action.payload.id);
			if (bugs[index]) {
				bugs.list.splice(index, 1);
			}
		},
		resolveBug: (bugs, action) => {
			const index = bugs.list.findIndex(bug => bug.id === action.payload.id);
			if (bugs.list[index]) {
				bugs.list[index].resolved = true;
			}
		},
		assignBugToUser: (bugs, action) => {
			const index = bugs.list.findIndex(bug => bug.id === action.payload.bugId);
			if (bugs.list[index]) {
				bugs.list[index].userId = action.payload.userId;
			}
		},
	},
});

export const { addBug, removeBug, resolveBug, assignBugToUser, bugsRecieved } =
	bugSlice.actions;
export default bugSlice.reducer;

// Action creators
const url = "/bugs";
export const loadBugs = () =>
	apicallBegan({
		url,
		onSuccess: bugsRecieved.type,
	});

// selectors

export const getUnresolvedBugs = createSelector(
	state => state.entities.bugs.list,
	bugs => bugs.filter(bug => !bug.resolved)
);

export const getBugsAssignedToUser = id =>
	createSelector(
		state => state.entities.bugs.list,
		state => state.entities.users,
		(bugs, users) => bugs.filter(bug => bug.userId === id)
	);
