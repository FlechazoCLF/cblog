---
title: 人生管理系统-事业-CCTools
date: 2025-02-09
author: flechazo
location: 上海
state: 已发布
priority: 8
authority: everyone
category: 个人项目
tags: 
calendar: 
cover: 
description: 个人开发的实用电脑工具
icon: 
---



# 缘起

做一个工具记录自己的计划、以及想法，旨在计划不烂尾。

# 计划

## 整体规划

1、要能包括我的一生的规划【把计划实施下去】

2、通过markdown文件进行管理【方便同步到网页】

3、一生的知识积累【知识的沉淀】

4、项目的生命周期管理【新的项目能将之前的积累快速复用】

5、工具集【方便开发或者其他事情的工具集】

## 代码路径

```
D:\Flechazo\Gitea\Flechazo\00flechazo\project\project-QT\CCTools
```

## 代码仓库

```
http://localhost:3000/Flechazo/project-QT.git
```

## 数据仓库

```

```

## 任务列表

### 使用类继承的方式来重写页面布局

### 实现整体界面架构布局

- [x] 完成子模块CCAI
  - [x] 支持通过HTTP接口与ollama交互
  - [ ] 支持新建对话
  - [ ] 子模块文章发布

### 完成子模块plan

- [x] 读取计划目录结构
- [x] 读取计划详情
- [x] 支持新建计划
- [x] 支持编辑计划
- [x] 支持删除计划
- [x] 添加渲染样式
- [ ] 支持通过markmap渲染markdown成思维导图
- [ ] 支持时间线渲染

### 完成子模块project

- [x] 创建项目结构
- [x] 创建代码结构
  - [x] 可选源码类型
  - [x] 是否覆盖
  - [ ] 是否添加基本代码框架
    - [ ] 可勾选生成接口
      - [ ] 结构体
      - [ ] 初始化函数
      - [ ] mainfunction函数
      - [ ] 初始化标志位
  - [ ] 是否添加说明文档
- [ ] codeformat代码格式化
  - [ ] LLVM clang
  - [ ] 对现有代码进行插入注释
  - [ ] 归纳代码中的内容结构
- [ ] 实现项目周期管理
  - [ ] 项目文档整理
    - [ ] 导入项目文档列表视图显示（参照plan的处理）
    - [ ] 新建
    - [ ] 删除
    - [ ] 打开
    - [ ] 读取
  - [ ] 项目导入
    - [ ] git
    - [ ] ci
    - [ ] 导入代码组件
    - [ ] 根据输入函数名称生成对应的函数实现
  - [ ] 项目管理
    - [ ] 接入git脚本（在这里抽象一个cmd命令行窗口）
  - [ ] 项目输出

### 完成子模块communication

- [x] 串口通信
- [x] 以太网通信
  - [ ] Ethernet
  - [x] tcpip
  - [x] socket
- [ ] usb通信
- [ ] http
- [x] frp
- [ ] zigbee
- [ ] websocket
- [ ] Bluetooth
- [ ] CAN通信
- [ ] SPI通信
- [ ] I2C通信

### 完成子模块codeexample

- [x] 读取代码列表
- [x] 渲染代码
- [x] 打开本地代码路径
- [x] 打开远程代码路径
- [ ] 导入代码
- [ ] 导出代码

### 完成子模块collect

- [ ] 增删改查
- [ ] 莫兰迪色系

### 完成子模块components

- [ ] 导入组件
- [ ] 导出组件
- [ ] 打开本地仓库
- [ ] 打开远程仓库
- [ ] 支持代码组件
- [ ] 支持硬件组件
- [ ] 支持模型组件

### 完成子模块draft

### 完成子模块file

- [ ] 读取文件
  - [ ] 批量重命名
- [ ] 格式转换
- [ ] 格式化文件
- [ ] 支持txt
- [ ] 支持md
- [ ] 支持excel
- [ ] 支持sql
- [x] 支持pdf
  - [x] pdf转png
- [ ] png
  - [ ] 图片压缩
  - [ ] 图片合成pdf
  - [ ] 抠图
  - [ ] 加水印
  - [ ] 九宫格切图
- [ ] 视频
  - [ ] 提取音频

### 完成子模块knowledge

- [ ] 文档整理

### 完成子模块moment

### 完成子模块navigate

- [ ] 自动部署各种网站
- [ ] PDF工具网站https://github.com/Stirling-Tools/Stirling-PDF#
- [ ] 个人博客https://www.halo.run/
- [ ] 代码仓库https://about.gitea.com/
- [ ] frphttps://github.com/fatedier/frp
- [ ] https://github.com/wg-easy/wg-easy
- [ ] https://github.com/hectorqin/reader
- [ ] https://github.com/jumpserver/jumpserver
- [ ] docker

### 完成子模块projectcollect

- [ ] 自己做过的项目

### 完成子模块script

- [ ] 支持bat脚本
- [x] 支持cmd脚本
- [ ] 支持python脚本
- [ ] 支持导出photoshop的js脚本

### 完成子模块toolcollect

- [ ] 收藏的工具
- [ ] OpenCV
- [ ] 密码管理工具
- [ ] 右键管理工具
