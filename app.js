require('dotenv').config();
const express = require("express");
const bodyParser = require('express').json;

const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const productsRoute = require('./routes/product');
const ordersRoute = require('./routes/orders');
const notificationRoute = require('./routes/notification');
const errorRoute = require('./routes/error');

const MongoDB =require('./utils/connectMongoDB');


const app = express(); 
app.use(bodyParser());
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const ErrorMeassaging = require('./models/error');
const io = new Server(server);

console.log('CONNECTING TO DATABASE...');
MongoDB();
// sendMail();
console.log('DATABASE CONNECTED');





//END POINTS
app.use('/api/register',registerRoute);
app.use('/api/login',loginRoute);
app.use('/api/products',productsRoute);
app.use('/api/orders',ordersRoute);
app.use('/api/expoPushTokens',notificationRoute);
app.use('/api/error',errorRoute);



io.on('connection', (socket) => {

    socket.on("errors",async msg=>{
      await ErrorMeassaging.create(msg.body);        
    });
  });




server.listen(process.env.PORT, () => {
    console.log(`PlugWorld Backend Is Running On Port ${process.env.PORT}`)
  });