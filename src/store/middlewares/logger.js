const logger = params => state => next => action => {
	return next(action);
};

export default logger;
