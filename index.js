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
});

http.listen(port, function () {
    console.log('listening on *:' + port);
});
