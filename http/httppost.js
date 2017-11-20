var http = require('http')
var querystring = require('querystring')

var postdata = querystring.stringify({
    '参数1':'test',
    '参数2':''
})
var options = {
    hostname:'网站域名',
    port:80,
    path: '/网站路径',
    method: 'POST',
    headers:{
        'Connection':'keep-alive',
        'Content-Length':postdata.length,
    }
}

var req = http.request(options,function(res){
    console.log('statusCode:'+ res.statusCode)
    console.log('headers:'+JSON.stringify(res.headers))
    res.on('data',function(chunk){
        console.log(Buffer.isBuffer(chunk))
        console.log(typeof chunk)
    })
    res.on('end',function(){
        console.log('ok')
    })
})    
req.on('error',function(e){
    console.log('Error:'+ e.message)
})
req.write(postdata)
req.end
