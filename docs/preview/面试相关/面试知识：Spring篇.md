---
title: 面试知识：Spring篇
categories: 面试
tags:
  - 面试
  - Java基础
description: 摘要
abbrlink: 86daf52c
date: 2023-03-09 15:30:16
updated: 2023-03-09 15:30:16
top_img:
---

主要参考：https://javaguide.cn/home.html

Spring：代码轻量级，配置重量级

## Spring、SpringMVC、SpringBoot的关系

最简练的语言概括：

**Spring 是一个“引擎”；**

**Spring MVC 是基于Spring的一个 MVC 框架 ；**

**Spring Boot 是基于Spring4的条件注册的一套快速开发整合包。**

Spring是一个引擎,一个容器框架,核心是IOC和AOP
Spring MVC是基于Spring之上用来处理web层请求的MVC框架

Spring Boot是基于Spring4的一套内嵌tomcat等服务器的快速开发整合包,
之所以说他快速是因为相比前面两个框架,SB提供了起步依赖减少了xml配置,有着约定大于配置的理念.

## Spring IOC的理解

IOC(控制反转)：对象的创建权由程序转移到外部,这种思想叫做控制反转。

- **控制** ：指的是对象创建（实例化、管理）的权力
- **反转** ：控制权交给外部环境（Spring 框架、IoC 容器）

将对象之间的相互依赖关系交给 IoC 容器来管理，并由 IoC 容器完成对象的注入。这样可以很大程度上简化应用的开发，把应用从复杂的依赖关系中解放出来。 IoC 容器就像是一个工厂一样，当我们需要创建一个对象的时候，只需要配置好配置文件/注解即可，完全不用考虑对象是如何被创建出来的。

在实际项目中一个 Service 类可能依赖了很多其他的类，假如我们需要实例化这个 Service，你可能要每次都要搞清这个 Service 所有底层类的构造函数，这可能会把人逼疯。如果利用 IoC 的话，你只需要配置好，然后在需要的地方引用就行了，这大大增加了项目的可维护性且降低了开发难度。

在 Spring 中， IoC 容器是 Spring 用来实现 IoC 的载体， IoC 容器实际上就是个 Map（key，value），Map 中存放的是各种对象。

Spring 时代我们一般通过 XML 文件来配置 Bean，后来开发人员觉得 XML 文件来配置不太好，于是 SpringBoot 注解配置就慢慢开始流行起来。

## Spring Bean

简单来说，Bean 就是被IoC容器管理的对象



### 声明Bean的注解

- `@Component` ：通用的注解，可标注任意类为 `Spring` 组件。如果一个 Bean 不知道属于哪个层，可以使用`@Component` 注解标注。
- `@Repository` : 对应持久层即 Dao 层，主要用于数据库相关操作。
- `@Service` : 对应服务层，主要涉及一些复杂的逻辑，需要用到 Dao 层。
- `@Controller` : 对应 Spring MVC 控制层，主要用户接受用户请求并调用 Service 层返回数据给前端页面。

### @Component和@Bean的区别

@Component 和 @Bean 是两种使用注解来定义bean的方式。

`@Component`（和`@Service`和`@Repository`等）用于自动检测和使用类路径扫描自动配置bean。注释类和bean之间存在隐式的一对一映射（即每个类一个bean）。

这种方法对需要进行逻辑处理的控制非常有限，因为它纯粹是声明性的。

`@Bean`用于显式声明单个bean，而不是让Spring像上面那样自动执行它。它将bean的声明与类定义分离，并允许您精确地创建和配置bean

**为什么有了@Compent,还需要@Bean呢？**

如果想将第三方的类变成组件，你又没有没有源代码，也就没办法使用`@Component`进行自动配置，这种时候使用`@Bean`就比较合适了。不过同样的也可以通过xml方式来定义。

另外`@Bean注解的方法返回值是对象，可以在方法中为对象设置属性。`

```javascript
@Component
public class Student {

    private String name = "lkm";

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```

而@Bean则常和@Configuration注解搭配使用

```javascript
@Configuration
public class WebSocketConfig {
    @Bean
    public Student student(){
        return new Student();
    }

}
```

@Bean自定义性更强

~~~java
@Bean
public OneService getService(status) {
    case (status)  {
        when 1:
                return new serviceImpl1();
        when 2:
                return new serviceImpl2();
        when 3:
                return new serviceImpl3();
    }
}
~~~

都可以使用@Autowired或者@Resource注解注入

```javascript
@Autowired
Student student;
```

### 注入Bean的注解

Spring 内置的 `@Autowired` 以及 JDK 内置的 `@Resource` 和 `@Inject` 都可以用于注入 Bean。

