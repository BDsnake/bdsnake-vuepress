---
title: Mybatis-Plus代码生成器
categories: Java后端
tags:
  - Java后端
  - 开发模板
  - Mybatis-Plus
description: 摘要
cover: 'https://bd-hexo.oss-cn-beijing.aliyuncs.com/img/mybatis-plus.png'
abbrlink: 7efc2ccc
createtime: 2022-08-31 15:38:16
top_img:
---

MP代码生成器网上的模板差异很大，实测大概为版本更新导致的代码风格不同，此文档记录不同版本下MP代码生成器的应用

# MP版本3.4.3.4

~~~xml
        <!-- 代码自动生成器依赖-->
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-generator</artifactId>
            <version>3.2.0</version>
        </dependency>
        <dependency>
            <groupId>org.apache.velocity</groupId>
            <artifactId>velocity-engine-core</artifactId>
            <version>2.2</version>
        </dependency>
        <!-- mp-->
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-boot-starter</artifactId>
            <version>3.4.3.4</version>
        </dependency>
~~~

~~~java
public class AutoCode {
    @Test
    public void ac(){
        //创建Generator对象
        AutoGenerator autoGenerator = new AutoGenerator();

        /***********数据源配置****************/
        DataSourceConfig dataSourceConfig = new DataSourceConfig();
        dataSourceConfig.setDbType(DbType.MYSQL);
        dataSourceConfig.setUrl("jdbc:mysql://xxx.xxx.xxx.xxx/xxxx?serverTimezone=Asia/Shanghai&useUnicode=true&characterEncoding=utf-8");
        dataSourceConfig.setUsername("root");
        dataSourceConfig.setPassword("xxxxxx");
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
//        globalConfig.setSwagger2(true);

        /***********包配置****************/
        PackageConfig packageConfig = new PackageConfig();
        //父package
        packageConfig.setParent("com.xxxxx");
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
                strategyConfig.setInclude("xxxxxx");
        //设置去除表名"t_"前缀
//                strategyConfig.setTablePrefix("t_");
        //逻辑删除字段设置
        strategyConfig.setLogicDeleteFieldName("deleted");
        strategyConfig.setNaming(NamingStrategy.underline_to_camel);
        strategyConfig.setColumnNaming(NamingStrategy.underline_to_camel);
        autoGenerator.setStrategy(strategyConfig);
        autoGenerator.execute();
    }
}
~~~

