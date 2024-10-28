---
title: Mybatis-Plus入门文档
categories: Java后端
tags:
  - Java后端
  - Mybatis-Plus
description: 摘要
cover: 'https://bd-hexo.oss-cn-beijing.aliyuncs.com/img/mybatis-plus.png'
abbrlink: dab99491
date: 2022-07-25 20:43:16
top_img:
---

# MyBatisPlus概述

- 是什么？ MyBatis 本来就是简化 JDBC 操作的！ 官网：https://mp.baomidou.com/ MyBatis Plus，简化 MyBatis ！
- 无侵入：只做增强不做改变，引入它不会对现有工程产生影响，如丝般顺滑 
- 损耗小：启动即会自动注入基本 CURD，性能基本无损耗，直接面向对象操作， BaseMapper 强大的 CRUD 操作：内置通用 Mapper、通用 Service，仅仅通过少量配置即可实现单表大部分 CRUD 操作，更有强大的条件构造器，满足各类使用需求, 以后简单的CRUD操作，它不用自己编写 了！ 
- 支持 Lambda 形式调用：通过 Lambda 表达式，方便的编写各类查询条件，无需再担心字段写错 
- 支持主键自动生成：支持多达 4 种主键策略（内含分布式唯一 ID 生成器 - Sequence），可自由配 置，完美解决主键问题 支持 ActiveRecord 
- 模式：支持 ActiveRecord 形式调用，实体类只需继承 Model 类即可进行强大 的 CRUD 操作 
- 支持自定义全局通用操作：支持全局通用方法注入（ Write once, use anywhere ） 
- 内置代码生成器：采用代码或者 Maven 插件可快速生成 Mapper 、 Model 、 Service 、 Controller 层代码，支持模板引擎，更有超多自定义配置等您来使用（自动帮你生成代码） 
- 内置分页插件：基于 MyBatis 物理分页，开发者无需关心具体操作，配置好插件之后，写分页等同 于普通 List 查询 
- 分页插件支持多种数据库：支持 MySQL、MariaDB、Oracle、DB2、H2、HSQL、SQLite、 Postgre、SQLServer 等多种数据库 
- 内置性能分析插件：可输出 Sql 语句以及其执行时间，建议开发测试时启用该功能，能快速揪出慢 查询 
- 内置全局拦截插件：提供全表 delete 、 update 操作智能分析阻断，也可自定义拦截规则，预防误 操作

# QuickStart

