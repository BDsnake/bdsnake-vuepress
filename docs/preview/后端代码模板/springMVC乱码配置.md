---
title: SpringMVC乱码配置
categories: Java后端
tags:
  - Java后端
  - SpringMVC
description: 摘要
cover: /top_img/spring.png
abbrlink: 9a16b6d
createtime: 2022-07-25 20:46:16
top_img:
---

# SpringMVC返回json乱码

~~~xml
<!--JSON乱码问题配置，配置到springmvc-serv-->
    <mvc:annotation-driven>
        <mvc:message-converters register-defaults="true">
            <bean class="org.springframework.http.converter.StringHttpMessageConverter">
                <property name="supportedMediaTypes">
                    <list>
                        <value>text/html;charset=UTF-8</value>
                        <value>application/json;charset=UTF-8</value>
                        <value>*/*;charset=UTF-8</value>
                    </list>

                </property>
            </bean>

        </mvc:message-converters>
    </mvc:annotation-driven>
~~~