`@Autowired` 和`@Resource`使用的比较多一些。

下面介绍@Autowired和@Resource的区别

依赖注入的方式：byType：根据类型匹配  byName： 根据名称匹配

还有这几种方式：constructor，default，no

**@Autowired**

- @Autowired默认使用byType匹配，如果一个接口出现多个实现类，就会转为使用byName匹配，byName也无法匹配会报错
- 可以使用@Qualifier显式指定byName要匹配的名称

**@Resource**

- @Resource默认使用byName匹配，如果无法通过名称匹配会变为byType匹配
- @Resource有两个常用属性`name(名称)`,`type(类型)`，可以用来显示指定匹配的名称或者类型



**总结**

- `@Autowired` 是 Spring 提供的注解，`@Resource` 是 JDK 提供的注解。
- `Autowired` 默认的注入方式为`byType`（根据类型进行匹配），`@Resource`默认注入方式为 `byName`（根据名称进行匹配）。
- 当一个接口存在多个实现类的情况下，`@Autowired` 和`@Resource`都需要通过名称才能正确匹配到对应的 Bean。`Autowired` 可以通过 `@Qualifier` 注解来显式指定名称，`@Resource`可以通过 `name` 属性来显式指定名称

### Spring Bean的作用域

| 作用域      | 描述                                                         |
| ----------- | ------------------------------------------------------------ |
| singleton   | 在spring IoC容器仅存在一个Bean实例，Bean以单例方式存在，bean作用域范围的默认值。 |
| prototype   | 每次从容器中调用Bean时，都返回一个新的实例，即每次调用getBean()时，相当于执行newXxxBean()。 |
| request     | 每次HTTP请求都会创建一个新的Bean，该作用域仅适用于web的Spring WebApplicationContext环境。 |
| session     | 同一个HTTP Session共享一个Bean，不同Session使用不同的Bean。该作用域仅适用于web的Spring WebApplicationContext环境。 |
| application | 限定一个Bean的作用域为`ServletContext`的生命周期。该作用域仅适用于web的Spring WebApplicationContext环境。 |
| websocket   | 每一次 WebSocket 会话产生一个新的 bean,该作用域仅适用于web的Spring WebApplicationContext环境。 |

注解配置方式

