---
title: NET代码大全
createTime: 2024/10/28 16:46:37
permalink: /常用/hevjmedb/
---


# .Net 代码大全

## 图片验证码

### 1. 新建项目

创建一个新的 ASP.NET Core Web API 项目：

```ls
dotnet new webapi -n CaptchaDemo
cd CaptchaDemo
```

### 2. 安装必要的包

使用 `SkiaSharp` 来生成图片：

```ls
dotnet add package SkiaSharp
```

### 3. 创建验证码服务

在项目中创建一个 `CaptchaService` 类，用于生成验证码文本和图片：

```csharp
using static log4net.Appender.ColoredConsoleAppender;
using System.Drawing;
using SkiaSharp;

namespace BlogProj.Auth.Service
{


    public class CaptchaService
    {
        public (string Code, byte[] Image) GenerateCaptchaImage(int width = 150, int height = 50)
        {
            var random = new Random();
            var code = random.Next(1000, 9999).ToString(); // 生成4位数字验证码

            using var bitmap = new SKBitmap(width, height);
            using var canvas = new SKCanvas(bitmap);
            canvas.Clear(SKColors.White);

            // 设置字体样式
            var paint = new SKPaint
            {
                Color = SKColors.Black,
                IsAntialias = true,
                Typeface = SKTypeface.FromFamilyName("Arial")
            };

            int charSpacing = width / code.Length; // 每个字符的水平间距
            int maxTextHeight = height - 10;       // 限制字符最大高度

            // 绘制验证码字符
            for (int i = 0; i < code.Length; i++)
            {
                paint.TextSize = random.Next(24, 28);   // 字体大小
                paint.Color = GetRandomColor(random);   // 随机颜色

                // 计算字符位置，使字符保持在分配区间内
                int x = i * charSpacing + 10;
                int y = maxTextHeight;

                // 设置较小的扭曲和旋转
                var matrix = SKMatrix.CreateScale(1f, 1f);  // 限制缩放
                matrix = matrix.PostConcat(SKMatrix.CreateRotationDegrees(random.Next(-10, 10))); // 限制旋转范围
                matrix = matrix.PostConcat(SKMatrix.CreateSkew(random.Next(-5, 5) / 100f, random.Next(-5, 5) / 100f)); // 轻微倾斜

                canvas.SetMatrix(matrix);
                canvas.DrawText(code[i].ToString(), x, y, paint);
                canvas.ResetMatrix(); // 重置矩阵
            }

            // 添加干扰线
            for (int i = 0; i < 6; i++)
            {
                paint.Color = GetRandomColor(random);
                paint.StrokeWidth = 1.5f;
                canvas.DrawLine(random.Next(width), random.Next(height), random.Next(width), random.Next(height), paint);
            }

            // 添加噪点
            for (int i = 0; i < 100; i++)
            {
                bitmap.SetPixel(random.Next(width), random.Next(height), GetRandomColor(random));
            }

            // 输出图片
            using var image = SKImage.FromBitmap(bitmap);
            using var data = image.Encode(SKEncodedImageFormat.Png, 100);
            return (code, data.ToArray());
        }

        private SKColor GetRandomColor(Random random)
        {
            return new SKColor((byte)random.Next(50, 200), (byte)random.Next(50, 200), (byte)random.Next(50, 200));
        }
    }


}

```

### 4. 注册服务

在 `Program.cs` 中注册 `CaptchaService`：

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<CaptchaService>();
var app = builder.Build();
```

### 5. 创建验证码控制器

创建一个 `CaptchaController`，暴露生成验证码的 API 端点：

```csharp
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class CaptchaController : ControllerBase
{
    private readonly CaptchaService _captchaService;

    public CaptchaController(CaptchaService captchaService)
    {
        _captchaService = captchaService;
    }

    [HttpGet("generate")]
    public IActionResult GenerateCaptcha()
    {
        var (code, image) = _captchaService.GenerateCaptchaImage();
        
        // 在此处可以将 code 保存到用户的 session 或缓存中以供验证使用
        HttpContext.Session.SetString("CaptchaCode", code);

        return File(image, "image/png");
    }
    [HttpPost]
public IActionResult VerifyCaptcha(string userInputCaptcha)
{
    // 从 Session 中获取存储的验证码
    var storedCaptchaCode = HttpContext.Session.GetString("CaptchaCode");

    if (storedCaptchaCode != null && storedCaptchaCode.Equals(userInputCaptcha, StringComparison.OrdinalIgnoreCase))
    {
        // 验证成功
        return Ok("验证码正确");
    }
    else
    {
        // 验证失败
        return BadRequest("验证码错误");
    }
}
}
```

### 6. 配置 Session

在 `Program.cs` 中启用 Session：

```csharp
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession();

