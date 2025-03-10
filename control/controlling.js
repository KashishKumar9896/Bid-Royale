const path = require('path');
const fs = require('fs');
const chalk = require('chalk'); // Import chalk for colored messages

const usersFile = path.join(__dirname, '../data/user.json');

// Serve the login page
const getlogin = (req, res) => {
    console.log(chalk.cyan('Serving login page'));
    res.sendFile(path.join(__dirname, '../public/login.html'));
};
const postlogin = (req, res) => {
    const { uname, upwd } = req.body;
    console.log(chalk.blue(`Login attempt for user: ${uname}`));

    try {
        // Read users from JSON file
        const users = JSON.parse(fs.readFileSync(usersFile, 'utf-8'));
        console.log(chalk.green(`Read ${users.length} users from file`));

        // Check if user exists
        const user = users.find(user => user.uname === uname);

        if (!user || user.upwd !== upwd) {
            console.log(chalk.red('Invalid username or password.'));
            return res.status(400).json({ success: false, message: 'Invalid username or password.' });
        }

        console.log(chalk.green(`User ${uname} logged in successfully`));
        
        // Redirect after login with username in query string
        res.redirect(`/index.html?user=${encodeURIComponent(uname)}`);
    } catch (error) {
        console.error(chalk.red('Error reading users from file:', error.message));
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Serve register.html when visiting /register
const getregister = (req, res) => {
    console.log(chalk.cyan('Serving registration page'));
    res.sendFile(path.join(__dirname, '../public/register.html'));
};

// Handle user registration (POST request)
const postregister = (req, res) => {
    const { uname, upwd } = req.body;
    console.log(chalk.blue(`Registration attempt for user: ${uname}`));

    if (!uname || !upwd) {
        console.log(chalk.red('Username and password are required.'));
        return res.status(400).json({ success: false, message: 'Username and password are required.' });
    }

    try {
        // Read users from JSON file
        const users = JSON.parse(fs.readFileSync(usersFile, 'utf-8'));

        // Check if username already exists
        if (users.find(user => user.uname === uname)) {
            console.log(chalk.red('Username already exists.'));
            return res.status(400).json({ success: false, message: 'Username already exists.' });
        }

        // Add new user
        users.push({ uname, upwd });
        fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

        console.log(chalk.green(`User ${uname} registered successfully`));
        res.redirect('/login');
    } catch (error) {
        console.error(chalk.red('Error processing registration:', error.message));
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = { postlogin, postregister, getlogin, getregister };