const os = require('os');

// 一个字符串常量,定义操作系统相关的行末标志:
console.log("EQL" + os.EOL);

// 表明Node.js 二进制编译 所用的 操作系统CPU架构.
console.log("CPU架构:" + os.arch());

// 返回一个包含错误码,处理信号等通用的操作系统特定常量的对象. 现在, 这些特定的常量的定义被描述在OS Constants。
// console.log(os.constants);

// 方法返回一个对象数组, 包含每个逻辑 CPU 内核的信息.
// console.log(os.cpus())

// 表明Node.js二进制编译环境的字节顺序.
console.log("二进制编译环境的字节顺序:" + os.endianness())



// 以字符串的形式返回当前用户的home目录.
console.log("当前用户的home目录:" + os.homedir())

// 以字符串的形式返回操作系统的主机名.
console.log("操作系统的主机名:" + os.hostname())

// 返回一个数组,包含1, 5, 15分钟平均负载.平均负载是系统活动的测量,由操作系统计算得出,表达为一个分数. 
// 一般来说,平均负载应该理想地比系统的逻辑CPU的数目要少. 平均负载是UNIX相关的概念,在Windows平台上没有对应的概念. 在Windows上,其返回值总是[0, 0, 0].
console.log(os.loadavg())

// 返回一个对象,包含只有被赋予网络地址的网络接口.
// console.log(os.networkInterfaces())

// 返回一个字符串, 指定Node.js编译时的操作系统平台
console.log("操作系统平台:" + os.platform())

// 返回一个字符串, 指定操作系统的发行版.
console.log("操作系统的发行版:" + os.release())
// 返回一个字符串, 表明操作系统的 默认临时文件目录.
console.log("默认临时文件目录:" + os.tmpdir())

// 方法以整数的形式返回所有系统内存的字节数.
console.log("系统内存的字节数    :" + os.totalmem())
// 方法以整数的形式回空闲系统内存的字节数
console.log("空闲系统内存的字节数:" + os.freemem())

// 返回一个字符串,表明操作系统的名字, 由 uname(3) 返回.举个例子, 'Linux' 在 Linux系统上, 'Darwin' 在 macOS 系统上,'Windows_NT' 在 Windows系统上.
console.log("操作系统的名字:" + os.type())

// 方法在几秒内返回操作系统的上线时间.
console.log("操作系统的上线时间:" + os.uptime())

//对象包括 username, uid, gid, shell, 和 homedir. 在Windows系统上, uid 和 gid 域是 -1, and shell是 null
console.log(os.userInfo())