var app = builder.Build();
app.UseSession();
app.UseAuthorization();
app.MapControllers();
app.Run();
```

### 7. 运行并测试

运行项目并访问 `https://localhost:5001/api/captcha/generate`，你将获得一个带有验证码的 PNG 图片。

## JWT

### 创建 `JWTTokenOptions`

在 `JWTTokenOptions.cs` 文件中定义 `JWTTokenOptions` 类：

```csharp
namespace BlogProj.Utility.JWT
{
    public class JWTTokenOptions
    {
        public string Audience { get; set; }
        public string SecurityKey { get; set; }
        // public SigningCredentials Credentials { get; set; }
        public string Issuer { get; set; }
    }
}
```

### 创建获取 Token 的接口及实现

定义 `ICustomJWTService` 接口：

```csharp
namespace BlogProj.Utility.JWT
{
    public interface ICustomJWTService
    {
        string GetToken(string Id, string UserName, string password);
    }
}
```

并在 `CustomHSJWTService.cs` 中实现接口：

```csharp
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BlogProj.Utility.JWT
{
    public class CustomHSJWTService : ICustomJWTService
    {
        #region Option注入
        private readonly JWTTokenOptions _JWTTokenOptions;
        public CustomHSJWTService(IOptionsMonitor<JWTTokenOptions> jwtTokenOptions)
        {
            this._JWTTokenOptions = jwtTokenOptions.CurrentValue;
        }
        #endregion

        /// <summary>
        /// 用户登录成功后生成 Token 的方法
        /// </summary>
        public string GetToken(string Id, string UserName, string password)
        {
            #region 有效载荷，尽量避免敏感信息
            var claims = new[]
            {
                new Claim("UserID", Id),
                new Claim(ClaimTypes.Name, UserName),
            };

            // 配置加密 Key
            SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_JWTTokenOptions.SecurityKey));
            SigningCredentials creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // 生成 Token
            JwtSecurityToken token = new JwtSecurityToken(
                issuer: _JWTTokenOptions.Issuer,
                audience: _JWTTokenOptions.Audience,
                claims: claims,
                expires: DateTime.Now.AddMinutes(5), // 5 分钟有效期
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
            #endregion
        }
    }
}
```

### 增加配置

在 `appsettings.json` 中配置 `JWTTokenOptions`：

```json
"JWTTokenOptions": {
    "Audience": "http://localhost:5200",
    "Issuer": "http://localhost:5200",
    "SecurityKey": "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDI2a2EJ7m872v0afyoSDJT2o1+SitIeJSWtLJU8/Wz2m7gStexajkeD+Lka6DSTy8gt9UwfgVQo6uKjVLG5Ex7PiGOODVqAEghBuS7JzIYU5RvI543nNDAPfnJsas96mSA7L/mD7RTE2drj6hf3oZjJpMPZUQI/B1Qjb5H3K3PNwIDAQAB"
}
```

### 注册 JWT

在 `Program.cs` 中添加 JWT 配置：

```csharp
#region jwt校验  HS
{
    //JWT
    builder.Services.Configure<JWTTokenOptions>(builder.Configuration.GetSection("JWTTokenOptions"));
    builder.Services.AddSingleton<ICustomJWTService, CustomHSJWTService>();
    //第二步，增加鉴权逻辑
    JWTTokenOptions tokenOptions = new JWTTokenOptions();
    builder.Configuration.Bind("JWTTokenOptions", tokenOptions);
    builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)//Scheme
     .AddJwtBearer(options =>  //这里是配置的鉴权的逻辑
     {
         options.TokenValidationParameters = new TokenValidationParameters
         {
             //JWT有一些默认的属性，就是给鉴权时就可以筛选了
             ValidateIssuer = true,//是否验证Issuer
             ValidateAudience = true,//是否验证Audience
             ValidateLifetime = true,//是否验证失效时间
             ValidateIssuerSigningKey = true,//是否验证SecurityKey
             ValidAudience = tokenOptions.Audience,//
             ValidIssuer = tokenOptions.Issuer,//Issuer，这两项和前面签发jwt的设置一致
             IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenOptions.SecurityKey))//拿到SecurityKey 
         };
     });
}
#endregion

#region 鉴权授权
app.UseAuthentication();
app.UseAuthorization();
#endregion
```

