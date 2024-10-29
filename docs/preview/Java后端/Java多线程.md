---
title: Java多线程
categories: Java
tags:
  - Java
  - 多线程
abbrlink: a2c3ad19
createtime: 2023-08-31 15:30:16
---

# Java多线程

## 线程基本概念

暂略

## 多线程实现的三种方法

### 继承Thread类

Java单继承，所以这样并不好

~~~java
import java.util.concurrent.locks.ReentrantLock;

/**
 * @author BDsnake
 * @since 2023/8/31 19:24
 */
public class TestThread extends Thread{
    static int ticket = 20;
    ReentrantLock lock = new ReentrantLock();
    @Override
    public void run() {
        while (ticket>0){
            try {
                lock.lock();
                System.out.println(Thread.currentThread().getName()+"买票"+ticket--);
            } catch (Exception e){
                e.printStackTrace();
            }finally {
                lock.unlock();
            }
            try {
                Thread.sleep(200);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    public static void main(String[] args) {
        TestThread t1 = new TestThread();
        TestThread t2 = new TestThread();
        t1.start();
        t2.start();
    }
}

~~~

### 实现Runnable接口

此处使用的synchronized块来解决同一变量的并发问题

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

### 实现Callable方法



~~~java
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.locks.ReentrantLock;

/**
 * @author BDsnake
 * @since 2023/8/31 16:02
 */
public class TestCallable implements Callable<Boolean> {
    static int ticket = 20;
    ReentrantLock lock = new ReentrantLock();
    @Override
    public Boolean call() throws Exception {
        while (ticket>0){
            try {
                lock.lock();
                System.out.println(Thread.currentThread().getName()+"买票"+ticket--);
            }catch (Exception e){
                e.printStackTrace();
            }finally {
                lock.unlock();
            }
            Thread.sleep(200);
        }

        return true;
    }

    public static void main(String[] args) {
        TestCallable testCallable = new TestCallable();
        TestCallable t1 = new TestCallable();
        TestCallable t2 = new TestCallable();
        TestCallable t3 = new TestCallable();
        //创建执行服务
        ExecutorService ser = Executors.newFixedThreadPool(3);
        //提交执行
        Future<Boolean> r1 = ser.submit(t1);
        Future<Boolean> r2 = ser.submit(t2);
        Future<Boolean> r3 = ser.submit(t3);
        System.out.println(r1);
        System.out.println(r2);
        System.out.println(r3);
    }
}

~~~

## lambda表达式

~~~java
/**
 * @author BDsnake
 * @since 2023/8/31 19:33
 */
public class LambdaTest {
    public static void main(String[] args) {
        new Thread(()->{
            for (int i = 0; i < 20; i++) {
                System.out.println(Thread.currentThread().getName()+i);
                try {
                    Thread.sleep(200);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        },"t1").start();
        for (int i = 0; i < 20; i++) {
            System.out.println(i);
            try {
                Thread.sleep(200);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}

~~~

## 线程的状态

![image-20230831201728867](https://bd-hexo.oss-cn-beijing.aliyuncs.com/img/image-20230831201728867.png)

## 线程的方法

### sleep yield join

**sleep**
线程等待，不释放锁

**yield**
礼让

**join**
**「`Thread.join()`方法表示调用此方法的线程被阻塞，仅当该方法完成以后，才能继续运行」**。

### getState获取线程状态

~~~java

/**
 * @author BDsnake
 * @since 2023/9/1 11:11
 */
public class TestState {
    public static void main(String[] args) {
        Thread thread = new Thread(() -> {
            for (int i = 0; i < 20; i++) {
                System.out.println(Thread.currentThread().getName() + "读数:" + i);
                try {
                    Thread.sleep(500);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }, "T1");
        System.out.println(thread.getName()+"当前状态:"+thread.getState());
        thread.start();
        while (!thread.getState().equals(Thread.State.TERMINATED)){
            System.out.println(thread.getName()+"当前状态:"+thread.getState());
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        System.out.println(thread.getName()+"当前状态:"+thread.getState());
    }
}

~~~

![image-20230901112050856](https://bd-hexo.oss-cn-beijing.aliyuncs.com/img/image-20230901112050856.png)

## 线程的优先级

Thread源码中有规定优先级为1-10

先设置优先级再启动线程

~~~java

    /**
     * The minimum priority that a thread can have.
     */
    public final static int MIN_PRIORITY = 1;

   /**
     * The default priority that is assigned to a thread.
     */
    public final static int NORM_PRIORITY = 5;

    /**
     * The maximum priority that a thread can have.
     */
    public final static int MAX_PRIORITY = 10;
~~~

## 守护线程

虚拟机必须确保用户线程执行完毕

虚拟机不必确保守护线程执行完毕

如日志记录 内存监控 垃圾回收

~~~java
/**
 * @author BDsnake
 * @since 2023/9/3 16:01
 */
public class TestDaemon {


    public static void main(String[] args) {
        God god = new God();
        Person person = new Person();
        Thread t1 = new Thread(god);
        t1.setDaemon(true);
        Thread t2 = new Thread(person);
        t1.start();
        t2.start();
    }
}
class God implements Runnable{
    @Override
    public void run() {
        while (true){
            System.out.println("god");
        }
    }
}
class Person implements Runnable{
    @Override
    public void run() {
        for (int i = 0; i < 60; i++) {
            System.out.println("Person"+i);
        }
    }
}
~~~

## 线程安全

如果一个类被设计为允许多线程正确访问，我们就说这个类就是“线程安全”的（thread-safe）

举个例子，StringBuffer的设计就是线程安全的，部分源码如下

~~~java
 @Override
    public synchronized void ensureCapacity(int minimumCapacity) {
        super.ensureCapacity(minimumCapacity);
    }

    /**
     * @since      1.5
     */
    @Override
    public synchronized void trimToSize() {
        super.trimToSize();
    }

    /**
     * @throws IndexOutOfBoundsException {@inheritDoc}
     * @see        #length()
     */
    @Override
    public synchronized void setLength(int newLength) {
        toStringCache = null;
        super.setLength(newLength);
    }

    /**
     * @throws IndexOutOfBoundsException {@inheritDoc}
     * @see        #length()
     */
    @Override
    public synchronized char charAt(int index) {
        if ((index < 0) || (index >= count))
            throw new StringIndexOutOfBoundsException(index);
        return value[index];
    }
~~~



## 同步方法与同步块

synchronized 可以修饰：
方法  类 构建同步代码块

其中，如果整个方法中同步代码块贯穿始终，则等价于sync修饰方法，如下等价

> ```
> public void add(int n) {
>     synchronized(this) { // 锁住this
>         count += n;
>     } // 解锁
> }
> public synchronized void add(int n) { // 锁住this
>     count += n;
> } /
> ```

如果sync修饰静态方法，则相当于修饰整个类。因为静态方法不会被实例化

> ```
> public synchronized static void test(int n) {
>     ...
> }
> ```
>
> 对于`static`方法，是没有`this`实例的，因为`static`方法是针对类而不是实例。但是我们注意到任何一个类都有一个由JVM自动创建的`Class`实例，因此，对`static`方法添加`synchronized`，锁住的是该类的`Class`实例。上述`synchronized static`方法实际上相当于：
>
> ```
> public class Counter {
>     public static void test(int n) {
>         synchronized(Counter.class) {
>             ...
>         }
>     }
> }
> ```

sync块

~~~java
sync(this){}
~~~

## 锁

### 可重入锁

java的锁是可重入锁

例子：

~~~java
public class Counter {
    private int count = 0;

    public synchronized void add(int n) {
        if (n < 0) {
            dec(-n);
        } else {
            count += n;
        }
    }

    public synchronized void dec(int n) {
        count += n;
    }
}
~~~

其中add方法获取了当前实例的this锁，但是在add方法中又调用了dec锁，再次获取了当前实例的锁

对同一个线程，能否在获取到锁以后继续获取同一个锁？

答案是肯定的。JVM允许同一个线程重复获取同一个锁，这种能被同一个线程反复获取的锁，就叫做可重入锁。

由于Java的线程锁是可重入锁，所以，获取锁的时候，不但要判断是否是第一次获取，还要记录这是第几次获取。每获取一次锁，记录+1，每退出`synchronized`块，记录-1，减到0的时候，才会真正释放锁。

### ReentrantLock

1. synchronized是独占锁，加锁和解锁的过程自动进行，易于操作，但不够灵活。ReentrantLock也是独占锁，加锁和解锁的过程需要手动进行，不易操作，但非常灵活。
2. synchronized可重入，因为加锁和解锁自动进行，不必担心最后是否释放锁；ReentrantLock也可重入，但加锁和解锁需要手动进行，且次数需一样，否则其他线程无法获得锁。
3. synchronized不可响应中断，一个线程获取不到锁就一直等着；ReentrantLock可以响应中断。

~~~java
public class ReentrantLock implements Lock, java.io.Serializable
~~~

`ReentrantLock`可以替代`synchronized`进行同步；

`ReentrantLock`获取锁更安全；

必须先获取到锁，再进入`try {...}`代码块，最后使用`finally`保证释放锁；

可以使用`tryLock()`尝试获取锁。

**写写玩玩**

~~~java
import java.util.LinkedList;
import java.util.Queue;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

/**
 * @author BDsnake
 * @since 2023/9/5 14:02
 */
public class TestReentrant {
    static Seller seller = new Seller();
    public static void main(String[] args) {
        new Thread(()->{
            for (int i = 0; i < 20; i++) {
                try {
                    seller.add();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }).start();
        new Thread(()->{
            for (int i = 0; i < 20; i++) {
                try {
                    seller.sell();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }).start();
    }
}
class Seller{
    static int tickets = 20;
    private final Lock lock = new ReentrantLock();
    void add() throws InterruptedException {
        lock.lock();
        try {
            tickets++;
            System.out.println("执行加票，当前票数为"+tickets);
        }catch (Exception e){
            e.printStackTrace();
        }finally {
            lock.unlock();
            Thread.sleep(1);
        }
    }
    void sell() throws InterruptedException {
        lock.lock();
        try {
            tickets--;
            System.out.println("执行卖票，当前票数为"+tickets);
        }catch (Exception e){
            e.printStackTrace();
        }finally {
            lock.unlock();
            Thread.sleep(1);
        }
    }
}
~~~

#### 使用Condition实现阻塞

使用`ReentrantLock`比直接使用`synchronized`更安全，可以替代`synchronized`进行线程同步。

但是，`synchronized`可以配合`wait`和`notify`实现线程在条件不满足时等待，条件满足时唤醒，用`ReentrantLock`我们怎么编写`wait`和`notify`的功能呢？

答案是使用`Condition`对象来实现`wait`和`notify`的功能。

写一个阻塞队列当例子

~~~java
import java.util.LinkedList;
import java.util.Queue;
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;



public class BlockingQueue<E>{
    public static void main(String[] args) {
        BlockingQueue<String> blockingQueue = new BlockingQueue<>(100);
        new Thread(()->{
            for (int i = 0; i < 200; i++) {
                blockingQueue.push(String.valueOf(i));
                System.out.println("push"+i);
            }
        }).start();

        new Thread(()->{
            while (true){
                String pop = blockingQueue.pop();
                System.out.println("pop"+pop);
            }
        }).start();
    }
    Queue<E> q = new LinkedList<>();
    int size;
    Lock lock = new ReentrantLock();
    Condition notEmptyCondition = lock.newCondition();
    Condition notfFullCondition = lock.newCondition();
    BlockingQueue(int size){
        this.size = size;
    }
    public E pop(){
        lock.lock();
        try {
            while (q.isEmpty()){
                notEmptyCondition.await();
            }
            E e = q.poll();
            notfFullCondition.signal();
            return e;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        } finally {
            lock.unlock();
        }
    }

    public void push(E e){
        lock.lock();
        try {
            while (q.size()>=size){
                notfFullCondition.await();
            }
            q.add(e);
            notEmptyCondition.signal();
        } catch (Exception exception) {
            exception.printStackTrace();
        } finally {
            lock.unlock();
        }
    }

}
~~~

### ReadWriteLock

`ReentrantLock`保证了只有一个线程可以执行临界区代码，但是有的时候是可以同时读的

解决方法：使用读写锁，允许多个线程同时读，但只要有一个线程在写，其他线程就必须等待：

使用`ReadWriteLock`可以提高读取效率：

- `ReadWriteLock`只允许一个线程写入；
- `ReadWriteLock`允许多个线程在没有写入时同时读取；
- `ReadWriteLock`适合读多写少的场景

把读写操作分别用读锁和写锁来加锁，在读取时，多个线程可以同时获得读锁，这样就大大提高了并发读的执行效率。

**例子**

~~~java
public class Counter {
    private final ReadWriteLock rwlock = new ReentrantReadWriteLock();
    private final Lock rlock = rwlock.readLock();
    private final Lock wlock = rwlock.writeLock();
    private int[] counts = new int[10];

    public void inc(int index) {
        wlock.lock(); // 加写锁
        try {
            counts[index] += 1;
        } finally {
            wlock.unlock(); // 释放写锁
        }
    }

    public int[] get() {
        rlock.lock(); // 加读锁
        try {
            return Arrays.copyOf(counts, counts.length);
        } finally {
            rlock.unlock(); // 释放读锁
        }
    }
}
~~~

### StampedLock

`StampedLock`提供了乐观读锁，可取代`ReadWriteLock`以进一步提升并发性能；

`StampedLock`是不可重入锁。

如果我们深入分析`ReadWriteLock`，会发现它有个潜在的问题：如果有线程正在读，写线程需要等待读线程释放锁后才能获取写锁，即读的过程中不允许写，这是一种悲观的读锁。

要进一步提升并发执行效率，Java 8引入了新的读写锁：`StampedLock`。

`StampedLock`和`ReadWriteLock`相比，改进之处在于：读的过程中也允许获取写锁后写入！这样一来，我们读的数据就可能不一致，所以，需要一点额外的代码来判断读的过程中是否有写入，这种读锁是一种乐观锁。

乐观锁的意思就是乐观地估计读的过程中大概率不会有写入，因此被称为乐观锁。反过来，悲观锁则是读的过程中拒绝有写入，也就是写入必须等待。显然乐观锁的并发效率更高，但一旦有小概率的写入导致读取的数据不一致，需要能检测出来，再读一遍就行。

~~~java
public class Point {
    private final StampedLock stampedLock = new StampedLock();

    private double x;
    private double y;

    public void move(double deltaX, double deltaY) {
        long stamp = stampedLock.writeLock(); // 获取写锁
        try {
            x += deltaX;
            y += deltaY;
        } finally {
            stampedLock.unlockWrite(stamp); // 释放写锁
        }
    }

    public double distanceFromOrigin() {
        long stamp = stampedLock.tryOptimisticRead(); // 获得一个乐观读锁
        // 注意下面两行代码不是原子操作
        // 假设x,y = (100,200)
        double currentX = x;
        // 此处已读取到x=100，但x,y可能被写线程修改为(300,400)
        double currentY = y;
        // 此处已读取到y，如果没有写入，读取是正确的(100,200)
        // 如果有写入，读取是错误的(100,400)
        if (!stampedLock.validate(stamp)) { // 检查乐观读锁后是否有其他写锁发生
            stamp = stampedLock.readLock(); // 获取一个悲观读锁
            try {
                currentX = x;
                currentY = y;
            } finally {
                stampedLock.unlockRead(stamp); // 释放悲观读锁
            }
        }
        return Math.sqrt(currentX * currentX + currentY * currentY);
    }
}
~~~

和`ReadWriteLock`相比，写入的加锁是完全一样的，不同的是读取。注意到首先我们通过`tryOptimisticRead()`获取一个乐观读锁，并返回版本号。接着进行读取，读取完成后，我们通过`validate()`去验证版本号，如果在读取过程中没有写入，版本号不变，验证成功，我们就可以放心地继续后续操作。如果在读取过程中有写入，版本号会发生变化，验证将失败。在失败的时候，我们再通过获取悲观读锁再次读取。由于写入的概率不高，程序在绝大部分情况下可以通过乐观读锁获取数据，极少数情况下使用悲观读锁获取数据。

可见，`StampedLock`把读锁细分为乐观读和悲观读，能进一步提升并发效率。但这也是有代价的：一是代码更加复杂，二是`StampedLock`是不可重入锁，不能在一个线程中反复获取同一个锁。

`StampedLock`还提供了更复杂的将悲观读锁升级为写锁的功能，它主要使用在if-then-update的场景：即先读，如果读的数据满足条件，就返回，如果读的数据不满足条件，再尝试写。

## 死锁

四个必要条件  占有且等待 

## wait notify

在Java程序中，`synchronized`解决了多线程竞争的问题。例如，对于一个任务管理器，多个线程同时往队列中添加任务，可以用`synchronized`加锁

但是`synchronized`并没有解决多线程协调的问题。

如下代码

`getTask()`内部先判断队列是否为空，如果为空，就循环等待，直到另一个线程往队列中放入了一个任务，`while()`循环退出，就可以返回队列的元素了。

但实际上`while()`循环永远不会退出。因为线程在执行`while()`循环时，已经在`getTask()`入口获取了`this`锁，其他线程根本无法调用`addTask()`，因为`addTask()`执行条件也是获取`this`锁。

因此，执行上述代码，线程会在`getTask()`中因为死循环而100%占用CPU资源。

~~~java
import java.util.LinkedList;
import java.util.Queue;

/**
 * @author BDsnake
 * @since 2023/9/5 13:43
 */
public class TestWait {
    public static void main(String[] args) {
        TaskQueue tq = new TaskQueue();
        new Thread(tq::getTask).start();
        new Thread(()->{
            tq.addTask("t");
        }).start();
    }
}
class TaskQueue {
    Queue<String> queue = new LinkedList<>();

    public synchronized void addTask(String s) {
        this.queue.add(s);
    }

    public synchronized String getTask() {
        while (queue.isEmpty()) {
        }
        return queue.remove();
    }
}
~~~



**wait方法的引入**

当一个线程执行到`getTask()`方法内部的`while`循环时，它必定已经获取到了`this`锁，此时，线程执行`while`条件判断，如果条件成立（队列为空），线程将执行`this.wait()`，进入等待状态。

这里的关键是：`wait()`方法必须在当前获取的锁对象上调用，这里获取的是`this`锁，因此调用`this.wait()`。

调用`wait()`方法后，线程进入等待状态，`wait()`方法不会返回，直到将来某个时刻，线程从等待状态被其他线程唤醒后，`wait()`方法才会返回，然后，继续执行下一条语句。

有些仔细的童鞋会指出：即使线程在`getTask()`内部等待，其他线程如果拿不到`this`锁，照样无法执行`addTask()`，肿么办？

这个问题的关键就在于`wait()`方法的执行机制非常复杂。首先，它不是一个普通的Java方法，而是定义在`Object`类的一个`native`方法，也就是由JVM的C代码实现的。其次，必须在`synchronized`块中才能调用`wait()`方法，因为`wait()`方法调用时，会*释放*线程获得的锁，`wait()`方法返回后，线程又会重新试图获得锁。

因此，只能在锁对象上调用`wait()`方法。因为在`getTask()`中，我们获得了`this`锁，因此，只能在`this`对象上调用`wait()`方法：

**notify方法的引入**

当一个线程在`this.wait()`等待时，它就会释放`this`锁，从而使得其他线程能够在`addTask()`方法获得`this`锁。

现在我们面临第二个问题：如何让等待的线程被重新唤醒，然后从`wait()`方法返回？答案是在相同的锁对象上调用`notify()`方法。

**修改后的代码**

~~~java
import java.util.LinkedList;
import java.util.Queue;

/**
 * @author BDsnake
 * @since 2023/9/5 13:43
 */
public class TestWait {
    public static void main(String[] args) {
        TaskQueue tq = new TaskQueue();
        new Thread(tq::getTask).start();
        new Thread(()->{
            tq.addTask("t");
        }).start();
    }
}
class TaskQueue {
    Queue<String> queue = new LinkedList<>();

    public synchronized void addTask(String s) {
        this.queue.add(s);
        System.out.println("添加信息");
        this.notify();
    }

    public synchronized String getTask() {
        while (queue.isEmpty()) {
            try {
                this.wait();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        System.out.println("已接受到信息");
        return queue.remove();
    }
}
~~~

## 信号量 Semaphore

使用`Semaphore`先调用`acquire()`获取，然后通过`try ... finally`保证在`finally`中释放。

调用`acquire()`可能会进入等待，直到满足条件为止。也可以使用`tryAcquire()`指定等待时间：

`Semaphore`本质上就是一个信号计数器，用于限制同一时间的最大访问数量。

~~~java
public class AccessLimitControl {
    // 任意时刻仅允许最多3个线程获取许可:
    final Semaphore semaphore = new Semaphore(3);

    public String access() throws Exception {
        // 如果超过了许可数量,其他线程将在此等待:
        semaphore.acquire();
        try {
            // TODO:
            return UUID.randomUUID().toString();
        } finally {
            semaphore.release();
        }
    }
}
~~~

## Concurrent集合

使用`java.util.concurrent`包提供的线程安全的并发集合可以大大简化多线程编程：

多线程同时读写并发集合是安全的；

尽量使用Java标准库提供的并发集合，避免自己编写同步代码。

| interface | non-thread-safe         | thread-safe                              |
| :-------- | :---------------------- | :--------------------------------------- |
| List      | ArrayList               | CopyOnWriteArrayList                     |
| Map       | HashMap                 | ConcurrentHashMap                        |
| Set       | HashSet / TreeSet       | CopyOnWriteArraySet                      |
| Queue     | ArrayDeque / LinkedList | ArrayBlockingQueue / LinkedBlockingQueue |
| Deque     | ArrayDeque / LinkedList | LinkedBlockingDeque                      |

## 原子操作Atomic

使用`java.util.concurrent.atomic`提供的原子操作可以简化多线程编程：

- 原子操作实现了无锁的线程安全；
- 适用于计数器，累加器等。

---

以`AtomicInteger`为例，它提供的主要操作有：

- 增加值并返回新值：`int addAndGet(int delta)`
- 加1后返回新值：`int incrementAndGet()`
- 获取当前值：`int get()`
- 用CAS方式设置：`int compareAndSet(int expect, int update)`

**原理**

Atomic类是通过无锁（lock-free）的方式实现的线程安全（thread-safe）访问。它的主要原理是利用了CAS：Compare and Set。

例：自己通过CAS编写原子操作

~~~java
public int incrementAndGet(AtomicInteger var) {
    int prev, next;
    do {
        prev = var.get();
        next = prev + 1;
    } while ( ! var.compareAndSet(prev, next));
    return next;
}
~~~

**示例**

自增id生成器

~~~java
class IdGenerator {
    AtomicLong var = new AtomicLong(0);

    public long getNextId() {
        return var.incrementAndGet();
    }
}
~~~

## 线程池

JDK提供了`ExecutorService`实现了线程池功能：

- 线程池内部维护一组线程，可以高效执行大量小任务；
- `Executors`提供了静态方法创建不同类型的`ExecutorService`；
- 必须调用`shutdown()`关闭`ExecutorService`；
- `ScheduledThreadPool`可以定期调度多个任务。



## ThreadLocal

`ThreadLocal`表示线程的“局部变量”，它确保每个线程的`ThreadLocal`变量都是各自独立的；

`ThreadLocal`适合在一个线程的处理流程中保持上下文（避免了同一参数在所有方法中传递）；

使用`ThreadLocal`要用`try ... finally`结构，并在`finally`中清除。
