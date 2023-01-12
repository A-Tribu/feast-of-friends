// HEROKU DEPLOYMENT SAMPLE
const express = require('express');
const controllers =require('./controllers');

//sequelize connection
const sequelize = require('./config/connection');
const app = express();
const PORT = process.env.PORT || 3000;

//const http = require('http');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(controllers);

// sync sequelize models to the database, then turn on the server
sequelize.sync({force: false}).then(() =>{
 app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`); 
});


// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/html');
//   res.end('<h1>Hello World</h1>');
// });

// server.listen(port,() => {
//   console.log(`Server running at port `+ port);
});