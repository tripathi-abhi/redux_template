import axios from "axios";
import * as actions from "../api";

const api =
	({ dispatch, getState }) =>
	next =>
	async action => {
		if (action.type !== actions.apicallBegan.type) return next(action);

		const { url, method, data, onSuccess, onRequest, onError } = action.payload;
		if (onRequest) dispatch({ type: onRequest });
		next(action);
		try {
			const response = await axios.request({
				baseURL: "http://localhost:9001/api",
				url,
				method,
				data,
			});
			dispatch(actions.apicallSuccess(response.data));
			if (onSuccess) {
				dispatch({ type: onSuccess, payload: response.data });
			}
		} catch (error) {
			dispatch(actions.apicallFailed(error.message));
			if (onError) dispatch({ type: onError, payload: error.message });
		}
	};

export default api;
