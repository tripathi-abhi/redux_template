import axios from "axios";
import * as actions from "../api";

const api =
	({ dispatch }) =>
	next =>
	async action => {
		if (action.type !== actions.apicallBegan.type) return next(action);
		next(action);
		const { url, method, data, onSuccess, onError } = action.payload;
		try {
			const response = await axios.request({
				baseURL: "http://localhost:9001/api",
				url,
				method,
				data,
			});
			console.log(response);
			dispatch(actions.apicallSuccess(response.data));
			if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
		} catch (error) {
			dispatch(actions.apicallFailed(error));
			if (onError) dispatch({ type: onError, payload: error });
		}
	};

export default api;
