import { createSlice } from "@reduxjs/toolkit";

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
	},
});

export const { addBug, removeBug, resolveBug } = bugSlice.actions;
export default bugSlice.reducer;

// Action types

// export const addBug = createAction("ADD_BUG");
// export const removeBug = createAction("REMOVE_BUG");
// export const resolveBug = createAction("RESOLVE_BUG");

// let id = 0;
// export default createReducer([], {
// 	[addBug.type]: (bugs, action) => {
// 		bugs.push({
// 			id: ++id,
// 			description: action.payload.description,
// 			resolved: false,
// 		});
// 	},
// 	[removeBug.type]: (bugs, action) => {
// 		const index = bugs.findIndex(bug => bug.id === action.payload.id);
// 		if (bugs[index]) {
// 			bugs.splice(index, 1);
// 		}
// 	},
// 	[resolveBug.type]: (bugs, action) => {
// 		const index = bugs.findIndex(bug => bug.id === action.payload.id);
// 		if (bugs[index]) {
// 			bugs[index].resolved = true;
// 		}
// 	},
// });

// Action Types

// export const ADD_BUG = "ADD_BUG";

// reducers

// export default function reducer(state = [], action) {
// 	switch (action.type) {
// 		case addBug.type:
// 			return [
// 				...state,
// 				{
// 					id: ++id,
// 					description: action.payload.description,
// 					resolved: false,
// 				},
// 			];
// 		case removeBug.type:
// 			return state.filter(bug => bug.id !== action.payload.id);
// 		case resolveBug.type:
// 			return state.map(bug =>
// 				bug.id !== action.payload.id ? bug : { ...bug, resolved: true }
// 			);
// 		default:
// 			return state;
// 	}
// }
