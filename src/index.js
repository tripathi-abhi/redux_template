import configureStore from "./store/configureStore";
import { postBug, markResolveBug, loadBugs, assignBug } from "./store/bugs";

const store = configureStore();

store.dispatch(loadBugs());

setTimeout(() => store.dispatch(assignBug(4, 1)), 2000);
