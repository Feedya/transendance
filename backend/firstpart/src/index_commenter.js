import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'node:http';

//-------------------------------------------------------
import {Server} from 'socket.io';
//on va prendre que la classe Server de socket.io 
//-------------------------------------------------------

//dans import si je ne met pas de .. ou de / le js
//sait qu il doit chercher dans le dossier node_modules

//-------------------------------------------------------
//jje charge mes variables d env depuis notre fichier .env.example
//la fonction attend un objet en parametre
//du coup on lui fait passer un objet qui a une seule valeur et qui est le path : 'env.example'
//du coup on peut faire passer les valeurs dans n importe queelle ordre
//parceque la fonction va utiliser l objet
dotenv.config({path : '.env.example'});
//-------------------------------------------------------


//-------------------------------------------------------
//creation de l objet central
// il va recervoir les routes API et les traiter
const app = express();
//-------------------------------------------------------

//-------------------------------------------------------
//app.use : va brancher cors sur express
//mtn chaque requette qui passe va passer par cors
//
//
//origin : process.env.CLIENT_URL,
//
//ca va injecter dans l en tete HTTP le URL
//et le navigateur va savoir qu il peut laisser react
//a lire les reponses API
//
//credentials: true
//
//autorise l envoie des cookies
app.use(cors({
    origin : process.env.CLIENT_URL,
    credentials: true
}));
//-------------------------------------------------------

//-------------------------------------------------------
//encapsulation de express dans un serveur HTTP
const server = http.createServer(app);
//-------------------------------------------------------


//-------------------------------------------------------
//notre main
async function main()
{
  console.log("dans main");
	
	const PORT = process.env.PORT;

	//-------------------------------------------------------
	//creation du serveur de socket.io
	//
	//le deuxieme arguments qui est dans des {}
	//est un objet literal (cle : valeur)
	//et on a 2 objet comme ca imbrique 
	const socker_server = new Server(server, {
		cors: {
			origin: process.env.CLIENT_URL,
			methods: ["GET", "POST"],
			credentials: true
		}
	});
//-------------------------------------------------------
	
	//on met le serveur a l ecoute du port
	//
	//
	//on va faire appeler la classe Promesse qui va nous donner 2 fonciton, resolve et reject
	//on doit appeler resole si tout ces bien passer et reject si on a eu une erreur
	try
	{
		await new Promise((resolve, reject) => {
		server.listen(PORT, resolve);
		//once, attend qu un evenemnts se declanche
		//ici il attend que l evenements 'error' se declanche
		//si il se declanche on va appeler reject qui est une fonction
		//des que listen a appeler resolve
		//le once va arreter d attendre l 'erreur'
		server.once('error', reject);
	});
	console.log("Le serveur a bien starter sur le PORT ${PORT}")
	}
	catch(err)
	{
		console.log("Erreur de listen");
		throw (err);
	}


}
//-------------------------------------------------------


//-------------------------------------------------------
//catch va catch ma promesse de main
//une promesse a 2 cas
//resolve (reussis)
//reject (pas reussis)

//catch est une methode des fonctions promessse (async)
//catch va juste  attraper le reject
//mais il ne sait pas quoi faire avec
//du coup il faut donner une fonction a catch pour qu il comprend quoi faire
//dans le cas ou il s allume
main().catch((err) =>
{
  console.error("Erreur fatale :", err);
  process.exit(1); // En environnement Node.js
});
//-------------------------------------------------------
