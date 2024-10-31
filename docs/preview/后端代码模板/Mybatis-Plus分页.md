---
title: Mybatis-Plus分页
createTime: 2024/10/28 16:11:26
permalink: /article/6z7lw6pj/
---


# 代码模板：Mybatis(或Plus)分页的几种情况

## PageHelper



## MybatisPlus分页

很简单

**先创建分页信息**

```java
IPage<T> iPage = new Page<>(pageNum,pageSize);
```

**调用Mybatis-Plus自带分页查询**

IService：

```java
IPage<T> page = tService.page(iPage);
```

或Mapper

~~~java
<P extends IPage<T>> P selectPage(P page, @Param("ew") Wrapper<T> queryWrapper);
~~~

**最后，写一个封装类用来给前端返回结果**

~~~java
@Data
public class CommonPage<T> {
    private Integer pageNumber;
    private Integer pageSize;
    private Integer totalPage;
    private Long total;
    private List<T> list;

    /**
     * 将PageHelper分页后的list转为分页信息
     */
    public static <T> CommonPage<T> restPage(List<T> list) {
        CommonPage<T> result = new CommonPage<T>();
        Page<T> pageInfo = new Page<T>().setRecords(list);
        result.setTotalPage((int) pageInfo.getPages());
        result.setPageNumber((int) pageInfo.getCurrent());
        result.setPageSize((int) pageInfo.getSize());
        result.setTotal(pageInfo.getTotal());
        result.setList(pageInfo.getRecords());
        return result;
    }

    /**
     * 将SpringData分页后的list转为分页信息
     */
    public static <T> CommonPage<T> restPage(IPage<T> pageInfo) {
        CommonPage<T> result = new CommonPage<T>();
        result.setTotalPage((int) pageInfo.getPages());
        result.setPageNumber((int) pageInfo.getCurrent());
        result.setPageSize((int) pageInfo.getSize());
        result.setTotal(pageInfo.getTotal());
        result.setList(pageInfo.getRecords());
        return result;
    }
}
~~~

