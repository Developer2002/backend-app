const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');

const app = express();

mongoose.connect(process.env.URL_MONGOOSE, {
  useNewUrlParser: true,
})

app.use(express.json());

app.get('/', (req, res) => {
  res.send({ ok: true });
});

require('./controllers/authController')(app);
require('./controllers/editController')(app);
require('./controllers/searchController')(app);
require('./controllers/projectController')(app);

app.listen(3333);