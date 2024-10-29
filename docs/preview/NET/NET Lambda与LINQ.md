---
Title: .Net Lambda与LINQ
Categories:
  - .NET
  - LINQ
  - Lambda
tags:
  - 后端开发
  - NET 
createtime: 2024-10-24 15:30:16
---
# .NET Lambda 与 LINQ


## Lambda 表达式

在 .NET 中，Lambda 表达式是用于创建匿名方法的简洁语法。它使得编写委托和表达式树变得更加简单和直观。Lambda 表达式广泛用于 LINQ 查询、事件处理和回调等场景。

### 基本语法

Lambda 表达式的基本语法如下：

~~~csharp
(parameters) => expression
//或者
(parameters) => { statements; }
~~~

如果匿名函数只有一行代码可以省略大括号

## 委托类型

在 .NET 中，委托（Delegate）是一种类型，用于定义方法的引用。它允许你将方法作为参数传递，或在运行时指定要调用的方法。委托非常类似于其他编程语言中的函数指针，但具有更强的类型安全性。

**定义委托**： 委托通过 `delegate` 关键字定义，指定方法的返回类型和参数类型。例如：
~~~csharp
public delegate int MyDelegate(int x, int y);
~~~
**创建委托实例**： 通过将一个符合委托签名的方法分配给委托变量，来创建委托实例。例如：
~~~csharp
public int Add(int a, int b)
{
    return a + b;
}

MyDelegate del = new MyDelegate(Add);
~~~
**调用委托**： 使用 `Invoke` 方法或直接调用委托实例来执行所引用的方法：
~~~csharp
int result = del.Invoke(3, 4); // 直接调用 del(3, 4) 也可以
~~~

**解释：** delegate 关键字定义方法的入参、返回值，创建委托示例的时候可以写符合要求的具体方法来创建实例。类似于接口与实现的关系

**用途**
- **回调机制**： 委托常用于实现回调，允许方法在完成时通知调用者。例如，在异步编程中，可以使用委托来传递回调方法。
    
- **事件处理**： 在事件驱动编程中，委托用于定义事件处理程序。当事件被触发时，相关的方法通过委托被调用。
    
- **策略模式**： 委托可以用于实现策略模式，根据不同的情况选择不同的算法或操作。

## LINQ

介绍完 Lambda 表达式和委托类型后，就可以更容易理解 LINQ 表达式了。

- **LINQ** 是一种强大的数据查询工具，简化了数据访问和操作的过程。
- **支持多种数据源**：可以用于集合、数据库、XML 等。
- **查询语法和方法链**：提供了两种灵活的语法选择。
- **丰富的操作符**：提供了多种查询和操作集合的功能。
- **延迟和立即执行**：查询的执行时机可以根据需要控制。

LINQ 提供了简洁而强大的查询能力，是现代 .NET 开发中不可或缺的工具。

### 组成

- **LINQ to Objects**：用于查询内存中的对象集合，如数组和列表。
- **LINQ to SQL**：用于查询 SQL Server 数据库。
- **LINQ to Entities**：用于通过 Entity Framework 查询数据库。
- **LINQ to XML**：用于查询和操作 XML 数据。

### 源码研究

来看一下 LINQ 的源码
举个例子
~~~csharp
List<int> list = new List<int>();
list.Where(x => x > 0).ToList();
~~~
查看 **where 的源码**
~~~csharp
[__DynamicallyInvokable]
public static IEnumerable<TSource> Where<TSource>(this IEnumerable<TSource> source, Func<TSource, bool> predicate);
~~~
发现 where 的两个参数，第一个是**数据源**，第二个是**委托类型**！[[#委托类型]]

- `Func` 是一个内置的委托类型，表示一个方法，该方法可以接收一个或多个输入参数，并返回一个结果。
- 在这里，`TSource` 是泛型类型参数，表示集合中元素的类型。
- `bool` 表示该方法返回一个布尔值，指示元素是否满足特定条件。

很明白了，这里 where 的入参为  (x => x > 0)，即传入的函数为
~~~csharp
bool f(int x) { return x>0; }
~~~

根据这个判断条件，筛选 List中的数据

---

据此，我们可以自己写一个 where 表达式，来更深的理解

~~~csharp
Static void Main (string[] args)
{
    List<int> list = new List<int> {1,-1,3,3,4,6,3,-86,-53,-53,-6,4,56,34,64 };
    List.Where (x => x > 0). ToList ();
    MyWhere1 (list, x=>x>0);

}

static IEnumerable<int> MyWhere1 (IEnumerable<int> item, Func<int, bool> f)
{
    List<int> res = new List<int>();
    Foreach (int i in item) { 
        If (f (i)==true) res. Add (i);
    }
    Return res;
}
~~~


## 常用 LINQ 方法

### 速查

- **Where**：条件查询
- **Count**：计数
- **Any**：是否至少有一条数据
- **Single**：有且只有一条满足要求
- **SingleOrDefault**：最多有一条数据满足要求
- **First**：至少有一条，返回第一条
- **FirstOrDefault**：返回第一条或默认值
- **Order**：对数据正序排序
- **OrderByDescending**：倒序排序
- **ThenBy**：多规则排序
- **ThenByDescending**：多规则排序倒序
- **Skip**：跳过 n 条数据
- **Take**：获取 n 条数据
- **Max、Min、Average、Sum、Count**：聚合函数
- **GroupBy**：根据 xxx 字段分组
- **Select**：投影
- **ToArray、ToList**：转数组转 List，查询出来默认是 IEnumberable

大部分都很简单，只额外介绍几个复杂一点的

### GroupBy

`GroupBy` 是 LINQ 中用于对集合中的元素进行分组的方法。它根据指定的键将集合中的元素分成若干组，每组包含具有相同键的元素。`GroupBy` 方法通常用于汇总和统计数据。

**示例：**
~~~csharp
public class Student
{
    public string Name { get; set; }
    public int Age { get; set; }
}

List<Student> students = new List<Student>
{
    new Student { Name = "Alice", Age = 20 },
    new Student { Name = "Bob", Age = 22 },
    new Student { Name = "Charlie", Age = 20 },
    new Student { Name = "David", Age = 22 }
};

var groupedByAge = students.GroupBy(s => s.Age);

foreach (var group in groupedByAge)
{
    Console.WriteLine($"Age: {group.Key}");
    foreach (var student in group)
    {
        Console.WriteLine($" - {student.Name}");
    }
}
~~~

**匿名**

### Select

`Select` 是 LINQ 中一个非常重要的方法，用于从集合中选择特定的元素或属性，并生成一个新的集合。它通常用于数据转换和投影，允许你以自定义的方式提取和处理数据。

**示例**

~~~csharp
var names = students.Select(s => s.Name).ToList();
// 输出结果: "Alice", "Bob"
var studentInfos = students.Select(s => new { s.Name, s.Age }).ToList();
// 输出结果: { Name = "Alice", Age = 20 }, { Name = "Bob", Age = 22 }
var adultNames = students .Where(s => s.Age >= 21) .Select(s => s.Name) .ToList();
// 只会返回年龄大于等于21岁的学生的名字
~~~