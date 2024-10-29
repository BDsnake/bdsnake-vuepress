---
title: Java多线程操作同一变量的并发问题
categories: Java
tags:
  - Java
  - 多线程
abbrlink: 1a7192e2
createtime: 2023-08-30 15:30:16
---

# Java多线程操作同一变量的并发问题

## 背景

在多个线程更改同一个变量的情况下会出现并发问题

如下模拟买票程序

~~~java
import java.util.concurrent.locks.ReentrantLock;

/**
 * @author BDsnake
 * @since 2023/8/31 1:09
 */
public class TestRunnable implements Runnable{
    private int ticket = 20;
    @Override
    public  void run() {
        while (ticket >0){
            System.out.println(Thread.currentThread().getName()+"拿到了票"+ticket--);
            try {
                Thread.sleep(200);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

    }

    public static void main(String[] args) {
        TestRunnable t1  = new TestRunnable();
        new Thread(t1,"a").start();
        new Thread(t1,"b").start();
    }
}

~~~

![image-20230831012727007](https://bd-hexo.oss-cn-beijing.aliyuncs.com/img/image-20230831012727007.png)

会出现并发问题，ab同时抢到同一张票

## 使用重入锁实现线程同步（ReentrantLock）

~~~java
public class TestRunnable implements Runnable{
    private int ticket = 20;
    //重入锁
    ReentrantLock lock = new ReentrantLock();
    @Override
    public  void run() {
        while (ticket >0){
            //加锁
            lock.lock();
            System.out.println(Thread.currentThread().getName()+"拿到了票"+ticket--);
            lock.unlock();
            try {
                Thread.sleep(200);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

    }

    public static void main(String[] args) {
        TestRunnable t1  = new TestRunnable();
        new Thread(t1,"a").start();
        new Thread(t1,"b").start();
    }
}
~~~

## 使用synchronized

~~~java
import java.util.concurrent.locks.ReentrantLock;

/**
 * @author BDsnake
 * @since 2023/8/31 1:09
 */
public class TestRunnable implements Runnable{
    private int ticket = 20;
    @Override
    public  void run() {
        while (ticket >0){
            synchronized (this){
                System.out.println(Thread.currentThread().getName()+"拿到了票"+ticket--);
            }
            try {
                Thread.sleep(200);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

    }

    public static void main(String[] args) {
        TestRunnable t1  = new TestRunnable();
        new Thread(t1,"a").start();
        new Thread(t1,"b").start();
    }
}

~~~

## 优缺点

https://zhuanlan.zhihu.com/p/126085068

reentrantlock的优点
可以添加多个检控条件, 如果使用synchronized,则只能使用一个. 使用 reentrant locks 可以有多个wait()/notify() 队列.

译注：直接多new 几个ReentrantLock就可以了,不同的场景/条件用不同的ReentrantLock

可以控制线程得到锁的顺序,也就是有公平锁(按照进入顺序得到资源),也可以不按照顺就像.synchronized 一样.

可以查看锁的状态, 锁是否被锁上了.

可以查看当前有多少线程再等待锁.

可以响应中断

可以设定超时时间

reentrantlock的缺点
需要使用import 引入相关的Class
不能忘记在finally 模块释放锁,这个看起来比synchronized 丑陋
synchronized可以放在方法的定义里面, 而reentrantlock只能放在块里面. 比较起来, synchronized可以减少嵌套
Synchronized
Synchronized 获取锁的行为是不公平的，并非是按照申请对象锁的先后时间分配锁的，每次对象锁被释放时，每个线程都有机会获得对象锁，这样有利于提高执行性能，但是也会造成线程饥饿现象。