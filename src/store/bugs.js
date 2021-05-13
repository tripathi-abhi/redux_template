import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { createSelector } from "reselect";
import { apicallBegan } from "./api";

// creating slices
const bugSlice = createSlice({
	name: "bugs",
	initialState: {
		list: [],
		loading: false,
		lastFetch: null,
	},
	reducers: {
		bugsRequested: (bugs, action) => {
			bugs.loading = true;
		},
		bugsRecieved: (bugs, action) => {
			bugs.list = action.payload;
			bugs.loading = false;
			bugs.lastFetch = Date.now();
		},
		bugsRequestFailed: (bugs, action) => {
			bugs.loading = false;
		},
		addBug: (bugs, action) => {
			bugs.list.push(action.payload);
		},
		resolveBug: (bugs, action) => {
			const index = bugs.list.findIndex(bug => bug.id === action.payload.id);
			if (bugs.list[index]) {
				bugs.list[index].resolved = true;
			}
		},
		assignBugToUser: (bugs, action) => {
			const index = bugs.list.findIndex(bug => bug.id === action.payload.id);
			if (bugs.list[index]) {
				bugs.list[index].userId = action.payload.userId;
			}
		},
	},
});

const {
	addBug,
	resolveBug,
	assignBugToUser,
	bugsRecieved,
	bugsRequested,
	bugsRequestFailed,
} = bugSlice.actions;
export default bugSlice.reducer;

// Action creators
const url = "/bugs";
export const loadBugs = () => (dispatch, getState) => {
	const { lastFetch } = getState().entities.bugs;
	const callInterval = moment().diff(moment(lastFetch), "minutes");
	if (callInterval < 10) return;
	return dispatch(
		apicallBegan({
			url,
			onSuccess: bugsRecieved.type,
			onRequest: bugsRequested.type,
			onError: bugsRequestFailed.type,
		})
	);
};

export const postBug = bug =>
	apicallBegan({
		url,
		method: "post",
		data: bug,
		onSuccess: addBug.type,
		onRequest: bugsRequested.type,
		onError: bugsRequestFailed.type,
	});

export const markResolveBug = id =>
	apicallBegan({
		url: `${url}/${id}`,
		method: "patch",
		data: { resolved: true },
		onSuccess: resolveBug.type,
	});

export const assignBug = (bugId, userId) =>
	apicallBegan({
		url: `${url}/${bugId}`,
		method: "patch",
		data: { userId },
		onSuccess: assignBugToUser.type,
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
