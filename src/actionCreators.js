import * as action from "./actionTypes";

export const addBug = description => ({
	type: action.ADD_BUG,
	payload: {
		description,
	},
});

export const removeBug = id => ({
	type: action.REMOVE_BUG,
	payload: {
		id,
	},
});

export const resolveBug = id => ({
	type: action.RESOLVE_BUG,
	payload: {
		id,
	},
});
