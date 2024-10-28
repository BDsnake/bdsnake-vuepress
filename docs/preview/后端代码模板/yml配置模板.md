---
title: yml配置模板
categories: Java后端
tags:
  - Java后端
  - 开发模板
description: 摘要
cover: /top_img/yml.png
abbrlink: 8b115371
date: 2022-07-25 20:30:16
top_img:
---

```yaml
spring:
  datasource:
    username: root
    password: xxxxxx
    #?serverTimezone=UTC解决时区的报错
    url: jdbc:mysql://localhost:3306/yourschema?serverTimezone=UTC%2B8&useUnicode=true&characterEncoding=utf-8
    driver-class-name: com.mysql.cj.jdbc.Driver
  servlet:
    multipart:
      enabled: true
      max-file-size: 100MB
      max-request-size: 101MB
server:
  port: 8081
```

UTC%2B8

是东八区

MybatisPlus

~~~
spring:
  datasource:
    username: root
    password: xxxxxx
    #?serverTimezone=UTC解决时区的报错
    url: jdbc:mysql://localhost:3306/mybatis_plus?serverTimezone=UTC%2B8&useUnicode=true&characterEncoding=utf-8
    driver-class-name: com.mysql.cj.jdbc.Driver
  servlet:
    multipart:
      enabled: true
      max-file-size: 100MB
      max-request-size: 101MB
server:
  port: 8081
mybatis-plus:
  configuration:
#    日志
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
~~~



