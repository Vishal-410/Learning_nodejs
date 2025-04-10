import express from 'express'
import { Server } from "socket.io";
import { createServer } from 'node:http'
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {}
});

const __dirname = dirname(fileURLToPath(import.meta.url))

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});
// io.on('connection', (socket) => {
//   socket.on('chat-message', (msg) => {
//     console.log('message: ', msg)
//   })
// })
// io.on('connection', (socket) => {
//   socket.broadcast.emit('hi')
// // })
// io.on('connection', (socket) => {
//   io.emit("user connected")
// })

// io.on('connection', (socket) => {
//   socket.on('chat-message', (msg) => {
//     io.emit('chat-message', msg);
//   });
// });
const userSocketMap = {}; // { userId: socket.id }
const socketUserMap = {}

io.on('connection', (socket) => {
  // Jab client register kare (apna userId bheje)
  socket.on('register', (userId) => {
    userSocketMap[userId] = socket.id;
    socketUserMap[socket.id] = userId

  });

  // Jab ek client kisi doosre ko message bheje
  socket.on('private message', ({ toUserId, message }) => {
    const targetSocketId = userSocketMap[toUserId];
    if (targetSocketId) {
      io.to(targetSocketId).emit('private message', {
        from: socketUserMap[socket.id], // ya fromUserId if you track that

        message,
      });
    }
  });

  // Clean up on disconnect
  socket.on('disconnect', () => {
    for (let userId in userSocketMap) {
      if (userSocketMap[userId] === socket.id) {
        delete userSocketMap[userId];
        break;
      }
    }
  });
});



server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
})