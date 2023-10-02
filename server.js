const fs = require('fs');
const https = require('https');
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const { nextTick } = require('process');

const PORT = 3000;

const app = express();

app.use(helmet());
app.use((req, res, next) => {
    const isLoggedIn = true;
    if (!isLoggedIn) {
        res.status(401).json({
            error: 'Unauthenticated user',
        });
    }
    next();
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/secret', (req, res) => {
    return res.send('Your personal secret value is PARK');
});

https.createServer({
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
}, app).listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});