## 学习NodeAPI接口

看了KOA VUE 各种框架，虽然可以拿来主义，但是仍然感觉应该好好打好node基础。

### OS

目录OS 的 js主要可以获取操作系统的各种信息

### HTTP 

目录HTTP 的 js主要可以包含用的最多的 request 和 response

### Module 

目录module 的 主要便于理解node的各种模块组合使用
笔记：模块在第一次加载后会被缓存。 这也意味着（类似其他缓存机制）如果每次调用 require('foo') 都解析到同一文件，则返回相同的对象。多次调用 require(foo) 不会导致模块的代码被执行多次。 这是一个重要的特性。
