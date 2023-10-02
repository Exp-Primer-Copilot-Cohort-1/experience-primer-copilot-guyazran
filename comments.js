// Create web server
// Run server: node comments.js

// Load Node modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

// Set port
const port = 3000;

// Set public folder
app.use(express.static(path.join(__dirname, 'public')));

// Set body parser
app.use(bodyParser.urlencoded({ extended: true }));

// Set template engine
app.set('view engine', 'ejs');

// Get comments
app.get('/comments', (req, res) => {
	fs.readFile('comments.json', (err, data) => {
		if (err) {
			console.error(err);
			return;
		}
		let comments = JSON.parse(data);
		res.render('comments', { comments });
	});
});

// Post comment
app.post('/comments', (req, res) => {
	fs.readFile('comments.json', (err, data) => {
		if (err) {
			console.error(err);
			return;
		}
		let comments = JSON.parse(data);
		comments.push(req.body);
		fs.writeFile('comments.json', JSON.stringify(comments), err => {
			if (err) {
				console.error(err);
				return;
			}
			res.redirect('/comments');
		});
	});
});

// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));