const http = require('http');
const hostname = '127.0.0.1';
const port = 1337;
// 创建一个 HTTP 服务器
const server = http.createServer( (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('okay');
});
server.on('upgrade', (req, socket, head) => {
  socket.write('HTTP/1.1 101 Web Socket Protocol Handshake\r\n' +
               'Upgrade: WebSocket\r\n' +
               'Connection: Upgrade\r\n' +
               '\r\n');

  socket.pipe(socket);
});

// 服务器正在运行
server.listen(port, hostname, () => {

  // 发送一个请求
  const options = {
    port: port,
    hostname: hostname,
    headers: {
      'Connection': 'Upgrade',
      'Upgrade': 'websocket'
    }
  };

  const req = http.request(options);
  req.setHeader('Content-Type', 'text/plain');
  console.log(req.getHeader('Content-Type'));
  req.end();

  req.on('upgrade', (res, socket, upgradeHead) => {

    console.log('got upgraded!');
    socket.end();
    process.exit(0);
  });
});