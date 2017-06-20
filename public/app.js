var socket = io();

var vm = new Vue({
    el: "#dashboard",
    data: {
        selected: '',
        servers: [
            {
                'lastUpdate': 22222222222220,
                'name': 'Example',
                'ip': '129.123.3.123',
                'running': true,
                'info': {
                    'Follower': 200,
                    'Images': 80
                }
            }
        ],
        logs: {
            '129.123.3.123': ['bla bla bal', 'bla bal bla '],
            '129.123.3.122': ['bla bla basdfal', 'asdf asdf bla ', 'bla blasdfa bal', 'bla baasdfasdfl bla ']
        }
    }
});

socket.on('update', function (data) {
    data.lastUpdate = Date.now();
    vm.servers.push(data);
});


setInterval(function () {
    // check if servers are running
    for (var i = 0; i < vm.servers.length; i++) {
        var server = vm.servers[i];
        var timediff = (Date.now() - server.lastUpdate);
        vm.servers[i].running = timediff < timemargine_in_milsec;
    }
}, 10000);
