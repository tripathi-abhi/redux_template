import reducer from "./reducer";

function customStore(reducer) {
	let state;
	let listeners = [];

	function subscribe(listener) {
		listeners.push(listener);
		return () =>
			(listeners = listeners.filter(itrListener => listener !== itrListener));
	}

	function dispatch(action) {
		state = reducer(state, action);
		listeners.forEach(listener => listener());
	}

	function getState() {
		return state;
	}

	return { getState, dispatch, subscribe };
}

export default customStore(reducer);
