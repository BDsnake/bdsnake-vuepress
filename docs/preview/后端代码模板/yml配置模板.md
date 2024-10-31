---
title: yml配置模板
createTime: 2024/10/28 16:11:26
permalink: /article/vr44mblf/
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



