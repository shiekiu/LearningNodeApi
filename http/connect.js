const http = require('http');
const net = require('net');
const url = require('url');

const hostname = '127.0.0.1';
const port = 1337;

// 创建一个 HTTP 代理服务器
const proxy = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

proxy.on('connect', (req, cltSocket, head) => {
  // 连接到一个服务器
  const srvUrl = url.parse(`http://${req.url}`);
  const srvSocket = net.connect(srvUrl.port, srvUrl.hostname, () => {
    cltSocket.write('HTTP/1.1 200 Connection Established\r\n' +
                    'Proxy-agent: Node.js-Proxy\r\n' +
                    '\r\n');
    srvSocket.write(head);
    srvSocket.pipe(cltSocket);
    cltSocket.pipe(srvSocket);
  });
});

// 代理服务器正在运行
proxy.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  // 发送一个请求到代理服务器
  const options = {
    port: port,
    hostname: hostname,
    method: 'CONNECT',
    path: 'www.baidu.com:80'
  };

  const req = http.request(options);
  req.end();

  req.on('connect', (res, socket, head) => {
    console.log('已连接！');

    // 通过代理服务器发送一个请求
    socket.write('GET / HTTP/1.1\r\n' +
                 'Host: www.baidu.com:80\r\n' +
                 'Connection: close\r\n' +
                 '\r\n');
    socket.on('data', (chunk) => {
      console.log(chunk.toString());
    });
    socket.on('end', () => {
      proxy.close();
    });
  });
});