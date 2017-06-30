# 关于Chrome桌面通知的说明

**在安装扩展程序之前，请把桌面通知打开**
##### 步骤：chrome菜单-->设置-->显示高级设置-->内容设置-->允许所有网站显示桌面通知

概述：此桌面通知功能主要是通过谷歌扩展程序实现的，即在谷歌程序中安装这个扩展程序就立即执行，并通过websocket与nodejs服务器端进行双向通讯。会提供接口给第三方进行调用，第三方调用相应的接口，则通过服务器向客户端反馈，并进行桌面通知。

**注：使用此demo时，socket的域名需进行修改**

**附：谷歌插件notifications说明文档**
https://crxdoc-zh.appspot.com/extensions/notifications#type-NotificationOptions


#### 目录
> * 基于type为base的通知
> * 基于type为list的通知
> * 事件
> * 接口提供

------


#### **基于type为base的通知**

```javascript
chrome.notifications.create('notificationId', {
    type: "basic", 
    iconUrl: "48.png",
    title: "桌面通知title",
    message: "Hello world", 
    contextMessage: 'charles',
    }, function (notificationId) {
        // 返回通知的ID
});
```
##### **参数**
    1、String notificationId 通知的标识符ID（必选）
    2、Object options
        String type 通知类型（必选）
        String iconUrl 图片地址（选填）
        String title 桌面通知的标题（必选）
        String message 主体内容 （必选）
        String contextMessage 附加通知内容 （选填）
    3、Function callback返回的是通知的ID （选填）

-----

#### **基于type为list的通知**

```javascript
chrome.notifications.create('notificationId', {
    type: "list",
    iconUrl: "48.png",
    title: "桌面通知title",
    message: "Hello world", // 主体内容，如果type设置成list，则此属性就不会显示
    contextMessage: 'charles',
    // 多项目通知的项目，类型设置成list时执行，每一个对象的属性
    // string title 通知列表中某个项目的标题。
    // string message 该项目的额外详情。
    items: [{
            title: "1.",
            message: "下班了"
        },
        {
            title: "2.",
            message: "吃饭了."
        },
        {
            title: "3.",
            message: "中奖了."
        }]
    }, function (notificationId) {
        // 返回通知的ID
});
```

##### **参数**
    1、String notificationId 通知的标识符ID（必选）
    2、Object options
        String type 通知类型（必选）
        String iconUrl 图片地址（选填）
        String title 桌面通知的标题（必选）
        String message 主体内容 （必选）
        Array items 多项目通知的项目，对象属性title、message（必选）
        String contextMessage 附加通知内容 （选填）
    3、Function callback返回的是通知的ID （选填）
    
-----

#### **事件**

```javascript
// 用户单击了通知中的非按钮区域，即点击正文时触发
chrome.notifications.onClicked.addListener(function (string notificationId) {
   //doSomething
});
```
**如果通知中需要用户进行点击跳转或者其他操作的，则服务器端需要传递一个跳转的url或者操作数据**

-----

#### 以上提到的三点，需要从服务器端必须传递的数据主要有：

##### 如果type为base
> * notificationId 通知标识符ID
> * type=base（通知类型）
> * title（桌面通知的主体）
> * message（主体内容）

##### 如果type为list
> * notificationId 通知标识符ID
> * type=list（通知类型）
> * title（桌面通知的主体）
> * message（主体内容）
> * items（多项目通知的项目）

如果涉及到页面跳转的，则需要多传递一个连接，通过桌面通知的点击事件进行跳转到相应的页面

-----

#### **接口**

> 192.168.2.145:8833/notification，该接口为post请求

##### **参数**

    1、String notificationId 通知标识符ID（必选）

    2、Number type（1为base，2为list，必选）
    
    3、String iconUrl（外部链接的图片地址，选填）
    
    4、String message（主体内容，必选）

    5、String url（点击主体内容后的跳转地址，选填）
    
    6、Array items 多项目通知的项目 （必选）
        如果type设置为base，此参数不需要提供
        如果type设置为list，则需要必须提供此参数，message主体内容不显示

    7、String contextMessage（附加通知内容，选填）
    
作者 [@Charles][1]     
2017 年 6 月 30 日


[1]: https://github.com/charles953

