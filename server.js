const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  // Handle drawing events
  socket.on('draw', (data) => {
    // Broadcast drawing data to all clients
    io.emit('draw', data);
  });

  // Handle symmetry check
  socket.on('checkSymmetry', (userId) => {
    // Implement your symmetry check logic here
    // Send the result back to the user
    io.to(socket.id).emit('symmetryResult', { score: 100 }); // Placeholder score
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
