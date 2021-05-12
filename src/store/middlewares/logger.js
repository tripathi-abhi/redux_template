const logger = params => state => next => action => {
	console.log(params);
	next(action);
};

export default logger;
