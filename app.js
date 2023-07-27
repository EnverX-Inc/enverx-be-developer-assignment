require('./lib/db');
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const logger = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const routes = require('./routes');
const globalErrorHandler = require('./controllers/globalErrorHandler.js');
const errorDTO = require('./dto/errorDTO');
const app = express();

const rateLimiter = rateLimit({
	windowMs: 30 * 60 * 1000,
	max: 200,
});

app.use(logger('dev'));
app.use(helmet());
app.use(compression());
app.use(bodyParser.json({ limit: '50mb', strict: false }));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
app.use(cors());
app.use(rateLimiter);

app.use('/status', (request, response) => {
	return response.status(200).send('OK');
});

app.use('/api/', routes);



// global Error Handler
app.use(globalErrorHandler);

app.all('*', ( req, res) => {
	return res.status(404).json(errorDTO({message:"No Resources here"}));
});

module.exports = app;
