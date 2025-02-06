const express = require('express');
const HttpError = require('../models/http-error');
const {getPlaceById, getPlaceByUserId, createPlace, patchPlace, deletePlace} = require('../controllers/places-controller');

const router = express.Router();



router.get('/:pid',  getPlaceById);

router.get('/user/:uid', getPlaceByUserId)

router.post('/', createPlace);

router.patch('/:pid', patchPlace)

router.delete('/:pid', deletePlace)

module.exports = router;