---
title: NET 异步与多线程
createTime: 2024/10/31 08:45:33
permalink: /常用/djrz5o7b/
---

在 .NET 6 中，异步方法和多线程处理已经非常成熟，通过 `async`/`await`、`Task`、`Parallel` 等特性，开发者可以方便地实现高效的异步和并发编程。


## 异步方法

## `async` 和 `await`
- 使用 `async` 关键字定义异步方法，并在方法中使用 `await` 操作符异步等待任务的完成。
- `async` 和 `await` 是用于简化异步编程的关键字。它们允许程序在等待长时间任务（如 I/O 操作或网络请求）时保持响应性，而不会阻塞主线程。这两个关键字背后利用了 `Task` 类型和任务调度的机制，使代码结构上更直观、易于理解。
- `async` 是一个修饰符，用于定义异步方法。
- `await` 是一个操作符，用于等待异步操作的完成。
- 当一个方法标记为 `async` 时，可以在其中使用 `await` 来等待一个 `Task` 或 `Task<T>` 的执行完成。
- 使用 `await` 时，方法不会阻塞当前线程，而是会将控制权返回给调用者。任务完成后，代码会继续执行 `await` 之后的部分。

### 定义和使用 Async/await 方法

### 定义 `async` 方法

标记为 `async` 的方法可以返回 `Task`、`Task<T>` 或 `void`（不建议直接使用 `void`）。常见的定义方式包括：

- `Task`：用于异步无返回值的情况。
- `Task<T>`：用于异步返回值的情况。
- `void`：仅用于事件处理器，不建议在其他方法中使用。无返回值可以用 Task 

### 使用 `await` 操作符

`await` 操作符用于等待异步任务完成。在 `await` 后面的代码将在任务完成后继续执行：

~~~csharp
public async Task<string> GetDataAsync()
{
    // 模拟异步操作
    await Task.Delay(1000);
    return "数据已获取";
}

public async Task RunAsync()
{
    string result = await GetDataAsync();
    Console.WriteLine(result);
}
~~~

### `async`/`await` 的工作原理

当遇到 `await` 操作符时，程序会暂停当前任务，并将控制权返回给调用者，同时不会阻塞线程。任务完成后，`await` 后面的代码会继续执行。

这是如何实现的：

- `await` 会检查任务是否已经完成，如果完成则继续执行后续代码。
- 如果任务尚未完成，控制权会返回给调用它的方法，并在任务完成时恢复执行。

### Async await 的作用

- 异步调⽤前的线程在**异步等待**期间会被放回线程池，等**异步等待结束**之后，⼀个**新的空闲线程**会从线程池中被获取，异步等待调⽤后续的代码会运⾏在这个新的空闲线程中。从理论上来讲，存在程序等待异步执⾏结束后获取的新空闲线程还是之前被放回去的线程的可能性，不过实际运⾏中出现这种情况的概率并不⾼
- 我们⽤餐馆点餐的例⼦阐述⼀下线程切换的过程：服务员给客⼈安排好位置后，就被放回了“空闲服务员池”；等客⼈完成看菜单、写点菜单操作，喊“服务员，菜点好了”后，餐馆会从空闲服务员池中取⼀个空闲的服务员出来完成帮客⼈把点菜单交给后厨的操作。这样的好处显⽽易⻅：**没有任何⼀个服务员处于⼀直等待某个客⼈的状态**，因此每个服务员都被充分利⽤起来，餐馆的接待能⼒就提升了。
- 使⽤await、async进⾏异步调⽤的好处也是类似的：当需要等待⼀个异步操作的时候，这个线程就会被放回线程池；当异步调⽤执⾏结束后，程序再从线程池取出⼀个线程来执⾏后续代码。因此服务器中的每个线程都不会空等某个操作，服务器处理并发请求的能⼒也就提升了。


## Task

`Task` 是用于表示异步操作的类，是异步编程的核心工具之一。`Task` 可以表示已经在执行或将在未来执行的工作，并允许对该工作的完成、取消和异常处理进行控制。

`Task` 通常用于执行 I/O 密集型任务（例如网络请求、文件读取）和 CPU 密集型任务（例如复杂计算）。而且，`Task` 允许多个异步任务并行执行，并在任务完成时触发后续的操作。

### Task.Run

`Task.Run` 是启动任务的简便方法，用于在线程池中创建和运行任务，尤其适合 CPU 密集型任务。
适用于异步的方式运行同步代码块

