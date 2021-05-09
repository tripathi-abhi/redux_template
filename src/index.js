import store from "./store";
import customStore from "./customStore";
import { addBug, removeBug, resolveBug } from "./actionCreators";

console.log(customStore);

const unsubscribe = store.subscribe(() => {
	console.log("subcribed!", store.getState());
});

store.dispatch(addBug("Bug 1"));

store.dispatch(addBug("Bug 2"));

store.dispatch(resolveBug(2));

store.dispatch(removeBug(2));
