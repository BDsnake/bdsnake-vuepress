---
title: SpringSecurity注册登录开发模板
createTime: 2024/10/28 16:11:26
permalink: /article/ho4qhf2q/
---


前言：此代码模板仅使用了简单的权限管理(就用了一张表)，并不正规，只是简单而已

## 建库

~~~sql

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user`  (
  `user_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `password` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `user_role` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '0',
  `user_locked` tinyint(1) NULL DEFAULT 0,
  `create_time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Compact;

SET FOREIGN_KEY_CHECKS = 1;

~~~

剩下的代码贴github了，发现好多代码要贴太麻烦

https://github.com/BDsnake/snakeCode/tree/master/SpringSecurity%E6%B3%A8%E5%86%8C%E7%99%BB%E5%BD%95%E4%BB%A3%E7%A0%81%E6%A8%A1%E6%9D%BF

2022.10.7 更新 更新了跨域问题的解决

## 加入邮箱注册

20234.19更新 加入了通过邮箱验证的注册

**service主要代码逻辑**

**发送验证码**

~~~java
public void sendEmailCode(String to) {

        // 获取发送邮箱验证码的HTML模板
        TemplateEngine engine = TemplateUtil.createEngine(new TemplateConfig("template", TemplateConfig.ResourceMode.CLASSPATH));
        Template template = engine.getTemplate("email-code.ftl");
        String code = String.valueOf((int) (Math.random() * 100000));
        redisUtils.set(to,code,120L);
        // 发送验证码
        send(new EmailDto(Collections.singletonList(to),
                "邮箱验证码", template.render(Dict.create().set("code", code))));

    }

public void sendEmailCode(String to) {

        // 获取发送邮箱验证码的HTML模板
        TemplateEngine engine = TemplateUtil.createEngine(new TemplateConfig("template", TemplateConfig.ResourceMode.CLASSPATH));
        Template template = engine.getTemplate("email-code.ftl");
        String code = String.valueOf((int) (Math.random() * 100000));
        redisUtils.set(to,code,120L);
        // 发送验证码
        send(new EmailDto(Collections.singletonList(to),
                "邮箱验证码", template.render(Dict.create().set("code", code))));

    }
~~~



~~~java


public int register(String username, String password, String email, String code) {
        String value = redisUtils.get(email).toString();
        String a = null;
        if(value==null){
            log.info("邮箱  "+email+"  的验证码不存在");
            return -1;
        }
        if(!code.equals(value)){
            log.info("邮箱  "+email+"  验证码错误");
            return -2;
        }
        SysUser sysUser = new SysUser();
        sysUser.setUsername(username);
        sysUser.setPassword(passwordEncoder.encode(sysUser.getPassword()));
        sysUser.setEmail(email);
        sysUser.setUserLocked(0);
        sysUser.setUserRole("ROLE_USER");
        try {
            save(sysUser);
        } catch (Exception e){
            log.error(e.getMessage());
            return -3;
        }
        return 1;
    }
~~~

