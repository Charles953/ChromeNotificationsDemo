function show(datas) {
    var notification = window.Notification || window.mozNotification || window.webkitNotification;
    if (notification) {
        var iconUrl = datas.iconUrl || '48.png';
        var title = datas.title || '无效的桌面提醒';
        var message = datas.message || '无通知内容';
        var contextMessage = datas.contextMessage || '';
        // var buttons = datas.buttons || [];
        var url = datas.url || '';
        // 类型为basic的通知
        if (datas.type != "2") {
            chrome.notifications.create(datas.notificationId, {
                type: 'basic', // 基本类型，默认
                iconUrl: iconUrl,
                title: title, // 桌面通知的标题
                message: message, // 主体内容，如果type设置成list，则此属性就不会显示
                contextMessage: contextMessage, // 附加通知内容，以较小的字体显示
                // buttons: buttons,
            }, function (notificationId) {
                // 返回通知的ID
            });
        } else {
            //类型为list的通知
            var items = datas.items || [{
                title: '无',
                message: '无'
            }];
            chrome.notifications.create(datas.notificationId, {
                type: "list", // 列表形式
                iconUrl: iconUrl,
                title: title, // 桌面通知的标题
                message: message, // 主体内容，如果type设置成list，则此属性就不会显示
                contextMessage: contextMessage, // 附加通知内容，以较小的字体显示
                // buttons: buttons,
                items: items
            }, function (notificationId) {
                // 返回通知的ID
            });
        }
        // 如果url不为空，则执行通知的点击事件
        if (url) {
            // 用户单击了通知中的非按钮区域，即点击正文时触发
            chrome.notifications.onClicked.addListener(function (notificationId) {
                window.open(url);
            });
        }

        // for (var i = 0; i < buttons.length; i++) {
        //     // 用户按下了通知中的一个按钮
        //     chrome.notifications.onButtonClicked.addListener(function (notificationId, buttonIndex) {
        //         window.open('http://localhost:8080');
        //     });
        // }

    }
}
// var cookies = $.cookie("Charles") || '';
// console.log(cookies)
var socket = io.connect('http://192.168.4.125:8833');
// 接收服务器传送的数据
socket.on('serverSend', function (data) {
    show(data);
});