~~~csharp
Task task = Task.Run(() =>
{
    Console.WriteLine("正在执行任务...");
});
~~~

### Task.Delay

`Task.Delay` 创建一个延时任务，常用于模拟异步操作中的等待。

~~~csharp
await Task.Delay(2000); // 延迟2秒
Console.WriteLine("延迟任务完成");
~~~

### Task.WhenAll 和 Task.WhenAny

- **Task.WhenAll**：等待多个任务全部完成才继续执行。
- **Task.WhenAny**：只要任意一个任务完成即继续执行。

~~~csharp
Task task1 = Task.Delay(1000);
Task task2 = Task.Delay(2000);

await Task.WhenAll(task1, task2); // 等待所有任务完成
Console.WriteLine("所有任务已完成");

await Task.WhenAny(task1, task2); // 其中一个任务完成即可继续
Console.WriteLine("其中一个任务已完成");
~~~

### Task 方法

~~~csharp
public async Task<int> CalculateAsync(int a, int b)
{
    return await Task.Run(() => a + b);
}

int result = await CalculateAsync(3, 5);
Console.WriteLine($"计算结果：{result}");
~~~

### 任务取消

通过 `CancellationToken` 可以取消任务。`Task` 接受 `CancellationToken` 作为参数，可以在需要时终止任务的执行。

~~~csharp
CancellationTokenSource cts = new CancellationTokenSource();

Task task = Task.Run(() =>
{
    for (int i = 0; i < 5; i++)
    {
        if (cts.Token.IsCancellationRequested)
        {
            Console.WriteLine("任务被取消");
            return;
        }
        Console.WriteLine("任务运行中...");
        Thread.Sleep(1000);
    }
}, cts.Token);

// 取消任务
cts.Cancel();
await task;
~~~


## 多线程编程

多线程编程允许应用程序同时执行多个任务，充分利用多核 CPU，提高性能和响应性。C# 提供了多种多线程编程方法和工具，包括 `Thread`、`ThreadPool`、`Task`、`async/await` 等，使得处理并发任务更加灵活和高效。

## 基本概念

- **线程（Thread）**：线程是操作系统能够调度的最小执行单元。一个进程可以包含多个线程，它们共享相同的内存空间。
- **主线程**：应用程序启动时创建的第一个线程，通常用于处理 UI 和主流程。在 UI 应用中，应避免在主线程执行长时间任务以防界面卡顿。
- **线程池**：线程池是系统管理的线程集合，线程池中的线程可以被重用。它们适合短时间、高频率任务，减少了创建和销毁线程的开销。
## Thread

`Thread` 类是 C# 中基础的多线程编程工具，用于创建和管理线程。每个 `Thread` 实例代表一个操作系统级的线程，可以执行独立的代码块。这类多用于需要精确控制线程行为的情况，比如执行特定任务、设置线程优先级、控制线程生命周期等。


### 线程启动

可以通过构造函数创建 `Thread` 对象并传入要执行的方法（可以是无参或有参方法）。然后，调用 `Start()` 方法启动线程。

也可以用 Lambda 表达式
~~~csharp
using System;
using System.Threading;

public class Program
{
    public static void Main()
    {
        Thread thread = new Thread(PrintNumbers);
        thread.Start(); // 启动线程
    }

    static void PrintNumbers()
    {
        for (int i = 0; i < 5; i++)
        {
            Console.WriteLine($"线程运行：{i}");
            Thread.Sleep(1000); // 模拟耗时操作
        }
    }
}
~~~

### 线程优先级

可以使用 `Thread.Priority` 属性调整线程的执行优先级（默认是 `Normal`），例如 `Lowest`、`BelowNormal`、`Normal`、`AboveNormal` 和 `Highest`。较高优先级的线程在 CPU 时间分配上会被优先考虑。

~~~csharp
Thread thread = new Thread(PrintNumbers);
thread.Priority = ThreadPriority.Highest;
thread.Start();
~~~

### 线程状态

`Thread` 类提供了 `ThreadState` 属性来查看线程的当前状态。常见状态包括：

- `Unstarted`：线程已创建但尚未启动。
- `Running`：线程正在运行。
- `Suspended`：线程暂停（已不常用，建议使用其他同步机制）。
- `WaitSleepJoin`：线程处于等待状态，例如使用 `Sleep` 或 `Join`。
- `Stopped`：线程已结束。

