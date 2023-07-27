const startTime = Date.now();

/* eslint-disable no-console */

const http = require('http');
const app = require('../app');

process.on('uncaughtException', (error) => {
	error = error || {};
	console.error(new Date().toUTCString() + ' uncaughtException:', error.message);
	console.log(error);
	process.exit(1);
});

process.on('unhandledRejection', (error) => {
	error = error || {};
	console.error(new Date().toUTCString() + ' unhandledRejection:', error.message);
	console.log(error);
});

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);



/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(value) {
	const port = Number(value);
	if (Number.isNaN(Number(port))) {
		// named pipe
		return value;
	}

	if (port >= 0) {
		// port number
		return port;
	}

	return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges');
			throw error;
		case 'EADDRINUSE':
			console.error(bind + ' is already in use');
			throw error;
		default:
			throw error;
	}
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
	const addr = server.address();
	const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
	console.info(`Started Listening on + ${bind}, boot time: ${(Date.now() - startTime) / 1000}s`);
	
}
/* eslint-enable no-console */

// Handle server close event to stop receiving requests!
/* eslint-disable no-console */
process.on('SIGTERM', () => {
	console.info('SIGTERM signal received.');
	console.log('Closing http server.');
	server.close(() => {
		console.log('Http server closed.');
		setTimeout(async () => {
			await closePostgresConnections().then(
				process.exit(0),
			);
		}, 5000);
	});
});
/* eslint-enable no-console */
