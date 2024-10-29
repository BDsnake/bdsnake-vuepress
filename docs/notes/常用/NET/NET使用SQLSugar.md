---
title: .Net使用SQLSugar
categories:
  - .NET
tags:
  - 后端开发
  - SQLSugar
  - NET
createTime: 2024/09/30 15:30:16
permalink: /常用/fu41jujo/
---

# .Net使用SQLSugar

QLSugar 是一个轻量级、易用的 .NET ORM 框架，特点在于简洁和易上手。它支持多种数据库，包括 MySQL、SQL Server、SQLite、Oracle 等，可以让开发者在不同数据库之间切换而不需要更改代码。

## SQLSugar 主要功能特点：

1. **简单易用**：语法简洁明了，支持链式查询、自动生成 SQL。
2. **支持多种数据库**：一套代码可以支持多种数据库。
3. **丰富的功能**：包括查询、插入、更新、删除、事务、复杂 SQL、视图、存储过程等。
4. **自动生成表结构**：可以根据实体类自动生成数据库表，并同步更新。
5. **扩展性强**：可通过配置和自定义插件来扩展功能，比如缓存、日志等。

## 典型的使用场景：

- **增删改查**：提供链式 API 可以快速实现数据库的 CRUD 操作。
- **事务处理**：支持分布式事务控制，保证数据一致性。
- **多表查询**：支持多表联查、复杂的 SQL 语句生成等。

SQLSugar 适合希望在 .NET 中快速、高效地操作数据库的开发者，尤其是中小型项目的开发。

## Nuget导入

根据.Net版本选择SQL Sugar 或者 SQLSugar Core

## 配置 SQLSugar

在 `appsettings.json` 中添加数据库连接字符串：

```json
"ConnectionStrings": {
    "DefaultConnection": "Server=your_server;Database=your_database;User=your_user;Password=your_password;Encrypt=True;TrustServerCertificate=True"
  },
  "DatabaseSettings": {
    "DbType": "SqlServer", // 使用的数据库类型，例如 "SqlServer", "MySql" 等
    "StringDefaultLength": 50 // 可选项：指定字符串字段的默认长度
  }
```

## 注册 SQLSugar

在 `Program.cs` 文件中配置 SQLSugar：

```csharp
// 获取数据库相关配置
var configuration = builder.Configuration;
string connectionString = configuration.GetConnectionString("DefaultConnection");
string dbType = configuration["DatabaseSettings:DbType"];
int stringDefaultLength = int.Parse(configuration["DatabaseSettings:StringDefaultLength"] ?? "50");

// 注册 SQLSugarClient
builder.Services.AddScoped<ISqlSugarClient>(serviceProvider =>
{
    return new SqlSugarClient(new ConnectionConfig()
    {
        ConnectionString = connectionString, // 从配置文件读取的连接字符串
        DbType = Enum.Parse<DbType>(dbType), // 数据库类型转换为 SQLSugar 枚举类型
        IsAutoCloseConnection = true // 自动关闭连接
    });
});
```

### 基本实体类定义

创建一个类来表示数据库中的表结构。例如，创建一个 `User` 表对应的实体类：

```csharp
[SugarTable("Users")] // 指定表名，若表名与类名一致可以省略
public class User
{
    [SugarColumn(IsPrimaryKey = true, IsIdentity = true)] // 主键，自增
    public int Id { get; set; }

    [SugarColumn(ColumnName = "UserName", Length = 50, IsNullable = false)] // 指定数据库列名，长度和是否可为空
    public string Name { get; set; }

    [SugarColumn(Length = 100)]
    public string Email { get; set; }

    [SugarColumn(IsNullable = true)]
    public DateTime? DateOfBirth { get; set; }
}
```

> 常用特性
>
> **`SugarTable`**：指定表名，放在类上。例如 `[SugarTable("Users")]`。
>
> **`SugarColumn`**：用于配置字段属性，放在属性上。例如 `[SugarColumn(IsPrimaryKey = true, IsIdentity = true)]`。
>
> 常用参数包括：
>
> - `IsPrimaryKey`：是否为主键。
> - `IsIdentity`：是否为自增字段。
> - `ColumnName`：数据库列名。
> - `Length`：字段长度。
> - `IsNullable`：是否可为空。

## 使用 SQLSugar 操作数据库

在控制器中注入 `ISqlSugarClient`，即可使用 SQLSugar 进行数据库操作：

```csharp
[ApiController]
[Route("api/[controller]")]
public class TestController : ControllerBase
{
    private readonly ISqlSugarClient _db;

    public TestController(ISqlSugarClient db)
    {
        _db = db;
    }

    [HttpGet("GetData")]
    public async Task<IActionResult> GetData()
    {
        var data = await _db.Queryable<YourEntity>().ToListAsync();
        return Ok(data);
    }
}
```

