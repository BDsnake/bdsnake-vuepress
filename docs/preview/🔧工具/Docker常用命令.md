---
Title: docker常用命令
Categories: Docker
Tags:
- Docker
date: 2024-10-19 15:30:16
---
# Docker常用命令

普通开发者学会咋用就行了

## 1 镜像相关

### 1.1 查看镜像列表

```bash
sudo docker images
```

### 1.2 镜像搜索

比如搜索 ubuntu 基础镜像

```bash
sudo docker search ubuntu
```

### 1.3 下拉镜像

```bash
sudo docker pull 镜像名sudo docker pull 镜像名:Tag
```

### 1.4 删除镜像

```bash
sudo docker rmi -f 镜像名/镜像ID
# 删除全部
sudo docker rmi -f $(docker images -aq)
```

### 1.5 保存镜像

将我们的镜像 保存为tar 压缩文件 这样方便镜像转移和保存 ,然后 可以在任何一台安装了docker的服务器上 加载这个镜像

```bash
docker save 镜像名/镜像ID -o 镜像保存在哪个位置与名字
```

### 1.6 加载镜像

任何装 docker 的地方加载镜像保存文件,使其恢复为一个镜像

```bash
docker load -i 镜像保存文件位置
```

## 2 容器相关

### 2.1 容器列表

```bash
sudo docker pssudo docker ps -a # 查看所有容器 -----包含正在运行 和已停止的
```

### 2.2 创建容器

```bash
docker run -it -d --name 要取的别名 -p 宿主机端口:容器端口 -v 宿主机文件存储位置:容器内文件位置 镜像名:Tag /bin/bash 
```

参数含义：

> - -it 表示 与容器进行交互式启动
> - -d 表示可后台运行容器 （守护式运行）  
> - --name 给要运行的容器 起的名字  
> - /bin/bash  交互路径
> - -p 将容器的端口映射到宿主机上，通过宿主机访问内部端口
> - -v 将容器内的指定文件夹挂载到宿主机对应位置

### 2.3 停止容器

```bash
sudo docker stop 容器名/容器ID
```

### 2.4 删除容器

```bash
#删除一个容器
docker rm -f 容器名/容器ID
#删除多个容器 空格隔开要删除的容器名或容器ID
docker rm -f 容器名/容器ID 容器名/容器ID 容器名/容器ID
#删除全部容器
docker rm -f $(docker ps -aq)
```

### 2.5 进入容器

进入正在运行中的容器

```shell
sudo docker attach 容器ID/容器名
```

### 2.6 在 Ubuntu 环境下打包 Docker 容器

首先，使用  docker save 命令将 Docker 容器打包成 tar 文件，例如：

```shell
docker save -o container.tar container-image:tag
```

其中， container-image:tag 是要打包的 Docker 容器的名称和标签， -o 参数指定输出文件名为  container.tar 。然后，将打包好的 tar 文件传输到目标服务器。

### 2.7 在目标服务器上离线安装 Docker 容器

首先，使用  docker load 命令加载 tar 文件，例如：

```css
docker load -i container.tar
```

然后，使用 docker run 命令运行容器，例如：

~~~shell
docker run -d --name container-name -p host-port:container-port container-image:tag
~~~

其中， container-name 是容器的名称， host-port 是主机端口， container-port  是容器端口， container-image:tag  是容器的名称和标签。
## 3 DockerFile


使用DockerFile生成镜像
~~~shell
docker build -t name:tag
~~~


## 日志

https://blog.csdn.net/qq_36826506/article/details/117946775