const express = require('express');
const server = express();
const Sensor = require('./Sensor');
const Sensor02 = require('./Sensor02');
const cors = require('cors');
var value1 = 0;
var value2 = 0;

const port = process.env.PORT || 2000;

server.use(cors());
server.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

//from nodemcu
server.get('/', (req, res) => {
  let value1 = req.query.sensor1;
  let value2 = req.query.sensor2;

  //const responsestr = `sensor1: ${value1}, sensor2: ${value2}`;

  //res.status(200).send(responsestr);
  //console.log(responsestr);
  prune();
  const sensorData = new Sensor({
    name: 'sensor1',
    value: value1
  });
  prune2();
  const sensorData2 = new Sensor02({
    name: 'sensor2',
    value: value2
  });
  sensorData
    .save()
    .then(response => {
      console.log(response);
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(400).json(error);
    });
  sensorData2
    .save()
    .then(response => {
      console.log(response);
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

//from react - get the current value
server.get('/getsensor1', (req, res) => {
  // res.status(200).send(JSON.stringify(value));
  res.status(200).json(value);
});

//from react - get historical
server.get('/getallsensor1', (req, res) => {
  Sensor.find()
    .then(response => {
      console.log(response);
      res.status(200).json(response);
    })
    .catch(error => {
      console.log('Mongoose read error: ', error);
      res.status(400).json(error);
    });
});

//prune the collection to keep it at 10
prune = () => {
  Sensor.count({ name: 'sensor1' })
    .then(response => {
      if (response >= 20) {
        Sensor.deleteOne({ name: 'sensor1' })
          .then(response => {
            console.log('Pruned one document');
          })
          .catch(error => {
            console.log('Error pruning: ', error);
          });
      }
    })
    .catch(error => {
      res.status(200).json(error);
    });
};

server.get('/count', (req, res) => {
  Sensor.count({ name: 'sensor1' })
    .then(response => {
      if (response === 9) console.log('Count is: ', response);
      res.status(200).send(response.data);
    })
    .catch(error => {
      res.status(200).json(error);
    });
});

//from react - get the current value
server.get('/getsensor2', (req, res) => {
  // res.status(200).send(JSON.stringify(value));
  res.status(200).json(value);
});

//from react - get historical
server.get('/getallsensor2', (req, res) => {
  Sensor02.find()
    .then(response => {
      console.log(response);
      res.status(200).json(response);
    })
    .catch(error => {
      console.log('Mongoose read error: ', error);
      res.status(400).json(error);
    });
});

//prune the collection to keep it at 10
prune2 = () => {
  Sensor02.count({ name: 'sensor2' })
    .then(response => {
      if (response >= 20) {
        Sensor02.deleteOne({ name: 'sensor2' })
          .then(response => {
            console.log('Pruned one document');
          })
          .catch(error => {
            console.log('Error pruning: ', error);
          });
      }
    })
    .catch(error => {
      res.status(200).json(error);
    });
};

server.get('/count02', (req, res) => {
  Sensor02.count({ name: 'sensor2' })
    .then(response => {
      if (response === 9) console.log('Count02 is: ', response);
      res.status(200).send(response.data);
    })
    .catch(error => {
      res.status(200).json(error);
    });
});

server.listen(port, () => {
  console.log(`server started on port ${port}`);
});
