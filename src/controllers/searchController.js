const express = require('express');

const User = require('../models/User');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const user = await User.find(req.body);
    return res.send(user);
  } catch (err) {
    return res.status(400).send({ error: 'User not found' });
  }
})

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id});
    return res.send(user);
  } catch (err) {
    return res.status(400).send({ error: 'User not found' });
  }
});

module.exports = app => app.use('/user/search', router);