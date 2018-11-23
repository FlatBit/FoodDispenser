const express = require('express');
const ps = require('python-shell');
const mongoose = require('./models/order');

const Order = require('./models/order');

const app = express();

mongoose.connect(`mongodb+srv://Fooddispenser:rIqsy5-jepqir-gifdaq@fooddispenser-xhsap.mongodb.net/test?retryWrites=true`)
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


app.get('path', (req, res, next) => {
  Order.find().then(documents => {
		res.status(200).json({
			message: "Posts fetched successfully!",
			posts: documents
		});
		console.log(documents);
	});
});

app.post('/api/order', (req, res, next) => {
  //MongoDB
  const post = new Post({
		title: req.body.title,
		content: req.body.conten
  });
  post.save();

  res.status(201);
  res.send({ message: "Message received!"});
  ps.PythonShell.run('motor.py', { args: ['10'] }, function (err, results){
    console.log(err);
    console.log(results);
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then( result => {
    console.log(result);
    res.status(200).json({ message: "sdfsdf" });
  });
});



module.exports = app;
