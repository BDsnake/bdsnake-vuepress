---
title: CSS速查
createTime: 2024/10/28 16:11:35
permalink: /article/ntp7rk0m/
---


## 一．什么是css？

CSS（Cascading Style Sheets）层叠样式表，专注于页面的表现层。

## 二．CSS引入方式

1.行内样式

在开始标签上加style=”样式属性名1:样式属性值1;样式属性名2:样式属性值2;...” 属性

1. 内嵌式

把所有的css样式都写在<style></style>标签内，<style></style>放在head标签内

1. 外链式

把所有的css样式均放在一个css单独的文件里（后缀名xx.css）,在html里通过<link rel=”stylesheet” href=”css文件路径” />来引入外部的css。

优先级：

行内最大，其次 谁离标签近，谁的优先级高（最晚优先级最高）

## **三.选择器**

1. 通配符选择器  选择所有的元素  0.5

 *{}

1. 标签选择器    1

 标签名{}  例如：p{}

1. 类选择器     10

 **.**类值{}    例如：.content{}

拓展： 选择器.类值{}  div.box{} 类叫box的div元素

1. id选择器     100

 \#id值{}   例如：#con{}

1. 包含选择器（后代选择器）   权重相加

选择器a 选择器b{}    选择器a里的所有选择器b  选择器b只要被选择器a包着

.box div{}  类box里的所有div元素

扩展：

选择器直接子元素

选择器a>选择器b{}  选择器a里的所有直接选择器b   父子关系

.box>span{}  类box里的所有直接子元素span

1. 分组选择器

选择器1**,**选择器2**,**....{}

选择器权重：

行内样式 > id选择器 > 类选择器 > 标签选择器 > 通配符选择器

## 四．字体样式

1. **font-family  字体系列例如：font-famiy:”宋体”,”微软雅黑”,...**

2. **font-size   字体大小**

3. **font-style   字体风格**

   normal  默认 不倾斜

   italic   斜体

   oblique  倾斜

4. **font-weight**   字体粗细

   bold   粗体

   bolder   更粗体

   lighter   细体

   100-900  数值越大，字体越粗

5. **line-height**   行高

   值：

   1）数值+单位

---

缩写：

font : font-style值  font-weight值  font-size值/line-height值  font-family值

## 五．文本样式

1. **text-decoration**  文本修饰值：

   1）none   无修饰

   2）underline 下划线

   3）line-through  中划线

   4）overline   上划线

---

**text-align**    文本对齐方式

值：

​	1）left   默认  左对齐

​	2)center   居中对齐

​	3)right    右对齐

​	4)justify   两端对齐

​	5)text-indent   文本缩进

值：数值+单位（px或em） 为正数时，缩进；为负数时，悬挂

---

3.**text-transform**  文本大小写转换

​	uppercase  全大写

​	lowercase  全小写

​	capitalize  首字母大写

---

4.**text-overflow**   文本溢出处理

值：1）**ellipsis**   文本溢出以省略号显示

1. .....

文本溢出以省略号显示

overflow:hidden;

text-overflow:ellipsis;

white-space:nowrap; 强制不换行

letter-spacing   字母与字母之间的距离  汉字与汉字之间的距离

word-spacing   单词与单词之间的距离

overflow     内容溢出处理  overflow-x overflow-y

visible   默认 溢出部分可见

hidden    溢出部分隐藏

scroll    溢出部分以滚动条形式显示

auto     溢出部分浏览器自动处理

## 六．盒子模型

**1.border 边框**

border-width 边框的宽度

border-color  边框的颜色

border-style  边框的样式

1）solid   实线

2）double  双实线

3）dotted   点状线

4）dashed  虚线

....

缩写:

**border** **:** border-width值  border-style值  border-color值;

border-top 上边框

border-bottom 下边框

border-left  左边框

border-right  右边框

---

2.**padding**  内边距 内补丁 内填充

​	padding-top  上内边距

​	padding-bottom  下内边距

​	padding-left  左内边距

​	padding-right  右内边距

缩写：

padding:值;        上下左右的内边距一样

padding:值1 值2;     值1代表上下内边距，值2代表左右内边距

padding:值1 值2 值3;  值1代表上内边距，值2代表左右内边距，值3代表下内边距

padding:值1 值2 值3 值4;   值1代表上内边距，值2代表右内边距，值3代表下内边距，值4代表左内边距，按照顺时针方向。

---

3.**margin**  外边距

​	margin-top  上外边距

​	margin-bottom 下外边距

​	margin-left   左外边距

​	margin-right   右外边距

缩写：

margin:    同padding

**margin:0 auto;**  **块级元素居中显示**

---

4.**background**  背景

background-color  背景颜色

background-image  背景图片

值：url(“图片的路径”)

---

5.**background-repeat**  背景图片是否平铺

值：a）repeat   默认  水平、垂直都平铺

b）no-repeat    水平、垂直都不平铺

