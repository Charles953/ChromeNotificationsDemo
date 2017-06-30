function show(data) {
    new Notification(data.msg, {
        icon: '48.png',
        body: data.msg
    });
}
chrome.runtime.onConnect.addListener(function (port) {
    console.assert(port.name == "charles");
    var cookies = JSON.parse($.cookie("Charles")) || '';
    console.log(cookies)
    if (cookies) {
        port.postMessage({
            cookies: cookies
        });
    }
    var socket = io.connect('http://192.168.4.125:8833');
    socket.on('news', function (data) {
        socket.emit('username', {
            username: cookies
        });
    });
    socket.on('typing', function (data) {
        if (window.Notification) {
            show(data);
        }
    });
    socket.on('serverSend', function(data) {
        console.log(data);
    });
    setTimeout(() => socket.disconnect(true), 5000);
    // port.onMessage.addListener(function (req) {
    //     if (req.msg == "abc") {
    //         document.getElementById("hi").innerHTML = req.msg;
    //         port.postMessage({
    //             msg: "Hi Charles"
    //         });
    //     } else {
    //         document.getElementById("hi").innerHTML = "Say what?";
    //         port.postMessage({
    //             msg: "I don't know what are you talking about"
    //         });
    //     }
    // });
});