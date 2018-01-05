# 聊天室后端设计

## 聊天室通信设计

### 用户进入聊天室

* eventName: {String} userEnter
* payLoad: {Object} 

``` JSON
{
    username: 'String',
    date: 'Date String'
}
```

### 用户离开聊天室

* eventName: {String} userLeave
* payLoad: {Object}

``` JSON
{
    username: 'String',
    date: 'Date String'
}
```

### 用户发送信息

* eventName: {String} sendMsg
* payLoad: {Object}

``` JSON
{
    author: 'String',
    authorId: 'id',
    message: 'Text String | Image String',
    messageId: 'id'
    headPic: 'Image String',
    date: 'Date String',
    style: 'Style String',
}
```

## Chat Object

* 在线人数
* 聊天室内人数
* 在线人

``` js
const Chat = {
    onlineCounts: 0,
    onlineMen: []
}
```