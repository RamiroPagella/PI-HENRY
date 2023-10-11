const { Router } = require("express");
const getCountries = require('../controllers/getCountries');
const getCountryByID = require('../controllers/getCountryByID');
const getCountryByName = require('../controllers/getCountryByName');
const postActivity = require('../controllers/postActivity');
const getActivities = require('../controllers/getActivities');
const login = require('../controllers/login');
const register = require('../controllers/register')

const router = Router();




//
router.get('/countries/query', getCountryByName);

router.get('/countries', getCountries);

router.get('/countries/:id', getCountryByID);

router.get('/activities', getActivities);
router.post('/activities', postActivity);

router.post('/login', login);

router.post('/register', register);





module.exports = router;
