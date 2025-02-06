const express = require('express');
const bodyParser = require('body-parser');

const placesRoutes = require('./routes/places-routes');
const HttpError = require('./models/http-error');
const usersRoutes = require('./routes/users-routes');
const app = express();

app.use(bodyParser.json());

app.use('/api/places/',placesRoutes);

app.use('/api/users', usersRoutes);

app.use((req, res, next)=>{
    const error = new HttpError('Could not find this route', 404);
    throw error;
})

app.use((error, req, res, next)=>{
    if(req.headerSent){
      return  next(error);
    }
    res.status(error.code || 500).json({message: error.message || 'An unknown error occurred'})
})

app.listen(5001, () => {
    console.log('Server is running on port 5001');
});