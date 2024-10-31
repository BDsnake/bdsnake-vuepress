---
title: NET IdentityServer 4
createTime: 2024/10/28 16:46:37
permalink: /常用/rrbkns7f/
---



踩了好多坑

## 客户端模式

IdentityServer4 中的客户端模式（Client Credentials Grant）是一种用于服务器到服务器（Server-to-Server）身份验证的 OAuth2 授权模式。这个模式主要用于没有用户交互的场景，通常用于后端服务或应用程序之间的安全通信。

### 服务端Config.cs

创建 `Config.cs`
~~~csharp
namespace IdentityServer.Identity
{
    using IdentityServer4.Models;
    using IdentityServer4.Test;

    public static class Config
    {
        public static IEnumerable<Client> GetClients()
        {
            return new List<Client>
        {
            new Client
            {
                ClientId = "client_id",
                AllowedGrantTypes = GrantTypes.ClientCredentials,
                ClientSecrets =
                {
                    new Secret("client_secret".Sha256())
                    //new Secret("client_secret")
                },
                AllowedScopes = { "api1" }
            }
        };
        }

        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
        {
            new ApiResource("api1", "My API"){
            Scopes = { "api1" }  // 确保定义了 "api1" scope
        }
            };
        }

        public static IEnumerable<ApiScope> GetApiScopes()
        {
            return new List<ApiScope>
    {
        new ApiScope("api1", "My API Scope")
    };
        }


        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
        {
            new IdentityResources.OpenId(),
            new IdentityResources.Profile()
        };
        }

        //public static List<TestUser> GetUsers()
        //{
        //    return new List<TestUser>
        //    {
        //        new TestUser
        //        {
        //            SubjectId = "1",
        //            Username = "testuser",
        //            Password = "password"
        //        }
        //    };
        //}
    }

}
~~~


> [!代码及解释] 代码及解释
>1. `GetClients` 方法
> 	- **ClientId**: 客户端的唯一标识符。
> 	- **AllowedGrantTypes**: 定义允许的授权类型，这里使用的是 `GrantTypes.ClientCredentials`，表示使用客户端凭据进行身份验证。
> 	- **ClientSecrets**: 用于验证客户端身份的密钥，通常应该安全存储，这里使用 SHA256 哈希加密。
> 	- **AllowedScopes**: 定义客户端可以访问的 API 范围，这里指定为 `api1`。
> 2. `GetApiResources` 方法
> 	- **ApiResource**: 定义了一个 API 资源，`api1` 是资源的名称，`My API` 是描述。
> 	- **Scopes**: 确保定义了与 `api1` 相关联的范围，允许客户端在请求访问令牌时指定。
> 3. `GetApiScopes` 方法
> 	- **ApiScope**: 定义了可供客户端请求的 API 范围，`api1` 是范围的名称，`My API Scope` 是描述。
> 4. `GetIdentityResources` 方法
> 	- **IdentityResource**: 定义了身份验证资源，这里包含了 `OpenId` 和 `Profile`，通常用于用户身份验证。
> 	- **注意**: 在客户端模式下，这部分是可选的，因为没有用户交互。


### 服务端Program.cs

~~~csharp
using IdentityServer.Identity;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configuring IdentityServer
builder.Services.AddIdentityServer()
    .AddInMemoryClients(Config.GetClients())
    .AddInMemoryApiResources(Config.GetApiResources())
    .AddInMemoryApiScopes(Config.GetApiScopes())  // 注册 ApiScopes
    .AddInMemoryIdentityResources(Config.GetIdentityResources())
    //.AddTestUsers(Config.GetUsers())
    .AddDeveloperSigningCredential(); // 用于开发环境，生产中请使用持久密钥

builder.Logging.AddConsole(options => {
    options.IncludeScopes = true;
});



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseIdentityServer(); //启用identity服务

app.Run();
~~~

[!代码及解释] 代码及解释
**IdentityServer 配置**
- **`AddIdentityServer()`**: 注册 IdentityServer 服务。
- **`.AddInMemoryClients(...)`**: 将客户端配置添加到内存中。使用 `Config.GetClients()` 方法获取客户端配置。
- **`.AddInMemoryApiResources(...)`**: 将 API 资源配置添加到内存中。使用 `Config.GetApiResources()` 方法获取 API 资源配置。
- **`.AddInMemoryApiScopes(...)`**: 将 API 范围配置添加到内存中。使用 `Config.GetApiScopes()` 方法获取 API 范围配置。
- **`.AddInMemoryIdentityResources(...)`**: 将身份资源配置添加到内存中。使用 `Config.GetIdentityResources()` 方法获取身份资源配置。
- **`.AddDeveloperSigningCredential()`**: 添加开发签名凭据，用于签名 JWT 令牌。在生产环境中，建议使用持久化密钥进行签名。
---
- **`app.UseAuthorization();`**：启用授权中间件，以支持授权属性（如 `[Authorize]`）
- **`app.UseIdentityServer();`**: 启用 IdentityServer 中间件，使其处理与身份验证和令牌颁发相关的请求。


