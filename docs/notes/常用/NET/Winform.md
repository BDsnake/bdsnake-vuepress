---
title: Winform
createTime: 2024/10/28 16:46:37
permalink: /常用/jckltt7u/
---




# Winform

## 简介

Windows Forms（WinForms）是一个用于构建桌面应用程序的用户界面框架，属于 .NET Framework 的一部分。以下是关于 WinForms 的一些关键点：

**基础概念**

**事件驱动**：WinForms 是基于事件驱动编程模型，用户的每个操作（如点击按钮、输入文本等）都会触发相应的事件，可以在代码中对这些事件进行处理。

**控件**：WinForms 提供了丰富的控件（如按钮、文本框、列表框、标签等），开发者可以通过拖放方式将它们添加到窗体上，快速构建用户界面。

---

**开发环境**

**Visual Studio**：WinForms 应用程序通常在 Visual Studio 中开发，提供了强大的设计工具、调试工具和代码编辑器，使得开发过程更加高效。

**设计器**：Visual Studio 提供了可视化设计器，开发者可以通过拖放控件来设计窗体布局，无需手动编写所有的界面代码。

---

**基本结构**

**窗体（Form）**：WinForms 应用程序的核心是窗体（Form），每个窗体都是一个 `Form` 类的实例，可以包含多个控件和事件处理逻辑。

**控件（Control）**：控件是 WinForms 应用程序的基本组成部分，可以用来接收用户输入、显示信息等。

---

**优缺点**

**优点**：

- **易于使用**：WinForms 提供了简单的编程模型，适合快速开发简单的桌面应用程序。
- **成熟的生态**：由于 WinForms 存在已久，有很多现成的库和控件可供使用。

**缺点**：

- **界面不够现代**：相较于 WPF（Windows Presentation Foundation）等较新的技术，WinForms 的界面美观性较差，难以实现复杂的动画和现代界面效果。
- **缺乏灵活性**：在处理复杂布局和自定义控件方面，WinForms 的灵活性不如 WPF。

## 项目创建

![image-20241009084913700](https://bd-hexo.oss-cn-beijing.aliyuncs.com/img/image-20241009084913700.png)

上面是.NETCore 下面是使用.NET Framework

## 基本代码结构

![image-20241009130505292](https://bd-hexo.oss-cn-beijing.aliyuncs.com/img/image-20241009130505292.png)

Form1.cs：Windows 窗体应用
Form1.Designer.cs Windows窗体应用设计器

注：Designer中的代码会根据拖拽布局改变二改编，故不建议在此写逻辑，逻辑写在Form1.cs里

Program.cs 程序入口，可设置默认打开哪个窗口

## 拖拽布局

点击工具箱，拖拽即可完成布局

![image-20241009130234679](https://bd-hexo.oss-cn-beijing.aliyuncs.com/img/image-20241009130234679.png)

右键控件-属性 可设置控件属性以及布局

![image-20241009130401481](https://bd-hexo.oss-cn-beijing.aliyuncs.com/img/image-20241009130401481.png)

## 事件

在 Windows Forms（WinForms）中，事件是与用户交互的主要方式。事件允许程序响应用户的操作，比如鼠标点击、键盘输入等。

### **常见事件**

**按钮（Button）**：

- `Click`：当用户点击按钮时触发。
- `MouseEnter`：当鼠标光标进入按钮区域时触发。
- `MouseLeave`：当鼠标光标离开按钮区域时触发。

**文本框（TextBox）**：

- `TextChanged`：当文本框中的文本改变时触发。
- `KeyPress`：当用户按下键时触发。

**窗体（Form）**：

- `Load`：当窗体被加载时触发。
- `FormClosing`：当窗体关闭时触发。
- `Resize`：当窗体大小改变时触发。

具体可右键控件属性，点击事件，选中事件有对应的官方介绍

![image-20241009131202113](https://bd-hexo.oss-cn-beijing.aliyuncs.com/img/image-20241009131202113.png)

### 开发事件

**方法1：通过设计工具添加**

双击对应控件，会自动创建事件方法并绑定

如button会自动创建click方法并绑定

~~~c#
        private void button1_Click(object sender, EventArgs e)
        {
            button1.Text = "123";
        }
~~~

或者在属性栏中选择想添加的事件双击

**方法2：代码添加**

~~~c#
this.button1.Click += new System.EventHandler(this.button1_Click);
//分界线
        private void button1_Click(object sender, EventArgs e)
        {
            button1.Text = "123";
        }
~~~

两种方法只是方式不同，生成的代码一样