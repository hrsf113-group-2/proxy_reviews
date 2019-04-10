const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
// const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;


// app.use(cors);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/locations/2/reviews', (req, res) => {
  axios.get('http://localhost:3001/locations/2/reviews')
    .then((currentLocationReviews) => {
      res.send(currentLocationReviews.data)
    })
    .catch((error) => console.log(error))
})


app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
