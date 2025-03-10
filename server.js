const express = require('express');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk'); // Import chalk for colored messages

const app = express();

// Utility functions (assuming you have these defined)
const { handleError, parseBody, getContentType, serveStaticFile } = require('./utility/helpfunction');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
const usersFile = path.join(__dirname, 'user.json');

const routes = require('./routes/route');
app.use('/', routes);

const morgan = require('morgan');
app.use(morgan('combined'));

const helmet = require('helmet');
app.use(helmet());

const cors = require('cors');
app.use(cors());

const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later',
});
app.use(limiter);

// Example route with async handler
const asyncHandler = require('express-async-handler');
app.get('/users', asyncHandler(async (req, res, next) => {
    const users = await getUsersFromDB(); // Example async function
    console.log(chalk.blue(`Fetched ${users.length} users`)); // Log how many users were fetched
    res.json(users);
}));

// Log requests using a direct console log instead of middleware
app.use((req, res, next) => {
    console.log(chalk.cyan(`[${new Date().toISOString()}] ${req.method} ${req.url}`)); // Log each request
    next();
});

// Route not found handler
app.use((req, res) => {
    console.log(chalk.yellow(`Route not found for ${req.method} ${req.url}`)); // Log a warning for not found routes
    res.status(404).json({ success: false, message: 'Route not found' });
});

// Server Startup
const PORT = 8080;
app.listen(PORT, () => {
    console.log(chalk.green(`Server is running at http://localhost:${PORT}`)); // Use chalk for a colored server start log
});