~~~java
@Bean
@Scope(value = ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public Person personPrototype() {
    return new Person();
}

~~~

### 单例Bean的线程安全问题

因为Spring中的Bean默认是单例的，所以在定义成员变量时也有可能会发生线程安全问题

单例的bean [多线程](https://so.csdn.net/so/search?q=多线程&spm=1001.2101.3001.7020)共享，存在资源竞争。如果单例bean 只关注于方法，不会对Bean的成员执行查询以外的操作，这个bean是线程安全的。 重点在于有无对bean 属性的查询以外操作

线程安全问题的解决方法：

常见的有两种解决办法：

1. 在 Bean 中尽量避免定义可变的成员变量。
2. 在类中定义一个 `ThreadLocal` 成员变量，将需要的可变成员变量保存在 `ThreadLocal` 中（推荐的一种方式）。

不过，大部分 Bean 实际都是无状态（没有实例变量）的（比如 Dao、Service），这种情况下， Bean 是线程安全的。

### Bean的生命周期

https://blog.csdn.net/yueyezhufeng/article/details/126725597?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_utm_term~default-8-126725597-blog-118500805.pc_relevant_3mothn_strategy_and_data_recovery&spm=1001.2101.3001.4242.5&utm_relevant_index=11

**简单概括：**

我们知道对于普通的 Java 对象来说，它们的生命周期就是：

- 实例化
- 该对象不再被使用时通过垃圾回收机制进行回收

而对于 Spring Bean 的生命周期来说：

- 实例化 Instantiation
- 属性赋值 Populate
- 初始化 Initialization
- 销毁 Destruction

实例化 -> 属性赋值 -> 初始化 -> 销毁

![img](https://bd-hexo.oss-cn-beijing.aliyuncs.com/img/ced334b1e4284e87bd99fd65f50c5fb2.png)

## Spring AOP

强烈建议阅读：https://www.cnblogs.com/joy99/p/10941543.html

AOP是代理模式的典型应用

AOP(Aspect-Oriented Programming:面向切面编程)能够将那些与业务无关，却为业务模块所共同调用的逻辑或责任（例如事务处理、日志管理、权限控制等）封装起来，便于减少系统的重复代码，降低模块间的耦合度，并有利于未来的可拓展性和可维护性。

**Spring AOP** 就是基于**动态代理**的，如果要代理的对象，实现了某个接口，那么 Spring AOP 会使用 **JDK Proxy**，去创建代理对象，而对于没有实现接口的对象，就无法使用 JDK Proxy 去进行代理了，这时候 Spring AOP 会使用 **Cglib** 生成一个被代理对象的子类来作为代理

术语：

| **术语**           | **含义**                                                     |
| ------------------ | ------------------------------------------------------------ |
| 目标(Target)       | 被通知的对象                                                 |
| 代理(Proxy)        | 向目标对象应用                                               |
| 连接点(Join Point) | 被切面拦截/增强的连接点(切入点一定是连接点，连接点不一定是切入点) |
| 通知(Advice)       | 增强的逻辑/代码，也即拦截到目标对象的连接点之后要做的事情    |
| 切面(Aspect)       | 切入点(Pointcut)+通知(Advice)                                |
| Weaving(织入)      | 将通知应用到目标对象，劲儿生成代理对象的过程动作             |

### **与AspectJ AOP 比较**

**AspectJ AOP**基于**静态代理**

**Spring AOP 属于运行时增强，而 AspectJ 是编译时增强。** Spring AOP 基于代理(Proxying)，而 AspectJ 基于字节码操作(Bytecode Manipulation)。

Spring AOP 已经集成了 AspectJ ，AspectJ 应该算的上是 Java 生态系统中最完整的 AOP 框架了。AspectJ 相比于 Spring AOP 功能更加强大，但是 Spring AOP 相对来说更简单，

如果我们的切面比较少，那么两者性能差异不大。但是，当切面太多的话，最好选择 AspectJ ，它比 Spring AOP 快很

**AspectJ定义的通知类型**

> **Before**（前置通知）：目标对象的方法调用之前触发
>
> **After** （后置通知）：目标对象的方法调用之后触发
>
> **AfterReturning**（返回通知）：目标对象的方法调用完成，在返回结果值之后触发
>
> **AfterThrowing**（异常通知） ：目标对象的方法运行中抛出 / 触发异常后触发。AfterReturning 和 AfterThrowing 两者互斥。如果方法调用成功无异常，则会有返回值；如果方法抛出了异常，则不会有返回值。
>
> **Around** （环绕通知）：编程式控制目标对象的方法调用。环绕通知是所有通知类型中可操作范围最大的一种，因为它可以直接拿到目标对象，以及要执行的方法，所以环绕通知可以任意的在目标对象的方法调用前后搞事，甚至不调用目标对象的方法

## Spring MVC

MVC 是模型(Model)、视图(View)、控制器(Controller)的简写，其核心思想是通过将业务逻辑、数据、显示分离来组织代码。

### Spring MVC工作原理

- **`DispatcherServlet`** ：**核心的中央处理器**，负责接收请求、分发，并给予客户端响应。
- **`HandlerMapping`** ：**处理器映射器**，根据 uri 去匹配查找能处理的 `Handler` ，并会将请求涉及到的拦截器和 `Handler` 一起封装
- **`HandlerAdapter`** ：**处理器适配器**，根据 `HandlerMapping` 找到的 `Handler` ，适配执行对应的 `Handler`；
- **`Handler`** ：**请求处理器**，处理实际请求的处理器。
- **`ViewResolver`** ：**视图解析器**，根据 `Handler` 返回的逻辑视图 / 视图，解析并渲染真正的视图，并传递给 `DispatcherServlet` 响应客户端

![img](https://bd-hexo.oss-cn-beijing.aliyuncs.com/img/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBASkFWQeaIkOelng==,size_20,color_FFFFFF,t_70,g_se,x_16.png)

**流程(重要)**

1. 客户端（浏览器）发送请求， `DispatcherServlet`拦截请求。
2. `DispatcherServlet` 根据请求信息调用 `HandlerMapping` 。`HandlerMapping` 根据 uri 去匹配查找能处理的 `Handler`（也就是我们平常说的 `Controller` 控制器） ，并会将请求涉及到的拦截器和 `Handler` 一起封装。
3. `DispatcherServlet` 调用 `HandlerAdapter`适配执行 `Handler` 。
4. `Handler` 完成对用户请求的处理后，会返回一个 `ModelAndView` 对象给`DispatcherServlet`，`ModelAndView` 顾名思义，包含了数据模型以及相应的视图的信息。`Model` 是返回的数据对象，`View` 是个逻辑上的 `View`。
5. `ViewResolver` 会根据逻辑 `View` 查找实际的 `View`。
6. `DispaterServlet` 把返回的 `Model` 传给 `View`（视图渲染）。
7. 把 `View` 返回给请求者（浏览器）

### 统一异常处理

推荐使用注解的方式统一异常处理，具体会使用到 `@ControllerAdvice` + `@ExceptionHandler` 这两个注解 。

~~~java
@ControllerAdvice
@ResponseBody
public class GlobalExceptionHandler {

    @ExceptionHandler(BaseException.class)
    public ResponseEntity<?> handleAppException(BaseException ex, HttpServletRequest request) {
      //......
    }

    @ExceptionHandler(value = ResourceNotFoundException.class)
    public ResponseEntity<ErrorReponse> handleResourceNotFoundException(ResourceNotFoundException ex, HttpServletRequest request) {
      //......
    }
}
~~~

这种异常处理方式下，会给所有或者指定的 `Controller` 织入异常处理的逻辑（AOP），当 `Controller` 中的方法抛出异常的时候，由被`@ExceptionHandler` 注解修饰的方法进行处理。

`ExceptionHandlerMethodResolver` 中 `getMappedMethod` 方法决定了异常具体被哪个被 `@ExceptionHandler` 注解修饰的方法处理异常。

```java
Nullable
	private Method getMappedMethod(Class<? extends Throwable> exceptionType) {
		List<Class<? extends Throwable>> matches = new ArrayList<>();
    //找到可以处理的所有异常信息。mappedMethods 中存放了异常和处理异常的方法的对应关系
		for (Class<? extends Throwable> mappedException : this.mappedMethods.keySet()) {
			if (mappedException.isAssignableFrom(exceptionType)) {
				matches.add(mappedException);
			}
		}
    // 不为空说明有方法处理异常
		if (!matches.isEmpty()) {
      // 按照匹配程度从小到大排序
			matches.sort(new ExceptionDepthComparator(exceptionType));
      // 返回处理异常的方法
			return this.mappedMethods.get(matches.get(0));
		}
		else {
			return null;
		}
	}
```

从源代码看出： **`getMappedMethod()`会首先找到可以匹配处理异常的所有方法信息，然后对其进行从小到大的排序，最后取最小的那一个匹配的方法(即匹配度最高的那个)**

## Spring中的设计模式

**工厂设计模式** : Spring 使用工厂模式通过 `BeanFactory`、`ApplicationContext` 创建 bean 对象。

**代理设计模式** : Spring AOP 功能的实现。

**单例设计模式** : Spring 中的 Bean 默认都是单例的。

**模板方法模式** : Spring 中 `jdbcTemplate`、`hibernateTemplate` 等以 Template 结尾的对数据库操作的类，它们就使用到了模板模式。

**包装器设计模式** : 我们的项目需要连接多个数据库，而且不同的客户在每次访问中根据需要会去访问不同的数据库。这种模式让我们可以根据客户的需求能够动态切换不同的数据源。

**观察者模式:** Spring 事件驱动模型就是观察者模式很经典的一个应用。

**适配器模式** : Spring AOP 的增强或通知(Advice)使用到了适配	器模式、spring MVC 中也是用到了适配器模式适配`Controller`。

建议阅读：https://javaguide.cn/system-design/framework/spring/spring-design-patterns-summary.html#%E6%8E%A7%E5%88%B6%E5%8F%8D%E8%BD%AC-ioc-%E5%92%8C%E4%BE%9D%E8%B5%96%E6%B3%A8%E5%85%A5-di

## Spring事务

https://blog.csdn.net/donggua3694857/article/details/69858827

Spring事务的本质其实就是数据库对事务的支持

### 事务相关理论

与事务相关的理论：

众所周知，事务有四大特性（ACID）

1.原子性（Atomicity）事务是一个原子操作，由一系列动作组成。事务的原子性确保动作要么全部完成，要么完全不起作用。

2.一致性（Consistency）事务在完成时，必须是所有的数据都保持一致状态。

3.隔离性（Isolation）并发事务执行之间无影响，在一个事务内部的操作对其他事务是不产生影响，这需要事务隔离级别来指定隔离性。

4.持久性（Durability）一旦事务完成，数据库的改变必须是持久化的。

在企业级应用中，多用户访问数据库是常见的场景，这就是所谓的事务的并发。事务并发所可能存在的问题：
1.脏读：一个事务读到另一个事务未提交的更新数据。
2.不可重复读：一个事务两次读同一行数据，可是这两次读到的数据不一样。
3.幻读：一个事务执行两次查询，但第二次查询比第一次查询多出了一些数据行。
4.丢失更新：撤消一个事务时，把其它事务已提交的更新的数据覆盖了。

对应JDB的事务：

TRANSACTION_NONE JDBC 驱动不支持事务
TRANSACTION_READ_UNCOMMITTED 允许脏读、不可重复读和幻读。
TRANSACTION_READ_COMMITTED 禁止脏读，但允许不可重复读和幻读。
TRANSACTION_REPEATABLE_READ 禁止脏读和不可重复读，单运行幻读。
TRANSACTION_SERIALIZABLE 禁止脏读、不可重复读和幻读。

这些知识在数据库部分都有说明

出于性能的考虑我们一般设置TRANSACTION_READ_COMMITTED就差不多了，剩下的通过使用数据库的锁来帮我们处理别的，关于数据库的锁这个之后再说。

### Spring事务管理的两种方式

**编程式事务** ： 在代码中硬编码(不推荐使用) : 通过 `TransactionTemplate`或者 `TransactionManager` 手动管理事务，实际应用中很少使用，但是对于你理解 Spring 事务管理原理有帮助。

**声明式事务** ： 在 XML 配置文件中配置或者直接基于注解（推荐使用） : 实际是通过 AOP 实现（基于`@Transactional` 的全注解方式使用最多）

### Spring事务

Spring事务管理的核心接口是PlatformTransactionManager

事务管理器接口通过getTransaction(TransactionDefinition definition)方法根据指定的传播行为返回当前活动的事务或创建一个新的事务，这个方法里面的参数是TransactionDefinition类，这个类就定义了一些基本的事务属性。
在TransactionDefinition接口中定义了它自己的传播行为和隔离级别

### Spring的七种事务传播属性

当事务方法被另一个事务方法调用时，必须指定事务应该如何传播。例如：方法可能继续在现有事务中运行，也可能开启一个新事务，并在自己的事务中运行。

| 名称                      | 值   | 解释                                                         |
| ------------------------- | ---- | ------------------------------------------------------------ |
| PROPAGATION_REQUIRED      | 0    | 支持当前事务，如果当前没有事务，就新建一个事务。这是最常见的选择，也是Spring默认的事务的传播。 |
| PROPAGATION_SUPPORTS      | 1    | 支持当前事务，如果当前没有事务，就以非事务方式执行。         |
| PROPAGATION_MANDATORY     | 2    | 支持当前事务，如果当前没有事务，就抛出异常。                 |
| PROPAGATION_REQUIRES_NEW  | 3    | 新建事务，如果当前存在事务，把当前事务挂起。                 |
| PROPAGATION_NOT_SUPPORTED | 4    | 以非事务方式执行操作，如果当前存在事务，就把当前事务挂起。   |
| PROPAGATION_NEVER         | 5    | 以非事务方式执行，如果当前存在事务，则抛出异常。             |
| PROPAGATION_NESTED        | 6    | 如果当前存在事务，则在嵌套事务内执行。如果当前没有事务，则进行与PROPAGATION_REQUIRED类似的操作。 |

### Spring事务隔离级别

| 名称                       | 值   | 解释                                                         |
| -------------------------- | ---- | ------------------------------------------------------------ |
| ISOLATION_DEFAULT          | -1   | 这是一个PlatfromTransactionManager默认的隔离级别，使用数据库默认的事务隔离级别。另外四个与JDBC的隔离级别相对应 |
| ISOLATION_READ_UNCOMMITTED | 1    | 这是事务最低的隔离级别，它充许另外一个事务可以看到这个事务未提交的数据。这种隔离级别会产生脏读，不可重复读和幻读。 |
| ISOLATION_READ_COMMITTED   | 2    | 保证一个事务修改的数据提交后才能被另外一个事务读取。另外一个事务不能读取该事务未提交的数据。 |
| ISOLATION_REPEATABLE_READ  | 4    | 这种事务隔离级别可以防止脏读，不可重复读。但是可能出现幻读。 |
| ISOLATION_SERIALIZABLE     | 8    | 这是花费最高代价但是最可靠的事务隔离级别。事务被处理为顺序执行。除了防止脏读，不可重复读外，还避免了幻读。 |

### @Transactional(rollbackFor = Exception.class)注解了解吗？

`Exception` 分为运行时异常 `RuntimeException` 和非运行时异常。事务管理对于企业应用来说是至关重要的，即使出现异常情况，它也可以保证数据的一致性。

当 `@Transactional` 注解作用于类上时，该类的所有 public 方法将都具有该类型的事务属性，同时，我们也可以在方法级别使用该标注来覆盖类级别的定义。如果类或者方法加了这个注解，那么这个类里面的方法抛出异常，就会回滚，数据库里面的数据也会回滚。

在 `@Transactional` 注解中如果不配置`rollbackFor`属性,那么事务只会在遇到`RuntimeException`的时候才会

