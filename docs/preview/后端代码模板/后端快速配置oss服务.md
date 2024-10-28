---
title: 后端与文件相关代码模板
categories: Java后端
tags:
  - Java后端
  - 开发模板
description: 摘要
cover: 'https://fc1tn.baidu.com/it/u=557448160,408142972&fm=202&mola=new&crop=v1'
abbrlink: f159903d
date: 2022-09-26 16:43:16
top_img:
---

# OSS

用一个Service类简单实现上传文件与删除文件的操作

步骤

**步骤1：创建存储桶**

在阿里云OSS创建存储桶

![image-20220728172049658](https://bd-hexo.oss-cn-beijing.aliyuncs.com/img/image-20220728172049658.png)

**步骤2：创建RAM授权策略**

![image-20220728172429705](https://bd-hexo.oss-cn-beijing.aliyuncs.com/img/image-20220728172429705.png)

![image-20220728172450828](https://bd-hexo.oss-cn-beijing.aliyuncs.com/img/image-20220728172450828.png)

记录AccessKeyId与accessKeySecret，后面会用

**步骤3：在项目中添加依赖**

~~~xml
            <!-- 阿里云oss存储api -->
            <dependency>
                <groupId>com.aliyun.oss</groupId>
                <artifactId>aliyun-sdk-oss</artifactId>
                <version>${oss.version}</version>
            </dependency>
~~~



**步骤4：编写接口与实现类**

写两个方法

~~~java
public interface OssService {
    String upload(MultipartFile file, String path);
    boolean delete(String relativePath);
}
~~~

~~~java
@Service
public class OssServiceImpl implements OssService {
    // yourEndpoint填写Bucket所在地域对应的Endpoint。以华东1（杭州）为例，Endpoint填写为https://oss-cn-hangzhou.aliyuncs.com。
    String endpoint = "xxx";
    // 阿里云账号AccessKey
    String accessKeyId = "xxx";
    String accessKeySecret = "xxx";
    String bucketName="xxx";
    @Override
    public String upload(MultipartFile file, String path) {
//        ossClint构建
        OSS oss = new OSSClientBuilder().build(endpoint, accessKeyId, accessKeySecret);
        try {
//            文件转化为字节流上传
            PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName,path,new ByteArrayInputStream(file.getBytes()));
            oss.putObject(putObjectRequest);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }finally {
            oss.shutdown();
        }
        return "your link"+path;
    }
    public boolean delete(String relativePath){
        OSS oss = new OSSClientBuilder().build(endpoint, accessKeyId, accessKeySecret);
        try {
            oss.deleteObject(bucketName,relativePath);
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }finally {
            oss.shutdown();
        }
        return true;
    }
}
~~~

# MultipartFile转File

**依赖**

~~~xml
<!--        MuFile转File-->
        <dependency>
            <groupId>commons-io</groupId>
            <artifactId>commons-io</artifactId>
            <version>2.7</version>
        </dependency>
~~~

**静态方法**

~~~java
public static File multipartFileToFile(MultipartFile multipartFile){
        File file = new File(String.valueOf(Math.random()+multipartFile.getOriginalFilename()));
        try {
            FileUtils.copyInputStreamToFile(multipartFile.getInputStream(),file);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return file;
    }
~~~

其中File file 创建了一个临时的文件，记得掉完这个方法把文件删了！

`file.delete();`