## CRUD

#### 3.2 查询 (Read)

1. 查询所有用户：

   ```C#
   var users = db.Queryable<Sys_User>().ToList();
   ```

2. 根据 ID 查询单个用户：

   ```C#
   var user = db.Queryable<Sys_User>().InSingle("UserID");
   ```

3. 条件查询（比如通过账号查询）：

   ```C#
   var user = db.Queryable<Sys_User>().Where(u => u.Account == "testAccount").First();
   ```

#### 3.3 更新 (Update)

更新特定字段：

```C#
db.Updateable<Sys_User>()
  .SetColumns(it => new Sys_User() { Name = "Updated Name" })
  .Where(it => it.ID == "UserID")
  .ExecuteCommand();
```

更新整个实体：

```C#
var user = db.Queryable<Sys_User>().InSingle("UserID");
user.Name = "Updated Name";
db.Updateable(user).ExecuteCommand();
```

#### 3.4 删除 (Delete)

根据 ID 删除：

```C#
db.Deleteable<Sys_User>().In("UserID").ExecuteCommand();
```

批量删除：

```C#
db.Deleteable<Sys_User>().Where(it => it.Age > 30).ExecuteCommand();
```

### 4. 执行自定义 SQL

如果需要执行自定义 SQL，可以直接用 `Ado` 属性执行：

```C#
var result = db.Ado.SqlQuery<Sys_User>("SELECT * FROM Sys_User WHERE Age > @age", new { age = 25 });
```

这样可以实现对 `Sys_User` 表的基本 CRUD 操作，SqlSugar 提供了许多强大简便的方法，可以根据需求组合查询。

## 使用CodeFIrst或DBFirst

### CodeFIrst

```csharp
// DatabaseInitializer.cs
public class DatabaseInitializer
{
    private readonly ISqlSugarClient _db;
public DatabaseInitializer(ISqlSugarClient db)
{
    _db = db;
}

// Code First：初始化表结构
public void InitializeTables()
{
    _db.CodeFirst.SetStringDefaultLength(50).InitTables(typeof(User), typeof(Product));
}

// DB First：生成实体类
public void GenerateEntities(string outputPath)
{
    db.DbFirst.IsCreateDefaultValue()    // 设置生成默认值
             .IsCreateAttribute()        // 添加字段特性，比如 [SugarColumn]
             .Where("User")              // 指定表名,不加则生成所有
             .CreateClassFile("path/to/your/models"); // 设置实体类生成路径
}
}
```
使用的时候可在Program.cs调用

~~~c#
//CodeFirst 或 DBFirst
using (var scope = app.Services.CreateScope())
{
    var initializer = scope.ServiceProvider.GetRequiredService<DatabaseInitializer>();
    initializer.InitializeTables(); // Code First 初始化
    // 或者 initializer.GenerateEntities(); // DB First 生成实体类
}
~~~

### DbFirst

工具类

~~~csharp
using SqlSugar;
using System.Collections.Generic;

namespace IdentityServerUserMod.Utility
{
    // DatabaseService.cs
    public class DatabaseInitializer
    {
        private readonly ISqlSugarClient _db;

        public DatabaseInitializer(ISqlSugarClient db)
        {
            _db = db;
        }

        // Code First：初始化表结构
        public void InitializeTables()
        {
            _db.CodeFirst.SetStringDefaultLength(50).InitTables();
        }

        // DB First：生成实体类
        public void GenerateEntities(IEnumerable<string> tableNames)
        {
            foreach (var tableName in tableNames)
            {
                _db.DbFirst.IsCreateDefaultValue()
                .IsCreateAttribute()
                .Where(tableName) // 使用传入的表名
                .CreateClassFile("Model"); // 将生成的实体类保存到 Model 目录
            }
        }
        
        // 重载 GenerateEntities 方法，支持传入单个字符串
        public void GenerateEntities(string tableName)
        {
            GenerateEntities(new List<string> { tableName });
        }
    }
}


~~~

使用

~~~csharp
using BlogProj.Config;
using Microsoft.AspNetCore.Mvc;

namespace BlogProj.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class Database : ControllerBase
    {
        private readonly DatabaseInitializer _initializer;
        public Database(DatabaseInitializer initializer)
        {
            _initializer = initializer;
        }
        [HttpGet(Name = "DBFirst")]
        public ActionResult<WeatherForecast> Get()
        {
        //传字符串或字符串list
            _initializer.GenerateEntities("table_name");
            return Ok("1");
        }
    }
}
