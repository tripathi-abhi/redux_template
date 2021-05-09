import reducer from "./reducer";

function customStore(reducer) {
	let state = 1;

	function getState() {
		return state;
	}

	return { getState };
}

export default customStore(reducer);