c）repeat-x    水平平铺

d）repeat-y    垂直平铺

---

6.**background-position**  背景图片的位置

语法： x轴坐标 y轴坐标

a）表示位置的英文单词  例如：left center right top bottom

b）百分比

c）数字+单位

5）**background-size**    背景图片的大小

语法：背景图片的宽度  背景图片的高度

a）百分比  （盒子的百分比）

b）数字+单位

c）**cover**  背景图片等比例的扩展至足够大，以使它铺满整个区域，可能会引起图片裁剪。

d）**contain** 背景图片等比例地扩展至足够大，以使它的宽度或高度适应内容区域，可能会使区域留白。

---

6.**background-origi**n   背景图片开始渲染的位置

padding-box   默认  从左上角内边距的位置开始渲染

content-box   从内容区域左上角开始渲染

border-box   从左上角边框区域开始渲染

---

7.**background-attachment**  背景图片是否固定

scroll   默认 图片随页面其余部分滚动而滚动

fixed   图片固定不动

**缩写：**

**background :** **背景颜色** **背景图片**  **背景是否平铺** **背景位置****/****背景大小** **背景渲染位置** **背景是否固定;**

## 七．浮动

**float**  **浮动**

none   默认 不浮动

left    左浮动

right    右浮动

清除浮动：

1. 给有浮动的子元素的父元素加height
2. 给有浮动的子元素的父元素加overflow:hidden
3. 给所有有浮动的元素最后增加一个空元素，给该空元素加样式clear:left / right / both

**clear:left** 清除左浮动

**clear:right** 清除右浮动

**clear:both**  清除左右浮动

clear:none  不清除浮动

4）给有浮动的子元素的父元素增加伪元素，在伪元素里增加样式

**::after{**

**display:block;**

**content:””;**

**clear:both;**

**}**

## 八．定位

**position**  定位

值：

1. static   默认 不定位
2. relative  相对定位  相对于自己原来正常文档流的位置定位
3. absolute  绝对定位

1. 有绝对定位元素的包含框无定位，该元素相对于浏览器定位
2. 有绝对定位元素的包含框有定位，该元素相对于离自己最近的有定位的包含框定位

1. fixed    固定定位  始终相对于浏览器定位

借助left、right、top、bottom这四个值改变元素位置

z-index 值：数字  z轴的排列顺序  z-index值越大越在最上层

## **九. 其他：**

伪类

:link  未访问的状态

:visited  访问后的状态

:hover  鼠标悬停时的状态

:active  鼠标激活时的状态

LoVe HAte 爱恨原则

元素的相互转换

其他元素转换为块级元素 display:block

其他元素转换为行内元素 display:inline （内边距都能设置 外边距只能设置左右的外边距）

其他元素转换为行内块级元素 display:inline-block

任何元素隐藏 display:none

CSS书写顺序

1.位置属性(position, top, right, z-index, display, float等)
2.大小(width, height, padding, margin)
3.文字系列(font, line-height, letter-spacing, color,text-align等)
4.背景(background, border等)
5.其他(animation, transition等)

常用的css命名规则

头：header top

内容：content/container / main

尾：footer bottom

导航：nav navigation   navlist  subnav

侧栏：sidebar

栏目：column cols

页面外围控制整体布局宽度：wrapper

左右中：left  right  center  navleft  headerleft

登录条：loginbar  login

标志：logo

广告：banner

页面主体：main

热点：hot

新闻：news  news_list 

下载：download

子导航：subnav

菜单：menu

子菜单：submenu

搜索：search

友情链接：friendlink

页脚：footer

版权：copyright

滚动：scroll

内容：content

标签页：tab

文章列表：list

提示信息：msg  message 

小技巧：tips

栏目标题：title

加入：joinus

指南：guild

服务：service

注册：regsiter

状态：status

投票：vote

合作伙伴：partner

(二)注释的写法:

/* Footer */

内容区

/* End Footer */

(三)class的命名:

(1)颜色:使用颜色的名称或者16进制代码,如

.red { color: red; }

.f60 { color: #f60; }

.ff8600 { color: #ff8600; }

（2）字体大小,直接使用”font+字体大小”作为名称,如

.font12px { font-size: 12px; } .fz12px{}

.font9pt {font-size: 9pt; }

(3)对齐样式,使用对齐目标的英文名称,如

.left { float:left; } .fl{float:left;} .fr{float:right;}

(4)标题栏样式,使用”类别+功能”的方式命名,如

.barnews { }

.barproduct { }

注意事项::

1.一律小写;

2.尽量用英文;

3.不加中杠和下划线;

4.尽量不缩写，除非一看就明白的单词.

主要的 master.css

模块 module.css

基本共用 base.css / common.css / static.css

布局，版面 layout.css

主题 themes.css

专栏 columns.css

文字 font.css

表单 forms.css

补丁 mend.css

打印 print.css
