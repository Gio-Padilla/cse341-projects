// This is the Routes file
const router = require('express').Router();
// const { get } = require('.');
const usersController = require('../controllers/users');

router.get('/', usersController.getAll);

router.get('/:id', usersController.getSingle);

module.exports = router;