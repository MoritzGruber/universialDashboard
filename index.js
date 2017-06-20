var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.use("/", express.static(__dirname + '/public'));

io.on('connection', function (socket) {
    socket.on('update', function (data, key) {
        if (typeof key === 'string' || key instanceof String){
            if (key == 'clubmate123'){
                io.emit('update', data);
            }
        }
    });

    setInterval(function () {
        // check if servers are running

        var username = 'motasar2day';
        socket.emit('getStatistics', username, function (error, message) {
            console.log("e: "+error);
            console.log("m: "+message);
        });

        var topic = 'cat';
        var maxpp = 3;
        var maxtotal = 6;
        socket.emit('getComments', topic, maxpp, maxtotal, function (error, message) {
            console.log("e: "+error);
            console.log("m: "+message);
        });
    }, 3000);


    var clientSocket = socket.on('remoteExec', function (data, key) {
        socket.emit('remoteExec', data);
    });
    socket.on('jobDone', function (response) {
        clientSocket.emit('jobDone', response);
    });
});

http.listen(port, function () {
    console.log('listening on *:' + port);
});
