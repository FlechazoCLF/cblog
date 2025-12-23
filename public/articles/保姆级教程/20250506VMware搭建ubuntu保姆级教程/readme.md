---
title: VMware搭建ubuntu保姆级教程
date: 2025-05-06
author: flechazo
location: 上海
state: 已发布
priority: 64
authority: everyone
category: 保姆级教程
tags: flechazo
cover: 
icon: ❤️
description: 详细图文教程，手把手教你在VMware中安装Ubuntu系统
icon: 
---

# VMware搭建ubuntu保姆级教程

# 创建虚拟机

# 下载 Ubuntu ISO

【**可添加我获取**】

官网：https://ubuntu.com/download
清华镜像源：https://mirrors.tuna.tsinghua.edu.cn/ubuntu-releases/

网盘：【_____ToDo_____】后期会上传

# 新建虚拟机

![image-20250417133231140](images/image-20250417133231140.png)

下一步

![image-20250417133251813](./images/image-20250417133251813.png)

找到下载的iso文件然后下一步

![image-20250417133327059](./images/image-20250417133327059.png)

个性化配置一下

![image-20250417133507211](./images/image-20250417133507211.png)

找个地方存储虚拟机

![image-20250417133555276](./images/image-20250417133555276.png)

配置磁盘大小：这里太小的话之后会有坑，会出现进不去系统界面的问题

![image-20250417133632835](./images/image-20250417133632835.png)

完成

![image-20250417133928597](./images/image-20250417133928597.png)

让子弹飞一会🚀

![image-20250417134106275](./images/image-20250417134106275.png)

![image-20250417134244437](./images/image-20250417134244437.png)

来喽🚃

![image-20250417161342841](./images/image-20250417161342841.png)

点击用户，输入密码

![image-20250417161430212](./images/image-20250417161430212.png)

都跳过吧

# 网络配置（双网卡模式）

编辑->虚拟网络编辑器

- **网卡1** ：桥接模式（用于 SOME/IP 通信）。
- **网卡2** ：NAT 模式（用于联网更新系统）。

![image-20250417162533617](./images/image-20250417162533617.png)

![image-20250417162613856](./images/image-20250417162613856.png)

选择VMnet0桥接模式，已桥接至<选择到你的网卡用来发送vsomeip>

![image-20250417162800372](./images/image-20250417162800372.png)

然后点击确定

打开 虚拟机->设置

![image-20250417161658533](./images/image-20250417161658533.png)

添加一个网络适配器💮

![image-20250417164102756](./images/image-20250417164102756.png)

设置网络适配器为桥接

![image-20250417164138639](./images/image-20250417164138639.png)

设置中可以看到两个网卡配置好了

![image-20250417164419340](./images/image-20250417164419340.png)

# 共享文件夹设置

打开设置

![image-20250417161658533](./images/image-20250417161658533.png)

添加共享文件夹

![image-20250417162012746](./images/image-20250417162012746.png)



![image-20250417162130311](./images/image-20250417162130311.png)

![image-20250417162144726](./images/image-20250417162144726.png)

![image-20250417162200691](./images/image-20250417162200691.png)

现在可以看到共享文件夹了（可以愉快的传文件啦✨）

![image-20250417162315759](./images/image-20250417162315759.png)

有时候这里可能没有显示，那就需要手动挂载共享文件夹啦

```bash
sudo vmhgfs-fuse .host:/draft /mnt/hgfs -o allow_other

sudo vmhgfs-fuse .host:/<windows中文件夹的名称> /mnt/<挂载到ubuntu的路径> -o allow_other
```

接着就有啦

# SSH 远程访问配置

```bash
sudo apt update
```

安装 OpenSSH 服务端

```bash
sudo apt install openssh-server

Y
```

![image-20250422155358971](./images/image-20250422155358971.png)

然后输入Y

等待安装完成

再次输入

```bash
sudo systemctl status ssh
```

可以看到如下信息

![image-20250422155445893](./images/image-20250422155445893.png)

设置开机自启动

```bash
sudo systemctl enable ssh
```

查看一下ubuntu的ip地址

```bash
ip a
```

![image-20250422160019216](./images/image-20250422160019216.png)

在windows中打开vscode

安装ssh扩展插件

![image-20250422155812770](./images/image-20250422155812770.png)

安装完成后这里会有这个图标，点击进去

![image-20250422155908364](./images/image-20250422155908364.png)

添加一个ssh

输入ssh <用户名>@<ip> -p <port可选>

```bash
ssh carlchai@192.168.244.129
```

回车

![image-20250422160331791](./images/image-20250422160331791.png)

选择配置保存路径，直接回车就好

![image-20250422160432664](./images/image-20250422160432664.png)

接着就创建好了，在这里可以看到刚才创建的ssh，点击这个按钮在新窗口打开ssh

![image-20250422160537395](./images/image-20250422160537395.png)

这里选择linux

![image-20250422160620531](./images/image-20250422160620531.png)

选择continue

![image-20250422160657493](./images/image-20250422160657493.png)

输入密码

![image-20250422160719708](./images/image-20250422160719708.png)

这里就说明正在连接了

![image-20250422160740990](./images/image-20250422160740990.png)

看到终端也有输出啦

这里选择一个folder开始愉快的编码吧🍕

![image-20250422160823921](./images/image-20250422160823921.png)

都已经用vscode打开啦！想干嘛干嘛多好拜拜啦您嘞🍳

![image-20250422160855035](./images/image-20250422160855035.png)

你怎么还没走哈哈哈哈

🎃
