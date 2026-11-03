import {Server} from 'socket.io';

export function init_socket(socket_io)
{
    socket_io.on('connection', socket_user_connect);
}

function socket_user_connect(user)
{
    console.log(`connection socket io ${user.id}`);

    user.on('ping_pong', function(data)
    {
        console.log(`Message reçu de ${user.id}:`, data);
        setTimeout(function()
        {
            user.emit("ping_pong", {
                texte : "PONGGG",
                computer : data.computer + 1
            });
        }, 500);
    });
    
    user.on('error', function(error)
    {
        console.log(`une erreur ses prduitre sur le socket : ${user.id}`);
        console.log(`l erreur est : ${error}`);

        user.disconnect(true);
    });

    user.on('disconnect', function(reason)
    {
        console.log(`reaison de deconnexion : ${reason}`);
    });
}

/*user.emit('message', {
    title: 'Bienvenue',
    text: 'Connexion établie avec succès !',
    timestamp: Date.now()
});*/
