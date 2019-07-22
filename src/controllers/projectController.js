const express = require('express');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);

router.get('/', (req, res) => {
  return res.send({ user: req.userId });
});

module.exports = app => app.use('/projects', router);