### 后台线程

通过 `IsBackground` 属性设置线程是否为后台线程。主线程结束时，所有前台线程必须先结束，而后台线程则会被立即终止。

~~~csharp
Thread backgroundThread = new Thread(PrintNumbers);
backgroundThread.IsBackground = true; // 设置为后台线程
backgroundThread.Start();
~~~

### Join 方法

`Join` 方法用于等待线程完成，可以指定等待的时间。在主线程中调用 `Join` 会阻塞主线程直到目标线程执行完毕。

~~~csharp
Thread thread = new Thread(PrintNumbers);
thread.Start();
thread.Join(); // 主线程等待子线程结束后再继续执行
Console.WriteLine("子线程已完成");
~~~

### 线程同步

在多线程环境中，共享资源的并发访问可能导致数据不一致的问题，因此需要同步。可以使用 `lock`、`Monitor`、`Mutex`、`Semaphore` 等同步机制来确保线程安全。


~~~csharp
private static readonly object lockObject = new object();
private static int counter = 0;

public static void IncrementCounter()
{
    lock (lockObject) // 确保只有一个线程能够访问以下代码块
    {
        counter++;
        Console.WriteLine($"计数器：{counter}");
    }
}
~~~

### Thread. Sleep

用于模拟异步任务执行时的延迟

## Thread Pool

### 简介

`ThreadPool` 是 .NET 中用于管理一组可重用线程的机制，简化了线程的创建和管理。`ThreadPool` 通过维护一个线程池来处理并发任务，避免频繁创建和销毁线程的性能开销。它适合处理较短、较轻量的后台任务，比如 I/O 操作或定时任务。

---
**特点和优点**

- **自动管理线程**：`ThreadPool` 会自动管理线程的创建和销毁，避免频繁创建线程带来的开销。
- **适合短任务**：`ThreadPool` 适合执行短时的、非阻塞的任务，不适合需要长期运行的任务。
- **限制线程数量**：避免过多线程同时运行造成资源竞争。可通过 `ThreadPool.SetMaxThreads` 设置最大线程数。
- **线程复用**：`ThreadPool` 中的线程会被复用，不会因为任务结束而销毁。
---
**适用场景**

- **并发短任务**：需要执行短时间且非阻塞的任务。
- **后台任务**：适合执行无需前台干预的任务，如日志记录、消息处理等。
- **资源敏感**：避免频繁创建和销毁线程，减少资源占用。
---
**注意事项**

- **不适合长期运行任务**：长时间运行的任务可能会占用线程池线程，导致其他任务等待较久。
- **不能控制任务的顺序**：线程池适合并发任务，不能保证任务的执行顺序。
- **注意异常处理**：线程池线程发生异常不会影响主线程，但需处理异常以防止崩溃。
---

### 使用示例

可以使用 `ThreadPool.QueueUserWorkItem` 将任务排入线程池中执行。该方法接受一个 `WaitCallback` 委托作为参数，表示要执行的任务。

~~~csharp
using System;
using System.Threading;

public class Program
{
    public static void Main()
    {
        Console.WriteLine("主线程开始");

        ThreadPool.QueueUserWorkItem(state =>
        {
            Console.WriteLine("线程池任务1开始");
            Thread.Sleep(1000);
            Console.WriteLine("线程池任务1完成");
        });

        ThreadPool.QueueUserWorkItem(state =>
        {
            Console.WriteLine("线程池任务2开始");
            Thread.Sleep(500);
            Console.WriteLine("线程池任务2完成");
        });

        Console.WriteLine("主线程结束");
    }
}

~~~

### 线程池与任务的等待

`ThreadPool` 不支持直接等待所有线程完成，但可以通过 `CountdownEvent`、`ManualResetEvent` 等同步机制实现等待。

~~~csharp
using System.Threading;

CountdownEvent countdown = new CountdownEvent(2);

ThreadPool.QueueUserWorkItem(state =>
{
    Console.WriteLine("任务1运行");
    Thread.Sleep(1000);
    countdown.Signal();
});

ThreadPool.QueueUserWorkItem(state =>
{
    Console.WriteLine("任务2运行");
    Thread.Sleep(500);
    countdown.Signal();
});

countdown.Wait(); // 等待任务完成
Console.WriteLine("所有任务完成");
~~~