import configureStore from "./store/configureStore";
import {
	addBug,
	removeBug,
	resolveBug,
	getUnresolvedBugs,
	assignBugToUser,
	getBugsAssignedToUser,
} from "./store/bugs";
import * as projectActions from "./store/projects";
import { addUser } from "./store/user";

const store = configureStore();

store.subscribe(() => {
	console.log("subcribed!", store.getState());
});

store.dispatch(addUser({ name: "User 1" }));
store.dispatch(addUser({ name: "User 2" }));
store.dispatch(addBug({ description: "Bug 1" }));
store.dispatch(addBug({ description: "Bug 2" }));
store.dispatch(resolveBug({ id: 2 }));

store.dispatch(assignBugToUser({ bugId: 1, userId: 1 }));
store.dispatch(assignBugToUser({ bugId: 2, userId: 1 }));

store.dispatch(projectActions.addProject({ name: "Project 1" }));
console.log(getBugsAssignedToUser(1)(store.getState()));
