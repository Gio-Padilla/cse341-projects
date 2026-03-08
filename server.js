const express = require('express');
const mongodb = require('./data/database')
const app = express();
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'localhost';

// Middleware
app.use('/', require('./routes'));

// Start server // pnpm start
mongodb.initDb((err) => {
    if(err) {
        console.log(err)
    }
    else {
        app.listen(PORT, () => console.log(`Database is listening and server running on ${HOST}:${PORT}`));
    }
})

