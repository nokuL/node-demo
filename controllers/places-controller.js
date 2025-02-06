const HttpError = require('../models/http-error');
const { v4: uuid } = require('uuid');

let DUMMY_PLACES = [{
    id: 'p1',
    title: 'Empire state building',
    description: 'Tallest building in the world',
    location: {
        lat: 1,
        long: 2
    },
    address: "New York",
    creator: "u1"
}]
const getPlaceById = (req, res, next) => {
    const placeId = req.params.pid;
    const place = DUMMY_PLACES.find(p => {
        return placeId === p.id;
    })

    if (!place) {

        throw new HttpError('An error occurred fetching place using place id', 404);
    }
    res.json({ place }); //{place:place}}
}

const getPlaceByUserId = (req, res, next) => {
    const userId = req.params.uid;
    const place = DUMMY_PLACES.find(p => p.creator === userId);
    if (!place) {

        return next(new HttpError('An error occurred fetching place using user id'));
    }
    res.json({ place })
}

const createPlace = (req, res, next) => {
    const { title, description, coordinates, address, creator } = req.body;
    const createdPlace = {
        id: uuid(),
        title,
        description,
        location: coordinates,
        address,
        creator
    }
    DUMMY_PLACES.push(createdPlace);
    res.status(201).json({ place: createdPlace });
}

const patchPlace = (req, res, next) => {
    const { title, description } = req.body;
    const placeId = req.params.pid;
    const updatedPlace = { ...DUMMY_PLACES.find(p => p.id === placeId) };
    const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);
    updatedPlace.title = title;
    updatedPlace.description = description;
    DUMMY_PLACES[placeIndex] = updatedPlace;
    res.status(200).json({ place: updatedPlace });
}

const deletePlace = (req, res, next) => {
    const placeId = req.params.pid;
    DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);
    res.status(200).json({ message: 'Place deleted' });
}

module.exports = { getPlaceById, getPlaceByUserId, createPlace , patchPlace, deletePlace};