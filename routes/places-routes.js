const express = require('express');
const {check} = require('express-validator');
const HttpError = require('../models/http-error');
const {getPlaceById, getPlaceByUserId, createPlace, patchPlace, deletePlace} = require('../controllers/places-controller');

const router = express.Router();



router.get('/:pid',  getPlaceById);

router.get('/user/:uid', getPlaceByUserId)

router.post('/',[check('title').not().isEmpty(), 
    check('description').isLength({min: 5}),
check('address').not().isEmpty()], createPlace);

router.patch('/:pid', [check('title').not().isEmpty(), 
    check('description').isLength({min: 5}),
check('address').not().isEmpty()], patchPlace)

router.delete('/:pid', deletePlace)

module.exports = router;