import * as actions from "./actionTypes";
import { produce } from "immer";
let id = 0;

export default function reducer(state = [], action) {
	switch (action.type) {
		case actions.ADD_BUG:
			return produce(state, draft => {
				draft.push({
					id: ++id,
					description: action.payload.description,
					resolved: false,
				});
			});
		case actions.REMOVE_BUG:
			// return produce(state, draft => {
			// 	draft.splice(
			// 		draft.findIndex(bug => bug.id === action.payload.id),
			// 		1
			// 	);
			// });
			return draft.filter(bug => bug.id !== action.payload.id);
		case actions.RESOLVE_BUG:
			return produce(state, draft => {
				draft.forEach(bug => {
					bug.resolved = bug.id !== action.payload.id ? bug.resolved : true;
				});
			});
		default:
			return state;
	}
}
