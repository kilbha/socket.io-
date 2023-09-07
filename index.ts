import http from "http";
import express, { Request, Response } from "express";
import path from "path";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

//Socket.io
io.on("connection", (client) => {
  client.on("user-message", (message) => {
    io.emit("message", message);
  });
});
app.use(express.static(path.resolve("./public")));

app.get("/", (req: Request, res: Response) => {
  return res.sendFile("/public/index.html");
});
server.listen(9000, () => console.log("Server started on port 9000"));
