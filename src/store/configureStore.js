import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import logger from "./middlewares/logger";
import errorToast from "./middlewares/errorToast";
import apiMiddleware from "./middlewares/api";

export default function configureAppStore() {
	return configureStore({
		reducer,
		middleware: [
			...getDefaultMiddleware(),
			logger({ id: 12 }),
			errorToast,
			apiMiddleware,
		],
	});
}
