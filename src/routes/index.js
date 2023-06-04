const { Router } = require('express');
const  Users  = require('../controllers/users');
const Articles = require('../controllers/articles');
const router = Router();



// Users

const user = new Users();

router.get('/users', user.list );
router.post('/users/create', user.create );
router.get('/users/:id', user.get );
router.delete('/users/:id', user.delete );
router.put('/users/:id', user.update );

// Articles

const articles = new Articles();

router.get('/articles', articles.list);
router.get('/articles/:id', articles.get);
router.delete('/articles/:id', articles.delete);
router.put('/articles/:id', articles.update);
router.post('/articles/create', articles.create);


module.exports = router;