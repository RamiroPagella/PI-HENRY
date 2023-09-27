const { Router } = require("express");
const getCountries = require('../controllers/getCountries');
const getCountryByID = require('../controllers/getCountryByID');
const getCountryByName = require('../controllers/getCountryByName');
const postActivity = require('../controllers/postActivity');
const getActivities = require('../controllers/getActivities');

const router = Router();




//
router.get('/countries/query', getCountryByName);

router.get('/countries', getCountries);

router.get('/countries/:id', getCountryByID);

router.post('/activities', postActivity);

router.get('/activities', getActivities);





module.exports = router;
