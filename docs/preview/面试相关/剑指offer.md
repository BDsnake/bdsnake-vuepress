---
title: 算法——剑指offer刷题记录
categories: 面试
tags:
  - 面试
  - 算法
description: 摘要
cover: https://w.wallhaven.cc/full/jx/wallhaven-jxe3ry.jpg
abbrlink: d8eed23d
date: 2022-09-15 15:30:16
updated: 2023-02-07 15:30:16
top_img:
---

## 前言

推荐链接：

某卷王的github题解：https://github.com/hackeryang/SwordToOffer

牛客网剑指offer：https://www.nowcoder.com/exam/oj/ta?page=1&pageSize=50&search=&tpId=13&type=265

---

因为我是菜逼，所以我选择按模块刷题了

如果博客里图g了那就是牛客的原因，图直接从牛客复制了

---

~~~
备忘：`记得hexo转义问题。形如{{}} 和{#} 会编译错误`
~~~



# JZ6 从尾到头打印链表

## 描述

输入一个链表的头节点，按链表从尾到头的顺序返回每个节点的值（用数组返回）。

如输入{1,2,3}的链表如下图:

<img src="https://uploadfiles.nowcoder.com/images/20210717/557336_1626506480516/103D87B58E565E87DEFA9DD0B822C55F" alt="img" style="zoom:200%;" />

返回一个数组为[3,2,1]

0 <= 链表长度 <= 10000

## 示例1

输入：

```
{1,2,3}
```

复制

返回值：

```
[3,2,1]
```

复制

## 示例2

输入：

```
{67,0,24,58}
```

复制

返回值：

```
[58,24,0,67]
```

## 题解

思路1：栈

栈先进后出，可以实现链表从尾到头打印

~~~java
public class Solution {
    /*
    public class ListNode {
        int val;
        ListNode next = null;

        ListNode(int val) {
            this.val = val;
        }
    }*/
    public ArrayList<Integer> printListFromTailToHead(ListNode listNode) {
        Stack<Integer> stack = new Stack<>();
        ArrayList<Integer> list = new ArrayList<>();
        while (listNode!=null){
            stack.push(listNode.val);
            listNode=listNode.next;
        }
        while(!stack.empty()){
            list.add(stack.pop());
        }
        return list;
    }
}
~~~

思路2:递归

递归先到栈底，依次向上输出

