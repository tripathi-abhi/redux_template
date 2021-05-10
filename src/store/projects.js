import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";

let lastId = 0;
const projectSlice = createSlice({
	name: "projects",
	initialState: [],
	reducers: {
		addProject: (projects, action) => {
			projects.push({
				id: ++lastId,
				name: action.payload.name,
			});
		},
		removeProject: (projects, action) => {
			const index = projects.findIndex(
				project => project.id === action.payload.id
			);
			if (projects[index]) {
				projects.splice(index, 1);
			}
		},
	},
});

export const { addProject, removeProject } = projectSlice.actions;
export default projectSlice.reducer;
