require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const connectDB = require('./db/connect');
require('./db/connect')
const action = require('./db/route')

app.use(express.static('./Front'))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('gotta start workin now')
})

app.use('/api/v1/action', action)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
  })
  } catch (error) {
    console.log(error);
  }
}

start()