### 客户端 Program.cs

引入 JWTBearer

~~~csharp
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//将身份验证服务添加到管道中
builder.Services.AddAuthentication("Bearer")
.AddJwtBearer("Bearer", options =>
{
    options.Authority = "http://localhost:5001";   //你要请求验证的identity服务端的地址
    options.RequireHttpsMetadata = false;
    options.Audience = "api1";          //你选择的验证方式。 对应的GetClients中定义的作用域
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//解决跨域
app.UseCors(policy =>
    policy.AllowAnyOrigin()
          .AllowAnyMethod()
          .AllowAnyHeader());


//app.UseHttpsRedirection();

app.UseAuthentication(); // 验证用户身份,加了jwt之后新加的


app.UseAuthorization();  // 授权用户访问资源

app.MapControllers();

app.Run();
~~~

- **`AddAuthentication("Bearer")`**: 注册身份验证服务，并指定使用 Bearer 令牌作为身份验证方式。这里的 `"Bearer"` 是方案名称。
- **`AddJwtBearer("Bearer", options => { ... })`**: 配置 JWT Bearer 身份验证的选项：
    - **`options.Authority`**: 指定身份提供者的地址，这里指向运行在 `http://localhost:5001` 的 IdentityServer 实例。
    - **`options.RequireHttpsMetadata`**: 设置为 `false`，表示不强制使用 HTTPS。在开发阶段可以允许使用 HTTP。
    - **`options.Audience`**: 设置预期的受众，这里指定为 `"api1"`，这个值应该与 IdentityServer 中定义的 API 资源的受众一致。
---
**`UseCors(...)`**: 配置 CORS 策略，允许来自任何来源的请求，允许所有方法和头部。这在客户端与 API 之间进行跨域请求时非常重要。

---
**`UseAuthentication()`**: 启用身份验证中间件，确保请求中包含的 Bearer 令牌会被解析和验证。此步骤非常关键，因为它使应用程序能够识别用户的身份。注意一定要写这个!！不然 jwt 认证会失效

### 请求 Token 测试

![](https://bd-hexo.oss-cn-beijing.aliyuncs.com/img/file-20241025151602476.png)

## 账号密码模式

### 前言

所有的请求都是 https，没有 https
Properties\launchSettings. Json 中删掉 https 的路径
并在 Program.cs 注掉这条 `//app.UseHttpsRedirection();` 

步骤可能比较多，在我完全测试完后写的这篇文档，可能会遗漏一些东西

### 登录验证服务端构建

#### Nuget
~~~
IdentityServer4
IdentityServer4.AspNetIdentity
Microsoft.AspNetCore.Identity.EntityFrameworkCore
Microsoft.EntityFrameworkCore
Microsoft.EntityFrameworkCore.Design
Microsoft.EntityFrameworkCore.SqlServer
~~~

#### Program.cs

~~~csharp
using IdentityServerUserMod.Identity;
using IdentityServerUserMod.Utility;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Models;
using SqlSugar;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

#region IdentityServer
// 配置 Entity Framework Core 使用 SQL Server 数据库
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer("Server=.;Database=BlogProj;User=sa;Password=xxxxxxxxx;Encrypt=True;TrustServerCertificate=True"));

// 添加 ASP.NET Identity，指定 User 和 Role 类型，并将其与 Entity Framework Core 数据库上下文关联
builder.Services.AddIdentity<User, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>() // 指定存储用户信息的数据库
    .AddDefaultTokenProviders(); // 添加默认的令牌提供程序，例如用于密码重置和确认的令牌

// 配置 IdentityServer
builder.Services.AddIdentityServer()
    .AddDeveloperSigningCredential() // 开发环境下使用的临时签名凭据，用于生成 JWT 令牌
    .AddInMemoryClients(Config.GetClients()) // 将客户端信息存储在内存中，从配置方法获取
    .AddInMemoryApiResources(Config.GetApiResources()) // 将 API 资源信息存储在内存中
    .AddInMemoryApiScopes(Config.GetApiScopes()) // 将 API 作用域信息存储在内存中
    .AddInMemoryIdentityResources(Config.GetIdentityResources()) // 将身份资源信息存储在内存中
    .AddAspNetIdentity<User>(); // 将 ASP.NET Identity 与 IdentityServer 绑定，允许使用 ASP.NET Identity 中的用户

#endregion

#region Service

#endregion


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();

// 启用授权中间件
app.UseAuthorization();

// 映射控制器
app.MapControllers();

// 启用 IdentityServer 服务，处理身份验证和令牌生成
app.UseIdentityServer();

app.Run();

~~~

#### Config.js

~~~csharp
namespace IdentityServerUserMod.Identity
{
    using IdentityServer4.Models; // 引入 IdentityServer4 的模型
    using IdentityServer4.Test; // 引入测试相关的模型

    public static class Config
    {
        // 获取客户端配置
        public static IEnumerable<Client> GetClients()
        {
            return new List<Client>
            {
                new Client
                {
                    ClientId = "client_id", // 客户端标识符
                    AllowedGrantTypes = GrantTypes.ResourceOwnerPassword, // 使用资源拥有者密码授权模式
                    ClientSecrets =
                    {
                        new Secret("client_secret".Sha256()) // 客户端密钥，使用 SHA256 进行哈希
                    },
                    AllowedScopes = { "api1" } // 允许访问的 API 范围
                }
            };
        }

        // 获取 API 资源配置
        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
            {
                new ApiResource("api1", "My API")
                {
                    Scopes = { "api1" } // 确保 API 资源定义了相应的作用域
                }
            };
        }

        // 获取 API 作用域配置
        public static IEnumerable<ApiScope> GetApiScopes()
        {
            return new List<ApiScope>
            {
                new ApiScope("api1", "My API Scope") // 定义 API 作用域，供客户端请求使用
            };
        }

        // 获取身份资源配置
        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(), // 定义 OpenId 资源，支持用户身份验证
                new IdentityResources.Profile() // 定义用户资料资源，允许访问用户信息
            };
        }
    }
}
~~~

