---
title: 我的简历
date: 2025-12-01
author: flechazo
location: 上海
state: 已发布
priority: 8
authority: flechazo
category: 简历
tags: 
description: 日常更新维护简历
icon: 📄
cover: 
---

# 柴林峰

---

## 基本资料

男 25岁 本科 工作4年<img src="images/flechazo.jpg" alt="flechazo" style="float: right; width: 13%;" />

☎️电话：18339963582

📫邮箱：837207595@qq.com

🎃岗位：嵌入式软件开发

🎡方向：架构设计、以太网、时间同步(gPTP)、服务发现(SOME/IP)、操作系统、协议栈

🏜️网站：flechazo.mba

---

## 专业技能

🆒编程语言：C、C++、Python、JavaScript、React

🖥️操作系统：Linux、Ubuntu、AUTOSAR OS、FreeRTOS、RT-Thread、CCOS

🌐以太网：SomeIp、vsomeIp、EthTSyn、gPTP、Switch、Socket、TCPIP、Qos、lwip、SomeIpTp、SomeIpXf、SoAd、LdCom、EthIf、DoIp、VLAN

🏜️微控制器：RH850、STM32、CortexM3、GD32、ESP32、S32K344、TC397、RTL9071CP、RK3566

⚒️开发工具：Git、ssh、vscode、multi、CANoe、Davinci、EB、VMware、Wireshark、QT、markdown、xmind、TSMaster、frp

📚行业规范：AUTOSAR规范、POSIX、IEEE802.1AS、TC8、ISO14229、ISO26262

🪪证书：软考高级系统架构设计师(在考)、软考中级嵌入式系统设计师、国家二级计算机C语言

+++

## 工作经验

### 🌅202411~至今：RT-Thread

主要职责：负责以太网相关模块开发

#### 项目经验：比亚迪、先锋、芯旺微

#### socket管理

**EthIf**：底层驱动抽象、EthSM状态变化通知、实现以太网收发接口

**SoAd**：socket连接的建立、恢复和断开，IF/TP发送接口，组发，socket路由组控制，消息/状态的回调机制，使用TCP/UDP上位机与开发板通信来测试，熟悉lwip、TcpIp、EthIf

#### 时间同步

**CanTSyn**：实现Master与Slave之间的交互，编写CANoe的CAPL脚本进行自测，熟悉StbM与CanIf模块

**EthTSyn**：处理SYNC、FUP、PDelayReq、PDelayResp、PDelayRespFup消息，计算主节点时钟，在linux中运行gptp测试，熟悉EthIf、Eth、StbM

#### 服务发现

**Sd**：实现服务发现、事件发布/订阅，使用vsomeip进行测试，开发python调用C++扩展实现自动化测试

**SomeIp**：实现SomeIp Tp来收发大数据以及SomeIp Xf实现序列化与反序列化，实现订阅板子event提醒ps信息给上位机实时显示

**LdCom**：为RTE提供大数据收发接口，通过SomeIp Tp来处理分段数据包

#### 网络管理

**UdpNm**：实现三种操作模式:网络模式、准备总线睡眠模式、总线睡眠模式，以及在网络模式中的三种状态:重复消息状态、正常运行状态、就绪睡眠状态的状态机切换。根据CBV位解析网关报文，实现休眠唤醒功能

#### POSIX服务发现移植

基于现有的AUTOSAR版本SomeIp协议，移植到POSIX中

#### RTThread内核测试

基于KF32A158进行操作系统功能的测试，thread、timer、mailbox、memheap、messagequeue、sharedmem、event、mutex、semaphore等功能的测试

#### 比亚迪出差现场支持

现场测试并讲解模块：SomeIp相关、EthTSyn、CanTSyn、SoAd、PduR、DoIp

#### S32K344以太网移植

基于S32K344开发TJA1101B的以太网驱动，实现EB配置以及MDIO接口配置TJA1101B，使PHY工作在100M全双工 RMII模式下，适配lwip，适配EthIf、EthSM、EthTSyn、SoAd、DoIp、TcpIp、SomeIp、SomeIpXf、SomeIpTp、Sd、LdCom、CanTSyn、StbM、UdpNm模块

+++

### 🌅202308~202411：蓝聪科技

#### 项目经验：

#### Ecarx E245智能座舱（已量产）

熟悉Vector的静态包、熟悉RH850以及rh850g4mh核心

精通OS调度、Eth、EthSwt、EthIf、

精通瑞昱Switch RTL9071CP相关的知识port、 MII/RMII/RGMII/SGMII、vlan、mirror、filter、ptp、qos、IGMP、FlowControl、L2table、storm、IP Routing、bandwidth

#### 伯特利 Bootloader

根据企标完成基于UDS的Bootloader

熟悉Bootloader流程，BM、FBL、SBL、Flash Driver、APP之间的逻辑处理

熟悉RH850的Address Mapping，CodeFlash的AB面、以及编译的链接文件，OPBT等

熟悉UDS协议，对协议中的服务进行实现

+++

### 🌅202208~202308：感控科技

#### 项目经验：

#### GD32中控网关

作为平台与消毒设备之间的媒介

##### OTA

与平台约定协议实现Bootloader，支持断点续传、分包、超时、备份、校验机制

##### flash

精通GD25Q64等Flash的读写，以及内存的抽象

##### QT

熟练掌握QT，做了一个工具支持串口、socket通信、frp内网穿透、指令解析与生成、集成常用校验的计算、支持数据库存取、支持对控制器进行配置、支持读取bin文件对控制器进行升级

##### FreeRTOS

精通FreeRTOS里的task、队列、信号量、互斥锁等机制

+++

## 个人兴趣

热爱分享

热爱代码

热爱创造

+++

## 教育经历

201809~202207 哈尔滨剑桥学院 电气工程及其自动化

