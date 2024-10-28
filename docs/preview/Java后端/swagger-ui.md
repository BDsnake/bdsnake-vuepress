---
title: swagger-ui 入门
categories: Java后端
tags:
  - Java后端
  - 开发文档
description: 摘要
cover: 'https://bd-hexo.oss-cn-beijing.aliyuncs.com/img/image-20220730183327427.png'
abbrlink: ae3eb4d2
date: 2022-07-30 15:30:16
top_img:
---

# Swagger-ui

---

# 1、Swagger简介

~~~makefile
Swagger UI允许任何人（无论您是开发团队还是最终用户）都可以可视化API资源并与之交互，而无需任何实现逻辑。它是根据您的OpenAPI（以前称为Swagger）规范自动生成的，具有可视化文档，可简化后端实现和客户端使用。
~~~

- 无依赖 UI可以在任何开发环境中使用，无论是本地还是在Web端中。
- 人性化 允许最终开发人员轻松地进行交互，并尝试API公开的每个操作，以方便使用。
- 易于浏览 归类整齐的文档可快速查找并使用资源和端点。
- 所有浏览器支持 Swagger UI 在所有主要浏览器中均可使用，以适应各种可能的情况。
- 完全可定制 通过完整的源代码访问方式以所需方式设置和调整Swagger UI。
- 完整的OAS支持 可视化Swagger 2.0或OAS 3.0中定义的API。

## 背景

**前后端分离**

Vue+Springboot

**后端时代**：前端只用管理静态页面; html==》后端。 模版引擎 JSP=>后端是主力

**前后端分离时代：**

- 后端：后端控制层、服务层、数据访问层 【后端团队】
- 前端：前端控制层、视图层 【前端团队】
  - 伪造后端数据，json。在后端开发前数据以及存在，不需要后端，前端工程师依旧能将项目跑起来。
- 前后端如何交互？ ==>API
- 前后端相对独立，松耦合；
- 前后端甚至可以部署在不同的服务器上。

**产生一个问题**

- 前后端集成联调，前端人员和后端人员无法做到 “及时协商，尽早解决”，最终导致问题集中爆发；

**解决方案**

- 首先指定schema[计划的提纲]，实时更新最新的API，降低集成的风险。
- 早些年，制定Word计划文档
- 前后端分离：
  - 前端测试后端接口使用：Postman工具。
  - 后端提供接口：需要实时更新最新改动和消息。

**==Swagger登场==**

- 号称世界上最流行的API框架。
- Restful API文档在线自动生成工具 API文档与API定义同步更新。
- 直接运行，可以在线测试API接口。
- 支持多种语言 如：Java 、PHP…

**官网：**https://swagger.io/

# 2、QuickStart

## 1、建立Springboot-web工程

略

## 2、导入Swagger依赖

```xml
<!--配置swagger-->
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger2</artifactId>
    <version>2.9.2</version>
</dependency>
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger-ui</artifactId>
    <version>2.9.2</version>
</dependency>
<dependency>
    <groupId>com.github.xiaoymin</groupId>
    <artifactId>swagger-bootstrap-ui</artifactId>
    <version>1.9.1</version>
</dependency>
```

前两个是swagger的依赖，第三个是自定义的bootstrap的ui

## 3、配置Swagger主页与扫描类

```java
@EnableSwagger2
@Configuration
public class SwaggerConfig {
    @Value("${swagger.basePackage}")
    private String basePackage;       // controller接口所在的包

    @Value("${swagger.title}")
    private String title;           // 当前文档的标题

    @Value("${swagger.description}")
    private String description;         // 当前文档的详细描述

    @Value("${swagger.version}")
    private String version;         // 当前文档的版本

    @Bean
    public Docket createRestApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage(basePackage))
                .paths(PathSelectors.any())
                .build();
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title(title)
                .description(description)
                .version(version)
                .build();
    }
}
```

```yaml
swagger:
  basePackage: com.rltest.controller
  title: BDsnake
  description: 233
  version: V1.0
```

## 4、写入接口文档

配置接口使用注解

```java
@ApiOperation(value="用户注册",notes="后端尚未写格式验证的正则表达式,默认手机验证码为1234")//接口注释
@ApiImplicitParams({//传入参数注释
        @ApiImplicitParam(name="id",value="手机号",required=true),
        @ApiImplicitParam(name="password",value="密码",required=true),
        @ApiImplicitParam(name="vCode",value="手机验证码",required=true)
})
@ApiResponses({//返回
        @ApiResponse(code = 200, message = "请求成功"),
        @ApiResponse(code = 203, message = "输入的手机号已被注册"),
        @ApiResponse(code = 500, message = "后端请求错误")
})
```

