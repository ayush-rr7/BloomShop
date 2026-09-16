import http from 'http'
import app from './src/app.js'
import initSocket from './src/sockets/socket.js';
import { Server } from "socket.io";
const server = http.createServer(app);


initSocket(server);


const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});