### 具体应用

在控制器中实现登录与获取用户信息的接口：

```csharp
private readonly ISqlSugarClient _sqlSugarClient;
private readonly IMapper _mapper;
private readonly ICustomJWTService _customJWTService;

public AuthController(ISqlSugarClient sqlSugarClient, IMapper mapper, ICustomJWTService customJWTService)
{
    _sqlSugarClient = sqlSugarClient;
    _mapper = mapper;
    _customJWTService = customJWTService;
}

[HttpPost("login")]
public ActionResult Login(RegisterDto user)
{
    var qUser = _sqlSugarClient.Queryable<Sys_User>()
        .Where(u => u.Account == user.Account).Single();
    if (qUser is null)
        return Unauthorized("账号不存在");
    if (qUser.Password != user.Password)
        return Unauthorized("密码错误");
    
    var token = _customJWTService.GetToken(qUser.Id.ToString(), user.Account, user.Password);
    return Ok(token);
}

[HttpGet]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public ActionResult GetUserInfo()
{
    var Id = User.Claims.FirstOrDefault(c => c.Type == "UserID")?.Value;
    if (Id == null) { return Unauthorized("用户登录失效"); }
    var user = _sqlSugarClient.Queryable<Sys_User>().Where(u => u.Id == Guid.Parse(Id)).Single();
    var userDto = _mapper.Map<UserDto>(user);
    return Ok(userDto);
}
```

## SQLSugar

### 配置

~~~c#
#region SQLSugar
//SQLSugar
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
#endregion
~~~



~~~json
  "ConnectionStrings": {
    "DefaultConnection": "Server=BDsnake;Database=BlogProj;User=sa;Password=qsj123;Encrypt=True;TrustServerCertificate=True;"
  },
  "DatabaseSettings": {
    "DbType": "SqlServer", // 使用的数据库类型，例如 "SqlServer", "MySql" 等
    "StringDefaultLength": 50 // 可选项：指定字符串字段的默认长度
  },
~~~



## SQLSugar CRUD

### 查询 (Read)

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

### 更新 (Update)

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

### 删除 (Delete)

根据 ID 删除：

```C#
db.Deleteable<Sys_User>().In("UserID").ExecuteCommand();
```

批量删除：

```C#
db.Deleteable<Sys_User>().Where(it => it.Age > 30).ExecuteCommand();
```

### 4执行自定义 SQL

如果需要执行自定义 SQL，可以直接用 `Ado` 属性执行：

```C#
var result = db.Ado.SqlQuery<Sys_User>("SELECT * FROM Sys_User WHERE Age > @age", new { age = 25 });
```

这样可以实现对 `Sys_User` 表的基本 CRUD 操作，SqlSugar 提供了许多强大简便的方法，可以根据需求组合查询。

## AutoMapper

装`AutoMapper` NuGet 包

### 

### 注册

Program.cs

~~~c#
#region AutoMapper
var mapperConfig = new MapperConfiguration(cfg =>
{
    cfg.AddProfile(new MappingProfile());
});

// 创建 IMapper 实例
var mapper = mapperConfig.CreateMapper();
builder.Services.AddSingleton(mapper); // 注册 IMapper
#endregion
~~~

### AutoMapper配置项

~~~c#
using AutoMapper;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // 例如，User 和 UserDto 之间的映射
        CreateMap<User, UserDto>();
    }
}

~~~

### AutoMapper使用

~~~c#
public class UserController : ControllerBase
{
    private readonly IMapper _mapper;

    public UserController(IMapper mapper)
    {
        _mapper = mapper;
    }

    public ActionResult<UserDto> GetUser()
    {
        var user = _userService.GetUser();
        var userDto = _mapper.Map<UserDto>(user);
        return Ok(userDto);
    }
}

~~~

