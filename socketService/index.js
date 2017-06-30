var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
var socketTemp;
app.post('/notification', (req, res) => {
  // 如果当前没有客户端连接，则不发送通知
  if (!socketTemp) {
    res.json({
      msg: '还没有客户端连接'
    });
    return false;
  }
  // 获取请求数据
  var data = {
    notificationId: req.body.notificationId,
    type: req.body.type,
    iconUrl: req.body.iconUrl,
    title: req.body.title,
    message: req.body.message,
    url: req.body.url,
    contextMessage: req.body.contextMessage
  };
  // 如果通知的type为list，则需要传多项目的通知
  if (req.body.type == 2) {
    var items = req.body.items;
    data.items = items;
  }
  // 返回给请求者，发送通知成功
  res.json({
    msg: 'Request success',
  });
  // 发送数据，客户端进行桌面通知
  socketTemp.emit('serverSend', data);
});

server.listen(8833, '192.168.4.125', () => {
  console.log('服务器开启成功');
});
io.on('connection', (socket) => {
  socketTemp = socket;
  console.info('conntected');
  socket.on('disconnect', (reason) => {
    console.log("close");
  });
});