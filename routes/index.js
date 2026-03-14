const router = require('express').Router();

const swaggerRoutes = require('./swagger');
const contactRoutes = require('./contacts');

router.get('/', (req, res) => { res.send('Hello World')});

router.use('/contacts', contactRoutes);
router.use('/api-docs', swaggerRoutes);

module.exports = router;