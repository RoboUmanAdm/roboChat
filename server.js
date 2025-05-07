const http = require('http');
const fs = require('fs');
const path = require('path');


const pathToIndex = path.join(__dirname,'static','index.html');
const indexHtmlFile = fs.readFileSync(pathToIndex);

const server = http.createServer((req, res)=> {
    if(req.url === '/'){
        return res.end(indexHtmlFile);
    }
    res.statusCode = 404;
    return res.end('Error 404 try egan leter');
});



const {Server} = require("socket.io");
const io = new Server(server);
io.on('connection', (socket)=> {
    console.log('user has connected. id - ' + socket.id);
});
socket.on('new_message', (message)=> {
    io.emit('message', message);
    console.log(message);
});

server.listen(3000);