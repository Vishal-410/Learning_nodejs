import express from 'express'
const app = express()
const port = 3000

import insertUser from './utils/insertUser.js';
import deleteUser from './utils/deleteUser.js';
import avgAge from './utils/avgAge.js';

import connectDB from './DB/db.js';
connectDB();
// insertUser();
avgAge().then(console.log).catch(console.error);
// deleteUser();

app.listen(port, () => console.log(`Example app listening on port ${port}!`))