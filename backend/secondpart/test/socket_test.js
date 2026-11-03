import { io } from "socket.io-client";
import dotenv from "dotenv";

dotenv.config({ path: ".env.example" });

const socket = io("http://localhost:5000", {
    withCredentials: true,
    extraHeaders: {
        Origin: process.env.CLIENT_URL || "http://localhost:3000"
    }
});

/*
socket.on("connect", function()
{
    console.log("premiere connextion on va envoyer le signal ping pong");
    socket.emit("ping_pong", {
        texte : "PING1",
        computer : 1
    })
})*/

socket.on("connect", function()
{
    console.log("premier connection au serveur");
    socket.emit("error", "erreur test");
})

socket.on("ping_pong", function(data)
{
    console.log(`pong_ping ${socket}`, data);

    setTimeout(function () {
        socket.emit("ping_pong", {
            texte : "PINGGGGG",
            computer : data.computer + 1
        });
    }, 500
    );
});
