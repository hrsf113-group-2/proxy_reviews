const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
// const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;


// app.use(cors);

app.use(morgan('dev'));
app.use('/location/:locationID', express.static(path.join(__dirname, 'public')));

app.get('/api/locations/:locationID/reviews', (req, res) => {
  axios.get(`http://localhost:3004/api/locations/${req.params.locationID}/reviews`)
    .then((currentLocationReviews) => {
      res.send(currentLocationReviews.data)
    })
    .catch((error) => console.log(error))
})

app.get('/rooms/:room_id/reservations', (req, res) => {
  axios.get(`http://localhost:3001/rooms/${req.params.room_id}/reservations`)
  .then((checkoutInfo) => {
    res.send(checkoutInfo.data)
  }) 
})

app.get('/relatedlisting', (req, res) => {
  console.log('HIT BRADS GET REQUEST IN PROXY')
  axios.get(`http://localhost:3003/relatedlisting`)
  .then((listingInfo) => {
    console.log('LISTINGINFO: ', listingInfo)
    res.send(JSON.stringify(listingInfo.data));
  })
})


app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
