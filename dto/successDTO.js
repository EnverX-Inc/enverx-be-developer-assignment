module.exports = function successDTO({ data, message = '' }) {
	const response = {};
	if (data) {
		response.data = data;
	}
	response.message = message;
	return response;
};
