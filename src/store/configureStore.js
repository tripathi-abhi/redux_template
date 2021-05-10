import { configureStore } from "@reduxjs/toolkit";
import bugsReducer from "./bugs";
import projectsReducer from "./projects";

export default function configureAppStore() {
	return configureStore({
		reducer: projectsReducer,
	});
}