[快速开始 | MyBatis-Plus (baomidou.com)](https://mp.baomidou.com/guide/quick-start.html#)

1. 导入依赖
2. 研究依赖如何配置
3. 代码如何编写
4. 提高拓展技术能力

## **开始**

1. 创建数据库

2. 创建user表

   ~~~sql
   DROP TABLE IF EXISTS user;
   CREATE TABLE user
   (
   id BIGINT(20) NOT NULL COMMENT '主键ID',
   name VARCHAR(30) NULL DEFAULT NULL COMMENT '姓名',
   age INT(11) NULL DEFAULT NULL COMMENT '年龄',
   email VARCHAR(50) NULL DEFAULT NULL COMMENT '邮箱',
   PRIMARY KEY (id)
   );
   INSERT INTO user (id, name, age, email) VALUES
   (1, 'Jone', 18, 'test1@baomidou.com'),
   (2, 'Jack', 20, 'test2@baomidou.com'),
   (3, 'Tom', 28, 'test3@baomidou.com'),
   (4, 'Sandy', 21, 'test4@baomidou.com'),
   (5, 'Billie', 24, 'test5@baomidou.com');
   -- 真实开发中，version（乐观锁）、deleted（逻辑删除）、gmt_create、gmt_modified	
   ~~~

3. 初始化项目，使用springboot

4. 导入依赖

   ```xml
       <dependency>
           <groupId>com.baomidou</groupId>
           <artifactId>mybatis-plus-boot-starter</artifactId>
           <version>Latest Version</version>
       </dependency>
   ```

## 配置

**application.yml**

日志也配上

```yaml
    spring:
      datasource:
        username: root
        password: qsj123
        #?serverTimezone=UTC解决时区的报错
        url: jdbc:mysql://localhost:3306/mybatis_plus?serverTimezone=UTC%2B8&useUnicode=true&characterEncoding=utf-8
        driver-class-name: com.mysql.cj.jdbc.Driver
      servlet:
        multipart:
          enabled: true
          max-file-size: 100MB
          max-request-size: 101MB
    server:
      port: 8081
    mybatis-plus:
      configuration:
        log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
```

## 编码

编写实体类 `User.java`（此处使用了 [Lombok (opens new window)](https://www.projectlombok.org/)简化代码）

```java
@Data
public class User {
    private Long id;
    private String name;
    private Integer age;
    private String email;
}
```

编写Mapper类 `UserMapper.java`

```java
public interface UserMapper extends BaseMapper<User> {

}
```

BaseMapper里为泛型

## 编写测试类

```java
@Test
void testSelect(){
    System.out.println(("----- selectAll method test ------"));
    List<User> userList = userMapper.selectList(null);
    userList.forEach(System.out::println);
}
```

# CRUD

## 插入

~~~java
@Data
public class User {
    private Long id;
    private String name;
    private Integer age;
    private String email;
}
~~~

此处一并展示实体类User

```java
@Test
void testInsert(){
    User user = new User();
    user.setAge(3);
    user.setEmail("295935489@qq.com");
    user.setName("swa");
    int result =userMapper.insert(user);
    System.out.println(user);
    System.out.println(result);
}
```

此时并没有设置主键，mybatis-plus会使用雪花算法为我们实现唯一主键

**同时我们可以使用注解来生成主键**

[@TableId(opens new window)](https://github.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-annotation/src/main/java/com/baomidou/mybatisplus/annotation/TableId.java)

- 描述：主键注解

| 属性  |  类型  | 必须指定 |   默认值    |    描述    |
| :---: | :----: | :------: | :---------: | :--------: |
| value | String |    否    |     ""      | 主键字段名 |
| type  |  Enum  |    否    | IdType.NONE |  主键类型  |

[#](https://mp.baomidou.com/guide/annotation.html#idtype)[IdType(opens new window)](https://github.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-annotation/src/main/java/com/baomidou/mybatisplus/annotation/IdType.java)

|        值         | 描述                                                         |
| :---------------: | :----------------------------------------------------------- |
|       AUTO        | 数据库ID自增                                                 |
|       NONE        | 无状态,该类型为未设置主键类型(注解里等于跟随全局,全局里约等于 INPUT) |
|       INPUT       | insert前自行set主键值                                        |
|     ASSIGN_ID     | 分配ID(主键类型为Number(Long和Integer)或String)(since 3.3.0),使用接口`IdentifierGenerator`的方法`nextId`(默认实现类为`DefaultIdentifierGenerator`雪花算法) |
|    ASSIGN_UUID    | 分配UUID,主键类型为String(since 3.3.0),使用接口`IdentifierGenerator`的方法`nextUUID`(默认default方法) |
|   ~~ID_WORKER~~   | 分布式全局唯一ID 长整型类型(please use `ASSIGN_ID`)          |
|     ~~UUID~~      | 32位UUID字符串(please use `ASSIGN_UUID`)                     |
| ~~ID_WORKER_STR~~ | 分布式全局唯一ID 字符串类型(please use `ASSIGN_ID`)          |

如

```java
public class User {
    @TableId(type = IdType.AUTO)
    private Long id;
    private String name;
    private Integer age;
    private String email;
}
```



## 修改

Mybatis-Plus 会为我们生成动态sql语句

```java
void testUpdate(){
    User user = new User();
    user.setId(3L);
    user.setAge(4);
    userMapper.updateById(user);
}
```

此处只改了age

也可以加其他参数，加什么改什么

## 自动填充功能（时间为例）

创建时间、修改时间！这些个操作一遍都是自动化完成的，我们不希望手动更新！ 

阿里巴巴开发手册：所有的数据库表：gmt_create、gmt_modified几乎所有的表都要配置上！而且需 要自动化！

- 方法1：数据库级别

  数据库设置

  方法2：代码级别

  ```java
  @Slf4j
  @Component // 一定不要忘记把处理器加到IOC容器中！
  public class MyMetaObjectHandler implements MetaObjectHandler {
      // 插入时的填充策略
      @Override
      public void insertFill(MetaObject metaObject) {
          log.info("start insert fill.....");
          // setFieldValByName(String fieldName, Object fieldVal, MetaObject metaObject
          this.setFieldValByName("createTime",new Date(),metaObject);
          this.setFieldValByName("updateTime",new Date(),metaObject);
      }
  
      // 更新时的填充策略
      @Override
      public void updateFill(MetaObject metaObject) {
          log.info("start update fill.....");
          this.setFieldValByName("updateTime",new Date(),metaObject);
      }
  }
  ```
  
  注意：localDateTime用这个

  ~~~java
  this.strictInsertFill(metaObject, "createDate", LocalDateTime.class, LocalDateTime.now());
  ~~~
  
  
  
  重写Mybatis-Plus中的MetaObjectHandler
  
  ```java
  // 字段添加填充内容
  @TableField(fill = FieldFill.INSERT)
  private Date createTime;
  
  @TableField(fill = FieldFill.INSERT_UPDATE)
  private Date updateTime;
  ```
  
  实体类字段属性上需要增加注解

**详细自动填充功能**：[自动填充功能 | MyBatis-Plus (baomidou.com)](https://mp.baomidou.com/guide/auto-fill-metainfo.html)

但是不用用官方的那个LocalDateTime，直接用java的date类型就行

## 乐观锁

[乐观锁 | MyBatis-Plus (baomidou.com)](https://mp.baomidou.com/guide/interceptor-optimistic-locker.html#optimisticlockerinnerinterceptor)

面试过程中常被问到乐观锁，对应悲观锁

> 乐观锁：它总认为不会出问题，无论干什么不去上锁！如果出了问题再次更新值测试！
>
> 悲观锁：十分悲观，它认为总会出问题，无论干什么先去上锁！再去操作！

version、new version

[#](https://mp.baomidou.com/guide/interceptor-optimistic-locker.html#optimisticlockerinnerinterceptor)OptimisticLockerInnerInterceptor

> 当要更新一条记录的时候，希望这条记录没有被别人更新
> 乐观锁实现方式：
>
> > - 取出记录时，获取当前version
> > - 更新时，带上这个version
> > - 执行更新时， set version = newVersion where version = oldVersion
> > - 如果version不对，就更新失败

大概意思就是，改表中某行时，需要先获取版本号，然后更新的时候带上版本更新，如果当前版本比老版本大1，则执行更新，并且版本号加1，如果不是，那么更新失败（说明此时已经有其他线程更新了该行）

**乐观锁配置需要两步**

[#](https://mp.baomidou.com/guide/interceptor-optimistic-locker.html#_1-配置插件)1.配置插件

spring xml方式:

```xml
<bean class="com.baomidou.mybatisplus.extension.plugins.inner.OptimisticLockerInnerInterceptor" id="optimisticLockerInnerInterceptor"/>

<bean id="mybatisPlusInterceptor" class="com.baomidou.mybatisplus.extension.plugins.MybatisPlusInterceptor">
    <property name="interceptors">
        <list>
            <ref bean="optimisticLockerInnerInterceptor"/>
        </list>
    </property>
</bean>
```

spring boot注解方式:

```java
@Bean
public MybatisPlusInterceptor mybatisPlusInterceptor() {
    MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
    interceptor.addInnerInterceptor(new OptimisticLockerInnerInterceptor());
    return interceptor;
}
```

[#](https://mp.baomidou.com/guide/interceptor-optimistic-locker.html#_2-在实体类的字段上加上-version注解)2.在实体类的字段上加上`@Version`注解

```java
@Version
private Integer version;
```

说明:

- **支持的数据类型只有:int,Integer,long,Long,Date,Timestamp,LocalDateTime**
- 整数类型下 `newVersion = oldVersion + 1`
- `newVersion` 会回写到 `entity` 中
- 仅支持 `updateById(id)` 与 `update(entity, wrapper)` 方法
- **在 `update(entity, wrapper)` 方法下, `wrapper` 不能复用!!!**

示例：

```java
// Spring Boot 方式
@Configuration
@MapperScan("按需修改")
public class MybatisPlusConfig {
    /**
     * 旧版
     */
    @Bean
    public OptimisticLockerInterceptor optimisticLockerInterceptor() {
        return new OptimisticLockerInterceptor();
    }
    
    /**
     * 新版
     */
    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor mybatisPlusInterceptor = new MybatisPlusInterceptor();
        mybatisPlusInterceptor.addInnerInterceptor(new OptimisticLockerInnerInterceptor());
        return mybatisPlusInterceptor;
    }
}
```

**测试：**

查询id为2的并修改

![image-20211020205738207](https://bd-hexo.oss-cn-beijing.aliyuncs.com/img/image-20211020205738207.png)

模拟插队

![image-20211020205906452](https://bd-hexo.oss-cn-beijing.aliyuncs.com/img/image-20211020205906452.png)

user2update时查询到的版本号符合new=old+1

user1update时查询到的版本号为new=old+2

所以下面user1的update不执行

![image-20211020210107010](https://bd-hexo.oss-cn-beijing.aliyuncs.com/img/image-20211020210107010.png)

![image-20211020210031229](https://bd-hexo.oss-cn-beijing.aliyuncs.com/img/image-20211020210031229.png)

## 查询

```java
// 测试查询
@Test
public void testSelectById(){
    User user = userMapper.selectById(1L);
    System.out.println(user);
}

// 测试批量查询！
@Test
public void testSelectByBatchId(){
    List<User> users = userMapper.selectBatchIds(Arrays.asList(1, 2, 3));
    users.forEach(System.out::println);
}

// 按条件查询之一使用map操作（map是）
@Test
public void testSelectByBatchIds(){
    HashMap<String, Object> map = new HashMap<>();
    // 自定义要查询
    map.put("name","狂神说Java");
    map.put("age",3);

    List<User> users = userMapper.selectByMap(map);
    users.forEach(System.out::println);
}
```

## 分页查询

分页在网站使用十分之多（bilibili视频分页）

1、原始limit分页（sql语句）

2、pageHelper 第三方插件

3、MybatisPlus内置分页插件

[MybatisPlus分页插件](https://mp.baomidou.com/guide/interceptor-pagination.html#paginationinnerinterceptor)

**如何使用？**

[MP新版插件使用](https://mp.baomidou.com/guide/interceptor.html#mybatisplusinterceptor)

~~~java
 @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.H2));
        return interceptor;
    }
~~~

对面乐观锁插件配置和分页插件配置，插件的配置就是在interceptor里加东西（新版插件配置方法）

然后测试一下

```java
@Test
void testPage(){
    //参数1：当前页 参数2：页面大小
    IPage<User> page = new PageDTO<>(1,5);
    userMapper.selectPage(page,null);
    page.getRecords().forEach(System.out::println);
}
```

![image-20211020172250555](https://bd-hexo.oss-cn-beijing.aliyuncs.com/img/image-20211020172250555.png)

实质是执行了limit语句

## 删除

同查询

## 逻辑删除

[MP逻辑删除](https://mp.baomidou.com/guide/logic-delete.html#%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95)

- 物理删除：直接删数据库的字段
- 逻辑删除：可以给字段设置个属性deleted，用0和1代表他删没删除。删除了他是存在的，只是用户查不到

**只对自动注入的sql起效:**

- 插入: 不作限制
- 查找: 追加where条件过滤掉已删除数据,且使用 wrapper.entity 生成的where条件会忽略该字段
- 更新: 追加where条件防止更新到已删除数据,且使用 wrapper.entity 生成的where条件会忽略该字段
- 删除: 转变为 更新

例如:

- **删除: `update user set deleted=1 where id = 1 and deleted=0`**
- **查找: `select id,name,deleted from user where deleted=0`**

字段类型支持说明:

- 支持所有数据类型(推荐使用 `Integer`,`Boolean`,`LocalDateTime`)
- 如果数据库字段使用`datetime`,逻辑未删除值和已删除值支持配置为字符串`null`,另一个值支持配置为函数来获取值如`now()`

附录:

- 逻辑删除是为了方便数据恢复和保护数据本身价值等等的一种方案，但实际就是删除。
- 如果你需要频繁查出来看就不应使用逻辑删除，而是以一个状态去表示。

**使用方法**

1. 配置application.yml

   ```yaml
   mybatis-plus:
     global-config:
       db-config:
         logic-delete-field: flag  # 全局逻辑删除的实体字段名(since 3.3.0,配置后可以忽略不配置步骤2)
         logic-delete-value: 1 # 逻辑已删除值(默认为 1)
         logic-not-delete-value: 0 # 逻辑未删除值(默认为 0)
   ```

2. 实体类相应字段加上注解，表示他是是否删除的标志（对应数据库中字段）

   ```java
   @TableLogic
   private Integer deleted;
   ```

3. 此时调用方法查或方法删时，自动拼接sql语句

   ```java
   @Test
   void testDelete(){
       userMapper.deleteById(1);
       List<User> list =userMapper.selectList(null);
       list.forEach(System.out::println);
   }
   ```

   ![image-20211020174233484](https://bd-hexo.oss-cn-beijing.aliyuncs.com/img/image-20211020174233484.png)

   如图，调用delete实际上是用的update语句修改了deleted属性

   调用select语句则在后面拼接了where语句

# 性能分析插件

开发时会遇到一些慢sql。测试！druid

性能分析插件，如果超过时间就会停止运行，不建议生产环境使用，测试可用

https://mp.baomidou.com/guide/p6spy.html

# 条件构造器wrapper

https://mp.baomidou.com/guide/wrapper.html

**十分重要！！**

写一些复杂的sql可以用它替代！所有sql语句都可以用wrapper来写

举例：

## 例子

```java
    @Test
    void test1(){
        QueryWrapper<User> wrapper = new QueryWrapper<>();
        wrapper.isNotNull("name")
                .isNotNull("email")
                .ge("age",12);
        userMapper.selectList(wrapper).forEach(System.out::println);
    }
```

可以同时写多个点约束多个条件（链式编程）

上面代码是筛选name不空 email不空 age大于等于12的

![image-20211021163024137](https://bd-hexo.oss-cn-beijing.aliyuncs.com/img/image-20211021163024137.png)

![image-20211021163014743](https://bd-hexo.oss-cn-beijing.aliyuncs.com/img/image-20211021163014743.png)

查询时自动为sql语句生成了条件

## 



```java
@Test
void test2(){
    //查询名字为Tom的
    QueryWrapper<User> wrapper = new QueryWrapper<>();
    wrapper.eq("name","Tom");
    User user = userMapper.selectOne(wrapper);
    System.out.println(user);
}
```

![image-20211021163700666](https://bd-hexo.oss-cn-beijing.aliyuncs.com/img/image-20211021163700666.png)

```java
@Test
void contextLoads() {
    // 查询name不为空的用户，并且邮箱不为空的用户，年龄大于等于12
    QueryWrapper<User> wrapper = new QueryWrapper<>();
    wrapper
            .isNotNull("name")
            .isNotNull("email")
            .ge("age",12);
    userMapper.selectList(wrapper).forEach(System.out::println); // 和我们刚才学习的map对比一下
}

@Test
void test2(){
    // 查询名字狂神说
    QueryWrapper<User> wrapper = new QueryWrapper<>();
    wrapper.eq("name","狂神说");
    User user = userMapper.selectOne(wrapper); // 查询一个数据，出现多个结果使用List 或者 Map
    System.out.println(user);
}

@Test
void test3(){
    // 查询年龄在 20 ~ 30 岁之间的用户
    QueryWrapper<User> wrapper = new QueryWrapper<>();
    wrapper.between("age",20,30); // 区间
    Integer count = userMapper.selectCount(wrapper);// 查询结果数
    System.out.println(count);
}

// 模糊查询
@Test
void test4(){
    // 查询年龄在 20 ~ 30 岁之间的用户
    QueryWrapper<User> wrapper = new QueryWrapper<>();
    // 左和右  t%
    wrapper
            .notLike("name","e")
            .likeRight("email","t");

    List<Map<String, Object>> maps = userMapper.selectMaps(wrapper);
    maps.forEach(System.out::println);
}

// 模糊查询
@Test
void test5(){

    QueryWrapper<User> wrapper = new QueryWrapper<>();
    // id 在子查询中查出来
    wrapper.inSql("id","select id from user where id<3");

    List<Object> objects = userMapper.selectObjs(wrapper);
    objects.forEach(System.out::println);
}

//测试六
@Test
void test6(){
    QueryWrapper<User> wrapper = new QueryWrapper<>();
    // 通过id进行排序
    wrapper.orderByAsc("id");

    List<User> users = userMapper.selectList(wrapper);
    users.forEach(System.out::println);
}
```

# 代码自动生成器

十分好用，好用个几把 天天给我整版本不兼容

https://www.bilibili.com/video/BV17E411N7KN?p=16&spm_id_from=pageDriver

依赖：

~~~xml
 <!-- 代码自动生成器依赖-->
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-generator</artifactId>
            <version>3.0.5</version>
        </dependency>
 
        <dependency>
            <groupId>org.apache.velocity</groupId>
            <artifactId>velocity-engine-core</artifactId>
            <version>2.2</version>
        </dependency>
~~~

代码：

~~~java
public static void main(String[] args) {
                //创建Generator对象
                AutoGenerator autoGenerator = new AutoGenerator();

                /***********数据源配置****************/
                DataSourceConfig dataSourceConfig = new DataSourceConfig();
                dataSourceConfig.setDbType(DbType.MYSQL);
                dataSourceConfig.setUrl("jdbc:mysql://localhost:3306/bdblog?useUnicode=true&characterEncoding=UTF-8");
                dataSourceConfig.setUsername("root");
                dataSourceConfig.setPassword("qsj123");
                dataSourceConfig.setDriverName("com.mysql.cj.jdbc.Driver");
                autoGenerator.setDataSource(dataSourceConfig);

                /***********全局配置****************/
                GlobalConfig globalConfig = new GlobalConfig();
                //获取当前系统目录usr.dir，然后后面跟自己的模块名和代码路径
                globalConfig.setOutputDir(System.getProperty("user.dir")+"/src/main/java");
                globalConfig.setOpen(true);
                globalConfig.setAuthor("BDsnake");
                autoGenerator.setGlobalConfig(globalConfig);
//              开启swagger2注解
                globalConfig.setSwagger2(true);

                /***********包配置****************/
                PackageConfig packageConfig = new PackageConfig();
                //父package
                packageConfig.setParent("com.bdblog");
                //本身package名，可以不设置
//                packageConfig.setModuleName("generator");
                //controller包名
                packageConfig.setController("controller");
                //service包名
                packageConfig.setService("service");
                //serviceImpl包名
                packageConfig.setServiceImpl("service.impl");
                //mapper包名
                packageConfig.setMapper("mapper");
                //实体类包名
                packageConfig.setEntity("entity");
                autoGenerator.setPackageInfo(packageConfig);

                /***********配置策略****************/
                StrategyConfig strategyConfig = new StrategyConfig();
                strategyConfig.setEntityLombokModel(true);
                //设置自动生成哪张表，不设置默认生成全部表
//                strategyConfig.setInclude("grade");
                //设置去除表名"t_"前缀
//                strategyConfig.setTablePrefix("t_");
                //逻辑删除字段设置
                strategyConfig.setLogicDeleteFieldName("deleted");
                strategyConfig.setNaming(NamingStrategy.underline_to_camel);
                strategyConfig.setColumnNaming(NamingStrategy.underline_to_camel);
                autoGenerator.setStrategy(strategyConfig);
                autoGenerator.execute();
            }
~~~



# 可能出现的错误

## LocalDateTime 与数据库 datetime类型映射错误

Error attempting to get column 'create_time' from result set.  Cause: java.sql.SQLFeatureNotSupporte

原因：使用了druid，且版本过低，更新版本即可解决
