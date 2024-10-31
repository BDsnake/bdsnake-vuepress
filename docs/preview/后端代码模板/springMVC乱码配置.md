---
title: springMVC乱码配置
createTime: 2024/10/28 16:11:26
permalink: /article/u8ljjupa/
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

