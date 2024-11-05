const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors'); // Importar cors

const app = express();
app.use(cors({
  origin: ["http://localhost:4200", "http://localhost:8084"], // Permitir solicitudes desde esta URL
  methods: ["GET", "POST"],
  credentials: true
})); // Usar cors

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: ["http://localhost:4200", "http://localhost:8084"], // Permitir solicitudes desde estas URLs
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  socket.on('message', (message) => {
    console.log(`Mensaje recibido: ${message}`);
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

const PORT = process.env.PORT || 4500;
server.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));