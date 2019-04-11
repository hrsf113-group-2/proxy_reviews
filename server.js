const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;


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
  axios.get(`http://localhost:3003/relatedlisting`)
  .then((listingInfo) => {
    res.send(JSON.stringify(listingInfo.data));
  })
})

app.get('/photos/byroom/:roomid/all', (req, res) => {
  axios.get(`http://localhost:3002/photos/byroom/${req.params.roomid}/all`)
  .then((photos) => {
    res.send(photos.data)
  })
})


app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
