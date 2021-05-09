import * as actions from "./actionTypes";
let id = 0;

export default function reducer(state = [], action) {
	switch (action.type) {
		case actions.ADD_BUG:
			return [
				...state,
				{
					id: ++id,
					description: action.payload.description,
					resolved: false,
				},
			];
		case actions.REMOVE_BUG:
			return state.filter(bug => bug.id !== action.payload.id);
		case actions.RESOLVE_BUG:
			return state.map(bug =>
				bug.id !== action.payload.id ? bug : { ...bug, resolved: true }
			);
		default:
			return state;
	}
}
