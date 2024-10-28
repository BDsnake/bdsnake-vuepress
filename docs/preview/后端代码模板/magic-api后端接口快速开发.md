---
title: magic-api后端接口快速开发
categories: Java后端
tags:
  - Java后端
  - 开发模板
description: 摘要
cover: 'https://w.wallhaven.cc/full/7p/wallhaven-7p39gy.png'
abbrlink: ce5dde90
date: 2022-01-08 16:43:16
top_img:
---

# 前言

推荐查看官方文档，本文章仅记录快速开发的步骤

文档：https://www.ssssssss.org/magic-api/pages/quick/intro/

# QuickStart

## 初始化工程

创建一个maven项目

## 添加依赖

引入`Spring Boot Starter`父工程：

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.0.1</version>
    <relativePath/>
</parent>
```

 引入`magic-api-spring-boot-starter`依赖。

```xml
<dependency>
    <groupId>org.ssssssss</groupId>
    <artifactId>magic-api-spring-boot-starter</artifactId>
    <version>2.0.2</version>
</dependency>
```

 引入`spring-boot-starter`,`spring-boot-starter-web`, `spring-boot-starter-test`, `mysql`依赖。

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jdbc</artifactId>
</dependency>
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.27</version>
</dependency>
```

## 配置

```properties
server:
  port: 9999
magic-api:
  #配置web页面入口
  web: /magic/web
  resource:
  	#配置文件存储位置。当以classpath开头时，为只读模式
    #mac用户请改为可读写的目录
    #如果不想存到文件中，可以参考配置将接口信息存到数据库、Redis中（或自定义）
    location: D:/data/magic-api

spring:
  datasource:
    driver-class-name: com.mysql.jdbc.Driver
    url: jdbc:mysql://localhost:3306/magic-api-test?allowMultiQueries=true&useUnicode=true&characterEncoding=UTF-8
    username: root
    password: test
```

## 访问api管理页面

创建主启动类

启动项目之后，访问`http://localhost:9999/magic/web` 即可看到Web页面
