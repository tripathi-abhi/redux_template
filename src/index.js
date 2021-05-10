import configureStore from "./store/configureStore";
// import * as bugActions from "./store/bugs";
import * as projectActions from "./store/projects";

const store = configureStore();

const unsubscribe = store.subscribe(() => {
	console.log("subcribed!", store.getState());
});

// store.dispatch(bugActions.addBug({ description: "Bug 1" }));

// store.dispatch(bugActions.addBug({ description: "Bug 2" }));

// store.dispatch(bugActions.addBug({ description: "Bug 3" }));
// store.dispatch(bugActions.resolveBug({ id: 2 }));
// store.dispatch(bugActions.resolveBug({ id: 3 }));

// store.dispatch(bugActions.removeBug({ id: 1 }));

store.dispatch(projectActions.addProject({ name: "Project 1" }));
store.dispatch(projectActions.addProject({ name: "Project 2" }));
store.dispatch(projectActions.removeProject({ id: 2 }));
