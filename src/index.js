import store from "./store";
import * as actions from "./actionCreators";

const unsubscribe = store.subscribe(() => {
	console.log("subcribed!", store.getState());
});

store.dispatch(actions.addBug("Bug 1"));

store.dispatch(actions.addBug("Bug 2"));

store.dispatch(actions.resolveBug(2));

store.dispatch(actions.removeBug(2));
