import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'node:http';
import {Server} from 'socket.io';



dotenv.config({path : '.env.example'});

const app = express();

app.use(cors({
    origin : process.env.CLIENT_URL,
    credentials: true
}));

const server = http.createServer(app);

async function main()
{
	const PORT = process.env.PORT || 5000;
	const socket_server = new Server(server, {
		cors: {
			origin: process.env.CLIENT_URL,
			methods: ["GET", "POST"],
			credentials: true
		}
	});
	
	try {
	await new Promise((resolve, reject) => {
		server.listen(PORT, resolve);
		server.once('error', reject);
	});
	console.log('Le serveur ces lancer sur le PORT ${PORT}');
	}
	catch (err)
	{
		console.log("Erreur de listen", err.message);
		throw (err);
	}


  console.log("dans main");
}

main().catch((err) =>
{
  console.error("Erreur fatale :", err);
  process.exit(1);
});

