const express = require('express');
const path = require('path');
const htmlRoutes = require('./routes/htmlRoutes'); // Import the htmlRoutes module

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'client/dist' directory
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// Use the htmlRoutes module for handling HTML routes
htmlRoutes(app);

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));

