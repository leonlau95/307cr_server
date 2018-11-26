const mongoose = require('mongoose');
const db = 'mongodb://sensor:sensor1@ds043487.mlab.com:43487/307cr';

mongoose
.connect(db, {useNewUrlParser: true})
.then(()=>{
  console.log('Connected to mongodb');
})
.catch((error)=>{
  console.log('Connection mongodb error: ', error);
});

const sensorSchema = new mongoose.Schema({
  name: {
    type: String
  },
  value: {
    type: Number
  }
});

const Sensor = mongoose.model('Sensor', sensorSchema, 'sensorCollection');

module.exports = Sensor;
