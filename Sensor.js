const mongoose = require('mongoose');
const db = 'mongodb://lau:lau307@ds137003.mlab.com:37003/launodemcu';

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
