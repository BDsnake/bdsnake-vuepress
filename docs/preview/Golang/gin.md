---
title: Gin框架
categories: Golang
tags:
  - Golang
  - Gin
abbrlink: 6d104c29
date: 2023-08-31 15:30:16
---

参考网站：

https://docs.fengfengzhidao.com/

# Gin框架

## Gin安装

~~~shell
go get -u github.com/gin-gonic/gin
~~~

查看go.mod以确认依赖已安装

## 入门程序

8080/index 示例

~~~go
package main

import "github.com/gin-gonic/gin"

func main() {
	//创建一个默认的路由
	router := gin.Default()
	//绑定路由规则和路由函数，访问/index的路由将有对应的函数处理
	router.GET("/index", func(context *gin.Context) {
		context.String(200, "hello world")
	})
	//启动监听
	router.Run(":8080")
}
 
~~~

两种启动方式

~~~go
// 启动方式一
router.Run(":8000")
// 启动方式二
http.ListenAndServe(":8000", router)

~~~

router.Run的本质就是http.ListenAndServe

## 响应

### 返回json,xml.yaml

~~~go
package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

// 响应string
func _string(context *gin.Context) {
	context.String(http.StatusOK, "hello")
}

// 响应json
func _json(context *gin.Context) {
	//json响应结构体
	//type UserInfo struct {
	//	UserName string `json:"user_name"`
	//	Age      int    `json:"age"`
	//	Password string `json:"-"` //忽略转换为json
	//}
	//userInfo := UserInfo{
	//	UserName: "swa",
	//	Age:      18,
	//}
	//context.JSON(http.StatusOK, userInfo)

	//json响应map
	userInfoMap := map[string]string{
		"username": "swa",
		"age":      "18",
	}
	context.JSON(http.StatusOK, userInfoMap)

	//直接响应json
	//context.JSON(http.StatusOK,gin.H{"username":"swa","age":18})

}

// 响应yaml
func _yaml(c *gin.Context) {
	c.YAML(http.StatusOK, gin.H{"user": "swa", "message": "hey", "status": http.StatusOK})
}

// 响应xml
func _xml(c *gin.Context) {
	c.XML(http.StatusOK, gin.H{"user": "swa", "message": "hey", "status": http.StatusOK})
}
func main() {
	router := gin.Default()
	router.GET("/string", _string)
	router.GET("/json", _json)
	router.GET("/yaml", _yaml)
	router.GET("/xml", _xml)
	router.Run(":8080")
}

~~~

## gin路由

gin路由的原理：前缀树

`Gin` 的路由支持 `GET` , `POST` , `PUT` , `DELETE` , `PATCH` , `HEAD` , `OPTIONS` 请求，同时还有一个 `Any` 函数，可以同时支持以上的所有请求。

~~~java
// 省略其他代码
     // 添加 Get 请求路由
     router.GET("/", func(context *gin.Context) {
         context.String(http.StatusOK, "hello gin get method")
     })
     // 添加 Post 请求路由
     router.POST("/", func(context *gin.Context) {
         context.String(http.StatusOK, "hello gin post method")
     })
     // 添加 Put 请求路由 
     router.PUT("/", func(context *gin.Context) {
         context.String(http.StatusOK, "hello gin put method")
     })
     // 添加 Delete 请求路由
     router.DELETE("/", func(context *gin.Context) {
         context.String(http.StatusOK, "hello gin delete method")
     })
     // 添加 Patch 请求路由
     router.PATCH("/", func(context *gin.Context) {
         context.String(http.StatusOK, "hello gin patch method")
     })
     // 添加 Head 请求路由
     router.HEAD("/", func(context *gin.Context) {
         context.String(http.StatusOK, "hello gin head method")
     })
     // 添加 Options 请求路由
     router.OPTIONS("/", func(context *gin.Context) {
         context.String(http.StatusOK, "hello gin options method")
     })
 // 省略其他代码
~~~

此处示例中，前者为路由路径，后者为Handler
