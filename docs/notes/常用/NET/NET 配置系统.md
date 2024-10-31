---
title: NET 配置系统
createTime: 2024/10/31 08:39:21
permalink: /常用/yg8ml1du/
---

# .NET 配置系统
## 自定义配置的两种方式

手动读取配置和选项方式读取配置

## 手动读取配置

### 创建自定义配置文件

在项目的根目录中，创建一个新的 JSON 文件，例如 `customsettings.json`，并添加你的配置项：

~~~csharp
{
    "CustomSettings": {
        "Setting1": "Value1",
        "Setting2": "Value2"
    }
}
~~~

### Program.cs 加载自定义 json文件

在 `Program.cs` 中，你需要告诉应用程序加载这个新的 JSON 配置文件。可以通过 `ConfigurationBuilder` 来添加自定义文件：

~~~csharp
var builder = WebApplication.CreateBuilder(args);

// 加载自定义 JSON 文件
builder.Configuration.AddJsonFile("customsettings.json", optional: true, reloadOnChange: true);

var app = builder.Build();

// 示例：读取自定义配置
var setting1 = builder.Configuration["CustomSettings:Setting1"];
Console.WriteLine($"Setting1: {setting1}");

app.Run();
~~~


## Options 读取配置

### 创建自定义配置文件

确保你有一个自定义 JSON 文件，比如 `customsettings.json`，内容如下：

~~~json
{
    "CustomSettings": {
        "Setting1": "Value1",
        "Setting2": "Value2"
    }
}
~~~

### 创建配置类

然后，定义一个类来映射你的配置项：

~~~csharp
public class CustomSettings
{
    public string Setting1 { get; set; }
    public string Setting2 { get; set; }
}
~~~

### 在 Program.cs 中配置依赖注入

在 `Program.cs` 中，添加自定义 JSON 文件并注册配置：

~~~csharp
var builder = WebApplication.CreateBuilder(args);

// 加载自定义 JSON 文件
builder.Configuration.AddJsonFile("customsettings.json", optional: true, reloadOnChange: true);

// 绑定配置到 CustomSettings 类
builder.Services.Configure<CustomSettings>(builder.Configuration.GetSection("CustomSettings"));

var app = builder.Build();

// 其他配置...
app.Run();

~~~

### 在普通类中使用配置

在你的普通类中，可以通过构造函数注入 `IOptions<CustomSettings>` 来获取配置：

~~~csharp
using Microsoft.Extensions.Options;

public class MyService
{
    private readonly CustomSettings _settings;

    // 通过构造函数注入 IOptions<CustomSettings>
    public MyService(IOptions<CustomSettings> options)
    {
        _settings = options.Value;
    }

    public void ShowConfig()
    {
        Console.WriteLine($"Setting1: {_settings.Setting1}, Setting2: {_settings.Setting2}");
    }
}
~~~

### 在 Program.cs 中注册和使用

在 `Program.cs` 中注册 `MyService` 并使用它：

~~~csharp
builder.Services.AddTransient<MyService>();

var app = builder.Build();

// 获取服务并使用
var myService = app.Services.GetRequiredService<MyService>();
myService.ShowConfig();

app.Run();
~~~

## 其他配置提供程序

.NET Core中还提供了其他类型的配置提供程序。⽐如配置⽂件还⽀持INI、XML格式；如果程序运⾏在Azure上，推荐使⽤Azure KeyVault，这是Azure上的配置中⼼；如果使⽤Docker，.NET Core也⽀持Key-per-file格式的配置⽂件。.NET Core的配置系统是开放的，允许我们开发第三⽅的配置提供程序。⽐如Apollo是携程⽹开源的⼀个配置管理平台，提供了灰度发布、权限控制、审核等复杂的配置管理功能，已经在携程⽹之外的很多互联⽹公司落地，是⽬前国内应⽤⾮常⼴泛的⼀个配置管理平台。Apollo就提供了.NET Core的配置提供程序，因此我们可以在.NET Core中连接Apollo读取配置。

## 开发自己的配置提供程序

