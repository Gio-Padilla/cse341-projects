// This is the Routes file
const router = require('express').Router();
// const { get } = require('.');
const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

module.exports = router;