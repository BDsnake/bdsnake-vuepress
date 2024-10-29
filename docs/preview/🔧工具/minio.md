---
title: minio——对象存储
categories: 工具
tags:
  - 对象存储
  - 工具
description: 摘要
abbrlink: 5400c07c
swiper_index: 1
createtime: 2023-03-01 10:30:17
cover:
top_img:
---

# minio简介

Minio 是个基于 Golang 编写的开源对象存储套件，基于Apache License v2.0开源协议，虽然轻量，却拥有着不错的性能。它兼容亚马逊S3云存储服务接口。可以很简单的和其他应用结合使用，例如 NodeJS、Redis、MySQL等

**应用场景**：

MinIO 的应用场景除了可以作为私有云的对象存储服务来使用，也可以作为云对象存储的网关层，无缝对接 Amazon S3 或者 MicroSoft Azure 。

# minio搭建

## 利用docker搭建：

### 获取镜像

```shell
docker pull minio/minio
```

### 启动镜像

```
docker run -p 9000:9000 -p 9001:9001 --name minio -d --restart=always -e "MINIO_ACCESS_KEY=admin" -e "MINIO_SECRET_KEY=admin" -v /home/data:/data -v /home/config:/root/.minio minio/minio server --console-address ":9000" --address ":9001" /data
```

命令解释如下：

- -p：9000是图形界面的端口，9001是API的端口，在使用SDK连接需要用到
- MINIO_ACCESS_KEY：指定图形界面的用户名
- MINIO_SECRET_KEY：指定图形界面的密码

用户名大于6个字符，密码大于8个字符

访问ip:9000/login 即可进入图形化界面

# 后续更新中