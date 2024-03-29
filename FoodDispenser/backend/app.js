const express = require('express');
const ps = require('python-shell');
const mongoose = require('mongoose');

const Order = require('./models/order');

const app = express();


mongoose
  .connect(
    "mongodb+srv://Group8:RedHotChiliPeppers@fooddispenser-xhsap.mongodb.net/test?retryWrites=true"
  )
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods",
  "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.use(express.json());

// get all Orders
app.get('/api/order', (req, res, next) => {
  Order.find().then(documents => {
		res.status(200).json({
			message: "Orders fetched successfully!",
			posts: documents
		});
	});
});

// get only the Orders with a specific item ID
app.get('/api/order/:id', (req, res, next) => {
  Order.find().where('productID').equals(req.params.id).then(documents => {
    res.status(200).json({
      message: "Orders with the ID: " + req.params.id,
      posts: documents
    });
  });
});


app.post('/api/order', (req, res, next) => {
  //MongoDB
  console.log(req.body);      // your JSON
  res.send(req.body);    // echo the result back
  const order = new Order({
		productID: req.body.productID,
    amount: req.body.amount,
    time: Date.now()
  });
  order.save();

  res.status(201);
  let rotation = req.body.rotation;
  ps.PythonShell.run('motor.py', { args: [rotation] }, function (err, results){
    console.log(err);
    console.log(results);
  });
});

app.delete("/api/order/:orderID", (req, res, next) => {
	Order.deleteOne({_id: req.params.orderID}).then( result => {
		console.log(result);
		res.status(200).json({ message: "Entry Deleted on MongoDB! " });
	});
});




module.exports = app;