~~~java
public class Solution {
    //链表
    /*
    public class ListNode {
        int val;
        ListNode next = null;

        ListNode(int val) {
            this.val = val;
        }
    }*/
    //递归函数
    public void recursion(ListNode head, ArrayList<Integer> res){
        if(head != null){
            //先往链表深处遍历
            recursion(head.next, res);
            //再填充到数组就是逆序
            res.add(head.val);
        }
    }
    public ArrayList<Integer> printListFromTailToHead(ListNode listNode) {
        ArrayList<Integer> res = new ArrayList<Integer>();
        //递归函数解决
        recursion(listNode, res);
        return res;
    
~~~

# JZ24 反转链表 [简单]

经反转后，原链表变为{3,2,1}，所以对应的输出为{3,2,1}。

以上转换过程如下图所示：

<img src="https://uploadfiles.nowcoder.com/images/20211014/423483716_1634206291971/4A47A0DB6E60853DEDFCFDF08A5CA249" alt="img" style="zoom:50%;" />

## 示例1

输入：

```
{1,2,3}
```

复制

返回值：

```
{3,2,1}
```

复制

## 示例2

输入：

```
{}
```

复制

返回值：

```
{}
```

复制

说明：

```
空链表则输出空                  
```

## 题解

思路1：栈

用一个栈，后进先出，实现逆序

~~~java
/*
public class ListNode {
    int val;
    ListNode next = null;

    ListNode(int val) {
        this.val = val;
    }
}*/

public class Solution {
    public ListNode ReverseList(ListNode head) {
        //创建栈
        Stack<ListNode> stack = new Stack<>();
        //链表入栈
        while (head!=null){
            stack.push(head);
            head = head.next;
        }
        //判断是否为空
        if(stack.isEmpty()) return null;
        //尾结点入栈
        ListNode node = stack.pop();
        //结果
        ListNode res = node;
        while (!stack.isEmpty()){
            node.next= stack.pop();
            node=node.next;
        }
        //这一步被坑了
        //最后一个结点就是反转前的头结点，一定要让他的next
        //等于空，否则会构成环
        node.next=null;
        return res;
    }
}
~~~

# JZ25 合并两个排序的链表

## 描述

输入两个递增的链表，单个链表的长度为n，合并这两个链表并使新链表中的节点仍然是递增排序的。

数据范围： 0 ≤ n <= 10000≤*n*≤1000，-1000 <= 节点值 <= 1000−1000≤节点值≤1000
要求：空间复杂度 O(1)*O*(1)，时间复杂度 O(n)*O*(*n*)

如输入{1,3,5},{2,4,6}时，合并后的链表为{1,2,3,4,5,6}，所以对应的输出为{1,2,3,4,5,6}，转换过程如下图所示：

![img](https://uploadfiles.nowcoder.com/images/20211014/423483716_1634208575589/09DD8C2662B96CE14928333F055C5580)

或输入{-1,2,4},{1,3,4}时，合并后的链表为{-1,1,2,3,4,4}，所以对应的输出为{-1,1,2,3,4,4}，转换过程如下图所示：

![img](https://uploadfiles.nowcoder.com/images/20211014/423483716_1634208729766/8266E4BFEDA1BD42D8F9794EB4EA0A13)

## 示例1

输入：

```
{1,3,5},{2,4,6}
```

复制

返回值：

```
{1,2,3,4,5,6}
```

复制

## 示例2

输入：

```
{},{}
```

复制

返回值：

```
{}
```

复制

## 示例3

输入：

```
{-1,2,4},{1,3,4}
```

复制

返回值：

```
{-1,1,2,3,4,4}
```

## 题解

非递归：

思路：如果都不空进入循环

如果1空或者1比2大，选择从2中获取元素

如果2空或者2比1大，选择从1中获取元素

最后肯定还剩一个链表有元素，一个没元素

哪个有就接哪个

~~~java

/*
public class ListNode {
    int val;
    ListNode next = null;

    ListNode(int val) {
        this.val = val;
    }
}*/
//非递归
public class Solution {
    public ListNode Merge(ListNode list1, ListNode list2) {
        ListNode list = new ListNode(-1);
        ListNode res = list;
        while(list1!=null&&list2!=null){
            if(list1.val>list2.val){
                res.next=list2;
                list2=list2.next;
            }
            else {
                res.next=list1;
                list1=list1.next;
            }
            res=res.next;
        }
        if(list1!=null){
            res.next = list1;
        }
        if(list2!=null){
            res.next=list2;
        }
        return list.next;
    }
}


~~~

# **JZ52** **两个链表的第一个公共结点**

## 描述

输入两个无环的单向链表，找出它们的第一个公共结点，如果没有公共节点则返回空。（注意因为传入数据是链表，所以错误测试数据的提示是用其他方式显示的，保证传入数据是正确的）

数据范围： n \le 1000*n*≤1000
要求：空间复杂度 O(1)*O*(1)，时间复杂度 O(n)*O*(*n*)

例如，输入{1,2,3},{4,5},{6,7}时，两个无环的单向链表的结构如下图所示：

![img](https://uploadfiles.nowcoder.com/images/20211104/423483716_1635999204882/394BB7AFD5CEA3DC64D610F62E6647A6)

可以看到它们的第一个公共结点的结点值为6，所以返回结点值为6的结点。

### 输入描述：

输入分为是3段，第一段是第一个链表的非公共部分，第二段是第二个链表的非公共部分，第三段是第一个链表和第二个链表的公共部分。 后台会将这3个参数组装为两个链表，并将这两个链表对应的头节点传入到函数FindFirstCommonNode里面，用户得到的输入只有pHead1和pHead2。

### 返回值描述：

返回传入的pHead1和pHead2的第一个公共结点，后台会打印以该节点为头节点的链表。

## 示例1

输入：

```
{1,2,3},{4,5},{6,7}
```

复制

返回值：

```
{6,7}
```

复制

说明：

```
第一个参数{1,2,3}代表是第一个链表非公共部分，第二个参数{4,5}代表是第二个链表非公共部分，最后的{6,7}表示的是2个链表的公共部分
这3个参数最后在后台会组装成为2个两个无环的单链表，且是有公共节点的          
```

## 示例2

输入：

```
{1},{2,3},{}
```

复制

返回值：

```
{}
```

复制

说明：

```
2个链表没有公共节点 ,返回null，后台打印{}       
```

## 题解

**双指针做法：**

**如果这俩链表一样长，那这个问题就简单了，所以下面就把这俩链表变得一样长**

使用两个指针N1,N2，一个从链表1的头节点开始遍历，我们记为N1，一个从链表2的头节点开始遍历，我们记为N2。

让N1和N2一起遍历，当N1先走完链表1的尽头（为null）的时候，则从链表2的头节点继续遍历，同样，如果N2先走完了链表2的尽头，则从链表1的头节点继续遍历，也就是说，N1和N2都会遍历链表1和链表2。

因为两个指针，同样的速度，走完同样长度（链表1+链表2），不管两条链表有无相同节点，都能够到达同时到达终点。

（N1最后肯定能到达链表2的终点，N2肯定能到达链表1的终点）。

所以，如何得到公共节点：

- 有公共节点的时候，N1和N2必会相遇，因为长度一样嘛，速度也一定，必会走到相同的地方的，所以当两者相等的时候，则会第一个公共的节点
- 无公共节点的时候，此时N1和N2则都会走到终点，那么他们此时都是null，所以也算是相等了。

下面看个动态图，可以更形象的表示这个过程~

![36](https://uploadfiles.nowcoder.com/files/20210621/908787715_1624289962297/36.gif)

其中，需要注意的是，判断条件一定是l1==null 而非l1.next==null，因为初始链表可能为空，l1=null的话判断l1.next==null 会空指针异常

~~~java
/*
public class ListNode {
    int val;
    ListNode next = null;

    ListNode(int val) {
        this.val = val;
    }
}*/
public class Solution {
    public ListNode FindFirstCommonNode(ListNode pHead1, ListNode pHead2) {
//        双指针
        ListNode l1=pHead1;ListNode l2 = pHead2;
//        地址不同
        while (l1!=l2){
//            如果当前节点为空，就把他的next接到另一个链表的头结点
            if(l1==null) l1=pHead2;
//            如果当前节点不为空，则next
            else l1=l1.next;
            if(l2==null) l2=pHead1;
            else l2=l2.next;
        }
        return l1;
    }
}
~~~

# **JZ23** **链表中环的入口结点**

## 描述

给一个长度为n链表，若其中包含环，请找出该链表的环的入口结点，否则，返回null。

数据范围： n \le 10000*n*≤10000，1<=结点值<=100001<=结点值<=10000

要求：空间复杂度 O(1)*O*(1)，时间复杂度 O(n)*O*(*n*)

例如，输入{1,2},{3,4,5}时，对应的环形链表如下图所示：

![img](https://uploadfiles.nowcoder.com/images/20211025/423483716_1635154005498/DA92C945EF643F1143567935F20D6B46)

可以看到环的入口结点的结点值为3，所以返回结点值为3的结点。

### 输入描述：

输入分为2段，第一段是入环前的链表部分，第二段是链表环的部分，后台会根据第二段是否为空将这两段组装成一个无环或者有环单链表

### 返回值描述：

返回链表的环的入口结点即可，我们后台程序会打印这个结点对应的结点值；若没有，则返回对应编程语言的空结点即可。

## 示例1

输入：

```
{1,2},{3,4,5}
```

复制

返回值：

```
3
```

复制

说明：

```
返回环形链表入口结点，我们后台程序会打印该环形链表入口结点对应的结点值，即3   
```

## 示例2

输入：

```
{1},{}
```

复制

返回值：

```
"null"
```

复制

说明：

```
没有环，返回对应编程语言的空结点，后台程序会打印"null"   
```

## 示例3

输入：

```
{},{2}
```

复制

返回值：

```
2
```

复制

说明：

```
环的部分只有一个结点，所以返回该环形链表入口结点，后台程序打印该结点对应的结点值，即2   
```

## 题解

1、哈希表

~~~java
import java.util.HashSet;
/*
 public class ListNode {
    int val;
    ListNode next = null;

    ListNode(int val) {
        this.val = val;
    }
}
*/
public class Solution {

    public ListNode EntryNodeOfLoop(ListNode pHead) {
        //存访问过得结点
        HashSet<ListNode> set=new HashSet<>();
        //如果pHead为空，说明遍历到头了，没环
        while (pHead!=null){
//                遍历并判断是否相等，相等则为入口
                if (set.contains(pHead)) return pHead;

//            并没出现在历史记录中，把它添加到历史记录
            set.add(pHead);
//            继续遍历
            pHead=pHead.next;
        }
        return null;
    }
}
~~~

2、快慢双指针

**图解**

![image-20210701012652956](https://uploadfiles.nowcoder.com/files/20210701/91789069_1625074851839/image-20210701012652956.png)

![image-20210701012952416](https://uploadfiles.nowcoder.com/files/20210701/91789069_1625074851811/image-20210701012952416.png)

**算法流程**：

- 我们假设 a为出发点到环入口长度，b为环长度
- fast速度是slow 的两倍，当相遇时，设走过的路径长度为：slow = s ，fast = s + nb，即fast比slow多走了n圈环
- 因为时间相同，fast速度为slow两倍，路径自然是slow的两倍，因此：2s = s + nb, 即 s = nb，
- 因为速度不同，肯定能相遇，所以当第一次相遇时，slow走了nb步，fast走了2nb
- 相遇后，让 fast重新从出发点按slow指针相同速度走
- 因为此时 slow 已经走了 nb 的路程，fast走了2nb路程
- 而正常情况走到环入口，最少需要走: a + b，目前slow走了nb步了，需要再走a步就能从相遇点走到环入口节点(此处解释，slow走了nb，相对于入口的位置为nb-a,所以还差a步走到入口，此时让fast以slow的速度从起点开始走，正好两者一起到达入口)
- 而当fast是从起点重新走到入口节点，刚好也是路程 a，刚好再次相遇，也就是刚好走到入口节点
- 总的路程：slow = a + nb， fast = a + 2nb，刚好满足在入口节点相遇的路程
- 很重要的一点：指针在走的过程中，从起点走到环里后，会一直在环里转圈

~~~java
import common.ListNode;

/*
 public class ListNode {
    int val;
    ListNode next = null;

    ListNode(int val) {
        this.val = val;
    }
}
*/
public class Solution2 {

    public ListNode EntryNodeOfLoop(ListNode pHead) {
        ListNode slow = pHead, fast = pHead;
        while(true) {
            if(fast == null || fast.next == null) {
                // fast先走到null表示无环
                return null;
            }
            slow = slow.next;
            fast = fast.next.next;
            // 第一次相遇
            if(slow == fast) {
                break;
            }
        }
        // fast从出发点重新开始
        fast = pHead;
        // 第二次相遇
        while(slow != fast) {
            slow = slow.next;
            fast = fast.next;
        }
        return slow;
    }
}
~~~

# **JZ22** **链表中倒数最后k个结点**

## 描述

输入一个长度为 n 的链表，设链表中的元素的值为 ai ，返回该链表中倒数第k个节点。

如果该链表长度小于k，请返回一个长度为 0 的链表。

数据范围：0 \leq n \leq 10^50≤*n*≤105，0 \leq a_i \leq 10^90≤*a**i*≤109，0 \leq k \leq 10^90≤*k*≤109

要求：空间复杂度 O(n)*O*(*n*)，时间复杂度 O(n)*O*(*n*)

进阶：空间复杂度 O(1)*O*(1)，时间复杂度 O(n)*O*(*n*)

例如输入{1,2,3,4,5},2时，对应的链表结构如下图所示：

![img](https://uploadfiles.nowcoder.com/images/20211105/423483716_1636084313645/5407F55227804F31F5C5D73558596F2C)

其中蓝色部分为该链表的最后2个结点，所以返回倒数第2个结点（也即结点值为4的结点）即可，系统会打印后面所有的节点来比较。

## 示例1

输入：

```
{1,2,3,4,5},2
```

复制

返回值：

```
{4,5}
```

复制

说明：

```
返回倒数第2个节点4，系统会打印后面所有的节点来比较。 
```

## 示例2

输入：

```
{2},8
```

复制

返回值：

```
{}
```

复制

## 题解

法1：栈

利用栈的特性，存链表，然后拿出需要的那个元素即可

~~~java
package JZ22;

/*
 * public class ListNode {
 *   int val;
 *   ListNode next = null;
 *   public ListNode(int val) {
 *     this.val = val;
 *   }
 * }
 */

import common.ListNode;

import java.util.Stack;

public class Solution {
    /**
     * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
     *
     *
     * @param pHead ListNode类
     * @param k int整型
     * @return ListNode类
     */
    public ListNode FindKthToTail (ListNode pHead, int k) {
        // 空判断
        if(pHead==null||k<=0) return null;
        Stack<ListNode> stack = new Stack<>();
        while(pHead!=null){
            //入栈
            stack.push(pHead);
            pHead=pHead.next;
        }
        //溢出判断
        if(stack.size()<k) return null;
        //出栈
        while (k-->1){
            stack.pop();
        }
        return stack.pop();
    }
}
~~~

法2：快慢指针

![img](https://uploadfiles.nowcoder.com/images/20210623/889362376_1624436560373/B27699765EEF6CA0E75AF0D1A4B9BCAC)

如图k=2,只需慢指针比快指针慢2，当快指针到达末位时，慢指针恰好在所需的位置

~~~java
import java.util.*;

/*
 * public class ListNode {
 *   int val;
 *   ListNode next = null;
 *   public ListNode(int val) {
 *     this.val = val;
 *   }
 * }
 */

public class Solution2 {
    /**
     * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
     *
     *
     * @param pHead ListNode类
     * @param k int整型
     * @return ListNode类
     */
    public ListNode FindKthToTail (ListNode pHead, int k) {
        // write code here
        // 先排除特殊
        if(pHead==null||k<=0) return null;
        ListNode fast=pHead;ListNode slow=pHead;
        while(k-->0) {
            if(fast==null) return null;
            else fast = fast.next;
        }
        while(fast!=null){
            fast=fast.next;
            slow=slow.next;
        }
        return slow;
    }
}
~~~

# **JZ35** **复杂链表的复制**

## 描述

输入一个复杂链表（每个节点中有节点值，以及两个指针，一个指向下一个节点，另一个特殊指针random指向一个随机节点），请对此链表进行深拷贝，并返回拷贝后的头结点。（注意，输出结果中请不要返回参数中的节点引用，否则判题程序会直接返回空）。 下图是一个含有5个结点的复杂链表。图中实线箭头表示next指针，虚线箭头表示random指针。为简单起见，指向null的指针没有画出。

![img](https://uploadfiles.nowcoder.com/images/20210616/557336_1623831920130/2CD1CC917CD1875FF9CD391C2924DF09)

示例:

```
输入:{1,2,3,4,5,3,5,#,2,#}

输出:{1,2,3,4,5,3,5,#,2,#}
```

解析:我们将链表分为两段，前半部分`{1,2,3,4,5}`为ListNode，后半部分`{3,5,#,2,#}`是随机指针域表示。

以上示例前半部分可以表示链表为的ListNode:1->2->3->4->5

后半部分`，3，5，#，2，#`分别的表示为

1的位置指向3，2的位置指向5，3的位置指向null，4的位置指向2，5的位置指向null

如下图:

![img](https://uploadfiles.nowcoder.com/images/20210616/557336_1623836735191/971325772A17A314D3C44EBCDB6E7209)

## 示例1

输入：

```
{1,2,3,4,5,3,5,#,2,#}
```

复制

返回值：

```
{1,2,3,4,5,3,5,#,2,#}
```

## 题解

**1、哈希表**

如果这个链表没有随机指针将会变得十分简单，只要一边遍历一边复制就完成了拷贝。加入随机指针后会出现你想指向的结点可能还未被创建。

但是如果我们先顺序遍历一遍这个链表，那么所有结点就已经被创建了！那么可不可以先按顺序创建链表（先不管随机指针）然后再构造随机指针呢？

我们可以用一个哈希表，在创建结点时记录原表的结点地址与复制表对应的结点地址，这样我们再第二次遍历创建随机指针的时候就可以找到对应复制结点的地址

**时间复杂度：**O(n), 遍历一次链表和哈希表的时间
**空间复杂度：**O(n), 哈希表使用的空间

代码：

~~~java
package JZ35;

import common.RandomListNode;

import java.util.HashMap;
import java.util.Map;

/*
public class RandomListNode {
    int label;
    RandomListNode next = null;
    RandomListNode random = null;

    RandomListNode(int label) {
        this.label = label;
    }
}
*/
public class Solution {
    public RandomListNode Clone(RandomListNode pHead) {
        RandomListNode lNode = pHead;
        //结果
        RandomListNode res = new RandomListNode(-1);
        RandomListNode lRes = res;
        //哈希表存储原结点与复制结点的地址
        Map<RandomListNode, RandomListNode> nodeMap = new HashMap<>();
        //第一遍遍历
        while(lNode != null){
            //复制并加入结果
            RandomListNode temp = new RandomListNode(lNode.label);
            lRes.next = temp;
            lRes = lRes.next;
            //加入HashMap
            nodeMap.put(lNode,temp);
            //下一个
            lNode=lNode.next;
        }
        //恢复指针
        lNode = pHead;
        lRes = res.next;
        //再次遍历
        while (lNode!=null&&lRes!=null){
            //构建随即指针
            lRes.random=nodeMap.get(lNode.random);
            //指针同步移动
            lNode=lNode.next;
            lRes=lRes.next;
        }
        return res.next;
    }
}


~~~

**法2：链表拆分**

还是遍历两遍

1. 此解法参考了大佬的做法, 主要思路是将原链表的结点对应的拷贝节点连在其后, 最后链表变成 原1 -> 拷1 -> 原2 -> 拷2 -> ... -> null 的形式
2. 然后我们再逐步处理对应的随机指针, 使用双指针, 一个指针指向原链表的节点, 一个指向拷贝链表的节点, 那么就有 拷->random = 原->random->next (random不为空)
3. 最后再用双指针将两条链表拆分即可, 此算法大大优化了空间复杂度, 十分优秀

![图片说明](https://uploadfiles.nowcoder.com/images/20210714/751889074_1626251639839/7A8DF85097EA0F2B7D31589D6217FE0D)

# **JZ76** **删除链表中重复的结点**

## 描述

在一个排序的链表中，存在重复的结点，请删除该链表中重复的结点，重复的结点不保留，返回链表头指针。 例如，链表 1->2->3->3->4->4->5 处理后为 1->2->5

数据范围：链表长度满足 `0 \le n \le 1000 \0≤*n*≤1000 ，链表中的值满足 1 \le val \le 1000 \1≤*v**a**l*≤1000 `

进阶：空间复杂度 O(n)\*O*(*n*) ，时间复杂度 O(n) \*O*(*n*) 

例如输入`{1,2,3,3,4,4,5}`时，对应的输出为`{1,2,5}`，对应的输入输出链表如下图所示：

![img](https://uploadfiles.nowcoder.com/images/20211105/423483716_1636083477137/5B9CC4C8B8AE60071D9441AB64E66772)

## 示例1

输入：

```
{1,2,3,3,4,4,5}
```

复制

返回值：

```
{1,2,5}
```

复制

## 示例2

输入：

```
{1,1,1,8}
```

返回值：

```
{8}
```

## 题解

解法1：直接删重复元素

遍历，看看下一个结点和下下个结点是否相同，如果相同，则跳到第一个不重复元素的结点，设置其为当前结点的next。空间复杂度1，时间复杂度n

~~~java
package JZ76;

import common.ListNode;

import java.util.HashSet;

/*
 public class ListNode {
    int val;
    ListNode next = null;

    ListNode(int val) {
        this.val = val;
    }
}
*/
public class Solution {
    public ListNode deleteDuplication(ListNode pHead) {
        //创建一个临时空表头
        ListNode rNode = new ListNode(-1);
        rNode.next=pHead;
        ListNode lNode = rNode;
        if(pHead==null) return null;
        //每次检测下一个结点是否重复,其中先检测next，防止next为空，next的next报空指针
        while (lNode.next!=null&&lNode.next.next!=null){
            if(lNode.next.val==lNode.next.next.val){
                int temp = lNode.next.val;
                //临时指针
                ListNode tNode = lNode.next.next;
                //如果下一个重复 指针后移
                while(tNode.next!=null&&tNode.next.val==temp) tNode=tNode.next;
                //找到第一个不重复的
                lNode.next=tNode.next;
            }
            else {
                //指针后移
                lNode=lNode.next;
            }
        }
        return rNode.next;
    }
}
~~~

**题解2：**哈希表，遍历两遍，第一遍存重复元素，第二遍删，这种方法适用于不按顺序的，缺点是多用了个哈希表的存储空间，空间复杂度为n，时间复杂度n

# **JZ18** **删除链表的节点**

## 描述

给定单向链表的头指针和一个要删除的节点的值，定义一个函数删除该节点。返回删除后的链表的头节点。

1.此题对比原题有改动

2.题目保证链表中节点的值互不相同

3.该题只会输出返回的链表和结果做对比，所以若使用 C 或 C++ 语言，你不需要 free 或 delete 被删除的节点

数据范围:

0<=链表节点值<=10000

0<=链表长度<=10000

## 示例1

输入：

```
{2,5,1,9},5
```

复制

返回值：

```
{2,1,9}
```

复制

说明：

```
给定你链表中值为 5 的第二个节点，那么在调用了你的函数之后，该链表应变为 2 -> 1 -> 9   
```

## 示例2

输入：

```
{2,5,1,9},1
```

复制

返回值：

```
{2,5,9}
```

复制

说明：

```
给定你链表中值为 1 的第三个节点，那么在调用了你的函数之后，该链表应变为 2 -> 5 -> 9   
```

## 题解

送分题，结点的值还唯一，捞德一

遍历一遍，找到相同的删了直接返回

~~~java

import java.util.*;

/*
 * public class ListNode {
 *   int val;
 *   ListNode next = null;
 *   public ListNode(int val) {
 *     this.val = val;
 *   }
 * }
 */

public class Solution {
    /**
     * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
     *
     *
     * @param head ListNode类
     * @param val int整型
     * @return ListNode类
     */
    public ListNode deleteNode (ListNode head, int val) {
        // write code here
        ListNode lNode = head;
        //判断第一个结点
        if(head.val==val) return head.next;
        while(lNode.next!=null){
            if(lNode.next.val==val){
                //相同删除结点并直接返回，因为结点的值唯一
                lNode.next=lNode.next.next;
                return head;
            }
            //不相同指针后移
            else lNode=lNode.next;
        }
        //兜底，其实按要求用不到
        return head;
    }
}

~~~

# **JZ55** **二叉树的深度**

## 描述

输入一棵二叉树，求该树的深度。从根结点到叶结点依次经过的结点（含根、叶结点）形成树的一条路径，最长路径的长度为树的深度，根节点的深度视为 1 。

数据范围：节点的数量满足` 0 \le n \le 1000≤*n*≤100 `，节点上的值满足 `0 \le val \le 1000≤*v**a**l*≤100`

进阶：空间复杂度 O(1)*O*(1) ，时间复杂度 O(n)*O*(*n*)

假如输入的用例为`{1,2,3,4,5,#,6,#,#,7}`，那么如下图:

![img](https://uploadfiles.nowcoder.com/images/20211105/557336_1636101249194/DFDBE52B6C61F8021FC86EB0779848B1)

## 示例1

输入：

```
{1,2,3,4,5,#,6,#,#,7}
```

复制

返回值：

```
4
```

复制

## 示例2

输入：

```
{}
```

复制

返回值：

```
0
```

复制

## 题解

**题解1：递归**

第一反应就是递归，左右两个分支对应两个递归，每个递归里传递层数，最后到每个叶结点都能获得一个层数，取最大

~~~java
/**
public class TreeNode {
    int val = 0;
    TreeNode left = null;
    TreeNode right = null;

    public TreeNode(int val) {
        this.val = val;

    }

}
*/
public class Solution {
    int res=0;
    public int TreeDepth(TreeNode root) {
        if(root==null) return 0;
        getDept(root,1);
        return res;
    }

    void getDept(TreeNode treeNode,int depth){
        System.out.println(depth);
        if(treeNode.left==null&&treeNode.right==null) {
            if(depth>res) res=depth;
        }
        if(treeNode.left!=null) getDept(treeNode.left,depth+1);
        if(treeNode.right!=null) getDept(treeNode.right,depth+1);
    }
}
~~~

**题解2**：层次遍历

具体做法是用一个队列，先存每一层要访问的结点，然后再依次访问，同时再构造出下一层要访问的结点

思路：

既然是统计二叉树的最大深度，除了根据路径到达从根节点到达最远的叶子节点以外，我们还可以分层统计。对于一棵二叉树而言，必然是一层一层的，那一层就是一个深度，有的层可能会很多节点，有的层如根节点或者最远的叶子节点，只有一个节点，但是不管多少个节点，它们都是一层。因此我们可以使用层次遍历，二叉树的层次遍历就是从上到下按层遍历，每层从左到右，我们只要每层统计层数即是深度。

具体做法：****

- step 1：既然是层次遍历，我们遍历完一层要怎么进入下一层，可以用队列记录这一层中节点的子节点。队列类似栈，只不过是一个先进先出的数据结构，可以理解为我们平时的食堂打饭的排队。因为每层都是按照从左到右开始访问的，那自然记录的子节点也是从左到右，那我们从队列出来的时候也是从左到右，完美契合。
- step 2：在刚刚进入某一层的时候，队列中的元素个数就是当前层的节点数。比如第一层，根节点先入队，队列中只有一个节点，对应第一层只有一个节点，第一层访问结束后，它的子节点刚好都加入了队列，此时队列中的元素个数就是下一层的节点数。因此遍历的时候，每层开始统计该层个数，然后遍历相应节点数，精准进入下一层。
- step 3：遍历完一层就可以节点深度就可以加1，直到遍历结束，即可得到最大深度。

**图示：**

![alt](https://uploadfiles.nowcoder.com/images/20220330/397721558_1648631084369/3B5A6883A44EDAD8E2563E74BB4C2846)

~~~java
import java.util.*;
public class Solution {
    public int maxDepth (TreeNode root) {
        //空节点没有深度
        if(root == null) 
            return 0;
        //队列维护层次后续节点
        Queue<TreeNode> q = new LinkedList<TreeNode>(); 
        //根入队
        q.offer(root); 
        //记录深度
        int res = 0; 
        //层次遍历
        while(!q.isEmpty()){ 
            //记录当前层有多少节点
            int n = q.size(); 
            //遍历完这一层，再进入下一层
            for(int i = 0; i < n; i++){ 
                TreeNode node = q.poll();
                //添加下一层的左右节点
                if(node.left != null) 
                    q.offer(node.left);
                if(node.right != null)
                    q.offer(node.right);
            }
            //深度加1
            res++; 
        }
        return res; 
    }
}

~~~

# **JZ77** **按之字形顺序打印二叉树**

## 描述

给定一个二叉树，返回该二叉树的之字形层序遍历，（第一层从左向右，下一层从右向左，一直这样交替）

数据范围：0 \le n \le 15000≤*n*≤1500,树上每个节点的val满足 |val| <= 1500∣*v**a**l*∣<=1500
要求：空间复杂度：O(n)*O*(*n*)，时间复杂度：O(n)*O*(*n*)

例如：
给定的二叉树是{1,2,3,#,#,4,5}
![img](https://uploadfiles.nowcoder.com/images/20210717/557336_1626492068888/41FDD435F0BA63A57E274747DE377E05)
该二叉树之字形层序遍历的结果是

[

[1],

[3,2],

[4,5]

]

## 示例1

输入：

```
{1,2,3,#,#,4,5}
```

复制

返回值：

```
[[1],[3,2],[4,5]]
```

复制

说明：

```
如题面解释，第一层是根节点，从左到右打印结果，第二层从右到左，第三层从左到右。     
```

## 示例2

输入：

```
{8,6,10,5,7,9,11}
```

复制

返回值：

```
[[8],[10,6],[5,7,9,11]]
```

复制

## 示例3

输入：

```
{1,2,3,4,5}
```

复制

返回值：

```
[[1],[3,2],[4,5]]
```

## 题解

题解1：用队列正常实现树的层次遍历，用一个双端队列完成之字输出

思路：将遍历和输出分离成两个工作，正常采用队列完成层次遍历，输出时，每一层的结果暂时按照从左向右的顺序插入到队列里。如果是从左向右输出，就从Last开始输出(相当于先进先出的队列),如果从右向左输出，就从First开始输出（相当于后进先出的栈）

~~~java
package JZ77;

import common.TreeNode;

import java.util.ArrayList;
import java.util.Deque;
import java.util.LinkedList;
import java.util.Queue;

/*
public class TreeNode {
    int val = 0;
    TreeNode left = null;
    TreeNode right = null;

    public TreeNode(int val) {
        this.val = val;

    }

}
*/
public class Solution {
    public ArrayList<ArrayList<Integer> > Print(TreeNode pRoot) {
        ArrayList<ArrayList<Integer>> res = new ArrayList<>();//结果
        int step=1;//记录层数
        if(pRoot==null) return res;
        Queue<TreeNode> queue = new LinkedList<>();//遍历用
        Deque<Integer> deque = new LinkedList<>();//输出用双端
        queue.add(pRoot);
        step++;//下一层
        while (!queue.isEmpty()){
            int size = queue.size();//当前长度
            while(size--!=0){
                TreeNode poll = queue.poll();
                deque.add(poll.val);//加入到输出队列
                if(poll.left!=null) queue.add(poll.left);//构造下一层
                if(poll.right!=null) queue.add(poll.right);
            }
            if(step%2==0){//偶数层，逆序遍历
                ArrayList<Integer> tempList = new ArrayList<>();
                while(!deque.isEmpty()){
                    tempList.add(deque.removeFirst());
                }
                res.add(tempList);
            }else {//奇数层
                ArrayList<Integer> tempList = new ArrayList<>();
                while (!deque.isEmpty()){
                    tempList.add(deque.removeLast());
                }
                res.add(tempList);
            }
            step++;

        }
        return res;
    }

}
~~~



# **JZ54** **二叉搜索树的第k个节点**

## 描述

给定一棵结点数为n 二叉搜索树，请找出其中的第 k 小的TreeNode结点值。

1.返回第k小的节点值即可

2.不能查找的情况，如二叉树为空，则返回-1，或者k大于n等等，也返回-1

3.保证n个节点的值不一样

数据范围： 0 \le n \le10000≤*n*≤1000，0 \le k \le10000≤*k*≤1000，树上每个结点的值满足0 \le val \le 10000≤*v**a**l*≤1000
进阶：空间复杂度 O(n)*O*(*n*)，时间复杂度 O(n)*O*(*n*)

如输入{5,3,7,2,4,6,8},3时，二叉树{5,3,7,2,4,6,8}如下图所示：

![img](https://uploadfiles.nowcoder.com/images/20211117/392807_1637120852509/F732B49BA33ECC72FF97FF7BDE2ACF69)

该二叉树所有节点按结点值升序排列后可得[2,3,4,5,6,7,8]，所以第3个结点的结点值为4，故返回对应结点值为4的结点即可。

## 示例1

输入：

```
{5,3,7,2,4,6,8},3
```

复制

返回值：

```
4
```

复制

## 示例2

输入：

```
{},1
```

复制

返回值：

```
-1
```

复制

## 备注：

```
当树是空
```

## 题解

二叉搜索树的特点：左孩子<=根节点<=右孩子，所以中序遍历。直接写个递归

~~~java
import java.util.*;

/*
 * public class TreeNode {
 *   int val = 0;
 *   TreeNode left = null;
 *   TreeNode right = null;
 *   public TreeNode(int val) {
 *     this.val = val;
 *   }
 * }
 */

public class Solution {
    int count=0;//记录遍历到第几个数了
    int res=-1;
    void midOrder(TreeNode t,int k){//t是进入遍历的树，num是次序

        if(t.left!=null)midOrder(t.left,k);//左孩子
        //他自己
        count++;
        if(count==k) res=t.val;
        if(t.right!=null)midOrder(t.right,k);//右孩子
    }
    /**
     * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
     *
     *
     * @param proot TreeNode类
     * @param k int整型
     * @return int整型
     */
    public int KthNode (TreeNode proot, int k) {
        // write code here
        if(proot==null)return res;
        midOrder(proot,k);
        return res;
    }
}
~~~

# **JZ7** **重建二叉树**

## 描述



给定节点数为 n 的二叉树的前序遍历和中序遍历结果，请重建出该二叉树并返回它的头结点。

例如输入前序遍历序列{1,2,4,7,3,5,6,8}和中序遍历序列{4,7,2,1,5,3,8,6}，则重建出如下图所示。

![img](https://uploadfiles.nowcoder.com/images/20210717/557336_1626504921458/776B0E5E0FAD11A6F15004B29DA5E628)

提示:

1.vin.length == pre.length

2.pre 和 vin 均无重复元素

3.vin出现的元素均出现在 pre里

4.只需要返回根结点，系统会自动输出整颗树做答案对比

数据范围：n \le 2000*n*≤2000，节点的值 -10000 \le val \le 10000−10000≤*v**a**l*≤10000

要求：空间复杂度 O(n)*O*(*n*)，时间复杂度 O(n)*O*(*n*)

## 示例1

输入：

```
[1,2,4,7,3,5,6,8],[4,7,2,1,5,3,8,6]
```

复制

返回值：

```
{1,2,3,4,#,5,6,#,7,#,#,8}
```

复制

说明：

```
返回根节点，系统会输出整颗二叉树对比结果，重建结果如题面图示    
```

## 示例2

输入：

```
[1],[1]
```

复制

返回值：

```
{1}
```

复制

## 示例3

输入：

```
[1,2,3,4,5,6,7],[3,2,4,1,6,5,7]
```

复制

返回值：

```
{1,2,5,3,4,6,7}
```

## 题解

### 递归

思路：根据利用前序和中序构建树的方法，前序第一个是根节点，在中序遍历中找到根节点，根节点的左边都在左子树中，右边都在右子树中，左右子树分别递归，循环上述步骤

具体做法：

- step 1：先根据前序遍历第一个点建立根节点。
- step 2：然后遍历中序遍历找到根节点在数组中的位置。
- step 3：再按照子树的节点数将两个遍历的序列分割成子数组，将子数组送入函数建立子树。
- step 4：直到子树的序列长度为0，结束递归。

![image-20221222110744956](https://bd-hexo.oss-cn-beijing.aliyuncs.com/img/image-20221222110744956.png)

~~~java

import java.util.*;
public class Solution {
    public TreeNode reConstructBinaryTree(int [] pre,int [] vin) {
        int n = pre.length;
        int m = vin.length;
        //每个遍历都不能为0
        if(n == 0 || m == 0)
            return null;
        //构建根节点
        TreeNode root = new TreeNode(pre[0]);
        for(int i = 0; i < vin.length; i++){
            //找到中序遍历中的前序第一个元素
            if(pre[0] == vin[i]){
                //构建左子树
                root.left = reConstructBinaryTree(Arrays.copyOfRange(pre, 1, i + 1), Arrays.copyOfRange(vin, 0, i));
                //构建右子树
                root.right = reConstructBinaryTree(Arrays.copyOfRange(pre, i + 1, pre.length), Arrays.copyOfRange(vin, i + 1, vin.length));
                break;
            }
        }
        return root;
    }
}
~~~

# JZ26 **树的子结构**

## 描述

输入两棵二叉树A，B，判断B是不是A的子结构。（我们约定空树不是任意一个树的子结构）

假如给定A为{8,8,7,9,2,#,#,#,#,4,7}，B为{8,9,2}，2个树的结构如下，可以看出B是A的子结构

![img](https://uploadfiles.nowcoder.com/images/20211027/557336_1635320187489/B1C70B05B2BA3AAA854EE032F2A8D826)

数据范围:

0 <= A的节点个数 <= 10000

0 <= B的节点个数 <= 10000

## 示例1

输入：

```
{8,8,7,9,2,#,#,#,#,4,7},{8,9,2}
```

复制

返回值：

```
true
```

复制

## 示例2

输入：

```
{1,2,3,4,5},{2,4}
```

复制

返回值：

```
true
```

复制

## 示例3

输入：

```
{1,2,3},{3,1}
```

复制

返回值：

```
false
```



## 题解

### 递归

同步递归前序遍历，如果遍历过程能够全部匹配则说明有子结构

~~~java
/**
 public class TreeNode {
 int val = 0;
 TreeNode left = null;
 TreeNode right = null;

 public TreeNode(int val) {
 this.val = val;

 }

 }
 */
public class Solution {
    public boolean recursion(TreeNode root1,TreeNode root2){
        //同时为空说明匹配完了
        if(root1==null&&root2==null) return true;
        //root1单空说明没匹配完
        if(root1==null) return false;
        //root2单空说明匹配完了
        if(root2==null) return true;
        //值不一样匹配失败
        if(root1.val!=root2.val) return false;
        boolean flag1=recursion(root1.left, root2.left);
        boolean flag2=recursion(root1.right, root2.right);
        return flag1&&flag2;
    }
    public boolean HasSubtree(TreeNode root1, TreeNode root2) {
        //空树
        if(root2 == null || root1 == null) return false;
        boolean flag1=recursion(root1,root2);
        boolean flag2=HasSubtree(root1.left,root2);
        boolean flag3=HasSubtree(root1.right,root2);
        return flag1||flag2||flag3;
    }
}
~~~

# **JZ27** **二叉树的镜像**

## 描述

操作给定的二叉树，将其变换为源二叉树的镜像。

数据范围：二叉树的节点数 0 \le n \le 10000≤*n*≤1000 ， 二叉树每个节点的值 0\le val \le 10000≤*v**a**l*≤1000

要求： 空间复杂度 O(n)*O*(*n*) 。本题也有原地操作，即空间复杂度 O(1)*O*(1) 的解法，时间复杂度 O(n)*O*(*n*)

比如：

源二叉树

![img](https://uploadfiles.nowcoder.com/images/20210922/382300087_1632302001586/420B82546CFC9760B45DD65BA9244888)

镜像二叉树

![img](https://uploadfiles.nowcoder.com/images/20210922/382300087_1632302036250/AD8C4CC119B15070FA1DBAA1EBE8FC2A)

## 示例1

输入：

```
{8,6,10,5,7,9,11}
```

复制

返回值：

```
{8,10,6,11,9,7,5}
```

复制

说明：

```
如题面所示    
```

## 示例2

输入：

```
{}
```

复制

返回值：

```
{}
```

## 题解

这题。。我拿到之后就一个想法，把left变成right right变成left不就完事了。。  只需要遍历一遍，顺便把left和right换一下 

~~~java
import java.util.*;

/*
 * public class TreeNode {
 *   int val = 0;
 *   TreeNode left = null;
 *   TreeNode right = null;
 *   public TreeNode(int val) {
 *     this.val = val;
 *   }
 * }
 */

public class Solution {
    /**
     * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
     *
     *
     * @param pRoot TreeNode类 
     * @return TreeNode类
     */
    public void changeNode(TreeNode root){
        TreeNode temp = root.left;
        root.left=root.right;
        root.right=temp;
        if(root.left!=null) changeNode(root.left);
        if(root.right!=null) changeNode(root.right);
    }
    public TreeNode Mirror (TreeNode pRoot) {
        // write code here
        if(pRoot==null) return null;
        changeNode(pRoot);
        return pRoot;
    }
}
~~~

# **JZ32** **从上往下打印二叉树**

## 描述

不分行从上往下打印出二叉树的每个节点，同层节点从左至右打印。例如输入{8,6,10,#,#,2,1}，如以下图中的示例二叉树，则依次打印8,6,10,2,1(空节点不打印，跳过)，请你将打印的结果存放到一个数组里面，返回。

![img](https://uploadfiles.nowcoder.com/images/20211029/557336_1635477973725/6C502E0240CAC668843969AFF396B5E4)

数据范围:

0<=节点总数<=1000

-1000<=节点值<=1000

## 示例1

输入：

```
{8,6,10,#,#,2,1}
```

复制

返回值：

```
[8,6,10,2,1]
```

复制

## 示例2

输入：

```
{5,4,#,3,#,2,#,1}
```

复制

返回值：

```
[5,4,3,2,1]
```

## 题解

### 思路1：队列

层次遍历易想到使用队列

队列是一种仅支持在表尾进行插入操作、在表头进行删除操作的线性表，插入端称为队尾，删除端称为队首，因整体类似排队的队伍而得名。它满足先进先出的性质，元素入队即将新元素加在队列的尾，元素出队即将队首元素取出，它后一个作为新的队首。

二叉树的层次遍历就是按照从上到下每行，然后每行中从左到右依次遍历，得到的二叉树的元素值。对于层次遍历，我们通常会使用队列来辅助：

因为队列是一种先进先出的数据结构，我们依照它的性质，如果从左到右访问完一行节点，并在访问的时候依次把它们的子节点加入队列，那么它们的子节点也是从左到右的次序，且排在本行节点的后面，因此队列中出现的顺序正好也是从左到右，正好符合层次遍历的特点。

~~~java
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Queue;

/**
public class TreeNode {
    int val = 0;
    TreeNode left = null;
    TreeNode right = null;

    public TreeNode(int val) {
        this.val = val;

    }

}
*/
public class Solution {
    public ArrayList<Integer> PrintFromTopToBottom(TreeNode root) {
        ArrayList<Integer> arr = new ArrayList<>();
        if(root==null) return arr;
        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);
        while(!queue.isEmpty()){
            TreeNode node = queue.poll();
            arr.add(node.val);
            if(node.left!=null) queue.add(node.left);
            if(node.right!=null) queue.add(node.right);
        }
        return arr;
    }
}
~~~

# **JZ33** **二叉搜索树的后序遍历序列**

## 描述

输入一个整数数组，判断该数组是不是某二叉搜索树的后序遍历的结果。如果是则返回 true ,否则返回 false 。假设输入的数组的任意两个数字都互不相同。

数据范围： 节点数量 0 \le n \le 10000≤*n*≤1000 ，节点上的值满足 1 \le val \le 10^{5}1≤*v**a**l*≤105 ，保证节点上的值各不相同
要求：空间复杂度 O(n)*O*(*n*) ，时间时间复杂度 O(n^2)*O*(*n*2)

提示：

1.二叉搜索树是指父亲节点大于左子树中的全部节点，但是小于右子树中的全部节点的树。

2.该题我们约定空树不是二叉搜索树

3.后序遍历是指按照 “左子树-右子树-根节点” 的顺序遍历

4.参考下面的二叉搜索树，示例 1

![img](https://uploadfiles.nowcoder.com/images/20211031/557336_1635645087543/44496AC711FE9478BABD9207180C3423)

## 示例1

输入：

```
[1,3,2]
```

复制

返回值：

```
true
```

复制

说明：

```
是上图的后序遍历 ，返回true         
```

## 示例2

输入：

```
[3,1,2]
```

复制

返回值：

```
false
```

复制

说明：

```
不属于上图的后序遍历，从另外的二叉搜索树也不能后序遍历出该序列 ，因为最后的2一定是根节点，前面一定是孩子节点，可能是左孩子，右孩子，根节点，也可能是全左孩子，根节点，也可能是全右孩子，根节点，但是[3,1,2]的组合都不能满足这些情况，故返回false    
```

## 示例3

输入：

```
[5,7,6,9,11,10,8]
```

复制

返回值：

```
true
```

## 题解

### 递归分治

题目中数组为后序遍历的结果，是按照左右根的顺序，因此数组的最后一个元素必为根节点，如此，在二叉搜索树中前面的结点会出现以下情况

1. 前面的元素都比根节点大：说明前面的所有元素都在根节点的右子树上，此时只需研究右子树是否满足条件
2. 前面的元素都比根节点小：说明前面的所有元素都在根节点的左子树上，此时只需要研究左子树是否满足条件
3. 前面的元素左边一半比根节点小，右边一半比根节点大：说明左面那半在根节点左子树上，右面那半在右子树上，此时分别递归左右两个子树判断即可
4. 如果还有其他情况，则可以判断此树不可能是二叉搜索树

因此我们的解题思路是分治过程中在每一层判断当前树是否为这三种情况中的一种，如果是则继续分治下去，直到最后只剩一个节点的时候return true

下面题解代码中，check函数的思路为：先找到第一个比root小的结点，再判断分割点之前是否都比root小，如果都满足则一定在上述情况1、2、3中，可以继续分治递归

~~~java
public class Solution {
    boolean check(int[] seq,int l,int r){
        //出口条件
        if (r-l<=1)return true;
        int root = seq[r];
        int p = r-1;
        while (p>=l&&seq[p]>=root)p--;//找到左右子树分割点
        for(int i=l;i<=p;i++){
            if(seq[i]>=root) return false;
        }
        return check(seq, l, p)&&check(seq, p+1, r-1);
    }
    public boolean VerifySquenceOfBST(int [] sequence) {
        if (sequence.length<=0)return false;
        return check(sequence,0,sequence.length-1);
    }
}
~~~

**时间复杂度：**O(n^2), n为二叉树节点的个数, 当树为链式时时间复杂度最坏为O(n^2)
**空间复杂度：**O(n), 当树为链式结构时, 递归深度为n

### 栈

其实思路与递归分治差不多

题目中的要点在于两个：后序遍历，二叉搜索树。我们模拟后序遍历的过程，来判断每时每刻的状态是否满足二叉搜索树。
从后往前遍历，即顺序变成了根->右子树->左子树。由于右子树>根>左子树，所以当该序列有下降时，说明当前已经来到了左子树，找到大于当前值的最小值，该值即为局部树中的根节点。初始时，令根节点root无穷大，则当前树为该根节点的左子树。遍历过程中，逐步缩小root的值，因为所有的操作都是在当前根节点root的左子树中进行的，所以保证遍历的值小于root即可满足判断条件，否则为false；

![图片说明](https://bd-hexo.oss-cn-beijing.aliyuncs.com/img/ADE9D4A763B0478118BC3B3C3D32878B.png)

~~~java
import java.util.Stack;
public class Solution {
    public boolean VerifySquenceOfBST(int [] sequence) {
        if (sequence.length <= 0)return false;
        Stack<Integer> stack = new Stack<>();
        int root = Integer.MAX_VALUE;
        for (int i = sequence.length - 1; i >= 0; i--) {
            if (sequence[i] > root) return false;
            while (!stack.isEmpty() && sequence[i] < stack.peek()) {
                root = stack.pop();
            }
            stack.push(sequence[i]);
        }
        return true;
    }
}
~~~

时间复杂度：O(n),遍历数组序列。
空间复杂度：O(n),入栈最大数目n。

# **JZ82** **二叉树中和为某一值的路径(一)**

## 描述

给定一个二叉树root和一个值 sum ，判断是否有从根节点到叶子节点的节点值之和等于 sum 的路径。

1.该题路径定义为从树的根结点开始往下一直到叶子结点所经过的结点

2.叶子节点是指没有子节点的节点

3.路径只能从父节点到子节点，不能从子节点到父节点

4.总节点数目为n


例如：
给出如下的二叉树，\ sum=22 *s**u**m*=22，
![img](https://uploadfiles.nowcoder.com/images/20200807/999991351_1596786493913_8BFB3E9513755565DC67D86744BB6159)
返回true，因为存在一条路径 5\to 4\to 11\to 25→4→11→2的节点值之和为 22

数据范围：

1.树上的节点数满足 0 \le n \le 100000≤*n*≤10000

2.每 个节点的值都满足 |val| \le 1000∣*v**a**l*∣≤1000

要求：空间复杂度 O(n)*O*(*n*)，时间复杂度 O(n)*O*(*n*)

进阶：空间复杂度 O(树的高度)*O*(树的高度)，时间复杂度 O(n)*O*(*n*)

## 示例1

输入：

```
{5,4,8,1,11,#,9,#,#,2,7},22
```

复制

返回值：

```
true
```

复制

## 示例2

输入：

```
{1,2},0
```

复制

返回值：

```
false
```

复制

## 示例3

输入：

```
{1,2},3
```

复制

返回值：

```
true
```

复制

## 示例4

输入：

```
{},0
```

复制

返回值：

```
false
```

## 题解

#### 递归遍历

~~~java
import java.util.*;
/*
 * public class TreeNode {
 *   int val = 0;
 *   TreeNode left = null;
 *   TreeNode right = null;
 * }
 */
public class Solution {
    /**
     * 
     * @param root TreeNode类 
     * @param sum int整型 
     * @return bool布尔型
     */
    public boolean hasPathSum (TreeNode root, int sum) {
        // 根节点为空，则直接返回false
        if (root == null){
            return false;
        }
        // 只有根节点，且值满足要求，则返回true
        if (root.left == null && root.right == null && root.val == sum){
            return true;
        }
        // 递归遍历
        return hasPathSum(root.left,sum-root.val)||hasPathSum(root.right,sum-root.val);
    }
}
~~~



# **JZ34** **二叉树中和为某一值的路径(二)**

## 描述

输入一颗二叉树的根节点root和一个整数expectNumber，找出二叉树中结点值的和为expectNumber的所有路径。

1.该题路径定义为从树的根结点开始往下一直到叶子结点所经过的结点

2.叶子节点是指没有子节点的节点

3.路径只能从父节点到子节点，不能从子节点到父节点

4.总节点数目为n

如二叉树root为{10,5,12,4,7},expectNumber为22

![img](https://uploadfiles.nowcoder.com/images/20210929/557336_1632915294911/0A4B8F161306A7054899D42C0C6937FD)

则合法路径有[[10,5,7],[10,12]]

数据范围:

树中节点总数在范围 [0, 5000] 内

-1000 <= 节点值 <= 1000

-1000 <= expectNumber <= 1000

## 示例1

输入：

```
{10,5,12,4,7},22
```

复制

返回值：

```
[[10,5,7],[10,12]]
```

复制

说明：

```
返回[[10,12],[10,5,7]]也是对的      
```

## 示例2

输入：

```
{10,5,12,4,7},15
```

复制

返回值：

```
[]
```

复制

## 示例3

输入：

```
{2,3},0
```

复制

返回值：

```
[]
```

复制

## 示例4

输入：

```
{1,3,4},7
```

复制

返回值：

```
[]
```

## 题解

### DFS

深度优先搜索一般用于树或者图的遍历，其他有分支的（如二维矩阵）也适用。它的原理是从初始点开始，一直沿着同一个分支遍历，直到该分支结束，然后回溯到上一级继续沿着一个分支走到底，如此往复，直到所有的节点都有被访问到。

**思路：**

我们从根节点开始向左右子树进行递归，递归函数中需要处理的是：

1. 当前的路径`path`要更新
2. 当前的目标值`expectNumber`要迭代，减去当前节点的值
3. 若当前节点是叶子节点，考虑是否满足路径的期待值，并考虑是否将路径添加到返回列表中

~~~java
import java.util.ArrayList;
import java.util.LinkedList;
/**
public class TreeNode {
    int val = 0;
    TreeNode left = null;
    TreeNode right = null;

    public TreeNode(int val) {
        this.val = val;

    }

}
*/
public class Solution {
    ArrayList<ArrayList<Integer>> res = new ArrayList<>();

    /**
     *
     * @param root 树根节点
     * @param expectNumber 目标和
     * @param path 路径
     */
    void findRes(TreeNode root,int expectNumber, LinkedList<Integer> path){
        if(root==null) return;
        expectNumber-=root.val;
        path.add(root.val);
        System.out.println(expectNumber);
        if(expectNumber==0&&root.left==null&&root.right==null){
            res.add(new ArrayList<>(path));
        }
        findRes(root.left,expectNumber,path);
        findRes(root.right,expectNumber,path);
        path.removeLast();
    }
    public ArrayList<ArrayList<Integer>> FindPath(TreeNode root, int expectNumber) {
        LinkedList<Integer> path = new LinkedList<>();
        findRes(root,expectNumber,path);
        return res;
    }
}
~~~

### 扩展思路：BFS

利用队列

# **JZ36** **二叉搜索树与双向链表**

## 描述

输入一棵二叉搜索树，将该二叉搜索树转换成一个排序的双向链表。如下图所示

![img](https://uploadfiles.nowcoder.com/images/20210605/557336_1622886924427/E1F1270919D292C9F48F51975FD07CE2)

数据范围：输入二叉树的节点数 0 \le n \le 10000≤*n*≤1000，二叉树中每个节点的值 0\le val \le 10000≤*v**a**l*≤1000
要求：空间复杂度O(1)*O*(1)（即在原树上操作），时间复杂度 O(n)*O*(*n*)

注意:

1.要求不能创建任何新的结点，只能调整树中结点指针的指向。当转化完成以后，树中节点的左指针需要指向前驱，树中节点的右指针需要指向后继
2.返回链表中的第一个节点的指针
3.函数返回的TreeNode，有左右指针，其实可以看成一个双向链表的数据结构

4.你不用输出双向链表，程序会根据你的返回值自动打印输出

### 输入描述：

二叉树的根节点

### 返回值描述：

双向链表的其中一个头节点。

## 示例1

输入：

```
{10,6,14,4,8,12,16}
```

复制

返回值：

```
From left to right are:4,6,8,10,12,14,16;From right to left are:16,14,12,10,8,6,4;
```

复制

说明：

```
输入题面图中二叉树，输出的时候将双向链表的头节点返回即可。     
```

## 示例2

输入：

```
{5,4,#,3,#,2,#,1}
```

复制

返回值：

```
From left to right are:1,2,3,4,5;From right to left are:5,4,3,2,1;
```

复制

说明：

```
                    5
                  /
                4
              /
            3
          /
        2
      /
    1
树的形状如上图       
```

## 题解

### 递归中序遍历

**知识点1：二叉树递归**

递归是一个过程或函数在其定义或说明中有直接或间接调用自身的一种方法，它通常把一个大型复杂的问题层层转化为一个与原问题相似的规模较小的问题来求解。因此递归过程，最重要的就是查看能不能讲原本的问题分解为更小的子问题，这是使用递归的关键。

而二叉树的递归，则是将某个节点的左子树、右子树看成一颗完整的树，那么对于子树的访问或者操作就是对于原树的访问或者操作的子问题，因此可以自我调用函数不断进入子树。

**知识点2：二叉搜索树**

二叉搜索树是一种特殊的二叉树，它的每个节点值大于它的左子节点，且大于全部左子树的节点值，小于它右子节点，且小于全部右子树的节点值。因此二叉搜索树一定程度上算是一种排序结构。

**思路：**

二叉搜索树最左端的元素一定最小，最右端的元素一定最大，符合“左中右”的特性，因此二叉搜索树的中序遍历就是一个递增序列，我们只要对它中序遍历就可以组装称为递增双向链表。

**具体做法：**

- step 1：创建两个指针，一个指向题目中要求的链表头（head），一个指向当前遍历的前一节点（pre)。
- step 2：首先递归到最左，初始化head与pre。
- step 3：然后处理中间根节点，依次连接pre与当前节点，连接后更新pre为当前节点。
- step 4：最后递归进入右子树，继续处理。
- step 5：递归出口即是节点为空则返回。

**图示：**

![图片说明](https://bd-hexo.oss-cn-beijing.aliyuncs.com/img/8F315406A801B462272F54DD34866AFD.gif)

~~~java
/**
public class TreeNode {
    int val = 0;
    TreeNode left = null;
    TreeNode right = null;

    public TreeNode(int val) {
        this.val = val;

    }

}
*/
public class Solution {
    public TreeNode head;
    public TreeNode pre;
    public void findRes(TreeNode root){
        if(root==null) return;
        findRes(root.left);
        //头结点的处理
        if(pre==null){
            head=root;
            pre=root;
        }else {//其他结点的处理
            pre.right=root;
            root.left=pre;
            pre=root;
        }
        findRes(root.right);
    }
    public TreeNode Convert(TreeNode pRootOfTree) {
        findRes(pRootOfTree);
        return head;
    }
}
~~~

# **JZ79** **判断是不是平衡二叉树**

## 描述

输入一棵节点数为 n 二叉树，判断该二叉树是否是平衡二叉树。

在这里，我们只需要考虑其平衡性，不需要考虑其是不是排序二叉树

**平衡二叉树**（Balanced Binary Tree），具有以下性质：它是一棵空树或它的左右两个子树的高度差的绝对值不超过1，并且左右两个子树都是一棵平衡二叉树。

样例解释：

![img](https://uploadfiles.nowcoder.com/images/20210918/382300087_1631935149594/D55A07912354B3AB7E9F2F5EA27CB7D6)

样例二叉树如图，为一颗平衡二叉树

注：我们约定空树是平衡二叉树。

数据范围：n \le 100*n*≤100,树上节点的val值满足 0 \le n \le 10000≤*n*≤1000

要求：空间复杂度O(1)*O*(1)，时间复杂度 O(n)*O*(*n*)

### 输入描述：

输入一棵二叉树的根节点

### 返回值描述：

输出一个布尔类型的值

## 示例1

输入：

```
{1,2,3,4,5,6,7}
```

复制

返回值：

```
true
```

复制

## 示例2

输入：

```
{}
```

复制

返回值：

```
true
```

## 题解

### 递归遍历求深度

只需要在求深度的基础上加上对左右子树层数的判断即可`if(Math.abs(l-r)>1) flag=false;`

~~~java
public class Solution {
    boolean flag=true;
    public int getStep(TreeNode root,int step){
        
        if(root==null) return step;
        else step++;
        int l=getStep(root.left, step);
        int r=getStep(root.right,step);
        if(Math.abs(l-r)>1) flag=false;
        return Math.max(l,r);
    }
    public boolean IsBalanced_Solution(TreeNode root) {
        getStep(root,0);
        return flag;
    }
}
~~~

### 剪枝优化

在上图的递归中，无论什么情况都需要判断完成整个二叉树才能得出结果，而实际上只需要有一个不平衡的子树就可以不继续判断了，可以据此设置剪枝函数

~~~java
public class Solution {
    boolean flag=true;
    public int getStep(TreeNode root,int step){
        if(flag==false) return -1;
        if(root==null) return step;
        else step++;
        int l=getStep(root.left, step);
        int r=getStep(root.right,step);
        if(Math.abs(l-r)>1) flag=false;
        return Math.max(l,r);
    }
    public boolean IsBalanced_Solution(TreeNode root) {
        getStep(root,0);
        return flag;
    }
}
~~~

快了2ms

# **JZ8** **二叉树的下一个结点**

## 描述

给定一个二叉树其中的一个结点，请找出中序遍历顺序的下一个结点并且返回。注意，树中的结点不仅包含左右子结点，同时包含指向父结点的next指针。下图为一棵有9个节点的二叉树。树中从父节点指向子节点的指针用实线表示，从子节点指向父节点的用虚线表示

![img](https://uploadfiles.nowcoder.com/images/20210616/557336_1623844408327/D03B8D5BB902D4516BB92CB216E58EC4)

示例:

输入:{8,6,10,5,7,9,11},8

返回:9

解析:这个组装传入的子树根节点，其实就是整颗树，中序遍历{5,6,7,8,9,10,11}，根节点8的下一个节点就是9，应该返回{9,10,11}，后台只打印子树的下一个节点，所以只会打印9，如下图，其实都有指向左右孩子的指针，还有指向父节点的指针，下图没有画出来

![img](https://uploadfiles.nowcoder.com/images/20210616/557336_1623845692021/E647707AEF2A4AE2C40F0FCCB549B6A5)

数据范围：节点数满足 1 \le n \le 50 \1≤*n*≤50 ，节点上的值满足 1 \le val \le 100 \1≤*v**a**l*≤100 

要求：空间复杂度 O(1) \*O*(1) ，时间复杂度 O(n)\*O*(*n*) 

### 输入描述：

输入分为2段，第一段是整体的二叉树，第二段是给定二叉树节点的值，后台会将这2个参数组装为一个二叉树局部的子树传入到函数GetNext里面，用户得到的输入只有一个子树根节点

### 返回值描述：

返回传入的子树根节点的下一个节点，后台会打印输出这个节点

## 示例1

输入：

```
{8,6,10,5,7,9,11},8
```

复制

返回值：

```
9
```

复制

## 示例2

输入：

```
{8,6,10,5,7,9,11},6
```

复制

返回值：

```
7
```

复制

## 示例3

输入：

```
{1,2,#,#,3,#,4},4
```

复制

返回值：

```
1
```

复制

## 示例4

输入：

```
{5},5
```

复制

返回值：

```
"null"
```

复制

说明：

```
不存在，后台打印"null"   
```

## 题解

### 1、递归遍历法

这种方法很直接也很好想，先找到二叉树的根节点，然后按照中序遍历规则递归遍历，只需要在遍历过程中加上找当前结点的程序



先写个基础的中序遍历

~~~java
    void inOrder(TreeLinkNode root){
        if(root!=null){
            inOrder(root.left);
            System.out.println(root.val);
            inOrder(root.right);
        }
    }
~~~

保存遍历的数组，并从中搜寻结果

~~~java
public class Solution {
    LinkedList<TreeLinkNode> nodes = new LinkedList<>();
    public TreeLinkNode GetNext(TreeLinkNode pNode) {
        // 获取根节点
        TreeLinkNode root = pNode;
        while(root.next != null) root = root.next;

        // 中序遍历打造nodes
        InOrder(root);

        // 进行匹配
        int n = nodes.size();
        for(int i = 0; i < n - 1; i++) {
            TreeLinkNode cur = nodes.get(i);
            if(pNode == cur) {
                return nodes.get(i+1);
            }
        }
        return null;
    }

    // 中序遍历
    void InOrder(TreeLinkNode root) {
        if(root != null) {
            InOrder(root.left);
            nodes.add(root);
            InOrder(root.right);
        }
    }
}
~~~

- 时间复杂度：O(N)，因为遍历了树中的所有节点
- 空间复杂度：O(N)，因为引入了存储所有节点的空间

### 2、直接按照逻辑查找

第一种方法无论什么情况下都是遍历两遍二叉树，再来看看这种直接寻找的方式

直接寻找分为三种情况

1. 如果给出的结点有右子节点，则最终要返回的下一个结点即右子树的最左下的结点
2. 如果给出的结点无右子节点，且当前结点是其父节点的左子节点，则返回其父节点
3. 如果给出的结点无右子节点，且当前结点是其父节点的右子节点，则先要沿着左上方父节点爬树，一直爬到当前结点是其父节点的左子节点为止，返回的就是这个父节点；或者没有满足上述情况的则返回为NULL

~~~java

import common.TreeLinkNode;

/*
public class TreeLinkNode {
    int val;
    TreeLinkNode left = null;
    TreeLinkNode right = null;
    TreeLinkNode next = null;

    TreeLinkNode(int val) {
        this.val = val;
    }
}
*/
public class Solution {
    public TreeLinkNode GetNext(TreeLinkNode pNode) {
//        情况1
        if (pNode.right != null) {
            TreeLinkNode p = pNode.right;
            //找右子树的最左边
            while (p.left!=null) p=p.left;
            return p;
        }
        else if(pNode.next!=null&&pNode.next.left==pNode){
            return pNode.next;
        }
        else if(pNode.next!=null){
            TreeLinkNode p = pNode;
            while (p.next!=null&&p.next.right==p) p=p.next;
            return p.next;
        }
        return null;
    }
}
~~~



- 时间复杂度：O(N)，最大代价是当树退化成一个只包含右子节点的链表，当给定节点是中序遍历最后一个节点时，会进入情况三的分析部分，在向左上方向一直迭代直到根节点，才会发现应该返回NULL，即无下一个节点，此时代价最大。
- 空间复杂度：O(1)，无额外空间的借用

# **JZ28** **对称的二叉树**

## 描述

给定一棵二叉树，判断其是否是自身的镜像（即：是否对称）
例如：                 下面这棵二叉树是对称的
![img](https://uploadfiles.nowcoder.com/images/20210926/382300087_1632642756706/A22A794C036C06431E632F9D5E2E298F)
下面这棵二叉树不对称。
![img](https://uploadfiles.nowcoder.com/images/20210926/382300087_1632642770481/3304ABDD147D8E140B2CEF3201BD8372)

数据范围：节点数满足 0 \le n \le 10000≤*n*≤1000，节点上的值满足 |val| \le 1000∣*v**a**l*∣≤1000

要求：空间复杂度 O(n)*O*(*n*)，时间复杂度 O(n)*O*(*n*)

备注：

你可以用递归和迭代两种方法解决这个问题

## 示例1

输入：

```
{1,2,2,3,4,4,3}
```

复制

返回值：

```
true
```

复制

## 示例2

输入：

```
{8,6,9,5,7,7,5}
```

复制

返回值：

```
false
```

## 题解

### 1、对称递归遍历

左右子树一起递归遍历，且左右相反，当遇到结点值不同，或者左右结点一个空一个非空时返回false，其他情况说明比对成功

~~~java
/*
public class TreeNode {
    int val = 0;
    TreeNode left = null;
    TreeNode right = null;

    public TreeNode(int val) {
        this.val = val;

    }

}
*/
public class Solution {
    boolean judge(TreeNode leftTree,TreeNode rightTree){
        //都为空说明比较到了叶子结点且前面全一样
        if(leftTree==null&&rightTree==null) return true;
        //其中一个null返回false，两边不同
        if(leftTree==null||rightTree==null) return false;
        //值不同返回false
        if(leftTree.val!=rightTree.val) return false;
        //递归镜像检查
        return judge(leftTree.left,rightTree.right)&&judge(leftTree.right,rightTree.left);
    }
    boolean isSymmetrical(TreeNode pRoot) {
        return judge(pRoot,pRoot);
    }
}
~~~

- 时间复杂度：O(n)，其中nn*n*为二叉树的节点数，相当于遍历整个二叉树两次
- 空间复杂度：O(n)，最坏情况二叉树退化为链表，递归栈深度为nn*n*

### 法2、层次遍历回文串

按照层次遍历时，如果对称则每一层都是回文串,因此可以拿队列实现层次遍历，然后检查每一层是否是回文串

~~~java
import java.util.*;
public class Solution {
    boolean isSymmetrical(TreeNode pRoot) {
        //空树为对称的
        if(pRoot == null) 
            return true;
        //辅助队列用于从两边层次遍历
        Queue<TreeNode> q1 = new LinkedList<TreeNode>(); 
        Queue<TreeNode> q2 = new LinkedList<TreeNode>();
        q1.offer(pRoot.left);
        q2.offer(pRoot.right);
        while(!q1.isEmpty() && !q2.isEmpty()){ 
            //分别从左边和右边弹出节点
            TreeNode left = q1.poll(); 
            TreeNode right = q2.poll();
            //都为空暂时对称
            if(left == null && right == null)
                continue;
            //某一个为空或者数字不相等则不对称
            if(left == null || right == null || left.val != right.val)
                return false;
            //从左往右加入队列
            q1.offer(left.left); 
            q1.offer(left.right);
            //从右往左加入队列
            q2.offer(right.right); 
            q2.offer(right.left);
        }
        //都检验完都是对称的
        return true;
    }
}

~~~

- 时间复杂度：O(n)，其中nn*n*为二叉树的节点个数，相当于遍历二叉树全部节点
- 空间复杂度：O(n)，两个辅助队列的最大空间为nn*n*

# **JZ78** **把二叉树打印成多行**

## 描述

给定一个节点数为 n 二叉树，要求从上到下按层打印二叉树的 val 值，同一层结点从左至右输出，每一层输出一行，将输出的结果存放到一个二维数组中返回。

例如：
给定的二叉树是{1,2,3,#,#,4,5}
![img](https://uploadfiles.nowcoder.com/images/20210717/557336_1626492068888/41FDD435F0BA63A57E274747DE377E05)

~~~
该二叉树多行打印层序遍历的结果是

[

[1],

[2,3],

[4,5]

]
~~~

数据范围：二叉树的节点数 0 \le n \le 10000≤*n*≤1000，0 \le val \le 10000≤*v**a**l*≤1000

要求：空间复杂度 O(n)*O*(*n*)，时间复杂度 O(n)*O*(*n*)

### 输入描述：

给定一个二叉树的根节点

## 示例1

输入：

```
{1,2,3,#,#,4,5}
```

复制

返回值：

```
[[1],[2,3],[4,5]]
```

复制

## 示例2

输入：

```
{8,6,10,5,7,9,11}
```

复制

返回值：

```
[[8],[6,10],[5,7,9,11]]
```

复制

## 示例3

输入：

```
{1,2,3,4,5}
```

复制

返回值：

```
[[1],[2,3],[4,5]]
```

复制

## 示例4

输入：

```
{}
```

复制

返回值：

```
[]
```

## 题解

### 1、

~~~java
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Queue;


/*
public class TreeNode {
    int val = 0;
    TreeNode left = null;
    TreeNode right = null;

    public TreeNode(int val) {
        this.val = val;

    }

}
*/
public class Solution {
    ArrayList<ArrayList<Integer> > Print(TreeNode pRoot) {
        if (pRoot==null) return new ArrayList<>();
        Queue<TreeNode> queue = new LinkedList<>();
        ArrayList<ArrayList<Integer> > res = new ArrayList<>();
        queue.add(pRoot);
        while (!queue.isEmpty()){
            LinkedList<Integer> temp = new LinkedList<>();
            int n = queue.size();
            for(int i=1;i<=n;i++){
                TreeNode node = queue.poll();
                temp.add(node.val);
                if(node.left!=null) queue.add(node.left);
                if(node.right!=null) queue.add(node.right);
            }
            //添加到结果
            res.add(new ArrayList<>(temp));
        }
        return res;
    }

}
~~~

### 2、递归遍历，用二维数组存结果

二维数组 第一维代表层数，递归时带着层数递归即可

- step 1：记录输出的二维数组初始化为空，每到一层里面填出一个一维数组。
- step 2：从根节点开始，深度为1开始进行递归，当前节点有值递归内容才继续进行，否则返回。
- step 3：如果记录输出的二维数组长度小于当前层数，说明要新到了一层，我们新开辟一个一维数组加到最后。
- step 4：因为“根左右”的顺序，同一层左边必定先访问，只需要根据层数在二维数组中找到相应的行号，添加在该行末尾就一定是层次遍历的次序。

~~~java
import java.util.*;
public class Solution {
    private void traverse(TreeNode root, ArrayList<ArrayList<Integer> > res, int depth) {
        if(root != null){
            //数组长度小于当前层数，新开一层
            if(res.size() < depth)             
                res.add(new ArrayList<Integer>());  
            //数组从0开始计数因此减1，在节点当前层的数组中插入节点
            res.get(depth - 1).add(root.val); 
            //递归左右时节点深度记得加1
            traverse(root.left, res, depth + 1); 
            traverse(root.right, res, depth + 1);
        }
    }
    //层次遍历
    public ArrayList<ArrayList<Integer> > Print(TreeNode pRoot) {
        ArrayList<ArrayList<Integer> > res = new ArrayList<ArrayList<Integer> >();
        //树的层级从1开始递归计数
        traverse(pRoot, res, 1); 
        return res;
    }
    
}

~~~

# **JZ37** **序列化二叉树**

## 描述

请实现两个函数，分别用来序列化和反序列化二叉树，不对序列化之后的字符串进行约束，但要求能够根据序列化之后的字符串重新构造出一棵与原二叉树相同的树。

二叉树的序列化(Serialize)是指：把一棵二叉树按照某种遍历方式的结果以某种格式保存为字符串，从而使得内存中建立起来的二叉树可以持久保存。序列化可以基于先序、中序、后序、层序的二叉树等遍历方式来进行修改，序列化的结果是一个字符串，序列化时通过 某种符号表示空节点（#）

二叉树的反序列化(Deserialize)是指：根据某种遍历顺序得到的序列化字符串结果str，重构二叉树。

例如，可以根据层序遍历的方案序列化，如下图:

![img](https://uploadfiles.nowcoder.com/images/20210910/557336_1631245540483/320409CB186FCD18144519959D510D7E)

层序序列化(即用函数Serialize转化)如上的二叉树转为"{1,2,3,#,#,6,7}"，再能够调用反序列化(Deserialize)将"{1,2,3,#,#,6,7}"构造成如上的二叉树。

当然你也可以根据满二叉树结点位置的标号规律来序列化，还可以根据先序遍历和中序遍历的结果来序列化。不对序列化之后的字符串进行约束，所以欢迎各种奇思妙想。

数据范围：节点数 n \le 100*n*≤100，树上每个节点的值满足 0 \le val \le 1500≤*v**a**l*≤150

要求：序列化和反序列化都是空间复杂度 O(n)*O*(*n*)，时间复杂度 O(n)*O*(*n*)

## 示例1

输入：

```
{1,2,3,#,#,6,7}
```

复制

返回值：

```
{1,2,3,#,#,6,7}
```

复制

说明：

```
如题面图   
```

## 示例2

输入：

```
{8,6,10,5,7,9,11}
```

复制

返回值：

```
{8,6,10,5,7,9,11}
```



## 题解

### 二叉树递归

序列化即将二叉树的节点值取出，放入一个字符串中，我们可以按照前序遍历的思路，遍历二叉树每个节点，并将节点值存储在字符串中，我们用‘#’表示空节点，用‘!'表示节点与节点之间的分割。

反序列化即根据给定的字符串，将二叉树重建，因为字符串中的顺序是前序遍历，因此我们重建的时候也是前序遍历，即可还原。

~~~java
/*
public class TreeNode {
    int val = 0;
    TreeNode left = null;
    TreeNode right = null;

    public TreeNode(int val) {
        this.val = val;

    }

}
*/
public class Solution {
    private void SerializeFunction(TreeNode root, StringBuilder str){
        if (root==null) {
            str.append('#');
            return;
        }
        str.append(root.val).append('!');
        SerializeFunction(root.left,str);
        SerializeFunction(root.right, str);
    }
    String Serialize(TreeNode root) {
        StringBuilder str = new StringBuilder();
        SerializeFunction(root,str);
        return str.toString();
    }
    int index=0;
    private TreeNode DeserializeFunction(String str){
        //到达叶节点时，构建完毕，返回继续构建父节点
        //空节点
        if(str.charAt(index) == '#'){
            index++;
            return null;
        }
        //数字转换
        int val = 0;
        //遇到分隔符或者结尾
        while(str.charAt(index) != '!' && index != str.length()){
            val =val*10+((str.charAt(index)) - '0');
            index++;
        }
        TreeNode root = new TreeNode(val);
        //序列到底了，构建完成
        if(index == str.length())
            return root;
        else
            index++;
        //反序列化与序列化一致，都是前序
        root.left = DeserializeFunction(str);
        root.right = DeserializeFunction(str);
        return root;
    }
    TreeNode Deserialize(String str) {
        //空序列对应空树
        if(str == "#")
            return null;
        return DeserializeFunction(str);
    }
}
~~~

# **JZ84** **二叉树中和为某一值的路径(三)**

## 描述

给定一个二叉树root和一个整数值 sum ，求该树有多少路径的的节点值之和等于 sum 。

1.该题路径定义不需要从根节点开始，也不需要在叶子节点结束，但是一定是从父亲节点往下到孩子节点

2.总节点数目为n

3.保证最后返回的路径个数在整形范围内(即路径个数小于231-1)

数据范围:

0<=n<=10000<=*n*<=1000

-10^9<=节点值<=10^9−109<=节点值<=109

假如二叉树root为{1,2,3,4,5,4,3,#,#,-1}，sum=6，那么总共如下所示，有3条路径符合要求

![img](https://uploadfiles.nowcoder.com/images/20211103/301499_1635923010369/C47185D4980F108BC73F790D8D2F6709)

## 示例1

输入：

```
{1,2,3,4,5,4,3,#,#,-1},6
```

复制

返回值：

```
3
```

复制

说明：

```
如图所示，有3条路径符合      
```

## 示例2

输入：

```
{0,1},1
```

复制

返回值：

```
2
```

复制

## 示例3

输入：

```
{1,#,2,#,3},3
```

复制

返回值：

```
2
```

## 题解

### 递归遍历

既然要找所有路径上节点和等于目标值的路径个数，那我们肯定先找这样的路径起点啊，但是我们不知道起点究竟在哪里，而且任意节点都有可能是起点，那我们就前序遍历二叉树的所有节点，每个节点都可以作为一次起点，即子树的根节点。

~~~java
public class Solution {
    int res=0;
    private void findRes(TreeNode root,int sum){
        //空结点直接退出
        if(root==null) return;
        //判断和是否符合结果
        sum-=root.val;
        if(sum==0){
            res++;
        }
        findRes(root.left, sum);
        findRes(root.right, sum);
    }
    public int FindPath (TreeNode root, int sum) {
        // write code here
        if(root==null) return res;
        findRes(root,sum);
        FindPath(root.left,sum);
        FindPath(root.right,sum);
        return res;
    }
}
~~~

- 时间复杂度：O(n^2)，其中nn*n*为二叉树的结点数，两层dfs嵌套递归
- 空间复杂度：O(n)，每层dfs最深递归栈都只有nn*n*

### 哈希表

两次遍历有些浪费，我们看看可不可以一次遍历解决：

在进入以某个结点为根的子树中，向其中添加到该节点为止的路径和进入哈希表中，相当于每次分枝下都有前面各种路径和。如果从根节点开始到当前节点的累加和减去sum，在哈希表中出现过，则说明这条路径上前半段和等于到当前节点的累加和减去sum，那后半段不就等于sum了吗？因此我们只需要在计算的时候加上哈希表中这样值的路径数就可以了。

**具体做法：**

- step 1：准备一个哈希表，首先放入到根节点为止的路径和为0，路径跳数为1.然后从根节点开始递归遍历二叉树。
- step 2：在递归的时候，我们将需要找的目标和sum与到上一层为止的累加和一并放入函数参数中，跟随递归，遇到空节点则返回。
- step 3：累加到当前节点为止的路径和，如果该累加和减去sum在哈希表中出现过，相当于减去最前面出现过这个差值的一段，到该节点为止就是sum，我们加上这样的路径数。
- step 4：继续递归子节点，累加这样的路径数。进入其他分支前要回溯哈希表中刚刚添加的路径和，因为我们每次只要直属于这条路径上的值，其他路径的就不要。

~~~java
import java.util.*;
public class Solution {
    //记录路径和及条数
    private HashMap<Integer, Integer> mp = new HashMap<Integer, Integer>(); 
    //last为到上一层为止的累加和
    private int dfs(TreeNode root, int sum, int last){ 
        //空结点直接返回
        if(root == null) 
            return 0;
        int res = 0;
        //到目前结点为止的累加和
        int temp = root.val + last; 
        //如果该累加和减去sum在哈希表中出现过，相当于减去前面的分支
        if(mp.containsKey(temp - sum))  
            //加上有的路径数
            res += mp.get(temp - sum); 
        //增加该次路径和
        mp.put(temp, mp.getOrDefault(temp, 0) + 1);
        //进入子结点
        res += dfs(root.left, sum, temp); 
        res += dfs(root.right, sum, temp); 
        //回退该路径和，因为别的树枝不需要这边存的路径和
        mp.put(temp, mp.get(temp) - 1);
        return res;
    }

    public int FindPath (TreeNode root, int sum) {
        //路径和为0的有1条
        mp.put(0, 1); 
        return dfs(root, sum, 0);
    }
}

~~~

# **JZ86** **在二叉树中找到两个节点的最近公共祖先**

## 描述

给定一棵二叉树(保证非空)以及这棵树上的两个节点对应的val值 o1 和 o2，请找到 o1 和 o2 的最近公共祖先节点。

数据范围：树上节点数满足 1 \le n \le 10^5 \1≤*n*≤105 , 节点值val满足区间 [0,n)

要求：时间复杂度 O(n)*O*(*n*)

注：本题保证二叉树中每个节点的val值均不相同。

如当输入{3,5,1,6,2,0,8,#,#,7,4},5,1时，二叉树{3,5,1,6,2,0,8,#,#,7,4}如下图所示：

![img](https://uploadfiles.nowcoder.com/images/20211014/423483716_1634206667843/D2B5CA33BD970F64A6301FA75AE2EB22)

所以节点值为5和节点值为1的节点的最近公共祖先节点的节点值为3，所以对应的输出为3。

节点本身可以视为自己的祖先

## 示例1

输入：

```
{3,5,1,6,2,0,8,#,#,7,4},5,1
```

复制

返回值：

```
3
```

复制

## 示例2

输入：

```
{3,5,1,6,2,0,8,#,#,7,4},2,7
```

复制

返回值：

```
2
```

## 题解

### DFS

既然要找到二叉树中两个节点的最近公共祖先，那我们可以考虑先找到两个节点全部祖先，可以得到从根节点到目标节点的路径，然后依次比较路径得出谁是最近的祖先。

找到两个节点的所在可以深度优先搜索遍历二叉树所有节点进行查找。

**具体做法：**

- step 1：利用dfs求得根节点到两个目标节点的路径：每次选择二叉树的一棵子树往下找，同时路径数组增加这个遍历的节点值。
- step 2：一旦遍历到了叶子节点也没有，则回溯到父节点，寻找其他路径，回溯时要去掉数组中刚刚加入的元素。
- step 3：然后遍历两条路径数组，依次比较元素值。
- step 4：找到两条路径第一个不相同的节点即是最近公共祖先。

~~~java
import java.util.*;

/*
 * public class TreeNode {
 *   int val = 0;
 *   TreeNode left = null;
 *   TreeNode right = null;
 * }
 */

public class Solution {
    //判断是否找到
    boolean flag=false;
    /**
     *
     * @param root TreeNode类
     * @param o1 int整型
     * @param o2 int整型
     * @return int整型
     */
    public int lowestCommonAncestor (TreeNode root, int o1, int o2) {
        //记录两个目标的父节点
        ArrayList<Integer> path1 = new ArrayList<>();
        ArrayList<Integer> path2 = new ArrayList<>();
        dfs(root,path1,o1);
        flag=false;
        dfs(root,path2,o2);
        int res = 0;
        //比较两个路径，找到第一个不同的点（两者第一个元素必为根节点）
        for(int i = 0; i < path1.size() && i < path2.size(); i++){
            int x = path1.get(i);
            int y = path2.get(i);
            if(x == y)
                //最后一个相同的节点就是最近公共祖先
                res = x;
            else
                break;
        }
        return res;
    }

    /**
     *
     * @param root 树的根节点
     * @param list 保存父节点的数组
     * @param o 目标
     */
    void dfs(TreeNode root,ArrayList<Integer> list,int o){
        if(root==null|| flag) return;
        list.add(root.val);
        //找到了
        if(root.val==o){
            flag=true;
            return;
        }
        dfs(root.left,list,o);
        dfs(root.right,list,o);
        //找到
        if(flag)
            return;
        //回溯
        list.remove(list.size()-1);
    }
}
~~~

# **JZ68** **二叉搜索树的最近公共祖先**

## 描述

给定一个二叉搜索树, 找到该树中两个指定节点的最近公共祖先。

1.对于该题的最近的公共祖先定义:对于有根树T的两个节点p、q，最近公共祖先LCA(T,p,q)表示一个节点x，满足x是p和q的祖先且x的深度尽可能大。在这里，一个节点也可以是它自己的祖先.

2.二叉搜索树是若它的左子树不空，则左子树上所有节点的值均小于它的根节点的值； 若它的右子树不空，则右子树上所有节点的值均大于它的根节点的值

3.所有节点的值都是唯一的。

4.p、q 为不同节点且均存在于给定的二叉搜索树中。

数据范围:

3<=节点总数<=10000

0<=节点值<=10000

如果给定以下搜索二叉树: {7,1,12,0,4,11,14,#,#,3,5}，如下图:

![img](https://uploadfiles.nowcoder.com/images/20211110/301499_1636536407371/36404CF45DDCB5834FC8BBFEA318831A)

## 示例1

输入：

```
{7,1,12,0,4,11,14,#,#,3,5},1,12
```

复制

返回值：

```
7
```

复制

说明：

```
节点1 和 节点12的最近公共祖先是7   
```

## 示例2

输入：

```
{7,1,12,0,4,11,14,#,#,3,5},12,11
```

复制

返回值：

```
12
```

复制

说明：

```
因为一个节点也可以是它自己的祖先.所以输出12   
```

## 题解

### 找规律一次遍历

我们也可以利用二叉搜索树的性质：对于某一个节点若是p与q都小于等于这个这个节点值，说明p、q都在这个节点的左子树，而最近的公共祖先也一定在这个节点的左子树；若是p与q都大于等于这个节点，说明p、q都在这个节点的右子树，而最近的公共祖先也一定在这个节点的右子树。而若是对于某个节点，p与q的值一个大于等于节点值，一个小于等于节点值，说明它们分布在该节点的两边，而这个节点就是最近的公共祖先，因此从上到下的其他祖先都将这个两个节点放到同一子树，只有最近公共祖先会将它们放入不同的子树，每次进入一个子树又回到刚刚的问题，因此可以使用递归。

**具体做法：**

- step 1：首先检查空节点，空树没有公共祖先。
- step 2：对于某个节点，比较与p、q的大小，若p、q在该节点两边说明这就是最近公共祖先。
- step 3：如果p、q都在该节点的左边，则递归进入左子树。
- step 4：如果p、q都在该节点的右边，则递归进入右子树。

~~~java
import java.util.*;
public class Solution {
    public int lowestCommonAncestor (TreeNode root, int p, int q) {
        //空树找不到公共祖先
        if(root == null) 
            return -1;
        //pq在该节点两边说明这就是最近公共祖先
        if((p >= root.val && q <= root.val) || (p <= root.val && q >= root.val)) 
            return root.val;
        //pq都在该节点的左边
        else if(p <= root.val && q <= root.val) 
            //进入左子树
            return lowestCommonAncestor(root.left, p, q); 
        //pq都在该节点的右边
        else 
            //进入右子树
            return lowestCommonAncestor(root.right, p, q); 
    }
}

~~~

# **JZ9** **用两个栈实现队列**

## 描述

用两个栈来实现一个队列，使用n个元素来完成 n 次在队列尾部插入整数(push)和n次在队列头部删除整数(pop)的功能。 队列中的元素为int类型。保证操作合法，即保证pop操作时队列内已有元素。

数据范围： n\le1000*n*≤1000

要求：存储n个元素的空间复杂度为 O(n)*O*(*n*) ，插入与删除的时间复杂度都是 O(1)*O*(1)

## 示例1

输入：

```
["PSH1","PSH2","POP","POP"]
```

复制

返回值：

```
1,2
```

复制

说明：

```
"PSH1":代表将1插入队列尾部
"PSH2":代表将2插入队列尾部
"POP“:代表删除一个元素，先进先出=>返回1
"POP“:代表删除一个元素，先进先出=>返回2   
```

## 示例2

输入：

```
["PSH2","POP","PSH1","POP"]
```

复制

返回值：

```
2,1
```

## 题解

借助栈的**先进后出**规则模拟实现队列的**先进先出**

**1、**当插入时，直接插入 stack1

2、当弹出时，当 stack2 不为空，弹出 stack2 栈顶元素，如果 stack2 为空，将 stack1 中的全部数逐个出栈入栈 stack2，再弹出 stack2 栈顶元素

~~~java
import java.util.Stack;

public class Solution {
    Stack<Integer> stack1 = new Stack<Integer>();
    Stack<Integer> stack2 = new Stack<Integer>();

    public void push(int node) {
        stack1.push(node);
    }

    public int pop() {
        //空则将1压入2
        if(stack2.isEmpty()){
            while(!stack1.empty()) stack2.push(stack1.pop());
        }
        return stack2.pop();
    }
}


~~~

# **JZ30** **包含min函数的栈**

## 描述

定义栈的数据结构，请在该类型中实现一个能够得到栈中所含最小元素的 min 函数，输入操作时保证 pop、top 和 min 函数操作时，栈中一定有元素。

此栈包含的方法有：

push(value):将value压入栈中

pop():弹出栈顶元素

top():获取栈顶元素

min():获取栈中最小元素

数据范围：操作数量满足 0 \le n \le 300 \0≤*n*≤300 ，输入的元素满足 |val| \le 10000 \∣*v**a**l*∣≤10000 
进阶：栈的各个操作的时间复杂度是 O(1)\*O*(1) ，空间复杂度是 O(n)\*O*(*n*) 

示例:

输入:  ["PSH-1","PSH2","MIN","TOP","POP","PSH1","TOP","MIN"]

输出:  -1,2,1,-1

解析:

"PSH-1"表示将-1压入栈中，栈中元素为-1

"PSH2"表示将2压入栈中，栈中元素为2，-1

“MIN”表示获取此时栈中最小元素==>返回-1

"TOP"表示获取栈顶元素==>返回2

"POP"表示弹出栈顶元素，弹出2，栈中元素为-1

"PSH1"表示将1压入栈中，栈中元素为1，-1

"TOP"表示获取栈顶元素==>返回1

“MIN”表示获取此时栈中最小元素==>返回-1

## 示例1

输入：

```
 ["PSH-1","PSH2","MIN","TOP","POP","PSH1","TOP","MIN"]
```

复制

返回值：

```
-1,2,1,-1
```

## 题解

~~~java
import java.util.Stack;
 
public class Solution {
    //用于栈的push 与 pop
    Stack<Integer> s1 = new Stack<Integer>();
    //用于存储最小min
    Stack<Integer> s2 = new Stack<Integer>();
    public void push(int node) {
        s1.push(node); 
        //空或者新元素较小，则入栈
        if(s2.isEmpty() || s2.peek() > node) 
            s2.push(node);
        else
            //重复加入栈顶
            s2.push(s2.peek()); 
    }
     
    public void pop() {
        s1.pop();
        s2.pop();
    }
     
    public int top() {
        return s1.peek();
    }
     
    public int min() {
        return s2.peek();
    }
}
~~~

# **JZ31** **栈的压入、弹出序列**

## 描述

输入两个整数序列，第一个序列表示栈的压入顺序，请判断第二个序列是否可能为该栈的弹出顺序。假设压入栈的所有数字均不相等。例如序列1,2,3,4,5是某栈的压入顺序，序列4,5,3,2,1是该压栈序列对应的一个弹出序列，但4,3,5,1,2就不可能是该压栈序列的弹出序列。

\1. 0<=pushV.length == popV.length <=1000

\2. -1000<=pushV[i]<=1000

\3. pushV 的所有数字均不相同

## 示例1

输入：

```
[1,2,3,4,5],[4,5,3,2,1]
```

复制

返回值：

```
true
```

复制

说明：

```
可以通过push(1)=>push(2)=>push(3)=>push(4)=>pop()=>push(5)=>pop()=>pop()=>pop()=>pop()
这样的顺序得到[4,5,3,2,1]这个序列，返回true      
```

## 示例2

输入：

```
[1,2,3,4,5],[4,3,5,1,2]
```

复制

返回值：

```
false
```

复制

说明：

```
由于是[1,2,3,4,5]的压入顺序，[4,3,5,1,2]的弹出顺序，要求4，3，5必须在1，2前压入，且1，2不能弹出，但是这样压入的顺序，1又不能在2之前弹出，所以无法形成的，返回false   
```

## 题解

### 辅助栈

题目要我们判断两个序列是否符合入栈出栈的次序，我们就可以用一个栈来模拟。对于入栈序列。我们遍历出栈数组，并判断当前栈顶是不是我们要出栈的元素，如果是，则出栈并循环，如果栈顶不是当前出栈元素，则让当前该入栈的元素入栈，并继续比较

**具体做法**

1、准备一个辅助栈

2、遍历入栈数组请求入栈

3、如果当前栈顶不是要入栈的元素，则吧pushA[j++]入栈

4、如果最后比较发现栈顶和要入栈的元素不相等，说明已经遍历完整个pushA数组都不能使当前入栈元素入栈，所以返回false

~~~java
import java.util.Stack;

public class Solution {
    /**
     * 
     * @param pushA 入栈
     * @param popA 出栈
     * @return 判断
     */
    public boolean IsPopOrder(int [] pushA,int [] popA) {
        Stack<Integer> stack = new Stack<>();
        int j = 0;
        for (int i=0;i<popA.length;i++){
            //保证栈顶是当前出栈元素,或者遍历完pushA
            while((stack.empty()||stack.peek()!=popA[i])&&j<pushA.length){
                stack.push(pushA[j++]);
            }
            //如果栈顶元素和出栈元素相同，则出栈并进入下一个循环
           if(!stack.empty()&&stack.peek()==popA[i])
            stack.pop();
           //不同则失败
           else return false;
        }
        return true;
    }
}
~~~

- 时间复杂度：O(n)，其中nn*n*为数组长度，最坏情况下需要遍历两个数组各一次
- 空间复杂度：O(n)，辅助栈空间最大为一个数组的长度

# **JZ73** **翻转单词序列**

## 描述

牛客最近来了一个新员工Fish，每天早晨总是会拿着一本英文杂志，写些句子在本子上。同事Cat对Fish写的内容颇感兴趣，有一天他向Fish借来翻看，但却读不懂它的意思。例如，“nowcoder. a am I”。后来才意识到，这家伙原来把句子单词的顺序翻转了，正确的句子应该是“I am a nowcoder.”。Cat对一一的翻转这些单词顺序可不在行，你能帮助他么？

数据范围：1 \le n \le 100 \1≤*n*≤100 
进阶：空间复杂度 O(n) \*O*(*n*) ，时间复杂度 O(n) \*O*(*n*) ，保证没有只包含空格的字符串

## 示例1

输入：

```
"nowcoder. a am I"
```

复制

返回值：

```
"I am a nowcoder."
```

复制

## 示例2

输入：

```
""
```

复制

返回值：

```
""
```

## 题解

### 字符串分割为数组

说实话，这题出在栈里，但是我第一个想到的是这个方法，感觉很简单

~~~java
public class Solution {
    public String ReverseSentence(String str) {
        if(str.equals("")) return "";
        String[] s = str.split(" ");
        StringBuilder res = new StringBuilder();
        for(int i=s.length-1;i>0;i--){
            res.append(s[i]).append(" ");
        }
        res.append(s[0]);
        return res.toString();
    }
}
~~~

这不是很爽

时间复杂度O(n) 空间复杂度O(n)

### 栈分割单词

我们都知道栈是先进后出的，于是我们可以用方法一中分割单词的方式，在大的句子字符串中分割出一个一个地单词。然后从头到尾遍历单词，将分割出来的单词送入栈中，然后按照栈中弹出的字符串顺序拼接单词即可使单词之间逆序。

**具体做法：**

- step 1：遍历字符串，将整个字符串按照空格分割然后入栈。
- step 2：遍历栈，将栈中内容弹出拼接成字符串。

好傻逼啊，你都分割成数组了还得绕个弯把他放栈里再拿出来，直接遍历数组不得了

~~~java
import java.util.*;
public class Solution {
    public String ReverseSentence(String str) {
        Stack<String> st = new Stack<String>();
        String[] temp = str.split(" ");
        //单词加入栈中
        for(int i = 0; i < temp.length; i++){
            st.push(temp[i]);
            st.push(" ");
        }
        StringBuilder res = new StringBuilder();
        //去掉最后一个空格
        if(!st.isEmpty())
            st.pop();
        //栈遵循先进后厨，单词顺序是反的
        while(!st.isEmpty())
            res.append(st.pop());
        return res.toString();
    }
}

~~~

时间复杂度O(n) 空间复杂度O(n)

# **JZ59** **滑动窗口的最大值**

## 描述

给定一个长度为 n 的数组 num 和滑动窗口的大小 size ，找出所有滑动窗口里数值的最大值。

例如，如果输入数组{2,3,4,2,6,2,5,1}及滑动窗口的大小3，那么一共存在6个滑动窗口，他们的最大值分别为{4,4,6,6,6,5}； 针对数组{2,3,4,2,6,2,5,1}的滑动窗口有以下6个： {[2,3,4],2,6,2,5,1}， {2,[3,4,2],6,2,5,1}， {2,3,[4,2,6],2,5,1}， {2,3,4,[2,6,2],5,1}， {2,3,4,2,[6,2,5],1}， {2,3,4,2,6,[2,5,1]}。

窗口大于数组长度或窗口长度为0的时候，返回空。

数据范围： 1 \le n \le 100001≤*n*≤10000，0 \le size \le 100000≤*s**i**z**e*≤10000，数组中每个元素的值满足 |val| \le 10000∣*v**a**l*∣≤10000

要求：空间复杂度 O(n)*O*(*n*)，时间复杂度 O(n)*O*(*n*)



## 示例1

输入：

```
[2,3,4,2,6,2,5,1],3
```

复制

返回值：

```
[4,4,6,6,6,5]
```

复制

## 示例2

输入：

```
[9,10,9,-7,-3,8,2,-6],5
```

复制

返回值：

```
[10,10,9,8]
```

复制

## 示例3

输入：

```
[1,2,3,4],5
```

复制

返回值：

```
[]
```

## 题解

### 双向队列

我们都知道，若是一个数字A进入窗口后，若是比窗口内其他数字都大，那么这个数字之前的数字都没用了，因为它们必定会比A早离开窗口，在A离开之前都争不过A，所以A在进入时依次从尾部排除掉之前的小值再进入，而每次窗口移动要弹出窗口最前面值，因此队首也需要弹出，所以我们选择双向队列。

**具体做法：**

- step 1：维护一个双向队列，用来存储数列的下标。
- step 2：首先检查窗口大小与数组大小。
- step 3：先遍历第一个窗口，如果即将进入队列的下标的值大于队列后方的值，依次将小于的值拿出来去掉，再加入，保证队列是递增序。
- step 4：遍历后续窗口，每次取出队首就是最大值，如果某个下标已经过了窗口，则从队列前方将其弹出。
- step 5：对于之后的窗口，重复step 3，直到数组结束。

~~~java
import java.util.*;
public class Solution {
    public ArrayList<Integer> maxInWindows(int [] num, int size) {
        Deque<Integer> deque = new ArrayDeque<>();
        ArrayList<Integer> res = new ArrayList<>();
        if(num.length<size||size<=0) return res;
        //遍历第一个窗口
        for(int i=0;i<size-1;i++){
            //移除先进队列比当前值小的
            while(!deque.isEmpty()&&num[deque.peekLast()]<num[i])
                deque.pollLast();
            //入队
            deque.add(i);
        }
        for (int i=size-1;i<num.length;i++){
            //窗口外的被移除
            while(!deque.isEmpty()&&deque.peekFirst()<i-size+1)
                deque.pollFirst();
            //去除之前比新结点小的
            while(!deque.isEmpty()&&num[deque.peekLast()]<num[i])
                deque.pollLast();
            deque.add(i);
            res.add(num[deque.peekFirst()]);
        }
        return res;
    }
}
~~~

- 时间复杂度：O(n)，数组长度为n，只遍历一遍数组
- 空间复杂度：O(m)，窗口长度m，双向队列最长时，将窗口填满

# **JZ53** **数字在升序数组中出现的次数**

## 描述

给定一个长度为 n 的非降序数组和一个非负数整数 k ，要求统计 k 在数组中出现的次数

数据范围：0 \le n \le 1000 , 0 \le k \le 1000≤*n*≤1000,0≤*k*≤100，数组中每个元素的值满足 0 \le val \le 1000≤*v**a**l*≤100
要求：空间复杂度 O(1)*O*(1)，时间复杂度 O(logn)*O*(*l**o**g**n*)

## 示例1

输入：

```
[1,2,3,3,3,3,4,5],3
```

复制

返回值：

```
4
```

复制

## 示例2

输入：

```
[1,3,4,5],6
```

复制

返回值：

```
0
```

## 题解

因为data是一个非降序数组，它是有序的，这种时候我们可能会想到用二分查找。但是一个数组可能有多个k，而且我们要查找的并非常规二分法中k出现的位置，而是k出现的左界和k出现的右界。要是能刚好找到恰好小于k的数字位置和恰好大于k的数字的位置就好了。

再有因为数组中全是整数，因此我们可以考虑，用二分查找找到k+0.5应该出现的位置和k-0.5应该出现的位置，二者相减就是k出现的次数。

**具体做法：**

- step 1：写一个二分查找的函数在数组中找到某个元素出现的位置。每次检查区间中点值，根据与中点的大小比较，确定下一次的区间。
- step 2：分别使用二分查找，找到k+0.5和k-0.5应该出现的位置，中间的部分就全是k，相减计算次数就可以了

```java
public class Solution {
    public int GetNumberOfK(int [] array , int k) {
        //找到二者的位置相减即为长度
        return biSearch(array,k+0.5)-biSearch(array,k-0.5);
    }
    public int biSearch(int[] array,double k){
        int left=0;int right=array.length-1;
        while (left<=right){
            int mid=(left+right)/2;
            if(array[mid]<k){
                left=mid+1;
            }else {
                right=mid-1;
            }
        }
        return left;
    }
}
```

- 时间复杂度：O(log2n)，其中n为数组长度，两次二分查找，二分查找复杂度为O(log2n)
- 空间复杂度：O(1)，常数级变量，无额外辅助空间

# **JZ4** **二维数组中的查找**

## 描述

在一个二维数组array中（每个一维数组的长度相同），每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

[

[1,2,8,9],
[2,4,9,12],
[4,7,10,13],
[6,8,11,15]

]

给定 target = 7，返回 true。

给定 target = 3，返回 false。

数据范围：矩阵的长宽满足 0 \le n,m \le 5000≤*n*,*m*≤500 ， 矩阵中的值满足 0 \le val \le 10^90≤*v**a**l*≤109
进阶：空间复杂度 O(1)*O*(1) ，时间复杂度 O(n+m)*O*(*n*+*m*)

## 示例1

输入：

```
7,[[1,2,8,9],[2,4,9,12],[4,7,10,13],[6,8,11,15]]
```

复制

返回值：

```
true
```

复制

说明：

```
存在7，返回true   
```

## 示例2

输入：

```
1,[[2]]
```

复制

返回值：

```
false
```

复制

## 示例3

输入：

```
3,[[1,2,8,9],[2,4,9,12],[4,7,10,13],[6,8,11,15]]
```

复制

返回值：

```
false
```

复制

说明：

```
不存在3，返回false   
```

## 题解

### 分治

似乎我们可以直接从上到下遍历矩阵，再从左到右遍历矩阵每一行，然后检验目标值是否是遇到的元素。

但是我们这样就没有利用到矩阵内部的行列都是有序这个性质，我们再来找找规律：

首先看四个角，左上与右下必定为最小值与最大值，而左下与右上就有规律了：**左下元素大于它上方的元素，小于它右方的元素，右上元素与之相反**。既然左下角元素有这么一种规律，相当于将要查找的部分分成了一个大区间和小区间，每次与左下角元素比较，我们就知道目标值应该在哪部分中，于是可以利用分治思维来做。

**具体做法：**

- step 1：首先获取矩阵的两个边长，判断特殊情况。
- step 2：首先以左下角为起点，若是它小于目标元素，则往右移动去找大的，若是他大于目标元素，则往上移动去找小的。
- step 3：若是移动到了矩阵边界也没找到，说明矩阵中不存在目标值。

~~~java
public class Solution {
    public boolean Find(int target, int [][] array) {
        int m = array.length;
        int n = array[0].length;
        if(m==0||n==0) return false;
        for(int i=m-1,j=0;i>=0&&j<n;){
            System.out.println(i+" "+j);
            if(target==array[i][j]) return true;
            else if(target>array[i][j]) j++;
            else if(target<array[i][j]) i--;
        }
        return false;
    }
}

~~~

- 时间复杂度：O(m+n)，遍历矩阵的时候，最多经过矩阵的一行一列
- 空间复杂度：O(1)，常数级变量，无额外辅助空间

# **JZ11** **旋转数组的最小数字**

## 描述

有一个长度为 n 的非降序数组，比如[1,2,3,4,5]，将它进行旋转，即把一个数组最开始的若干个元素搬到数组的末尾，变成一个旋转数组，比如变成了[3,4,5,1,2]，或者[4,5,1,2,3]这样的。请问，给定这样一个旋转数组，求数组中的最小值。

数据范围：1 \le n \le 100001≤*n*≤10000，数组中任意元素的值: 0 \le val \le 100000≤*v**a**l*≤10000

要求：空间复杂度：O(1)*O*(1) ，时间复杂度：O(logn)*O*(*l**o**g**n*)

## 示例1

输入：

```
[3,4,5,1,2]
```

复制

返回值：

```
1
```

复制

## 示例2

输入：

```
[3,100,200,3]
```

复制

返回值：

```
3
```

## 题解

### 二分搜索

旋转数组将原本有序的数组分成了两部分有序的数组，因为在原始有序数组中，最小的元素一定是在首位，旋转后无序的点就是最小的数字。我们可以将旋转前的前半段命名为A，旋转后的前半段命名为B，旋转数组即将AB变成了BA，我们想知道最小的元素到底在哪里。

因为A部分和B部分都是各自有序的，所以我们还是想用分治来试试，每次比较中间值，确认目标值（最小元素）所在的区间。

**具体做法：**

- step 1：双指针指向旋转后数组的首尾，作为区间端点。
- step 2：若是区间中点值大于区间右界值，则最小的数字一定在中点右边。
- step 3：若是区间中点值等于区间右界值，则是不容易分辨最小数字在哪半个区间，比如[1,1,1,0,1]，应该逐个缩减右界。
- step 4：若是区间中点值小于区间右界值，则最小的数字一定在中点左边。
- step 5：通过调整区间最后即可锁定最小值所在。

**图示：**

![alt](https://uploadfiles.nowcoder.com/images/20211207/397721558_1638878411855/299059EFCD5648D6783E12C1C94BEF4F)

~~~java
import java.util.ArrayList;
public class Solution {
    public int minNumberInRotateArray(int [] array) {
        return biSearch(array);
    }
    public int biSearch(int[] array){
        int left=0;
        int right=array.length-1;
        //数组为两端升序数组组成，且前面那段的所有元素都大于等于后面那段
        while(left<right){
            //找中值
            int mid = (left+right)/2;
            //如果中间比右边大，说明当前mid在前一端数组，结果必在右边
            if(array[mid]>array[right]){
                left=mid+1;
                //如果中间和右边相等，不能判断当前在哪一段数组，那就将右指针后移，因为最后一个数不是结果
            }else if(array[mid]==array[right]){
                right--;
                //如果当前中值比右边小，则说明中值在第二段数组中，结果必在包含中值的左侧
            }else if(array[mid]<array[right]){
                right=mid;
            }
        }
        return array[left];
    }
}

~~~

- 时间复杂度：O(log2n)，二分法最坏情况对nn*n*取2的对数
- 空间复杂度：O(1)，常数级变量，无额外辅助空间

# **JZ38** **字符串的排列**

## 描述

输入一个长度为 n 字符串，打印出该字符串中字符的所有排列，你可以以任意顺序返回这个字符串数组。

例如输入字符串ABC,则输出由字符A,B,C所能排列出来的所有字符串ABC,ACB,BAC,BCA,CBA和CAB。

![img](https://uploadfiles.nowcoder.com/images/20211008/557336_1633676660853/6226390B4185DB132AFFDB10F09F8BEB)

数据范围：n < 10*n*<10
要求：空间复杂度 O(n!)*O*(*n*!)，时间复杂度 O(n!)*O*(*n*!)

### 输入描述：

输入一个字符串,长度不超过10,字符只包括大小写字母。

## 示例1

输入：

```
"ab"
```

复制

返回值：

```
["ab","ba"]
```

复制

说明：

```
返回["ba","ab"]也是正确的         
```

## 示例2

输入：

```
"aab"
```

复制

返回值：

```
["aab","aba","baa"]
```

复制

## 示例3

输入：

```
"abc"
```

复制

返回值：

```
["abc","acb","bac","bca","cab","cba"]
```

复制

## 示例4

输入：

```
""
```

复制

返回值：

```
[""]
```

## 题解

### 递归与回溯

都是求元素的全排列，字符串与数组没有区别，一个是数字全排列，一个是字符全排列，因此大致思路与[有重复项数字的全排列](https://www.nowcoder.com/practice/a43a2b986ef34843ac4fdd9159b69863?tpId=295&tqId=700)类似，只是这道题输出顺序没有要求。但是为了便于去掉重复情况，我们还是应该参照数组全排列，优先按照字典序排序，因为排序后重复的字符就会相邻，后续递归找起来也很方便。

使用临时变量去组装一个排列的情况：每当我们选取一个字符以后，就确定了其位置，相当于对字符串中剩下的元素进行全排列添加在该元素后面，给剩余部分进行全排列就是一个**子问题**，因此可以使用**递归**。

- **终止条件：** 临时字符串中选取了n个元素，已经形成了一种排列情况了，可以将其加入输出数组中。
- **返回值：** 每一层给上一层返回的就是本层级在临时字符串中添加的元素，递归到末尾的时候就能添加全部元素。
- **本级任务：** 每一级都需要选择一个元素加入到临时字符串末尾（遍历原字符串选择）。

递归过程也需要回溯，比如说对于字符串`“abbc”`，如果事先在临时字符串中加入了a，后续子问题只能是`"bbc"`的全排列接在a后面，对于b开头的分支达不到，因此也需要回溯：将临时字符串刚刚加入的字符去掉，同时vis修改为没有加入，这样才能正常进入别的分支。

**具体做法：**

- step 1：先对字符串按照字典序排序，获取第一个排列情况。
- step 2：准备一个空串暂存递归过程中组装的排列情况。使用额外的vis数组用于记录哪些位置的字符被加入了。
- step 3：每次递归从头遍历字符串，获取字符加入：首先根据vis数组，已经加入的元素不能再次加入了；同时，如果当前的元素str[i]与同一层的前一个元素str[i-1]相同且str[i-1]已经用，也不需要将其纳入。
- step 4：进入下一层递归前将vis数组当前位置标记为使用过。
- step 5：回溯的时候需要修改vis数组当前位置标记，同时去掉刚刚加入字符串的元素，
- step 6：临时字符串长度到达原串长度就是一种排列情况。

~~~java
import java.util.ArrayList;
import java.util.Arrays;
public class Solution {
    public ArrayList<String> Permutation(String str) {
        ArrayList<String> res = new ArrayList<>();
        if(str.length()<=0) {
            res.add("");
            return res;
        }
        StringBuffer temp = new StringBuffer();
        boolean[] vis = new boolean[str.length()];
        char[] charArray = str.toCharArray();
        //先排序以便后面查重
        Arrays.sort(charArray);
        recursion(res,charArray,temp,vis);
        return res;
    }

    /**
     *
     * @param res 结果集
     * @param str 原始字符串数组
     * @param temp 临时构建的字符串
     * @param vis 是否访问过当前节点
     */
    public void recursion(ArrayList<String> res, char[] str, StringBuffer temp, boolean[] vis){
        if(temp.length()==str.length){
            res.add(temp.toString());
            return;
        }
        for(int i=0;i<str.length;i++){
            if(i > 0 && str[i - 1] == str[i] && !vis[i - 1])
                //当前的元素str[i]与同一层的前一个元素str[i-1]相同且str[i-1]已经用过了(查重)
                continue;
            if(!vis[i]){
                temp.append(str[i]);
                vis[i]=true;
                recursion(res,str,temp,vis);
                vis[i]=false;
                temp.deleteCharAt(temp.length()-1);
            }
        }
    }
}
~~~

- 时间复杂度：O(n∗n!)，全排列的全部情况为n!，每次递归过程都是遍历字符串查找元素，这里是O(n)
- 空间复杂度：O(n)，递归栈的最大深度为字符串长度n，临时字符串temp的空间也为O(n)，res属于返回必要空间

# **JZ44** **数字序列中某一位的数字**

## 描述

数字以 0123456789101112131415... 的格式作为一个字符序列，在这个序列中第 2 位（**从下标 0 开始计算**）是 2 ，第 10 位是 1 ，第 13 位是 1 ，以此类题，请你输出第 n 位对应的数字。

数据范围： 0 \le n \le 10^9 \0≤*n*≤109 

## 示例1

输入：

```
0
```

复制

返回值：

```
0
```

复制

## 示例2

输入：

```
2
```

复制

返回值：

```
2
```

复制

## 示例3

输入：

```
10
```

复制

返回值：

```
1
```

复制

## 示例4

输入：

```
13
```

复制

返回值：

```
1
```

## 题解

我们尝试来找一下规律：

- 小于10的数字一位数，1～9，共9个数字，9位；
- 小于100的数字两位数，10～99，共90个数字，180位；
- 小于1000的数字三位数，100～999，共900个数字，2700位；
- ……

我们可以用这样的方式，不断减去减去前面位数较少的数字的那些位，锁定第n位所在的区间，即第n位是几位数。这个区间的起点值加上剩余部分除以这个区间的位数就可以定位n在哪个数字上，再通过n对位数取模可以定位是哪一位。（下标从0开始，需要对n减1）

**具体做法：**

- step 1：通过对每个区间起点数字的计算，按照上述规律求得该区间的位数，n不断减去它前面区间的位数，定位到属于它的区间。
- step 2：通过除以位数定位n在哪个数字上，用字符串形式表示。
- step 3：通过在字符串上位置对几位数取模定位目标数字。

~~~java
import java.util.*;
public class Solution {
    public int findNthDigit (int n) {
        //记录n是几位数
        int digit = 1;
        //记录当前位数区间的起始数字：1,10,100...
        long start = 1; 
        //记录当前区间之前总共有多少位数字
        long sum = 9; 
        //将n定位在某个位数的区间中
        while(n > sum){
            n -= sum;
            start *= 10; 
            digit++; 
            //该区间的总共位数
            sum = 9 * start * digit;
        }
        //定位n在哪个数字上
        String num = "" + (start + (n - 1) / digit);
        //定位n在数字的哪一位上
        int index = (n - 1) % digit;
        return (int)(num.charAt(index)) - (int)('0');
    }
}

~~~

- 时间复杂度：O(log10n)，对n进行定位，最坏每次遍历十进制的位数，因此取对数
- 空间复杂度：O(1)，常数级变量，无额外空间

# 动态规划

# **JZ42** **连续子数组的最大和**

## 描述

输入一个长度为n的整型数组array，数组中的一个或连续多个整数组成一个子数组，子数组最小长度为1。求所有子数组的和的最大值。

数据范围:

1 <= n <= 2\times10^51<=*n*<=2×105

-100 <= a[i] <= 100−100<=*a*[*i*]<=100



要求:时间复杂度为 O(n)*O*(*n*)，空间复杂度为 O(n)*O*(*n*)

进阶:时间复杂度为 O(n)*O*(*n*)，空间复杂度为 O(1)*O*(1)



## 示例1

输入：

```
[1,-2,3,10,-4,7,2,-5]
```

复制

返回值：

```
18
```

复制

说明：

```
经分析可知，输入数组的子数组[3,10,-4,7,2]可以求得最大和为18        
```

## 示例2

输入：

```
[2]
```

复制

返回值：

```
2
```

复制

## 示例3

输入：

```
[-10]
```

复制

返回值：

```
-10
```

## 题解

### 动态规划

因为数组中有正有负有0，因此每次遇到一个数，要不要将其加入我们所求的连续子数组里面，是个问题，有可能加入了会更大，有可能加入了会更小，而且我们要求连续的最大值，因此这类有状态转移的问题可以考虑动态规划。

- step 1：可以用dp数组表示以下标ii*i*为终点的最大连续子数组和。
- step 2：遍历数组，每次遇到一个新的数组元素，连续的子数组要么加上变得更大，要么这个元素本身就更大，要么会更小，更小我们就舍弃，因此状态转移为dp[i]=max(dp[i−1]+array[i],array[i])
- step 3：因为连续数组可能会断掉，每一段只能得到该段最大值，因此我们需要维护一个最大值。

~~~java

public class Solution {
    public int FindGreatestSumOfSubArray(int[] array) {
        //记录到下标i为止的最大连续子数组和
        int[] dp = new int[array.length];
        dp[0]=array[0];
        int max=dp[0];
        for(int i=1;i<array.length;i++){
            /*
             * 理解这里是关键,dp数组是记录到下标i为止的最大连续子数组和，注意是i为止，最后一个元素必定是i
             * 如数组 -2,1,2,-1,2,-8 对应的dp数组为 -2,1,3,2,4,-4
             * 因为数组连续，当遍历到元素array[i]时，有两种选择，要么把它加入当前的序列，要么直接从头开始，把这个元素作为序列的开始
             * 如-2,1, 我与其用-2+1，还不如从头开始直接不要-2，从1开始，这是第一种情况
             * 遍历到1,2的时候直接1+2毋庸置疑
             * 1,2,-1的时候要把-1加入，因为3+(-1)>-1，虽然看上去亏了，但是之前的结果3已经保存到dp数组中了，有记录，把-1加入是因为后面可能还有更大的数等着我们加
             */
            dp[i]=Math.max(dp[i-1]+array[i],array[i]);
            max=Math.max(dp[i],max);
        }
        return max;
    }
}

~~~

- 时间复杂度：O(n)，其中nn*n*为数组长度，遍历一次数组
- 空间复杂度：O(n)，动态规划辅助数组长度为nn*n*

### 拓展动态规划

其实可以省掉这个dp数组的空间，因为后面的解只用了前一个解保存的值，即dp[i]只用到了dp[i-1]，因此可以舍弃这个数组

~~~java
import java.util.*;
public class Solution {
    public int FindGreatestSumOfSubArray(int[] array) {
        int x = array[0];
        int y = 0;
        int maxsum = x;
        for(int i = 1; i < array.length; i++){
            //状态转移：连续子数组和最大值
            y = Math.max(x + array[i], array[i]);
            //维护最大值
            maxsum = Math.max(maxsum, y);
            //更新x的状态
            x = y;
        }
        return maxsum;
    }
}
~~~

# **JZ85** **连续子数组的最大和(二)**

## 描述

输入一个长度为n的整型数组array，数组中的一个或连续多个整数组成一个子数组，找到一个具有最大和的连续子数组。

1.子数组是连续的，比如[1,3,5,7,9]的子数组有[1,3]，[3,5,7]等等，但是[1,3,7]不是子数组

2.如果存在多个最大和的连续子数组，那么返回其中长度最长的，该题数据保证这个最长的只存在一个

3.该题定义的子数组的最小长度为1，不存在为空的子数组，即不存在[]是某个数组的子数组

4.返回的数组不计入空间复杂度计算

数据范围:

1<=n<=10^51<=*n*<=105

-100 <= a[i] <= 100−100<=*a*[*i*]<=100

要求:时间复杂度O(n)*O*(*n*)，空间复杂度O(n)*O*(*n*)

进阶:时间复杂度O(n)*O*(*n*)，空间复杂度O(1)*O*(1)



## 示例1

输入：

```
[1,-2,3,10,-4,7,2,-5]
```

复制

返回值：

```
[3,10,-4,7,2]
```

复制

说明：

```
经分析可知，输入数组的子数组[3,10,-4,7,2]可以求得最大和为18，故返回[3,10,-4,7,2]   
```

## 示例2

输入：

```
[1]
```

复制

返回值：

```
[1]
```

复制

## 示例3

输入：

```
[1,2,-3,4,-1,1,-3,2]
```

复制

返回值：

```
[1,2,-3,4,-1,1]
```

复制

说明：

```
经分析可知，最大子数组的和为4，有[4],[4,-1,1],[1,2,-3,4],[1,2,-3,4,-1,1]，故返回其中长度最长的[1,2,-3,4,-1,1]   
```

## 示例4

输入：

```
[-2,-1]
```

复制

返回值：

```
[-1]
```

复制

说明：

```
子数组最小长度为1，故返回[-1]   
```

## 题解

这题和JZ42一样，只不过返回的是数组

因为dp数组的含义是记录到下标i为止的最大连续子数组和，所以数组的结尾已经确定了，我们就再开一个数组记录每个情况分出来的数组的开头就行

~~~java
import java.util.*;


public class Solution {
    /**
     * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
     *
     *
     * @param array int整型一维数组
     * @return int整型一维数组
     */
    public int[] FindGreatestSumOfSubArray (int[] array) {
        if(array.length==1) return array;
        //记录到下标i为止的最大连续子数组和
        int[] dp = new int[array.length];
        //记录数组开头,以i结尾的数组开头为head[i]
        int[] head = new int[array.length];
        dp[0]=array[0];
        head[0]=0;
        //dp数组最大值
        int max=dp[0];
        //dp数组最大值的下标
        int maxIndex=0;
        for(int i=1;i<array.length;i++){
            /*
             * 理解这里是关键,dp数组是记录到下标i为止的最大连续子数组和，注意是i为止，最后一个元素必定是i
             * 如数组 -2,1,2,-1,2,-8 对应的dp数组为 -2,1,3,2,4,-4
             * 因为数组连续，当遍历到元素array[i]时，有两种选择，要么把它加入当前的序列，要么直接从头开始，把这个元素作为序列的开始
             * 如-2,1, 我与其用-2+1，还不如从头开始直接不要-2，从1开始，这是第一种情况
             * 遍历到1,2的时候直接1+2毋庸置疑
             * 1,2,-1的时候要把-1加入，因为3+(-1)>-1，虽然看上去亏了，但是之前的结果3已经保存到dp数组中了，有记录，把-1加入是因为后面可能还有更大的数等着我们加
             */
            //注意这里小细节，结果尽可能越长越好，相等的时候我们依然取把dp[i]加入的这种情况
            if(dp[i-1]+array[i]>=array[i]){
                dp[i]=dp[i-1]+array[i];
                head[i]=head[i-1];
            }else {
                dp[i]=array[i];
                head[i]=i;
            }
            if(max<=dp[i]){
                max=dp[i];
                maxIndex=i;
            }
        }
        return Arrays.copyOfRange(array,head[maxIndex],maxIndex+1);
    }
}
~~~

- 时间复杂度：O(n)，其中n为数组长度，两次遍历，最坏情况下单独遍历两次数组
- 空间复杂度：O(n)，动态规划辅助数组长度为n

官方题解的做法是定义了left right 两个变量记录左右边界，其实是一样的，空间n和2n的区别

同样，和JZ42一样，dp数组也可以省，如果用dp数组和left right记录边界的话，空间复杂度变为O(1)

# **JZ69** **跳台阶**

## 描述

一只青蛙一次可以跳上1级台阶，也可以跳上2级。求该青蛙跳上一个 n 级的台阶总共有多少种跳法（先后次序不同算不同的结果）。

数据范围：1 \leq n \leq 401≤*n*≤40

要求：时间复杂度：O(n)*O*(*n*) ，空间复杂度： O(1)*O*(1)

## 示例1

输入：

```
2
```

复制

返回值：

```
2
```

复制

说明：

```
青蛙要跳上两级台阶有两种跳法，分别是：先跳一级，再跳一级或者直接跳两级。因此答案为2       
```

## 示例2

输入：

```
7
```

复制

返回值：

```
21
```

这不是某道高考题吗

## 题解

dp样板题，求跳上几级台阶dp数组的长度就是几，同样也可以省去数组

## 动态规划

三阶之后，跳到第n阶可以从n-1阶跳上来，也可以从n-2阶跳上来，所以dp[n]=dp[n-1]+dp[n-2]

~~~java
public class Solution {
    public int jumpFloor(int target) {
        if(target==1) return 1;
        if(target==2) return 2;
        int[] dp = new int[target+1];
        dp[1]=1;
        dp[2]=2;
        for(int i=3;i<=target;i++){
            dp[i]=dp[i-1]+dp[i-2];
        }
        return dp[target];
    }
}
~~~

- 时间复杂度：O(n)，其中n为输入的数
- 空间复杂度：O(n)，dp数组大小

## 动态规划优化掉数组

可以不用数组用变量代替，只需要记录上个和上上个

~~~java
public class Solution {
    public int jumpFloor(int target) {
        if(target==1) return 1;
        if(target==2) return 2;
        int lastLast=1;
        int last=2;
        for(int i=3;i<=target;i++){
            int temp=lastLast+last;
            lastLast=last;
            last=temp;
        }
        return last;
    }
}

~~~

- 时间复杂度：O(n)，其中n为输入的数
- 空间复杂度：O(1)，常数级变量，没有其他额外辅助空间

# **JZ10** **斐波那契数列**

## 描述

![image-20230110163612600](https://bd-hexo.oss-cn-beijing.aliyuncs.com/img/image-20230110163612600.png)

### 输入描述：

一个正整数n

### 返回值描述：

输出一个正整数。

## 示例1

输入：

```
4
```

复制

返回值：

```
3
```

复制

说明：

```
根据斐波那契数列的定义可知，fib(1)=1,fib(2)=1,fib(3)=fib(3-1)+fib(3-2)=2,fib(4)=fib(4-1)+fib(4-2)=3，所以答案为3。   
```

## 示例2

输入：

```
1
```

复制

返回值：

```
1
```

复制

## 示例3

输入：

```
2
```

复制

返回值：

```
1
```

## 题解

动态规划模板题

### 动态规划优化掉数组

带数组的懒得写了，和JZ69跳台阶完全是一个题，直接拿那个代码改

真的完全一样，就改了变量名和初始值。

~~~java
public class Solution {
    public int Fibonacci(int n) {
        if(n==1) return 1;
        if(n==2) return 1;
        int lastLast=1;
        int last=1;
        for(int i=3;i<=n;i++){
            int temp=lastLast+last;
            lastLast=last;
            last=temp;
        }
        return last;
    }
}
~~~

# **JZ19** **正则表达式匹配**

## 描述

请实现一个函数用来匹配包括'.'和'*'的正则表达式。

1.模式中的字符'.'表示任意一个字符

2.模式中的字符'*'表示它前面的字符可以出现任意次（包含0次）。

在本题中，匹配是指字符串的所有字符匹配整个模式。例如，字符串"aaa"与模式"a.a"和"ab*ac*a"匹配，但是与"aa.a"和"ab*a"均不匹配

数据范围:

1.str 只包含从 a-z 的小写字母。

2.pattern 只包含从 a-z 的小写字母以及字符 . 和 *，无连续的 '*'。

\3. 0 \le str.length \le 26 \0≤*s**t**r*.*l**e**n**g**t**h*≤26 
\4. 0 \le pattern.length \le 26 \0≤*p**a**t**t**e**r**n*.*l**e**n**g**t**h*≤26 

## 示例1

输入：

```
"aaa","a*a"
```

复制

返回值：

```
true
```

复制

说明：

```
中间的*可以出现任意次的a，所以可以出现1次a，能匹配上              
```

## 示例2

输入：

```
"aad","c*a*d"
```

复制

返回值：

```
true
```

复制

说明：

```
因为这里 c 为 0 个，a被重复一次， * 表示零个或多个a。因此可以匹配字符串 "aad"。              
```

## 示例3

输入：

```
"a",".*"
```

复制

返回值：

```
true
```

复制

说明：

```
".*" 表示可匹配零个或多个（'*'）任意字符（'.'）              
```

## 示例4

输入：

```
"aaab","a*a*a*c"
```

复制

返回值：

```
false
```

## 题解

### 动态规划

###### 解题思路

对于动态规划解法，总的思路便是状态转移，即不断判断从 str[:1] 和 pattern[:1] ，即从第一个字符开始判断是否匹配，直到整个字符串完全匹配。

如下图的图解，每次状态转移总共有两种状态：（1）str 增加一个字符，判断是否匹配（2）pattern增加一个字符，判断是否匹配

- 每个字符有三种情况出现：“字符”、”.“、“*”

- 状态定义：`dp[i][j]`表示字符串 str的前 i 个字符串和 pattern 的前 j 个字符串是否匹配

- 状态转移：主要是对 “*” 的状态处理

  - 当

     

    ```
    pattern[i - 1] != “*”
    ```

    ，即上一位不为*。

    ```
    dp[i][j]
    ```

    在以下任何一种情况为true时，则等于true

    - 1、`dp[i - 1][j - 1] && str[i - 1] == pattern[j - 1]`，即上一个状态和当前位的字符都匹配
    - 2、`dp[i - 1][j - 1] && pattern[j - 1] == '.'`，即上一个状态为true，且pattern上一位包含 ‘.’

  - 当

     

    ```
    pattern[i - 1] == “*”
    ```

    ，即当前位的上一位为*。

    ```
    dp[i][j]
    ```

    在以下任何一种情况为true时，则等于true

    - 1、`dp[i][j - 2]`，即 j-2 位 的pattern能满足，则 i-1 位是 `‘*’` 作为任意数量的值必定能满足匹配
    - 2、`dp[i - 1][j]` && `str[i - 1] == pattern[j - 2]`；即让字符 pattern[j-2]多出现几次，看能否匹配
    - 3、`dp[i - 1][j] && pattern[j - 2] == '.'`, 即让字符 `'.'` 多出现 1 次时，能否匹配；

- 状态初始化

  - **`dp[0][0] == true`：** 代表两个空字符串能够匹配。
  - **`dp[0][j] = dp[0][j - 2]` 且 `p[j - 1] = '\*'`**, 即当前pattern的0到j位是true还是false，取决于`dp[0][j-2]`是否匹配，以及 pattern的当前位的上一位是否为`‘*’`，因为`‘*’`可以匹配任何值，包括空值

- 返回值

  - `dp` 矩阵右下角字符，代表字符串 `str` 和 `pattern` 能否匹配。

~~~java
public class Solution {
    /**
     * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
     *
     * @param str     string字符串
     * @param pattern string字符串
     * @return bool布尔型
     */
    public boolean match(String str, String pattern) {
        //x代表字符串y代表正则表达式
        boolean[][] dp = new boolean[str.length() + 1][pattern.length() + 1];
        dp[0][0]=true;
        for (int i = 1; i <= pattern.length(); i++) {
            if (pattern.charAt(i - 1) == '*') {
                dp[0][i] = dp[0][i-2];
            }
        }
        for (int i = 1; i <= str.length(); i++) {
            for (int j = 1; j <= pattern.length(); j++)
                //如果正则不是*
                if (pattern.charAt(j-1) != '*') {
                    //成功匹配
                    if (pattern.charAt(j-1) == str.charAt(i-1) || pattern.charAt(j-1) == '.') {
                        dp[i][j] = dp[i - 1][j - 1];
                    }
                } else if ((str.charAt(i-1) == pattern.charAt(j - 2) || pattern.charAt(j - 2) == '.')) {//如果是*,且正则的前一个字符匹配的话，即使a*中的a或.* 与 str中a匹配
                    //情况1：此时只匹配了一个字母，第一个a匹配a*
                    /*
                    含义： i j-2是 当前字符不匹配a* 匹配上上个 如aa* 当前a去匹配上一个a  a*中匹配数量为0
                          i-1 j-2 是当前字符匹配a* 且为第一个 如a* 匹配 a  此时a*只匹配了一个a，就是当前这个
                          i-1 j   是当前字符匹配a* 且当前字符不是第一个   此时a*前面可能已经匹配了好几个a了，只是把当前这也加进去而已
                     */
                    dp[i][j] = dp[i][j - 2] || dp[i - 1][j - 2] || dp[i - 1][j];
                }
                //这是a*和b匹配，也就是字母不一样的情况，此时应返回 i j-2 的情况，即a*匹配了0个a
                else dp[i][j]=dp[i][j-2];
        }
        return dp[str.length()][pattern.length()];
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        String str="abcd";
        System.out.println(str.charAt(0));
        System.out.println(solution.match("aaa", "a*a"));
    }
}

~~~

- 时间复杂度：O(mn)，其中mm*m*和nn*n*分别为字符串和模版串的长度，初始化遍历矩阵一边，状态转移遍历整个dp矩阵
- 空间复杂度：O(mn)，动态规划辅助数组dp的空间

# JZ71 跳台阶扩展问题

## 描述

一只青蛙一次可以跳上1级台阶，也可以跳上2级……它也可以跳上n级。求该青蛙跳上一个n级的台阶(n为正整数)总共有多少种跳法。

数据范围：1 \le n \le 201≤*n*≤20
进阶：空间复杂度 O(1)*O*(1) ， 时间复杂度 O(1)*O*(1)

## 示例1

输入：

```
3
```

复制

返回值：

```
4
```

复制

## 示例2

输入：

```
1
```

复制

返回值：

```
1
```

## 题解

递归ok 动态规划ok  (他出这题目的好像是练dp)

但是有一个时间复杂度和空间复杂度都为O(1)的

直接找规律

~~~java
public class Solution {
    public int jumpFloorII(int target) {
        return (int)Math.pow(2,target-1);
    }
}
~~~

# JZ70 矩形覆盖



## 题解

和斐波那契数列一个做法，递推式f(n)=f(n−1)+f(n−2)

下面就演示一下空间复杂度O(1) 时间复杂度O(n)的动态规划算法

当n==1时，有1种覆盖方法:
![图片说明](https://bd-hexo.oss-cn-beijing.aliyuncs.com/img/C0CF1BF52FA1DA30507E37B5FB696954.png)
当n==2时，有2种覆盖方法:
![图片说明](https://bd-hexo.oss-cn-beijing.aliyuncs.com/img/8CEB1E230E03DECF9A546554BDC87BB6.png) ;
当n==3时，有3种覆盖方法:
![图片说明](https://bd-hexo.oss-cn-beijing.aliyuncs.com/img/727ECEED9FC513191EF8F8DA31363C75.png)
当n==4时，有5种覆盖方法:
![图片说明](https://bd-hexo.oss-cn-beijing.aliyuncs.com/img/298E540245B9924537C7947FE9604903.png)

对于斐波那契数列的递推公式：f(n)=f(n−1)+f(n−2)，除了自顶向下递归求解，还可以直接自底向上相加，递归的本质是从顶部往下找，然后再向上相加，我们可以使用动态规划直接相加。

~~~java
public class Solution {
    public int rectCover(int target) {
        if(target<=2) return target;
        int lastLast=1;
        int last=2;
        int res=-1;
        for(int i=3;i<=target;i++){
            res=last+lastLast;
            lastLast=last;
            last=res;
        }
        return res;
    }
}

~~~

# **JZ63** **买卖股票的最好时机(一)**

## 描述

假设你有一个数组prices，长度为n，其中prices[i]是股票在第i天的价格，请根据这个价格数组，返回买卖股票能获得的最大收益

1.你可以买入一次股票和卖出一次股票，并非每天都可以买入或卖出一次，总共只能买入和卖出一次，且买入必须在卖出的前面的某一天

2.如果不能获取到任何利润，请返回0

3.假设买入卖出均无手续费

数据范围： 0 \le n \le 10^5 , 0 \le val \le 10^40≤*n*≤105,0≤*v**a**l*≤104

要求：空间复杂度 O(1)*O*(1)，时间复杂度 O(n)*O*(*n*)

## 示例1

输入：

```
[8,9,2,5,4,7,1]
```

复制

返回值：

```
5
```

复制

说明：

```
在第3天(股票价格 = 2)的时候买入，在第6天(股票价格 = 7)的时候卖出，最大利润 = 7-2 = 5 ，不能选择在第2天买入，第3天卖出，这样就亏损7了；同时，你也不能在买入前卖出股票。            
```

## 示例2

输入：

```
[2,4,1]
```

复制

返回值：

```
2
```

复制

## 示例3

输入：

```
[3,2,1]
```

复制

返回值：

```
0
```

## 题解

### 贪心双指针

定义max和min两个指针，遍历一遍数组的同时更新两个指针的位置

min是买入股票时间 简称起点 max是卖出股票时间 简称终点

需要保证：终点大于等于起点 终点尽可能大 起点尽可能小

按这三条原则遍历一遍数组找出最大值就是最大收益

其中保证终点尽可能大 起点尽可能小很简单

保证：终点大于等于起点的方法：当需要变换起点为当前结点时，把终点也变换为当前结点

~~~java
if(price<min){//换起点时终点重置
                min=price;
                max=price;
            }
            if(price>max){ //换终点时起点不重置
                max=price;
            }
~~~

~~~java
public class Solution {
    /**
     *
     * @param prices int整型一维数组
     * @return int整型
     */
    public int maxProfit (int[] prices) {
        int min=prices[0];
        int max=prices[0];
        int res=0;
        //贪心双指针算法
        for (int price : prices) {
            if(price<min){//换起点时终点重置
                min=price;
                max=price;
            }
            if(price>max){ //换终点时起点不重置
                max=price;
            }
            if(max-min>res)//更新结果
            res=max-min;
        }
        return res;
    }
}
~~~

时间复杂度:O(n)

空间复杂度：O(1)

### 动态规划

对于每天有到此为止的最大收益和是否持股两个状态，因此我们可以用动态规划。

~~~java
import java.util.*;
public class Solution {
    public int maxProfit (int[] prices) {
        int n = prices.length;
        //dp[i][0]表示某一天不持股到该天为止的最大收益，dp[i][1]表示某天持股，到该天为止的最大收益
        int[][] dp = new int[n][2];
        //第一天不持股，总收益为0
        dp[0][0] = 0;
        //第一天持股，总收益为减去该天的股价
        dp[0][1] = -prices[0];
        //遍历后续每天，状态转移
        for(int i = 1; i < n; i++){
            dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
            dp[i][1] = Math.max(dp[i - 1][1], -prices[i]);
        }
        //最后一天不持股，到该天为止的最大收益
        return dp[n - 1][0];
    }
}
~~~

- 时间复杂度：O(n)，其中nn*n*为数组长度，遍历一次数组
- 空间复杂度：O(n)，动态规划辅助数组的空间

# **JZ47** **礼物的最大价值**

## 描述

在一个m\times n*m*×*n*的棋盘的每一格都放有一个礼物，每个礼物都有一定的价值（价值大于 0）。你可以从棋盘的左上角开始拿格子里的礼物，并每次向右或者向下移动一格、直到到达棋盘的右下角。给定一个棋盘及其上面的礼物的价值，请计算你最多能拿到多少价值的礼物？

如输入这样的一个二维数组，
[
[1,3,1],
[1,5,1],
[4,2,1]
]

那么路径 1→3→5→2→1 可以拿到最多价值的礼物，价值为12

## 示例1

输入：

```
[[1,3,1],[1,5,1],[4,2,1]]
```

复制

返回值：

```
12
```

复制

## 备注：

```
\bullet\ 0 < \text{grid.length} \le 200∙ 0<grid.length≤200 
\bullet\ 0 < \text{grid[0].length} \le 200∙ 0<grid[0].length≤200
```

## 题解

### 动态规划

我们可以使用一个二维数组dp(x,y) 来表示从原点到(x,y)的礼物最大价值，接下来我们找递推方程

首先，每一步只能向右或者向下走，所以当前结点的值=左边结点+本身 或者 上边结点加本身 即：dp\[i][j]=Math.max(dp\[i-1][j],dp\[i][j-1])+grid\[i][j];

其中首行首列需单独处理，因为第一行不存在上面的结点，第一列不存在左边的结点

~~~java
public class Solution {
    /**
     * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
     *
     *
     * @param grid int整型二维数组
     * @return int整型
     */
    public int maxValue (int[][] grid) {
        // dp数组表示从原点到x,y的最大价值
        int x = grid.length;
        int y = grid[0].length;
        int [][] dp = new int[x][y];
        //初始化首行首列
        for(int i=0,temp=0;i<x;i++){
            temp+=grid[i][0];
            dp[i][0]=temp;
        }
        for(int i=0,temp=0;i<y;i++){
            temp+=grid[0][i];
            dp[0][i]=temp;
        }
        for(int i=1;i<x;i++)
            for(int j=1;j<y;j++){
                dp[i][j]=Math.max(dp[i-1][j],dp[i][j-1])+grid[i][j];
            }
        return dp[x-1][y-1];
    }
}
~~~

时间复杂度：O(mn)

空间复杂度：O(mn)

# **JZ48** **最长不含重复字符的子字符串**

## 描述

请从字符串中找出一个最长的不包含重复字符的子字符串，计算该最长子字符串的长度。

数据范围:

 s.length≤40000 s.length≤40000

## 示例1

输入：

```
"abcabcbb"
```

复制

返回值：

```
3
```

复制

说明：

```
因为无重复字符的最长子串是"abc"，所以其长度为 3。    
```

## 示例2

输入：

```
"bbbbb"
```

复制

返回值：

```
1
```

复制

说明：

```
因为无重复字符的最长子串是"b"，所以其长度为 1。    
```

## 示例3

输入：

```
"pwwkew"
```

复制

返回值：

```
3
```

复制

说明：

```
因为无重复字符的最长子串是 "wke"，所以其长度为 3。
请注意，你的答案必须是子串的长度，"pwke" 是一个子序列，不是子串。
```

## 题解

### 滑动窗口+哈希表

因为是我自己写的所以可能逻辑有点乱

- 整一个hashMap，记录窗口内元素的位置，比如a=3表示a在三号位置
- 保证窗口内没有重复元素
- 最大值为窗口大小的最大值

基于上面的原则遍历字符串(start为窗口开头位置，i为窗口结尾位置)

如果当前元素没出现过，则窗口后移并且将该元素加入哈希表

如果当前元素出现过，则将窗口后的start移到重复元素的后一位，并且将被移走的元素移出哈希表(即更新后把不在窗口内的元素移出哈希表)，最后再向哈希表中加入当前元素

~~~java
import java.util.*;


public class Solution {
    /**
     * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
     *
     *
     * @param s string字符串
     * @return int整型
     */
    public int lengthOfLongestSubstring (String s) {
        if(s.length()==1) return 1;
        // write code here
        char[] chars = s.toCharArray();
        HashMap<Character,Integer> hashMap = new HashMap<Character,Integer>();
        int start=0;
        int max=1;
        for(int i=0;i<chars.length;i++){
            //前面出现过
            if(hashMap.containsKey(chars[i])){
                //记录上一个start
                int temp=start;
                //更新start
                start=hashMap.get(chars[i])+1;
                //两个start之间的记录全部删除
                for(int j=temp,k=start-1;j<=k;j++){
                    hashMap.remove(chars[j]);
                }
                //写入当前元素的新记录
                hashMap.put(chars[i],i);
            }else {//前面没出现过
                hashMap.put(chars[i],i);
                max=Math.max(i-start+1,max);
            }
        }
        return max;
    }
}

~~~

时间复杂度：O(n)

空间复杂度：O(n)

# **JZ46** **把数字翻译成字符串**

## 描述

有一种将字母编码成数字的方式：'a'->1, 'b->2', ... , 'z->26'。

现在给一串数字，返回有多少种可能的译码结果

数据范围：字符串长度满足 0<�≤900<*n*≤90

进阶：空间复杂度 �(�)*O*(*n*)，时间复杂度 �(�)*O*(*n*)

## 示例1

输入：

```
"12"
```

复制

返回值：

```
2
```

复制

说明：

```
2种可能的译码结果（”ab” 或”l”）  
```

## 示例2

输入：

```
"31717126241541717"
```

复制

返回值：

```
192
```

复制

说明：

```
192种可能的译码结果  
```

## 题解

### 动态规划

对于当前数，他既可以自己代表一个字符，也可以和前面的数组合起来代表一个字符，如2既可以单独代表字符，也可以与前面的1组成12代表一个字符

因此，构建一维dp数组，dp[i]代表从0到i有多少种情况，我们设置两个用于判断的变量，x代表当前数是否可以自己构成字符，y代表当前数是否可以与前一个数组合代表一个字符。

如果xy同时成立，则dp[i]=dp[i-1]+dp[i-2]

x单独成立则dp[i]=dp[i-1]

y单独成立则dp[i]=dp[i-2]

若都不成立，说明译码失败，到这里不能表示成字符了，直接返回0

~~~java
package JZ46;

import java.util.*;


public class Solution {
    /**
     * 解码
     * @param nums string字符串 数字串
     * @return int整型
     */
    public int solve (String nums) {
        // write code here
        char[] chars = nums.toCharArray();
        if(chars[0]=='0') return 0;
        int n = chars.length;
        if(n==1) return 1;
        int[] dp= new int[n];
        dp[0]=1;
        //dp[1]单独处理;
        //自己译码
        boolean x1 = chars[1]!='0';
        //和前一位组合译码
        boolean y1 =(chars[0]=='2'&&chars[1]<='6')||chars[0]=='1';
        if(x1&&y1) dp[1]=dp[0]+1;
        else if(x1) dp[1]=dp[0];
        else if(y1) dp[1]=1;
        else return 0;
        for(int i = 2; i< n; i++){
            //自己译码
            boolean x = chars[i]!='0';
            //和前一位组合译码
            boolean y =(chars[i-1]=='2'&&chars[i]<='6')||chars[i-1]=='1';
            if(x&&y) dp[i]=dp[i-1]+dp[i-2];
            else if(x) dp[i]=dp[i-1];
            else if(y) dp[i]=dp[i-2];
            else return 0;
        }
        return dp[n-1];
    }
}
~~~

- 时间复杂度：O(n)，两次遍历都是单层
- 空间复杂度：O(n)，辅助数组dp

# **JZ12** **矩阵中的路径**

## 描述

请设计一个函数，用来判断在一个n乘m的矩阵中是否存在一条包含某长度为len的字符串所有字符的路径。路径可以从矩阵中的任意一个格子开始，每一步可以在矩阵中向左，向右，向上，向下移动一个格子。如果一条路径经过了矩阵中的某一个格子，则该路径不能再进入该格子。 例如 

![image-20230128152316120](https://bd-hexo.oss-cn-beijing.aliyuncs.com/img/image-20230128152316120.png) 矩阵中包含一条字符串"bcced"的路径，但是矩阵中不包含"abcb"路径，因为字符串的第一个字符b占据了矩阵中的第一行第二个格子之后，路径不能再次进入该格子。

数据范围：0≤�,�≤20 0≤*n*,*m*≤20 ,1≤���≤25 1≤*l**e**n*≤25 

## 示例1

输入：

```
[[a,b,c,e],[s,f,c,s],[a,d,e,e]],"abcced"
```

复制

返回值：

```
true
```

复制

## 示例2

输入：

```
[[a,b,c,e],[s,f,c,s],[a,d,e,e]],"abcb"
```

复制

返回值：

```
false
```

## 题解

### DFS（回溯）

利用深度优先搜索，边搜边匹配

设置一个vis数组，因为走过的路不能同时走，因此走过某点时就将当前节点的vis设置为true

回溯时再将该结点的vis

~~~java
public class Solution {
    boolean[][] vis;
    /**
     * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
     *
     *
     * @param matrix char字符型二维数组
     * @param word string字符串
     * @return bool布尔型
     */
    public boolean hasPath (char[][] matrix, String word) {
        // write code here
        vis = new boolean[matrix.length][matrix[0].length];
        char[] chars = word.toCharArray();
        for(int i=0;i< matrix.length;i++)
            for (int j=0;j<matrix[0].length;j++){
                boolean flag = dfs(matrix, chars, i, j, 0);
                if(flag) return true;
            }

        return false;
    }

    /**
     * @param matrix 地图数组
     * @param chars 目标数组
     * @param x 当前x位置
     * @param y 当前y位置
     * @param i 匹配位置
     * @return 是否通过
     */
    public boolean dfs(char[][] matrix,char[] chars,int x,int y,int i){
        if(i==chars.length) return true;
        if(x<0||y<0||x> matrix.length-1||y>matrix[0].length-1||vis[x][y]) return false;
        if(chars[i]!=matrix[x][y]) return false;
        vis[x][y]=true;
        if(dfs(matrix, chars, x+1, y, i+1) ||dfs(matrix, chars, x, y+1, i+1)||dfs(matrix, chars, x-1, y, i+1)||dfs(matrix, chars, x, y-1, i+1))
        {
            vis[x][y]=false;
            return true;
        }
        vis[x][y]=false;
        return false;

    }

}
~~~

时间复杂度：O（mn*k^3），m和n是矩阵的宽和高，最坏的情况下遍历矩阵的所有位置，k是字符串的长度，下面的dfs我们可以把它看做是一棵4叉树，除了第一次的时候可以往4个方向走，其他情况下只能往3个方向走（进来的那个方向回不去）
空间复杂度：O（K），k是字符串的长度

# **JZ13** **机器人的运动范围**

## 描述

地上有一个 rows 行和 cols 列的方格。坐标从 [0,0] 到 [rows-1,cols-1] 。一个机器人从坐标 [0,0] 的格子开始移动，每一次只能向左，右，上，下四个方向移动一格，但是不能进入行坐标和列坐标的数位之和大于 threshold 的格子。 例如，当 threshold 为 18 时，机器人能够进入方格  [35,37] ，因为 3+5+3+7 = 18。但是，它不能进入方格 [35,38] ，因为 3+5+3+8 = 19 。请问该机器人能够达到多少个格子？

数据范围： 0≤�ℎ���ℎ���≤15 0≤*t**h**r**e**s**h**o**l**d*≤15 ，1≤����,����≤100 1≤*r**o**w**s*,*c**o**l**s*≤100 

进阶：空间复杂度 �(��) *O*(*n**m*) ，时间复杂度 �(��) *O*(*n**m*) 

## 示例1

输入：

```
1,2,3
```

复制

返回值：

```
3
```

复制

## 示例2

输入：

```
0,1,3
```

复制

返回值：

```
1
```

复制

## 示例3

输入：

```
10,1,100
```

复制

返回值：

```
29
```

复制

说明：

```
[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],[0,9],[0,10],[0,11],[0,12],[0,13],[0,14],[0,15],[0,16],[0,17],[0,18],[0,19],[0,20],[0,21],[0,22],[0,23],[0,24],[0,25],[0,26],[0,27],[0,28] 这29种，后面的[0,29],[0,30]以及[0,31]等等是无法到达的      
```

## 示例4

输入：

```
5,10,10
```

复制

返回值：

```
21
```

## 题解

### 递归dfs

本题还是典型的深度优先搜索，其中条件为横纵坐标每一位数字加起来不能大于一个特定值，所以在dfs基础上对此加以限定即可(小于10直接加起来比，大于10先转换为字符串每一位相加再比较)

再根据dfs的模板设置边界、vis数组

~~~java
public class Solution {
    int res=0;
    boolean[][] vis;
    int n;int m;//划定边界
    public int movingCount(int threshold, int rows, int cols) {
        n=rows;m=cols;
        vis=new boolean[n][m];
        dfs(threshold,0,0);
        return res;
    }
    void dfs(int threshold,int x,int y){
        //图边界
        if(x<0||y<0||x>n-1||y>m-1||vis[x][y]) return;
        int sum=0;
        if(x<10) sum+=x;
        else {
            String str = String.valueOf(x);
            char[] chars = str.toCharArray();
            for (char c : chars) {
                sum+=c-'0';
            }
        }
        if(y<10) sum+=y;
        else{
            String str = String.valueOf(y);
            char[] chars = str.toCharArray();
            for (char c : chars) {
                sum+=c-'0';
            }
        }
        if(sum>threshold) return;
        vis[x][y]=true;
        res++;
        dfs(threshold,x+1,y);
        dfs(threshold,x-1,y);
        dfs(threshold,x,y+1);
        dfs(threshold,x,y-1);
        return;
    }
}
~~~

时间复杂度 O(nm)

空间复杂度 O(nm)

# **JZ3** **数组中重复的数字**

## 描述

在一个长度为n的数组里的所有数字都在0到n-1的范围内。 数组中某些数字是重复的，但不知道有几个数字是重复的。也不知道每个数字重复几次。请找出数组中任意一个重复的数字。 例如，如果输入长度为7的数组[2,3,1,0,2,5,3]，那么对应的输出是2或者3。存在不合法的输入的话输出-1

数据范围：0≤�≤10000 0≤*n*≤10000 

进阶：时间复杂度�(�) *O*(*n*) ，空间复杂度�(�) *O*(*n*) 

## 示例1

输入：

```
[2,3,1,0,2,5,3]
```

复制

返回值：

```
2
```

复制

说明：

```
2或3都是对的    
```

## 题解

### hashset

记录下出现过的数字，重复即可返回

~~~java
public class Solution {
    /**
     * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
     *
     *
     * @param numbers int整型一维数组
     * @return int整型
     */
    public int duplicate (int[] numbers) {
        // write code here
        HashSet<Integer> hashSet = new HashSet<>();
        for (int number : numbers) {
            if(!hashSet.contains(number)) hashSet.add(number);
            else return number;
        }
        return -1;
    }
}
~~~

时间复杂度O(N)
空间复杂度O(N)

### 数据重排

重头到尾扫描数组S中的每一个元素，当扫描到第i个元素的时候，比较第i个元素位置的值m是否等于i，如果相等，则说明该元素已经在排好序的位置，继续扫描其他元素；如果不相等，先判断m是否等于S[m]，相等则说明不同位置上的元素值相等，即元素重复。直接返回元素；否则交换m和S[m]将他们放置到排好序的位置

~~~java
public class Solution {
    /**
     * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
     *
     *
     * @param numbers int整型一维数组
     * @return int整型
     */
    public int duplicate (int[] numbers) {
        for(int i=0;i<numbers.length;i++){
            if(i==numbers[i]) {
                continue;
            }
            else {
                if(numbers[numbers[i]]==numbers[i]) return numbers[i];
                else{
                    int temp=numbers[i];
                    numbers[i]=numbers[temp];
                    numbers[temp]=temp;
                }
            }
        }
        return -1;
    }
}
~~~



时间复杂度O(N)
空间复杂度O(1)

# **JZ51** **数组中的逆序对**

## 描述

在数组中的两个数字，如果前面一个数字大于后面的数字，则这两个数字组成一个逆序对。输入一个数组,求出这个数组中的逆序对的总数P。并将P对1000000007取模的结果输出。 即输出P mod 1000000007


数据范围： 对于 50%50% 的数据, ����≤104*s**i**z**e*≤104
对于 100%100% 的数据, ����≤105*s**i**z**e*≤105

数组中所有数字的值满足 0≤���≤1090≤*v**a**l*≤109



要求：空间复杂度 �(�)*O*(*n*)，时间复杂度 �(�����)*O*(*n**l**o**g**n*)

### 输入描述：

题目保证输入的数组中没有的相同的数字

## 示例1

输入：

```
[1,2,3,4,5,6,7,0]
```

复制

返回值：

```
7
```

复制

## 示例2

输入：

```
[1,2,3]
```

复制

返回值：

```
0
```

## 题解

### 归并排序

归并排序：https://blog.csdn.net/m0_62812354/article/details/121705836

如果两个区间为[4, 3] 和[1, 2]
那么逆序数为(4,1),(4,2),(3,1),(3,2)，同样的如果区间变为有序，比如[3,4] 和 [1,2]的结果是一样的，也就是说区间有序和无序结果是一样的。
但是如果区间有序会有什么好处吗？当然，如果区间有序，比如[3,4] 和 [1,2]
如果3 > 1, 显然3后面的所有数都是大于1， 这里为 4 > 1, 明白其中的奥秘了吧。所以我们可以在合并的时候利用这个规则。



~~~java
public class Solution {
    int res=0;
    public int InversePairs(int [] array) {
        mergeSort(array,0,array.length-1);
        return res;
    }
    void mergeSort(int[] array,int l,int r){
        if(l>=r) return;
        int mid=(l+r)/2;
        mergeSort(array,l,mid);
        mergeSort(array,mid+1,r);
        merge(array,l,mid,r);
    }
    void merge(int[] array,int l,int mid,int r){
        int[] temp = new int[r-l+1];
        int i=l,j=mid+1;
        int k=0;
        while (i<=mid&&j<=r){
            if(array[i]<=array[j]){
                temp[k++]=array[i++];
            }else {
                res+=mid-i+1;
                res%=1000000007;
                temp[k++]=array[j++];
            }
        }
        if(i<=mid)
            while (i<=mid){
                temp[k++]=array[i++];
            }
        else if(j<=r)
            while (j<=r)
                temp[k++]=array[j++];

        for (int value : temp) {
            array[l++] = value;
        }
    }
}
~~~

# **JZ40** **最小的K个数**

## 描述

给定一个长度为 n 的可能有重复值的数组，找出其中不去重的最小的 k 个数。例如数组元素是4,5,1,6,2,7,3,8这8个数字，则最小的4个数字是1,2,3,4(任意顺序皆可)。

数据范围：0≤�,�≤100000≤*k*,*n*≤10000，数组中每个数的大小0≤���≤10000≤*v**a**l*≤1000

要求：空间复杂度 �(�)*O*(*n*) ，时间复杂度 �(�����)*O*(*n**l**o**g**k*)

## 示例1

输入：

```
[4,5,1,6,2,7,3,8],4 
```

复制

返回值：

```
[1,2,3,4]
```

复制

说明：

```
返回最小的4个数即可，返回[1,3,2,4]也可以        
```

## 示例2

输入：

```
[1],0
```

复制

返回值：

```
[]
```

复制

## 示例3

输入：

```
[0,1,2,1,2],3
```

复制

返回值：

```
[0,1,1]
```

## 题解

### 堆排序思想

我们在堆排序时，构建的是大根堆或者小根堆，他的性质是一个父节点大于/小于子结点的完全二叉树。

要找到最小的k个元素，只需要准备k个数字，之后每次遇到一个数字能够快速的与这k个数字中最大的值比较，每次将最大的值替换掉，那么最后剩余的就是k个最小的数字了。

如何快速比较k个数字的最大值，并每次替换成较小的新数字呢？我们可以考虑使用优先队列（大根堆），只要限制堆的大小为k，那么堆顶就是k个数字的中最大值，如果需要替换，将这个最大值拿出，加入新的元素就好了。

优先队列：PriorityQueue是优先队列，作用是保证每次取出的元素都是队列中权值最小的，这里涉及到了大小关系，元素大小的评判可以通过元素自身的自然顺序（使用默认的比较器），也可以通过构造时传入的比较器。

如此定义即可实现队列顶永远是最大的元素

~~~java
//大顶堆，队列顶永远是最大的元素
        PriorityQueue<Integer> queue = new PriorityQueue<>(new Comparator<Integer>() {
            @Override
            public int compare(Integer o1, Integer o2) {
                return o2-o1;
            }
        });
~~~

完整代码

~~~java
import java.util.ArrayList;
import java.util.Comparator;
import java.util.PriorityQueue;
public class Solution {
    public ArrayList<Integer> GetLeastNumbers_Solution(int [] input, int k) {
        //大顶堆，队列顶永远是最大的元素
        PriorityQueue<Integer> queue = new PriorityQueue<>(new Comparator<Integer>() {
            @Override
            public int compare(Integer o1, Integer o2) {
                return o2-o1;
            }
        });
        ArrayList<Integer> res = new ArrayList<>();
        if(k==0||input.length==0) return res;
        for (int i : input) {
            if(queue.size()<k) queue.add(i);
            else {
                if(queue.peek()>i){
                    queue.poll();
                    queue.add(i);
                }
            }
        }
        while (!queue.isEmpty()){
            res.add(0,queue.poll());
        }
        return res;
    }
}
~~~

时间复杂度 O(nlog2 k) k为维护的堆大小

空间复杂度 O(k)

### 快排

直观的思路，找前k个最大的，那就先排序然后再

~~~java
import java.util.*;
public class Solution {
    public ArrayList<Integer> GetLeastNumbers_Solution(int [] input, int k) {
        ArrayList<Integer> res = new ArrayList<Integer>();
        //排除特殊情况
        if(k == 0 || input.length == 0) 
            return res;
        //排序
        Arrays.sort(input); 
        //因为k<=input.length,取前k小
        for(int i = 0; i < k; i++){ 
            res.add(input[i]);
        }
        return res;
    }
}

~~~

# **JZ41** **数据流中的中位数**

## 描述

如何得到一个数据流中的中位数？如果从数据流中读出奇数个数值，那么中位数就是所有数值排序之后位于中间的数值。如果从数据流中读出偶数个数值，那么中位数就是所有数值排序之后中间两个数的平均值。我们使用Insert()方法读取数据流，使用GetMedian()方法获取当前读取数据的中位数。

数据范围：数据流中数个数满足 1≤�≤1000 1≤*n*≤1000 ，大小满足 1≤���≤1000 1≤*v**a**l*≤1000 

进阶： 空间复杂度 �(�) *O*(*n*) ， 时间复杂度 �(�����) *O*(*n**l**o**g**n*) 

## 示例1

输入：

```
[5,2,3,4,1,6,7,0,8]
```

复制

返回值：

```
"5.00 3.50 3.00 3.50 3.00 3.50 4.00 3.50 4.00 "
```

复制

说明：

```
数据流里面不断吐出的是5,2,3...,则得到的平均数分别为5,(5+2)/2,3...   
```

## 示例2

输入：

```
[1,1,1]
```

复制

返回值：

```
"1.00 1.00 1.00 "
```

## 题解

### 堆排序

**知识点：优先队列**

优先队列即PriorityQueue，是一种内置的机遇堆排序的容器，分为大顶堆与小顶堆，大顶堆的堆顶为最大元素，其余更小的元素在堆下方，小顶堆与其刚好相反。且因为容器内部的次序基于堆排序，因此每次插入元素时间复杂度都是�(���2�)*O*(*l**o**g*2*n*)，而每次取出堆顶元素都是直接取出。

**思路：**

除了插入排序，我们换种思路，因为插入排序每次要遍历整个已经有的数组，很浪费时间，有没有什么可以找到插入位置时能够更方便。

我们来看看中位数的特征，它是数组中间个数字或者两个数字的均值，它是数组较小的一半元素中最大的一个，同时也是数组较大的一半元素中最小的一个。那我们只要每次维护最小的一半元素和最大的一半元素，并能快速得到它们的最大值和最小值，那不就可以了嘛。这时候就可以想到了堆排序的优先队列。

**具体做法：**

- step 1：我们可以维护两个堆，分别是大顶堆min，用于存储较小的值，其中顶部最大；小顶堆max，用于存储较大的值，其中顶部最小，则中位数只会在两个堆的堆顶出现。
- step 2：我们可以约定奇数个元素时取大顶堆的顶部值，偶数个元素时取两堆顶的平均值，则可以发现两个堆的数据长度要么是相等的，要么奇数时大顶堆会多一个。
- step 3：每次输入的数据流先进入大顶堆排序，然后将小顶堆的最大值弹入大顶堆中，完成整个的排序。
- step 4：但是因为大顶堆的数据不可能会比小顶堆少一个，因此需要再比较二者的长度，若是小顶堆长度小于大顶堆，需要从大顶堆中弹出最小值到大顶堆中进行平衡。

~~~java
import java.util.Comparator;
import java.util.PriorityQueue;



public class Solution {
    //大根堆，存小的值
    PriorityQueue<Integer> min = new PriorityQueue<>(new Comparator<Integer>() {
        @Override
        public int compare(Integer o1, Integer o2) {
            return o2-o1;
        }
    });
    //小根堆，存大的值
    PriorityQueue<Integer> max = new PriorityQueue<>();

    public void Insert(Integer num) {
        /*
        保证min中元素个数>=max,然后每次把最大的元素都往max里扔，平衡的时候把max里的最小的元素扔回到敏
        这样就可以保证，max是中位数右边的比较大的数，min是比较小的数
         */
        min.add(num);
        max.add(min.poll());
        if(min.size()<max.size())
            min.add(max.poll());
    }

    public Double GetMedian() {
        if(min.isEmpty()) return null;
        if(min.size()==max.size()) return (min.peek()+max.peek())/2.0;
        else if(min.size()>max.size()) return Double.valueOf(min.peek());
        else return null;
    }


}

~~~

### 插入排序

- step 1：用一数组存储输入的数据流。
- step 2：Insert函数在插入的同时，遍历之前存储在数组中的数据，按照递增顺序依次插入，如此一来，加入的数据流便是有序的。
- step 3：GetMedian函数可以根据下标直接访问中位数，分为数组为奇数个元素和偶数个元素两种情况。记得需要类型转换为double。

~~~java
import java.util.Comparator;
import java.util.PriorityQueue;


import java.util.ArrayList;

public class Solution {
    ArrayList<Integer> arr = new ArrayList<>();
    public void Insert(Integer num) {
        //插入排序
        int size = arr.size();
        if (size == 0) {
            arr.add(num);
            return;
        } else {
            for (int i = 0; i < size; i++) {
                if (arr.get(i) >= num) {
                    arr.add(i, num);
                    return;
                }
            }
            arr.add(num);
        }

    }

    public Double GetMedian() {
        if (arr.size() % 2 == 1) return Double.valueOf(arr.get(arr.size() / 2));
        else return ((arr.get(arr.size() / 2 - 1) + arr.get(arr.size() / 2)) / 2.0);
    }


}

~~~

# **JZ65** **不用加减乘除做加法**

## 描述

写一个函数，求两个整数之和，要求在函数体内不得使用+、-、*、/四则运算符号。

数据范围：两个数都满足 −10≤�≤1000−10≤*n*≤1000
进阶：空间复杂度 �(1)*O*(1)，时间复杂度 �(1)*O*(1)

## 示例1

输入：

```
1,2
```

复制

返回值：

```
3
```

复制

## 示例2

输入：

```
0,0
```

复制

返回值：

```
0
```

## 题解

### 位运算

**知识点：位运算**

计算机的数字由二进制表示，我们平常的运算是对整个数字进行运算，但是还可以按照二进制的每一位分别进行运算。常见运算有位与、位或、移位、位异或等。

**思路：**

由于题目禁止我们使用+，-，*，/运算符，我们需要通过位运算来实现加法。我们需要通过循环迭代两个变量实现，一个变量指代进位，一个变量指代非进位。

位运算中两数进行**异或运算**可以提供两数加和后二进制**非进位**信息，位运算中的两数进行**与运算**的结果可以提供两数加和后的二进制**进位**信息。因此我们将两数与运算的结果进行循环左移一位，并在下一轮循环中继续将移位后的进位结果和非进位结果求和，重复此过程，直到不再产生进位为止。

**具体做法：**

- step 1：两数进行与运算可以产生进位的信息
- step 2：运算后执行左移1位就是每轮需要进位的方案
- step 3：两数进行异或运算可以产生非进位的加和结果
- step 4：将移位后的进位结果与非进位结果继续重复 step 1 - step 3 的步骤，直到不再产生进位为止

**图示：**

![非递归](https://bd-hexo.oss-cn-beijing.aliyuncs.com/img/3754BC72BCCE8F73B539D2119474ED64.gif)

~~~java
public class Solution {
    public int Add(int num1, int num2) {
        int sum=num1;//表示不进位的结果
        int add=num2;//表示进位的结果
        while(add!=0){
            int temp=sum^add;//异或操作，算出不进位的部分的结果。只有1+0或者0+1 这两种相加情况会在该位留下1
            add=(sum&add)<<1;//与操作算出进位，只有1+1才能进位所以与操作，因为是进位所以左移一位。本次计算出的进位将在下一次循环相加，如果没有进位说明计算完成
            sum=temp;
        }
        return sum;
    }
}
~~~

# **JZ15** **二进制中1的个数**

## 描述

输入一个整数 n ，输出该数32位二进制表示中1的个数。其中负数用补码表示。

数据范围：−231<=�<=231−1−231<=*n*<=231−1

即范围为:−2147483648<=�<=2147483647−2147483648<=*n*<=2147483647

## 示例1

输入：

```
10
```

复制

返回值：

```
2
```

复制

说明：

```
十进制中10的32位二进制表示为0000 0000 0000 0000 0000 0000 0000 1010，其中有两个1。       
```

## 示例2

输入：

```
-1
```

复制

返回值：

```
32
```

复制

说明：

```
负数使用补码表示 ，-1的32位二进制表示为1111 1111 1111 1111 1111 1111 1111 1111，其中32个1   
```

## 题解

### 移位

我们可以检查该数字的二进制每一位是否为1，如果遍历二进制每一位呢？可以考虑移位运算，每次移动一位就可以。至于怎么统计到1呢？我们都只知道数字1与数字相位与运算，其实只是最后一位为1就是1，最后一位为0就是0，这样我们只需要将数字1移位运算，就可以遍历二进制的每一位，再去做位与运算，结果为1的就是二进制中为1的。

**具体做法：**

- step 1：遍历二进制的32位，通过移位0-31次实现。
- step 2：将移位后的1与数字进行位与运算，结果为1就记录一次。

~~~java
public class Solution {
    public int NumberOf1(int n) {
        int res = 0;
        //遍历32位
        for(int i = 0; i < 32; i++){
            //按位比较
            if((n & (1 << i)) != 0)   
                res++;
        }
        return res;
    }
}

~~~

或者将原数右移和1与，也可以

~~~java
public class Solution {
    public int NumberOf1(int n) {
        int res=0;
        for(int i=0;i<32;i++){
            if(((n>>i)&1)==1) res++;
        }
        return res;
    }
}
~~~

# **JZ16** **数值的整数次方**

## 描述

实现函数 double Power(double base, int exponent)，求base的exponent次方。

注意：

1.保证base和exponent不同时为0。

2.不得使用库函数，同时不需要考虑大数问题

3.有特殊判题，不用考虑小数点后面0的位数。

数据范围： ∣����∣≤100 ∣*b**a**s**e*∣≤100 ， ∣��������∣≤100 ∣*e**x**p**o**n**e**n**t*∣≤100 ,保证最终结果一定满足 ∣���∣≤104 ∣*v**a**l*∣≤104 
进阶：空间复杂度 �(1) *O*(1) ，时间复杂度 �(�) *O*(*n*) 

## 示例1

输入：

```
2.00000,3
```

复制

返回值：

```
8.00000
```

复制

## 示例2

输入：

```
2.10000,3
```

复制

返回值：

```
9.26100
```

复制

## 示例3

输入：

```
2.00000,-2
```

复制

返回值：

```
0.25000
```

复制

说明：

```
2的-2次方等于1/4=0.25    
```

## 题解

就特殊处理下负数就行

正数直接累乘

负数的话 x的-y次方 等于 1/x的y次方

~~~java
public class Solution {
    public double Power(double base, int exponent) {
        if(exponent<0){
            base=1.0/base;
            exponent=-exponent;
        }
        double res = 1.0;
        while (exponent-->0){
            res*=base;
        }
        return res;
    }
}
~~~

# **JZ56** **数组中只出现一次的两个数字**

## 描述

一个整型数组里除了两个数字只出现一次，其他的数字都出现了两次。请写程序找出这两个只出现一次的数字。

数据范围：数组长度 2≤�≤10002≤*n*≤1000，数组中每个数的大小 0<���≤10000000<*v**a**l*≤1000000
要求：空间复杂度 �(1)*O*(1)，时间复杂度 �(�)*O*(*n*)

提示：输出时按非降序排列。

## 示例1

输入：

```
[1,4,1,6]
```

复制

返回值：

```
[4,6]
```

复制

说明：

```
返回的结果中较小的数排在前面     
```

## 示例2

输入：

```
[1,2,3,3,2,9]
```

复制

返回值：

```
[1,9]
```

## 题解

### 哈希表

用一个哈希表存出现过的元素

如果该元素第一次出现，则将他存入哈希表

如果该元素第二次出现，则将他从哈希表移除

最后哈希表中剩下的两个元素就是只出现过一次的两个元素

~~~java
import java.util.*;


public class Solution {
    /**
     * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
     *
     *
     * @param array int整型一维数组
     * @return int整型一维数组
     */
    public int[] FindNumsAppearOnce (int[] array) {
        // write code here
        HashSet<Integer> hashSet = new HashSet<>();
        for (int i : array) {
            if(hashSet.contains(i)){
                hashSet.remove(i);
            }else {
                hashSet.add(i);
            }
        }
        int[] res = new int[2];
        int p=0;
        for (Integer integer : hashSet) {
            res[p++]=integer;
        }
        return res;
    }
}
~~~

时间复杂度O(n)

空间复杂度O(n)

### 异或运算

**思路：**

异或运算满足交换率，且相同的数字作异或会被抵消掉，比如：�⊕�⊕�⊕�⊕�=�*a*⊕*b*⊕*c*⊕*b*⊕*c*=*a*，且任何数字与0异或还是原数字，放到这个题目里面所有数字异或运算就会得到�⊕�*a*⊕*b*，也即得到了两个只出现一次的数字的异或和。

```
//遍历数组得到a^b``for``(``int` `i = ``0``; i < array.length; i++)``  ``temp ^= array[i];
```

但是我们是要将其分开得到结果的，可以考虑将数组分成两部分，一部分为�⊕�⊕�⊕�⊕�=�*a*⊕*d*⊕*c*⊕*d*⊕*c*=*a*，另一部分为�⊕�⊕�⊕�⊕�=�*b*⊕*x*⊕*y*⊕*x*⊕*y*=*a*的样式，怎么划分才能让a与b完全分开，而另外的也能刚好成对在一个组呢？这是我们需要考虑的问题。

�⊕�*a*⊕*b*的结果中如果二进制第一位是1，则说明a与b的第一位二进制不相同，否则则是相同的，从结果二进制的最高位开始遍历，总能找到二进制位为1的情况：

```
//找到两个数不相同的第一位``while``((k & temp) == ``0``)``  ``k <<= ``1``;
```

因为两个数字不相同，我们就以这一位是否为1来划分上述的两个数组，相同的数字自然会被划分到另一边，而a与b也会刚好被分开。

```
//遍历数组，对每个数分类``if``((k & array[i]) == ``0``)``  ``res1 ^= array[i];``else``  ``res2 ^= array[i];
```

**具体做法：**

- step 1：遍历整个数组，将每个元素逐个异或运算，得到�⊕�*a*⊕*b*。
- step 2：我们可以考虑位运算的性质，找到二进制中第一个不相同的位，将所有数组划分成两组。
- step 3：遍历数组对分开的数组单独作异或连算。
- step 4：最后整理次序输出。

**图示：**

![alt](https://bd-hexo.oss-cn-beijing.aliyuncs.com/img/C30EF4D55F5E47F5616DFDCA6BB24F0F.gif)

~~~JAVA
public class Solution {
    /**
     * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
     *
     *
     * @param array int整型一维数组
     * @return int整型一维数组
     */
    public int[] FindNumsAppearOnce (int[] array) {
        int temp=0;
        //遍历数组得到a^b
        for (int i : array) {
            temp^=i;
        }
        int diff=1;
        //找到两个数不相同的第一位
        while ((diff&temp)==0){
            diff<<=1;
        }
        int res1=0;
        int res2=0;
        for (int i : array) {
            //遍历数组，对每个数分类
            if((i&diff)==0){
                res1^=i;
            }else {
                res2^=i;
            }
        }
        //整理次序
        if(res1<res2)
        return new int[]{res1,res2};
        else return new int[]{res2,res1};
    }
}
~~~

# **JZ64** **求1+2+3+...+n**

## 描述

求1+2+3+...+n，要求不能使用乘除法、for、while、if、else、switch、case等关键字及条件判断语句（A?B:C）。

数据范围： 0<�≤2000<*n*≤200
进阶： 空间复杂度 �(1)*O*(1) ，时间复杂度 �(�)*O*(*n*)

## 示例1

输入：

```
5
```

复制

返回值：

```
15
```

复制

## 示例2

输入：

```
1
```

复制

返回值：

```
1
```

## 题解

不让乘除只能一个个加

不能用if、switch、？：等操作，我们可以采用与运算的短路操作

其实相当于加了一个n>1的判断

~~~java
public class Solution {
    public int Sum_Solution(int n) {
        //通过与运算判断n是否为正数，以结束递归
        boolean flag = (n > 1) && ((n += Sum_Solution(n - 1)) > 0); 
        return n;
    }
}

~~~

# **JZ29** **顺时针打印矩阵**

## 描述

输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字，例如，如果输入如下4 X 4矩阵：

```
[[1,2,3,4],
[5,6,7,8],
[9,10,11,12],
[13,14,15,16]]
```

则依次打印出数字

```
[1,2,3,4,8,12,16,15,14,13,9,5,6,7,11,10]
```

数据范围:

0 <= matrix.length <= 100

0 <= matrix[i].length <= 100



## 示例1

输入：

```
[[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]]
```

复制

返回值：

```
[1,2,3,4,8,12,16,15,14,13,9,5,6,7,11,10]
```

复制

## 示例2

输入：

```
[[1,2,3,1],[4,5,6,1],[4,5,6,1]]
```

复制

返回值：

```
[1,2,3,1,1,1,6,5,4,4,5,6]
```

## 题解

这道题就是一个简单的模拟，我们想象有一个矩阵，从第一个元素开始，往右到底后再往下到底后再往左到底后再往上，结束这一圈，进入下一圈螺旋。

**具体做法:**

- step 1：首先排除特殊情况，即矩阵为空的情况。
- step 2：设置矩阵的四个边界值，开始准备螺旋遍历矩阵，遍历的截止点是左右边界或者上下边界重合。
- step 3：首先对最上面一排从左到右进行遍历输出，到达最右边后第一排就输出完了，上边界相应就往下一行，要判断上下边界是否相遇相交。
- step 4：然后输出到了右边，正好就对最右边一列从上到下输出，到底后最右边一列已经输出完了，右边界就相应往左一列，要判断左右边界是否相遇相交。
- step 5：然后对最下面一排从右到左进行遍历输出，到达最左边后最下一排就输出完了，下边界相应就往上一行，要判断上下边界是否相遇相交。
- step 6：然后输出到了左边，正好就对最左边一列从下到上输出，到顶后最左边一列已经输出完了，左边界就相应往右一列，要判断左右边界是否相遇相交。
- step 7：重复上述3-6步骤直到循环结束。

~~~java
import java.util.ArrayList;
public class Solution {
    public ArrayList<Integer> printMatrix(int [][] matrix) {
        ArrayList<Integer> res = new ArrayList<>();
        if(matrix.length==0) return res;
        int left=0;
        int right=matrix[0].length-1;
        int up=0;
        int down=matrix.length-1;
        while (left<=right&&up<=down){
            for(int i=left;i<=right;i++){
                res.add(matrix[up][i]);
            }
            up++;
            if(up>down) break;
            for(int i=up;i<=down;i++){
                res.add(matrix[i][right]);
            }
            right--;
            if(left>right) break;
            for(int i=right;i>=left;i--){
                res.add(matrix[down][i]);
            }
            down--;
            if(up>down) break;
            for(int i=down;i>=up;i--){
                res.add(matrix[i][left]);
            }
            left++;
            if(left>right) break;
        }
        return res;
    }
}
~~~

# **JZ61** **扑克牌顺子**

## 描述

现在有2副扑克牌，从扑克牌中随机五张扑克牌，我们需要来判断一下是不是顺子。
有如下规则：
\1. A为1，J为11，Q为12，K为13，A不能视为14
\2. 大、小王为 0，0可以看作任意牌
\3. 如果给出的五张牌能组成顺子（即这五张牌是连续的）就输出true，否则就输出false。
4.数据保证每组5个数字，每组最多含有4个零，数组的数取值为 [0, 13]



要求：空间复杂度 �(1)*O*(1)，时间复杂度 �(�����)*O*(*n**l**o**g**n*)，本题也有时间复杂度 �(�)*O*(*n*) 的解法

### 输入描述：

输入五张扑克牌的值

### 返回值描述：

五张扑克牌能否组成顺子。

## 示例1

输入：

```
[6,0,2,0,4]
```

复制

返回值：

```
true
```

复制

说明：

```
中间的两个0一个看作3，一个看作5 。即：[6,3,2,5,4]
这样这五张牌在[2,6]区间连续，输出true 
```

## 示例2

输入：

```
[0,3,2,6,4]
```

复制

返回值：

```
true
```

复制

## 示例3

输入：

```
[1,0,0,1,0]
```

复制

返回值：

```
false
```

复制

## 示例4

输入：

```
[13,12,11,0,1]
```

复制

返回值：

```
false
```

## 题解

### 排序

先排序，把0摘出来当万能牌

然后开始从最小的牌遍历，如果遇到重复牌直接返回false不能构成顺子

如果遇到间隔大于1的，则在中间补0

最后看看我们需要的0到底够不够就行

~~~java
import java.util.Arrays;

public class Solution {
    public boolean IsContinuous(int [] numbers) {
        Arrays.sort(numbers);
        int size = 0;//记录0的个数
        for (int number : numbers) {
            if(number==0) size++;
            else break;
        }
        int temp=numbers[size]-1;
        for(int i=size;i<numbers.length;i++){
            //如果间隔不为1
            if (numbers[i] - temp != 1) {
                if(numbers[i]==temp) return false;//无间隔不能组成顺子
                //有间隔则间隔补0
                size -= numbers[i] - temp - 1;
            }
            temp=numbers[i];
        }
        //最后检查用了几个0
        return size >= 0;
    }
}
~~~

### 哈希表

题中给出的信息是两副牌，因此最多4个零，因此必有一张非零牌，分析顺子两点基本情况：

- 不能有重复的非零牌
- 非零牌之间最大相差为4

可以找到这手牌的最大差值，若是两张非零牌最大相差大于4，则需要4张零牌（超出了限制）来填充中间的部分，若是小于等于4，又不重复的情况下，要么零牌补齐，要么本身就是相邻的数字。

因此创建一个哈希表，查找重复：遍历数组的同时，遇到非零牌重复，直接不行，若没有重复则加入到哈希表中，等待后续的查找。同时在遍历过程需要记录数组最大值与最小值，最后检查最大值与最小值的差是否大于4，小于4的话，在没有非零牌重复的情况下，最大值与最小值中间的牌加上0牌就可以填满这手顺子。

**具体做法：**

- step 1：创建一个哈希表统计这手牌有无非零重复牌。
- step 2：使用两个变量记录这手牌的上下界。
- step 3：遍历每一张牌，零牌可以重复，非零牌重复则不能为顺子。用哈希表检查去重。
- step 4：将新牌加入哈希表，并更新这手牌的上下界。
- step 5：最后检查上下界之差是否大于等于5，若是则构不成顺子，否则可以。

~~~java
import java.util.*;
public class Solution {
    public boolean IsContinuous(int [] numbers) {
        HashMap<Integer, Integer> hash = new HashMap<>();
        //设置顺子上下界
        int max = 0, min = 13;
        //遍历牌
        for(int i = 0; i < numbers.length; i++){
            if(numbers[i] > 0){
                //顺子不能重复
                if(hash.containsKey(numbers[i])) 
                    return false;
                else{
                    //将新牌加入哈希表
                    hash.put(numbers[i], i);
                    //更新上下界
                    if(numbers[i] >= max)
                        max = numbers[i];
                    if(numbers[i] <= min)
                        min = numbers[i];
                }
            }
        }
        //如果两张牌大于等于5，剩下三张牌无论如何也补不齐
        if((max - min) >= 5)  
            return false;
        else
            return true;
    }
}
~~~

# **JZ67** **把字符串转换成整数(atoi)**

## 描述

写一个函数 StrToInt，实现把字符串转换成整数这个功能。不能使用 atoi 或者其他类似的库函数。传入的字符串可能有以下部分组成:

1.若干空格

2.（可选）一个符号字符（'+' 或 '-'）

\3. 数字，字母，符号，空格组成的字符串表达式

\4. 若干空格



**转换算法如下:**
**1.去掉无用的前导空格**
**2.第一个非空字符为+或者-号时，作为该整数的正负号，如果没有符号，默认为正数**
**3.判断整数的有效部分：**
**3.1 确定符号位之后，与之后面尽可能多的连续数字组合起来成为有效整数数字，如果没有有效的整数部分，那么直接返回0**
**3.2 将字符串前面的整数部分取出，后面可能会存在存在多余的字符(字母，符号，空格等)，这些字符可以被忽略，它们对于函数不应该造成影响**
**3.3 整数超过 32 位有符号整数范围 [−2****31****, 2****31** **− 1] ，需要截断这个整数，使其保持在这个范围内。具体来说，小于 −2****31****的整数应该被调整为 −2****31** **，大于 2****31** **− 1 的整数应该被调整为 2****31** **− 1**
**4.去掉无用的后导空格**



数据范围:

1.0 <=字符串长度<= 100

2.字符串由英文字母（大写和小写）、数字（0-9）、' '、'+'、'-' 和 '.' 组成

## 示例1

输入：

```
"82"
```

复制

返回值：

```
82
```

复制

## 示例2

输入：

```
"   -12  "
```

复制

返回值：

```
-12
```

复制

说明：

```
去掉前后的空格，为-12  
```

## 示例3

输入：

```
"4396 clearlove"
```

复制

返回值：

```
4396
```

复制

说明：

```
6后面的字符不属于有效的整数部分，去除，但是返回前面提取的有效部分  
```

## 示例4

输入：

```
"clearlove 4396"
```

复制

返回值：

```
0
```

复制

## 示例5

输入：

```
"-987654321111"
```

复制

返回值：

```
-2147483648
```

## 题解

代码里注释比较详细

~~~java


public class Solution {
    /**
     * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
     *
     *
     * @param s string字符串
     * @return int整型
     */
    public int StrToInt (String s) {
        char[] chars = s.toCharArray();
        int i=0;
        //去掉前面的空格
        while (i<chars.length&&chars[i]==' '){
            i++;
        }
        //全是空格
        if(i>=chars.length) return 0;
        //正负号
        boolean symbol=true;
        if(chars[i]=='+'){
            i++;
        }else if(chars[i]=='-'){
            symbol=false;
            i++;
        }else if(chars[i]>='0'&&chars[i]<='9'){

        }else return 0;
        int res=0;
        for(;i<chars.length;i++){
            if(chars[i]>='0'&&chars[i]<='9'){
                //越界判断
                if(symbol &&(res>Integer.MAX_VALUE/10||res==Integer.MAX_VALUE/10&&chars[i]-'0'>Integer.MAX_VALUE%10))
                    return Integer.MAX_VALUE;
                if(!symbol&&(-res<Integer.MIN_VALUE/10||-res==Integer.MAX_VALUE/10&&chars[i]-'0'<Integer.MIN_VALUE%10))
                    return Integer.MIN_VALUE;
                //进位累加
                res*=10;
                res+=chars[i]-'0';
            }else break;//遇到不是数字则退出
        }
        if(!symbol) res=-res;
        return res;
    }
}
~~~

# **JZ20** **表示数值的字符串**

## 描述

请实现一个函数用来判断字符串str是否表示数值（包括科学计数法的数字，小数和整数）。

**科学计数法的数字**(按顺序）可以分成以下几个部分:

1.若干空格

2.一个整数或者小数

3.（可选）一个 'e' 或 'E' ，后面跟着一个整数(可正可负)

4.若干空格

**小数**（按顺序）可以分成以下几个部分：

1.若干空格

2.（可选）一个符号字符（'+' 或 '-'）

\3. 可能是以下描述格式之一:

3.1 至少一位数字，后面跟着一个点 '.'

3.2 至少一位数字，后面跟着一个点 '.' ，后面再跟着至少一位数字

3.3 一个点 '.' ，后面跟着至少一位数字

4.若干空格

**整数**（按顺序）可以分成以下几个部分：

1.若干空格
2.（可选）一个符号字符（'+' 或 '-')

\3. 至少一位数字

4.若干空格



例如，字符串["+100","5e2","-123","3.1416","-1E-16"]都表示数值。

但是["12e","1a3.14","1.2.3","+-5","12e+4.3"]都不是数值。

提示:

1.1 <= str.length <= 25

2.str 仅含英文字母（大写和小写），数字（0-9），加号 '+' ，减号 '-' ，空格 ' ' 或者点 '.' 。

3.如果怀疑用例是不是能表示为数值的，可以使用python的print(float(str))去查看

进阶：时间复杂度�(�) *O*(*n*) ，空间复杂度�(�) *O*(*n*) 

## 示例1

输入：

```
"123.45e+6"
```

复制

返回值：

```
true
```

复制

## 示例2

输入：

```
"1.2.3"
```

复制

返回值：

```
false
```

复制

## 示例3

输入：

```
"."
```

复制

返回值：

```
false
```

复制

## 示例4

输入：

```
"    .2  "
```

复制

返回值：

```
true
```

## 题解

感觉没啥难点。就是一遇到匹配题就情况考虑不周全，所以代码改了好几次改的稀烂，最下面再配个官方题解吧

我的题解：

~~~java

import java.util.*;


public class Solution {
    /**
     * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
     *
     * @param str string字符串
     * @return bool布尔型
     */
    public boolean isNumeric(String str) {
        char[] chars = str.toCharArray();
        int length = chars.length;
        if (length == 0) return false;
        int i = 0;
        while (i < length && chars[i] == ' ')
            i++;
        if (i == length) return false;
        //开头符号
        if (chars[i] == '+' || chars[i] == '-') i++;
        if (i == length) return false;
        //.x小数情况
        if (chars[i] == '.') {
            i++;
            if (i == length) return false;
            //后面应该都是数字
            while (i < length && chars[i] >= '0' && chars[i] <= '9')
                i++;
            //去空格
            while (i < length && chars[i] == ' ')
                i++;
            //如果遍历到末尾则说明是数字
            if (i == length) return true;
            else return false;
        }
        //排除. 开头，则开头必为数字
        if (!(chars[i] >= '0' && chars[i] <= '9')) return false;
        //遍历整数部分
        while (i < length && chars[i] >= '0' && chars[i] <= '9')
            i++;
        //判断是否结束（整数情况）
        int j = i;
        while (j < length && chars[j] == ' ')
            j++;
        if (j == length) return true;
        /*
        遍历完整数后有以下情况：
        下一位是小数点，
        下一位是e或E
         */
        if (chars[i] == '.') {
            i++;
            //后面应该都是数字
            while (i < length && chars[i] >= '0' && chars[i] <= '9')
                i++;
            //去空格判断是否结束
            int k = i;
            while (k < length && chars[k] == ' ')
                k++;
            //如果遍历到末尾则说明是数字
            if (k == length) return true;
            //没有到末位，考虑后面是E或e的情况
            else if (chars[i] == 'e' || chars[i] == 'E') {
                i++;
                if (i >= length) return false;
                //符号位
                if (chars[i] == '+' || chars[i] == '-') i++;
                if (i == length)return false;
                //后面应该都是数字
                while (i < length && chars[i] >= '0' && chars[i] <= '9')
                    i++;
                //去空格
                while (i < length && chars[i] == ' ')
                    i++;
                //如果遍历到末尾则说明是数字
                if (i == length) return true;
                else return false;
            }
        } else if (chars[i] == 'e' || chars[i] == 'E') {
            i++;
            if (i >= length) return false;
            //符号位
            if (chars[i] == '+' || chars[i] == '-') i++;
            if (i == length) return false;
            //后面应该都是数字
            while (i < length && chars[i] >= '0' && chars[i] <= '9')
                i++;
            //去空格
            while (i < length && chars[i] == ' ')
                i++;
            //如果遍历到末尾则说明是数字
            if (i == length) return true;
            else return false;
        }
        return false;

    }



    public static void main(String[] args) {
        Solution solution = new Solution();
        System.out.println(solution.isNumeric(" "));
    }
}
~~~

官方题解：

~~~java
import java.util.*;
public class Solution {
    //遍历字符串的下标
    private int index = 0;
    //有符号判断
    private boolean integer(String s){
        if(index < s.length() && (s.charAt(index) == '-' || s.charAt(index) == '+'))
            index++;
        return unsigned_integer(s);
    }
    //无符号数判断
    private boolean unsigned_integer(String s){
        int temp = index;
        while(index < s.length() && (s.charAt(index) >= '0' && s.charAt(index) <= '9'))
            index++;
        return index > temp;
    }
    public boolean isNumeric (String str) {
        //先判断空串
        if(str == null || str.length() == 0)
            return false;
        //去除前面的空格
        while(index < str.length() && str.charAt(index) == ' ')
            index++;
        int n = str.length() - 1;
        //去除字符串后面的空格
        while(n >= 0 && str.charAt(n) == ' ')
            n--;
        //限制的长度比下标1
        n++;
        //全是空格情况
        if(n < index)
            return false;
        //判断前面的字符是否是有符号的整数
        boolean flag = integer(str);
        //如果有小数点
        if(index < n && str.charAt(index) == '.'){
            index++;
            //小数点前后有无数字可选
            flag = unsigned_integer(str) || flag; 
        }
        //如果有e
        if(index < n && (str.charAt(index) == 'e' || str.charAt(index) == 'E')){
            index++;
            //e后面必须全是整数
            flag = flag && integer(str);
        }
        //是否字符串遍历结束
        return flag && (index == n);
    }
}

~~~

# **JZ66** **构建乘积数组**

## 描述

给定一个数组 A[0,1,...,n-1] ,请构建一个数组 B[0,1,...,n-1] ,其中 B 的元素 B[i]=A[0]*A[1]*...*A[i-1]*A[i+1]*...*A[n-1]（除 A[i] 以外的全部元素的的乘积）。程序中不能使用除法。（注意：规定 B[0] = A[1] * A[2] * ... * A[n-1]，B[n-1] = A[0] * A[1] * ... * A[n-2]）

对于 A 长度为 1 的情况，B 无意义，故而无法构建，用例中不包括这种情况。

数据范围：1≤*n*≤10 ，数组中元素满足∣*v**a**l*∣≤10 

## 示例1

输入：

```
[1,2,3,4,5]
```

复制

返回值：

```
[120,60,40,30,24]
```

复制

## 示例2

输入：

```
[100,50]
```

复制

返回值：

```
[50,100]
```

## 题解

两次遍历数组

算出从0累乘到i 和从 length-1累乘到i 的结果

因为是累乘，每次只多乘一个数，所以只需两次遍历即可计算出这两个数组x,y

然后B[0]和B[length-1] 特殊处理

其他的：B[i]=x[i-1]*y[i+1] 即可

~~~java

import java.util.ArrayList;
public class Solution {
    public int[] multiply(int[] A) {
        int length = A.length;
        //结果
        int[] B = new int[length];
        //从0到i累乘
        int[] x = new int[length];
        //从i到length-1累乘
        int[] y = new int[length];
        int temp = 1;
        for (int i = 0; i < length; i++) {
            temp *= A[i];
            x[i] = temp;
        }
        temp = 1;
        for (int i = length - 1; i >= 0; i--) {
            temp *= A[i];
            y[i] = temp;
        }
        B[0] = y[1];
        B[length - 1] = x[length - 2];
        for (int i = 1; i < length - 1; i++) {
            B[i] = x[i - 1] * y[i + 1];
        }
        return B;
    }
}

~~~

# **JZ50** **第一个只出现一次的字符**

## 描述

在一个长为 字符串中找到第一个只出现一次的字符,并返回它的位置, 如果没有则返回 -1（需要区分大小写）.（从0开始计数）

数据范围：0≤�≤100000≤*n*≤10000，且字符串只有字母组成。

要求：空间复杂度 �(�)*O*(*n*)，时间复杂度 �(�)*O*(*n*)

## 示例1

输入：

```
"google"
```

复制

返回值：

```
4
```

复制

## 示例2

输入：

```
"aa"
```

复制

返回值：

```
-1
```

# **JZ50** **第一个只出现一次的字符**

## 描述

在一个长为 字符串中找到第一个只出现一次的字符,并返回它的位置, 如果没有则返回 -1（需要区分大小写）.（从0开始计数）

数据范围：0≤�≤100000≤*n*≤10000，且字符串只有字母组成。

要求：空间复杂度 �(�)*O*(*n*)，时间复杂度 �(�)*O*(*n*)

## 示例1

输入：

```
"google"
```

复制

返回值：

```
4
```

复制

## 示例2

输入：

```
"aa"
```

复制

返回值：

```
-1
```

## 题解

### 哈希表

先遍历一遍，记录每个元素出现几次

再遍历第二遍，如果遇到只出现一次的直接返回它的位置

~~~java

import java.util.HashMap;

public class Solution {
    public int FirstNotRepeatingChar(String str) {
        char[] chars = str.toCharArray();
        HashMap<Character,Integer> map = new HashMap<>();
        for (char c : chars) {
            map.put(c,map.getOrDefault(c,0)+1);
        }
        for(int i=0;i<chars.length;i++){
            if(map.get(chars[i])==1) return i;
        }
        return -1;
    }
}
~~~

# **JZ5** **替换空格**

## 描述

请实现一个函数，将一个字符串s中的每个空格替换成“%20”。

例如，当字符串为We Are Happy.则经过替换之后的字符串为We%20Are%20Happy。

数据范围:0≤���(�)≤1000 0≤*l**e**n*(*s*)≤1000 。保证字符串中的字符为大写英文字母、小写英文字母和空格中的一种。

## 示例1

输入：

```
"We Are Happy"
```

复制

返回值：

```
"We%20Are%20Happy"
```

复制

## 示例2

输入：

```
" "
```

复制

返回值：

```
"%20"
```

## 题解

我们可以用下标遍历字符串，每次检查下标所在位置的字符是否为空格，如果不是空格，下标继续往后，如果是空格则调用substr函数将字符串从空格前后截断，然后中间添加"%20"后相连即可。

~~~java
public class Solution {
    /**
     * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
     *
     *
     * @param s string字符串
     * @return string字符串
     */
    public String replaceSpace (String s) {
        StringBuilder res = new StringBuilder();
        // write code here
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) == ' ') {
                res.append("%20");
            } else res.append(s.charAt(i));
        }
        return res.toString();
    }
}
~~~

# **JZ21** **调整数组顺序使奇数位于偶数前面(一)**

## 描述

输入一个长度为 n 整数数组，实现一个函数来调整该数组中数字的顺序，使得所有的奇数位于数组的前面部分，所有的偶数位于数组的后面部分，并保证奇数和奇数，偶数和偶数之间的相对位置不变。

数据范围：0≤�≤50000≤*n*≤5000，数组中每个数的值 0≤���≤100000≤*v**a**l*≤10000

要求：时间复杂度 �(�)*O*(*n*)，空间复杂度 �(�)*O*(*n*)

进阶：时间复杂度 �(�2)*O*(*n*2)，空间复杂度 �(1)*O*(1)

## 示例1

输入：

```
[1,2,3,4]
```

复制

返回值：

```
[1,3,2,4]
```

复制

## 示例2

输入：

```
[2,4,6,5,7]
```

复制

返回值：

```
[5,7,2,4,6]
```

复制

## 示例3

输入：

```
[1,3,5,6,7]
```

复制

返回值：

```
[1,3,5,7,6]
```

## 题解

既然要把所有的奇数放在数组前面，所有的偶数放在数组后面，那可以统计奇数在原数组中出现了多少次，这样就可以找到二者的分界线。

有了分界线以后，前面就是奇数，后面就是偶数，可以利用两个指针分别指向二者的开头，遇到一个元素就添加到相应位置，然后指针移动。

~~~java


import java.util.*;


public class Solution {
    /**
     * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
     *
     *
     * @param array int整型一维数组
     * @return int整型一维数组
     */
    public int[] reOrderArray (int[] array) {
        // write code here
        int n = array.length;
        int[] res = new int[n];
        //统计奇数出现次数来划分res数组
        int t = 0;
        for (int i : array) {
            if (i % 2 == 1) t++;
        }
        int p1 = 0;
        int p2 = t;
        for (int i : array) {
            if (i % 2 == 1) res[p1++] = i;
            else res[p2++] = i;
        }
        return res;
    }
}
~~~

# **JZ39** **数组中出现次数超过一半的数字**

## 描述

给一个长度为 n 的数组，数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字。

例如输入一个长度为9的数组[1,2,3,2,2,2,5,4,2]。由于数字2在数组中出现了5次，超过数组长度的一半，因此输出2。

数据范围：�≤50000*n*≤50000，数组中元素的值 0≤���≤100000≤*v**a**l*≤10000

要求：空间复杂度：�(1)*O*(1)，时间复杂度 �(�)*O*(*n*)

### 输入描述：

保证数组输入非空，且保证有解

## 示例1

输入：

```
[1,2,3,2,2,2,5,4,2]
```

复制

返回值：

```
2
```

复制

## 示例2

输入：

```
[3,3,3,3,2,2,2]
```

复制

返回值：

```
3
```

复制

## 示例3

输入：

```
[1]
```

复制

返回值：

```
1
```

## 题解

### 哈希表

根据题目意思，显然可以先遍历一遍数组，在map中存每个元素出现的次数，然后再遍历一次数组，找出众数

~~~java


import java.util.HashMap;

public class Solution {
    public int MoreThanHalfNum_Solution(int [] array) {
        HashMap<Integer, Integer> map = new HashMap<>();
        for (int i : array) {
            map.put(i, map.getOrDefault(i, 0) + 1);
        }
        for (int i : array) {
            if (map.get(i) > array.length / 2) return i;
        }
        return -1;
    }
}
~~~

时间复杂度：O(n)
空间复杂度：O(n)

### 排序



~~~java
import java.util.Arrays;
import java.util.HashMap;

public class Solution {
    public int MoreThanHalfNum_Solution(int [] array) {
        Arrays.sort(array);
        int x = array[array.length / 2];
        int cnt = 0;
        for (int i : array) {
            if (i == x) cnt++;
            if (cnt > array.length / 2) return x;
        }
        return -1;
    }
}
~~~

时间复杂度：O(nlongn)
空间复杂度：O(1)

### 候选法

加入数组中存在众数，那么众数一定大于数组的长度的一半。
思想就是：如果两个数不相等，就消去这两个数，最坏情况下，每次消去一个众数和一个非众数，那么如果存在众数，最后留下的数肯定是众数。

做法：

在遍历数组时保存两个值：一是数组中一个数字，一是次数。遍历下一个数字时，若它与之前保存的数字相同，则次数加1，否则次数减1；若次数为0，则保存下一个数字，并将次数置为1。遍历结束后，所保存的数字即为所求。然后再判断它是否符合条件即可。

~~~java

import java.util.Arrays;

public class Solution {
    public int MoreThanHalfNum_Solution(int [] array) {
        int num = -1;
        int times = 0;
        for (int i : array) {
            if (times == 0) {
                num = i;
                times++;
            } else if (i == num) {
                times++;
            } else times--;
        }
        if (times > 0) return num;
        return -1;
    }
}
~~~

时间复杂度：O(n)
空间复杂度：O(1)

# **JZ43** **整数中1出现的次数（从1到n整数中1出现的次数）**

## 描述

输入一个整数 n ，求 1～n 这 n 个整数的十进制表示中 1 出现的次数
例如， 1~13 中包含 1 的数字有 1 、 10 、 11 、 12 、 13 因此共出现 6 次

注意：11 这种情况算两次

数据范围： 1≤�≤30000 1≤*n*≤30000 

进阶：空间复杂度 �(1) *O*(1) ，时间复杂度 �(�����) *O*(*l**o**g**n**n*) 

## 示例1

输入：

```
13
```

复制

返回值：

```
6
```

复制

## 示例2

输入：

```
0
```

复制

返回值：

```
0
```

## 题解

~~~java
import java.util.*;
public class Solution {
    public int NumberOf1Between1AndN_Solution(int n) {
        int res = 0;
        long mulBase=10;
        while(mulBase<=n*10){
            res+=(n/mulBase)*(mulBase/10)+Math.min(Math.max(n%mulBase-mulBase/10+1,0),mulBase/10);
            mulBase*=10;
        }
        return res;
    }
}
~~~

# **JZ49** **丑数**

## 描述

把只包含质因子2、3和5的数称作丑数（Ugly Number）。例如6、8都是丑数，但14不是，因为它包含质因子7。 习惯上我们把1当做是第一个丑数。求按从小到大的顺序的第 n个丑数。

数据范围：0≤�≤20000≤*n*≤2000

要求：空间复杂度 �(�)*O*(*n*) ， 时间复杂度 �(�)*O*(*n*)

## 示例1

输入：

```
7
```

复制

返回值：

```
8
```

## 题解

~~~java

import java.util.HashMap;
import java.util.Map;
import java.util.PriorityQueue;

public class Solution {
    public int GetUglyNumber_Solution(int index) {
        if(index<=0) return 0;
        int[] nums={2,3,5};
        //记录堆中出现过的元素
        Map<Long,Boolean> map = new HashMap<>();
        //小顶堆
        PriorityQueue<Long> pq = new PriorityQueue<>();
        //结果
        long res=1;
        pq.offer(1L);
        map.put(1L,true);
        for(int i=1;i<=index;i++){
            res=pq.poll();
            for (int num : nums) {
                long temp=num*res;
                if(!map.containsKey(temp)){
                    map.put(temp,true);
                    pq.offer(temp);
                }
            }
        }
        return (int)res;
    }
}
~~~

