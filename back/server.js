const connect = require('./connect.js');
const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes.js');

const app = express();
const PORT = 3000;

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/', taskRoutes);

app.listen(PORT, () => {
    connect.connectToServer();
    console.log(`Server is running on port ${PORT}`);
})