#### 创建账号验证类 User 与数据库 EF 迁移

**添加 User 验证类**

这里继承**IdentityUser** 并可进行字段的扩展，这样在用 EF 生成数据库的时候会将扩展字段也生成进去

**注：如果不用扩展就不用继承 IdentityUser，直接用 IdentityUser 即可**

~~~csharp
using System;
using System.Linq;
using System.Text;
using Microsoft.AspNetCore.Identity;
using SqlSugar;

namespace Models
{
    public partial class User:IdentityUser
    {
           public User(){


           }
    }
}
~~~

**添加 EF 迁移**

这里继承了 IdentityDbContext，翻源码可以找到最后继承到了 DbContext，所以这就是个预制的类，使用方法和 DbContext 一样

~~~csharp
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Models;

namespace IdentityServerUserMod.Utility
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // 在这里添加你的 DbSet，例如:
         
    }
}
~~~

管理员运行 cmd，执行命令创建 ef 迁移

[[Net#EF迁移]]

~~~shell
#创建迁移
dotnet ef migrations add InitialCreate
#更新数据库
dotnet ef database update
~~~


#### 创建登录与注册方法

~~~csharp
using IdentityModel.Client;
using IdentityServer4.Services;
using IdentityServerUserMod.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Models;

using SqlSugar;

namespace IdentityServerUserMod.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IIdentityServerInteractionService _interactionService;

        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager, IIdentityServerInteractionService interactionService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _interactionService = interactionService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterModel model)
        {
            var user = new User { UserName = model.username };
            var result = await _userManager.CreateAsync(user, model.password);
            if (result.Succeeded)
            {
                return Ok();
            }
            return BadRequest(result.Errors);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginModel model)
        {
            var result = await _signInManager.PasswordSignInAsync(model.username, model.password, false, false);
            if (!result.Succeeded)
            {
                return Unauthorized();
            }

            // 登录成功，将请求转发给 IdentityServer 获取令牌
            return Ok(new { message = "登录成功，请使用客户端获取令牌。" });
        }
    }
}
~~~

~~~csharp
namespace IdentityServerUserMod.Model
{
    public class LoginModel
    {
        public string username { get; set; }
        public string password { get; set; }
    }
}
namespace IdentityServerUserMod.Model
{
    public class RegisterModel
    {
        public string username { get; set; }
        //public string Email { get; set; }
        public string password { get; set; }
    }
}
~~~

### 客户端构建

#### Nuget

~~~
Microsoft.AspNetCore.Authentication.JwtBearer
Newtonsoft.Json
~~~


#### Program. Cs

~~~csharp

~~~

#### AuthController 注册登录

