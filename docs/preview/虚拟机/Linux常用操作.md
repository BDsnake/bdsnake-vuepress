---
title: Linux常用操作
createTime: 2024/10/28 16:11:41
permalink: /article/7xefvgip/
---


# Linux常用操作

## 常用代码

### p7Zip解压 7z文件

**安装包**
~~~shell
sudo apt-get install p7zip-full 
~~~
### 解压缩
~~~shell
cd /home/cssd     
7z x ciasv1.7z
~~~



## Vim
https://blog.csdn.net/qq_40650558/article/details/104565133
### 最常用命令


---
- _**:wq**_ 退出并保存
- _**zz**_ 退出并保存
- _**:q!**_ 强制退出
- _**:e!**_ 放弃所有修改，并打开原来文件
- _**zz**_ 保存并退出
- _**:sav(eas) new.txt**_ 另存为一个新文件，退出原文件编辑并不保存
- _**:f(ile) new.txt**_ 新开一个文件，并退出原文件的编辑且不会保存

### Vim 模式

_**1、正常模式**_：按Esc或者Ctrl+[进入 左下角显示文件名或者为空

_**2、插入模式**_：按i进入 左下角显示`--INSERT—`

_**3、可视模式**_：按v进入 左下角显示`--VISUAL—`