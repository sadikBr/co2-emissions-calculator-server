// Requiring all the necessary node modules.
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');

// Requiring all the routers.
const calculationsRouter = require('./routers/calculations.router');
const emissionFactorsRouter = require('./routers/emissionFactors.router');
const unitsRouter = require('./routers/units.router');
const regionsRouter = require('./routers/regions.router');
const sourcesRouter = require('./routers/sources.router');
const categoriesRouter = require('./routers/categories.router');
const cardMetricsRouter = require('./routers/cardMetrics.router');
const metricsRouter = require('./routers/metrics.router');
const barChartRouter = require('./routers/barChart.router');
const lineChartRouter = require('./routers/lineChart.router');
const projectsRouter = require('./routers/projects.router');
const usersRouter = require('./routers/users.router');

// Loading all the environement variables.
require('dotenv').config();

// Creating the database connection.
const DB_URL = process.env.DB_URL;
mongoose.connect(DB_URL, {}, (err) => {
  if (err) console.log('There was an error while connecting to database.', err);
  else console.log('Database connected.');
});

// Creating an app instance.
const PORT = process.env.PORT;
const app = express();

// Using all the necessary middlewares.
app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));
app.use(express.json());

// Server main endpoint.
app.get('/', (req, res) => {
  res.json({
    message: 'This is CO2 EMISSIONS CALCULATOR home page!',
  });
});

// Using all the routers.
app.use('/calculations', calculationsRouter);
app.use('/emission-factors', emissionFactorsRouter);
app.use('/sources', sourcesRouter);
app.use('/regions', regionsRouter);
app.use('/units', unitsRouter);
app.use('/categories', categoriesRouter);
app.use('/cards', cardMetricsRouter);
app.use('/metrics', metricsRouter);
app.use('/bar', barChartRouter);
app.use('/line', lineChartRouter);
app.use('/projects', projectsRouter);
app.use('/users', usersRouter);

// Error middleware handler

// NOT Found middleware

// App listening on the given port.
app.listen(PORT, () => {
  console.log(`App listening at: https://localhost:${PORT}`);
});