~~~csharp
using IdentityServerUserMod.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text;
using System.Net.Http.Headers;
//using Newtonsoft.Json;
using ClientTest.Model;

namespace ClientTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        // 构造函数，使用 IHttpClientFactory 创建 HttpClient 实例
        public AuthController(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient(); // 创建 HttpClient 以便与身份验证服务进行通信
        }

        // 注册用户的 API 端点
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            // 将用户注册模型序列化为 JSON
            var json = JsonSerializer.Serialize(model);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            
            // 调用 IdentityServer 的注册 API 进行用户注册
            var response = await _httpClient.PostAsync("http://localhost:5001/api/Account/register", content);

            // 检查响应状态码，成功则返回 OK
            if (response.IsSuccessStatusCode)
                return Ok();

            // 失败则返回 BadRequest，包含错误信息
            return BadRequest(await response.Content.ReadAsStringAsync());
        }

        // 用户登录的 API 端点
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            // 构造身份验证请求的内容，包括 grant_type、用户名、密码等
            var tokenRequest = new Dictionary<string, string>
            {
                { "grant_type", "password" }, // 使用密码模式获取令牌
                { "username", model.username }, // 用户名
                { "password", model.password }, // 密码
                { "client_id", "client_id" }, // 客户端 ID
                { "client_secret", "client_secret" }, // 客户端密钥
                { "scope", "api1" } // 请求的作用域
            };

            // 使用 x-www-form-urlencoded 格式提交登录请求
            var content = new FormUrlEncodedContent(tokenRequest);
            // 向 IdentityServer 发送请求以获取访问令牌
            var response = await _httpClient.PostAsync("http://localhost:5001/connect/token", content);

            // 检查响应状态码，成功则返回包含访问令牌的响应
            if (response.IsSuccessStatusCode)
            {
                var tokenResponse = await response.Content.ReadAsStringAsync();
                return Ok(tokenResponse); // 返回 Access Token
            }
            // 登录失败返回 401 Unauthorized
            return Unauthorized();
        }
    }
}

~~~

#### Model

~~~csharp
namespace IdentityServerUserMod.Model
{
    public class LoginModel
    {
        public string username { get; set; }
        public string password { get; set; }
    }
}
namespace IdentityServerUserMod.Model
{
    public class RegisterModel
    {
        public string username { get; set; }
        //public string Email { get; set; }
        public string password { get; set; }
    }
}
namespace ClientTest.Model
{
    public class TokenResponse
    {
        public string AccessToken { get; set; }
        public string TokenType { get; set; }
        public int ExpiresIn { get; set; }
    }

}

~~~

### 配置角色授权




## 问题

x-www-form-urlencoded 和 form-data 的区别是什么？我请求http://localhost:5001/connect/token 只有前者可以

`x-www-form-urlencoded` 和 `form-data` 是两种不同的 HTTP 请求体格式，主要用于发送数据到服务器。它们的区别如下：

1. `x-www-form-urlencoded`

- **格式**: 数据以键值对的形式编码，多个键值对用 `&` 符号分隔，键和值之间用 `=` 符号连接。
- **内容类型**: 在请求头中设置 `Content-Type` 为 `application/x-www-form-urlencoded`。
- **适用场景**: 适用于小型数据的提交，比如表单数据。
- **示例**
~~~makefile
username=user&password=pass
~~~
 `form-data`

- **格式**: 数据以表单的形式编码，通常用于上传文件。每个字段都是单独的部分，包含内容描述信息。
- **内容类型**: 在请求头中设置 `Content-Type` 为 `multipart/form-data`，并且包含一个边界（boundary），用于分隔各个部分。
- **适用场景**: 适用于文件上传和较大的数据提交。
- **示例**:
~~~css
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="username"

user
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="password"

pass
------WebKitFormBoundary7MA4YWxkTrZu0gW--

~~~
为什么 `x-www-form-urlencoded` 可以请求 `http://localhost:5001/connect/token`

在使用 IdentityServer 的 OAuth 2.0 Token Endpoint 时，通常要求使用 `x-www-form-urlencoded` 格式进行请求，因为这个格式更简单且适合处理键值对数据，符合 OAuth 2.0 的标准。在大多数情况下，Token 请求需要提交的参数如 `grant_type`、`username`、`password` 等都是简单的键值对，这使得 `x-www-form-urlencoded` 成为一个理想的选择。

结论

- 如果你在向 Token Endpoint 发送请求时遇到问题，建议使用 `x-www-form-urlencoded` 格式，确保请求头中包含正确的 `Content-Type`。
- 对于文件上传或需要发送复杂数据结构的场景，可以使用 `form-data`。