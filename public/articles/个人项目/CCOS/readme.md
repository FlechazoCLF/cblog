---
title: 人生管理系统-事业-CCOS
date: 2025-06-11
author: flechazo
location: 上海
state: 已发布
priority: 8
authority: everyone
category: 个人项目
tags: 
calendar: 
cover: 
description: 个人开发的轻量级操作系统，用于嵌入式设备
icon: 
---



# 缘起

做一个自己的操作系统

- [ ] 分布式
- [ ] 跨设备函数调用
- [ ] 集群管理

# 计划

## 整体规划

1、首先是一款操作系统

2、要包含线程的切换调用

3、包括服务的概念化

4、包括服务的发现和使用以及存活检测和服务间通信和调用

## 代码路径

```
D:\Flechazo\Gitea\Flechazo\01work\rh850_doc\CCOS
```

## 代码仓库

```
http://localhost:3000/Flechazo/project-CCOS.git
```

# 任务列表

## type基本类型定义

- [x] 基本数据类型定义

## trace追踪机制

- [x] 实现简单的CHECK机制
- [ ] 实现代码报错的trace显示代码文件以及行数

## list链表接口

- [x] 初始化
- [x] 前插
- [x] 后插
- [x] 移除
- [x] 搜索

## mem内存接口

- [x] memcpy
- [x] memset
- [x] memcmp
- [x] strlen
- [x] strnlen
- [x] strcpy
- [x] strncpy
- [x] strcmp
- [x] strncmp
- [x] strstr
- [x] strchr
- [x] strtok

## flash多设备分布式存储框架

- [ ] ccflash -> device -> folder -> file

## heap堆栈分配

- [x] 初始化
- [x] 分配空间
- [x] 释放空间
- [ ] 空间扩容
- [ ] 重写一下heap

## timer定时器服务

- [x] 初始化
- [x] 创建
- [x] 删除
- [x] 启动
- [x] 停止
- [x] 超时

## algorithm算法

- [x] 检查大小端算法
- [x] crc校验
- [x] 数学类
  - [x] 大数相加
  - [x] 大数相减
  - [x] 交换两个数
  - [x] 交换数组中心对称
  - [x] 三角函数实现
    - [x] sin
    - [x] cos
    - [x] tan
- [ ] 算法类
  - [x] 滤波算法
  - [ ] 姿态解算
  - [ ] 运动学正逆解
  - [ ] 矩阵路径算法
  - [ ] 斐波那契数列
  - [ ] 矩形覆盖
  - [ ] 跳台阶
  - [ ] 礼物的最大价值（作为路径规划的算法）
  - [ ] 不用加减乘除做加法

## clock时钟

- [x] 时基来源

## com通信服务

- [x] mq
- [x] event
- [x] mailbox
- [ ] 共享内存
- [ ] 管道
- [ ] socket

## lock锁服务

- [x] 自旋锁
- [ ] 互斥量
- [ ] 信号量

## log日志服务

- [x] 封装log机制各自模块调用自身的log宏
- [ ] 可以在flash里存储

## port操作系统接口

- [ ] 上下文切换

## scheduler调度器

- [x] 启动调度
- [ ] 切换线程

## service服务化接口

## task任务

- [ ] 从定时器延伸过来
- [ ] 各个模块的mainfunction

## thread线程



## bsp

GPIO

按键

LED

蜂鸣器

LCD

串口

PWM

电机驱动

ADC

激光雷达

超声波

摄像头

加速度传感器

GPS

温湿度

机械臂



someip

dds

软件看门狗

# 任务列表

<details open>
    <summary>任务一<progress value="50" max="100"></progress></summary>
具体详情
</details>

<details open>
    <summary>任务二<progress value="50" max="100"></progress></summary>
具体详情
</details>
