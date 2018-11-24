const mongoose = require('mongoose');

const db = 'mongodb://sensor:sensor1@ds043487.mlab.com:43487/307cr';

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('mongoose connected to mongodb');
  })
  .catch(error => {
    console.log('mongoose connection error: ', error);
  });

const sensorSchema = new mongoose.Schema({
  name: {
    type: String
  },
  value: {
    type: Number
  }
});

const Sensor02 = mongoose.model('Sensor02', sensorSchema, 'sensorCollection02');

module.exports = Sensor02;
