// Server-side
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }
});

io.listen(3001);

// Array to store characters
const characters = [];
const sockettoroom = new Map();
// Function to generate random position
const generateRandomPosition = () => {
  return [Math.random() * 3, -0.9, Math.random() * 3];
}

io.on("connection", (socket) => {
  console.log("User connected: " + socket.id);

  // Automatically join a room upon connection
  sockettoroom.set(socket.id, "gameRoom");
  // console.log("User joined: " + socket.id + "gameRoom");
  io.to('gameRoom').emit('NewUserJoined', socket.id);
  socket.join('gameRoom');
  io.to(socket.id).emit('joined Room', socket.id);
  socket.broadcast.emit('user-connected', socket.id)
  console.log("sent it back to user");
  // console.log("User joined: " + socket.id);
  // Add new character to the characters array and emit 'spawn' event to all clients
  characters.push({
    id: socket.id,
    delta: [0, 0, 0],
    rotation: 0,
    avatar: 0,
    animation: '',
    url: '',
    doubt:false,
    position: generateRandomPosition(),
    assignments: []
  });
  io.to('gameRoom').emit("spawn", characters);
  // socket.on("user:call", ({ to, offer }) => {
  //   console.log({ to });

  //   io.to(to).emit("incomming:call", { from: socket.id, offer });
  // });
  // socket.on("call:accepted", ({ to, ans }) => {
  //   io.to(to).emit("call:accepted", { from: socket.id, ans });
  // });
  // Handle rotation event
  socket.on("rotation", (rotation) => {
    const character = characters.find((character) => character.id === socket.id);
    if (character) {
      character.rotation = rotation;
      io.to('gameRoom').emit("spawn", characters);
    }
  });

  // Handle position event
  socket.on("position", (position) => {
    const character = characters.find((character) => character.id === socket.id);
    if (character) {
      character.position = [position.x, position.y, position.z];
      io.to('gameRoom').emit("spawn", characters);
    }
  });

  // Handle delta event
  socket.on("delta", (delta) => {
    const character = characters.find((character) => character.id === socket.id);
    if (character) {
      character.delta = [delta.x, delta.y, delta.z];
      io.to('gameRoom').emit("spawn", characters);
    }
  });
  socket.on("url", (url) => {
    characters.forEach((character) => {

      character.url = url;

    });

    io.to('gameRoom').emit("spawn", characters);
  });
  socket.on("animation", (animation) => {
    const character = characters.find((character) => character.id === socket.id);
    if (character) {
      character.animation = animation.animation;
      io.to('gameRoom').emit("spawn", characters);
    }
  });
  socket.on("Doubt", (raise) => {
    const character = characters.find((character) => character.id === socket.id);
    if (character) {
      character.doubt = raise
      io.to('gameRoom').emit("spawn", characters);
    }
  });
  socket.on("resolve", (id) => {
    const character = characters.find((character) => character.id === id);
    if (character) {
      character.doubt = false
      io.to('gameRoom').emit("spawn", characters);
    }
  });
  // socket.on("peer:nego:needed", ({ to, offer }) => {
  //   console.log("peer:nego:needed", offer);
  //   io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  // });

  // socket.on("peer:nego:done", ({ to, ans }) => {
  //   console.log("peer:nego:done", ans);
  //   io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  // });
  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected: " + socket.id);
    const index = characters.findIndex((character) => character.id === socket.id);
    if (index !== -1) {
      characters.splice(index, 1);
      io.to('gameRoom').emit("spawn", characters);
    }
  });
});
