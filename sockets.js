const WebSocket = require("ws");
const wss = new WebSocket.Server({ server }); // 'server' es tu servidor HTTP

wss.on("connection", (ws) => {
  console.log("Cliente conectado");
  ws.on("message", (message) => {
    console.log(`Mensaje recibido: ${message}`);
  });
});

// Enviar una notificación
wss.clients.forEach((client) => {
  client.send(JSON.stringify({ tipo: "activo_creado", activo }));
});

module.exports = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    console.log("Cliente conectado");

    ws.on("message", (message) => {
      console.log(`Mensaje recibido: ${message}`);
    });

    ws.on("close", () => {
      console.log("Cliente desconectado");
    });
  });

  return wss;
};
