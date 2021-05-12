const func = store => next => action => {
	if (typeof action === "function") {
		next(action());
	} else next(action);
};

export default func;
