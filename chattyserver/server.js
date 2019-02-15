// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');
let usercount = 0;

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () =>
    console.log(`Listening on ${PORT}`)
  );

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', ws => {
  console.log('Client connected');
  usercount = usercount + 1;
  let rand = Math.floor(Math.random() * 4 + 1);
  let color = '';
  switch (rand) {
    case 1:
      color = 'message-username one';
      break;
    case 2:
      color = 'message-username two';
      break;
    case 3:
      color = 'message-username three';
      break;
    case 4:
      color = 'message-username four';
      break;
  }

  console.log('User logged on, online: ' + usercount);
  let receiveData = {
    type: 'usercount',
    userNum: usercount,
    colorNum: color
  };
  wss.clients.forEach(client => {
    if (client.readyState === ws.OPEN) {
      client.send(JSON.stringify(receiveData));
    }
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('message', function incoming(data) {
    let receiveData = JSON.parse(data);
    receiveData.id = uuidv4();
    console.log(receiveData);

    wss.clients.forEach(client => {
      if (client.readyState === ws.OPEN) {
        client.send(JSON.stringify(receiveData));
      }
    });
  });
  ws.on('close', () => {
    console.log('Client disconnected');
    usercount: usercount -= 1;
    console.log('User logged off, users online: ' + usercount);
    let receiveData = {
      type: 'usercount',
      userNum: usercount
    };
    wss.clients.forEach(client => {
      if (client.readyState === ws.OPEN) {
        client.send(JSON.stringify(receiveData));
      }
    });
  });
});
