# 你 好

## 介绍 

使用nodejs写的后端服务器，为[资金管理系统](https://github.com/tornoda/vue-capital-management-system)提供后端数据。

## 使用技术栈

1. nodejs
2. express服务器框架
3. jsonwebtoken实现token
4. passport-jwt实现passport认证
5. mlab提供的云端数据库(MongDB)

## 实现功能

1. 用户的注册、登录
2. 路由功能
3. 处理登录信息，返回登录token信息
4. 常见接口增、删、改、查
5. 其他

## 使用方法

1. 下载本仓库内容

```
git clone git@github.com:tornoda/apiProvider-nodejs.git
```

2. 安装依赖

```
npm install 
```

3. 运行

```
npm run server
```