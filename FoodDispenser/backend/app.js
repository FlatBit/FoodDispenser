const express = require('express');

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods",
  "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});


app.post('/api/order', (req, res, next) => {
  res.status(201);
  res.send({ message: "Nachricht erhalten!"});

  /**
   const stepper = execFile('./stepper', (error, stdout, stderr) => {
        if(error) {
            console.error('stderr', stderr);
            throw error;
        }
        console.log(stdout);
        //give info back to browser
        io.emit('stepper', stdout);
    });
   */



});

module.exports = app;
