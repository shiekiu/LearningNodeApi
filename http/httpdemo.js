const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  // 控制响应头刷新时将被发送到客户端的状态码。
  res.statusCode = 200;

  // 该属性控制响应头刷新时将被发送到客户端的状态信息。
  res.statusMessage = 'OK';
  console.log(res.statusMessage)

  // 为一个隐式的响应头设置值。 如果该响应头已存在，则值会被覆盖。 如果要发送多个名称相同的响应头，则使用字符串数组
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Foo', 'bar');
  res.setHeader('Set-Cookie', ['foo=bar', 'bar=baz']);
  res.setHeader('test', '1');

  // 从隐式发送的队列中移除一个响应头。
  res.removeHeader('test');

  // 返回当前响应头文件的浅拷贝。 由于使用了浅拷贝，因此数组值可能会改变，无需对各种与响应头相关的http模块方法进行额外调用。 返回对象的键是响应头名称，值是各自的响应头值。 所有响应头名称都是小写的。
  console.log("Response GetHeader:" + res.getHeader('Set-Cookie'))

  // 返回一个包含当前响应唯一名称的 http 头信息名称数组. 名称均为小写.
  console.log("Response GetHeaderNames:" + res.getHeaderNames())

  // 返回当前响应头文件的浅拷贝。 由于使用了浅拷贝，因此数组值可能会改变，无需对各种与响应头相关的http模块方法进行额外调用。 返回对象的键是响应头名称，值是各自的响应头值。 所有响应头名称都是小写的。
  console.log(res.getHeaders())

  // 如果响应头当前有设置 name 头部，返回 true。请注意，名称匹配不区分大小写。
  console.log('Response HasHeader content-type:' + res.hasHeader('content-type'))
  console.log('Response HasHeader test:' + res.hasHeader('test'))

  // 返回一个布尔值（只读）。 如果响应头已被发送则为 true，否则为 false。
  console.log('响应头是否被发送:' + res.headersSent);

  res.end('Hello World\n');
});
server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
  });
server.listen(port, hostname, () => {
    const options = {
        // protocol: 'http', // 使用的协议。默认为 http:。
        host: 'nodejs.cn', // 请求发送至的服务器的域名或 IP 地址。默认为 localhost
        hostname: 'nodejs.cn', // host 的别名。为了支持 url.parse()，hostname 优先于 host。
        family:  4,  //当解析 host 和 hostname 时使用的 IP 地址族。 有效值是 4 或 6。当未指定时，则同时使用 IP v4 和 v6。
        port: 80, // 远程服务器的端口。默认为 80。
        //localAddress: '', //为网络连接绑定的本地接口。
        //socketPath:  '', // Unix 域 Socket（使用 host:port 或 socketPath）。
        method: 'GET', // 指定 HTTP 请求方法的字符串。默认为 'GET'。
        //path:  '/', // 请求的路径。默认为 '/'。 应包括查询字符串（如有的话）。如 '/index.html?page=12'。 当请求的路径中包含非法字符时，会抛出异常。 目前只有空字符会被拒绝，但未来可能会变化。
        headers:  {
          'Connection': 'Upgrade',
          'Upgrade': 'websocket'
        }, //包含请求头的对象。
        // auth:  <string> 基本身份验证，如 'user:password' 用来计算 Authorization 请求头。
        // agent:  <http.Agent> | <boolean> 控制 Agent 的行为。 可能的值有：undefined (默认): 对该主机和端口使用 http.globalAgent。Agent 对象：显式地使用传入的 Agent。false: 创建一个新的使用默认值的 Agent。
        // createConnection <Function> 当不使用 agent 选项时，为请求创建一个 socket 或流。 这可以用于避免仅仅创建一个自定义的 Agent 类来覆盖默认的 createConnection 函数。详见 agent.createConnection()。
        timeout : 5000 // 指定 socket 超时的毫秒数。 它设置了 socket 等待连接的超时时间。
      };
    const req = http.request(options);
    // setHeader
    req.setHeader('Content-Type', 'application/json');
    // getHeader
    console.log('Request GetHeader Content-Type:' + req.getHeader('Content-Type'));
    // removeHeader
    req.removeHeader('Content-Type');
    console.log('Request RemoveHeader Content-Type:' + req.getHeader('Content-Type'));
    // 刷新请求头。
    req.flushHeaders();

    req.end();
    req.once('response', (res) => {
        const ip = req.socket.localAddress;
        const port = req.socket.localPort;
        console.log(`你的IP地址是 ${ip}，你的源端口是 ${port}。`);
        // consume response object
        // 标记请求为终止。 调用该方法将使响应中剩余的数据被丢弃且 socket 被销毁。
        req.abort();
        // 如果请求已被终止，则该属性的值为请求被终止的时间，从 1 January 1970 00:00:00 UTC 到现在的毫秒数。
        console.log("从 1970-01-01 00:00:00 UTC 到现在的毫秒数:" + req.aborted);
      });
    // 返回一个布尔值，表示服务器是否正在监听连接。
    console.log("服务器是否正在监听连接:" + server.listening);
    // 限制请求头的最大数量，默认为 2000。 如果设为 0，则没有限制。
    server.maxHeadersCount = 10;
    console.log("请求头的最大数量:" + server.maxHeadersCount);
    // 超时时间，以毫秒为单位。默认为 120000 (2 分钟)。
    server.timeout = 60000;
    console.log("超时时间 timeout:" + server.timeout);

    // 超时毫秒. 默认为 5000 (5秒)
    server.keepAliveTimeout = 1000;
    console.log("超时时间 keepAliveTimeout:" + server.keepAliveTimeout);

    console.log(`Server running at http://${hostname}:${port}/`);
});