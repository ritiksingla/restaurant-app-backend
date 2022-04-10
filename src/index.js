const path = require('path');
const env = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const DishRouter = require('./routers/dish');
const UserRouter = require('./routers/user');
const app = express();

env.config({ path: path.join(__dirname, 'config.env') });
mongoose.connect(process.env.MONGO_URI, err => {
	if (err) { console.log('error in connecting mongodb'); }
	else { console.log('connected db'); }
});

app.use(cors());
app.options('*', cors());

// if dont want to use res.setHeader
app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/dish', DishRouter);
app.use('/user', UserRouter);

app.get('/', (req, res) => {
	res.send('Home Page');
});

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
	console.log(`Server is running at: ${port}`);
})