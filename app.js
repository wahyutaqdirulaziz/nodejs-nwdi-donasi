const express = require('express');
const app = express();
const FileUpload = require("express-fileupload");
const port = process.env.PORT || 3000;
const user = require('./routes/user');
const payment = require('./routes/payment');
const donasi = require('./routes/donasi');
const lastdonasi = require('./routes/lastdonasi');

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(FileUpload());
app.use('/public', express.static("public"));

app.get('/', (req, res) => {
    res.send('Hello nwdi ku')
});

app.use('/api/users', user);
app.use('/api/bank', payment);
app.use('/api/donasi', donasi);
app.use('/api/history', lastdonasi);



app.listen(port, () => {
    console.log(`Running on port ${port}`);
});