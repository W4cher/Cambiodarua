// socket.ts
import { io, Socket } from "socket.io-client";

let socket: Socket;

export const connectSocket = (token: string) => {
  socket = io("http://localhost:5000", {
    extraHeaders: {
      access_token: token, // sent in handshake for auth
    },
  });

  return socket;
};

export const getSocket = (): Socket => socket;
