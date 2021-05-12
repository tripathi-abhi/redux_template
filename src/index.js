import configureStore from "./store/configureStore";
import { loadBugs } from "./store/bugs";

const store = configureStore();

store.subscribe(() => {
	console.log("subcribed!", store.getState());
});

store.dispatch(loadBugs());
