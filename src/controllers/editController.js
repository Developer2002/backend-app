const express = require('express');
const authMiddleware = require('../middleware/auth');

const User = require('../models/User');

const router = express.Router();

router.use(authMiddleware);

router.post('/:id', async (req, res) => {
  try {
    if (req.body.email)
      return res.status(403).send({ error: 'Not authorized' });
      
    if (!req.userId == req.params.id)
      return res.status(400).send({ error: 'User not identified' });

    await User.updateOne({_id: req.params.id}, req.body, {runValidators: true});

    const user = await User.findOne({ _id: req.params.id });

    return res.send(user);
  } catch (err) {
    return res.status(400).send({ error: 'Edit failed' });
  }
});

module.exports = app => app.use('/user/edit', router);