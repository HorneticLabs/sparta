import express from 'express';
import path from 'path';
import mustacheExpress from 'mustache-express';

// Import routes
import indexRouter from './routes/index';
import applicationRouter from './routes/application';
import cohRouter from './routes/coh';


const app = express();
const PORT = process.env.PORT || 3000;

// Set up Mustache templating engine
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (compiled CSS, images, etc.)
app.use(express.static(path.join(__dirname, './public')));

// Middleware to parse incoming form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use our routes
app.use('/', indexRouter);
app.use('/apply', applicationRouter);
app.use('/coh', cohRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
