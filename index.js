// index.js
const express = require("express");
const http = require("http");
const sockets = require("./sockets");

const app = express();
const server = http.createServer(app);
const wss = sockets(server);

// ... tus rutas y middleware de Express ...

server.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});

// Enviar una notificación
wss.clients.forEach((client) => {
  client.send(
    JSON.stringify({
      tipo: "activo_creado",
      activo: { nombre: "Nuevo activo", latitud: 123, longitud: 456 },
    })
  );
});
