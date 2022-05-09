const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const Nexmo = require('nexmo');
const socketio = require('socket.io');
const text = require('body-parser/lib/types/text');



const Vonage = require('@vonage/server-sdk')

const vonage = new Vonage({
  apiKey: "ba20117f",
  apiSecret: "SvlRuXOgCQUr26eu"
})

// Init app
const app = express();

// Template engine setup
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

// Public folder setup
app.use(express.static(__dirname + '/public'));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Index route
app.get('/', (req, res) => {
  res.render('index');
});
var b = 5;
// Catch form submit
app.post('/', (req, res) => {
  // res.send(req.body);
  // console.log(req.body);
  const { number, a } = req.body;
var b = 5;
  const from = "Vonage APIs"
  const to = "+4857214008"
  const text = "zgloszenie usera"+a+"dotyczonce usera"+number
  
  vonage.message.sendSms(from, to, text, (err, responseData) => {
      if (err) {
          console.log(err);
      } else {
          if(responseData.messages[0]['status'] === "0") {
              console.log("Message sent successfully.");
          } else {
              console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
          }
      }
  })
});
// Define port
const port = 3000;
  console.log(b);
// Start server
const server = app.listen(port, () => console.log(`Server started on port ${port}`));

// Connect to socket.io
const io = socketio(server);
io.on('connection', (socket) => {
  console.log('Connected');
  io.on('disconnect', () => {
    console.log('Disconnected');
  })
});
