# vcr-backend

# 羡慕强的EB dalao

## 安装依赖

npm intall

## 启动

npm run dev

## 端口修改

默认为：3030。如果修改端口修改app.js里下面这段代码。

``` js
server.listen(3030, function() {
  console.log("listening on *:3030");
});
```

## 20180224

### 博客数据关联github

1. 根据git仓库地址获取分支信息。
2. 根据git仓库地址和分支信息获取博客数据。

#### 根据git仓库地址获取分支信息

根据github提供的[API](https://developer.github.com/v3/)，我们可以获取到一个git仓库的分支信息。具体的api如下：

**List branches**：

`GET /repos/:owner/:repo/branches`

*(这里的域名为https://api.github.com/，之后不会再提)*

发送请求的库：request,[axios](https://ykloveyxk.github.io/2017/02/25/axios%E5%85%A8%E6%94%BB%E7%95%A5/)

**Get Contents**

`GET /repos/:owner/:repo/contents/:path`
