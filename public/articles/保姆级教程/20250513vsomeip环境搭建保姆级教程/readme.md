---
title: vsomeip环境搭建保姆级教程
date: 2025-05-13
author: flechazo
location: 上海
state: 已发布
priority: 64
authority: everyone
category: 保姆级教程
tags: 
cover: 
description: 详细图文教程，手把手教你搭建vsomeip开发环境
icon: 
---

# vsomeip环境搭建保姆级教程

# ubuntu环境搭建

{% links %}

- site: VMware搭建ubuntu保姆级教程

  url: https://zhuanlan.zhihu.com/p/1903219373906327339

  desc: flechazo

  image: https://q1.qlogo.cn/g?b=qq&nk=2861099&s=5

  color: "#9d5b8b"

{% endlinks %}

# vsomeip环境搭建

**官网**：https://github.com/COVESA/vsomeip

![image-20250513222520460](./images//image-20250513222520460.png)

## 代码仓库

### Github

https://github.com/COVESA/vsomeip

https://github.com/COVESA/vsomeip_py

### 压缩包

这里我提供压缩包供大家下载

> 通过网盘分享的文件：vsomeip
> 链接: https://pan.baidu.com/s/1m3P--jxc7DNWGixNbwS96Q?pwd=CDD0 
> 提取码: CDD0

# vsomeip之Cpp环境

## 下载vsomeip

- 这里直接通过ssh将代码copy到ubuntu
- （共享文件夹会出现不支持创建link的情况）
- 当然你的网络如果可以的话就直接拉github吧

![image-20250422161925765](./images//image-20250422161925765.png)

## 安装依赖

先运行一个终端吧

![image-20250422162223067](./images//image-20250422162223067.png)

右键可以copy path

![image-20250422162325725](./images//image-20250422162325725.png)

我们先进入vsomeip-master，输入

```bash
cd /mnt/hgfs/vsomeip/vsomeip-master/vsomeip-master
```

可以看到路径变啦

![image-20250422162426603](./images//image-20250422162426603.png)

### 安装cmake

```bash
sudo apt install cmake
```

然后根据提示输入Y

![image-20250422162559340](./images//image-20250422162559340.png)

成功啦，我们继续

![image-20250422162734604](./images//image-20250422162734604.png)

### 安装g++

```bash
sudo apt install g++
```

![image-20250422163301855](./images//image-20250422163301855.png)

### 安装Boost

```bash
sudo apt install libboost-all-dev
```

![image-20250422163646202](./images//image-20250422163646202.png)

### 安装git

```bash
sudo apt install git
```

### 安装curl

```bash
sudo apt install curl
```

### 安装build-essential

```bash
sudo apt install build-essential
```

### 安装doxygen

```bash
sudo apt install doxygen
```

### 安装libsystemd-dev

```bash
sudo apt install libsystemd-dev
```

### 安装graphviz

```bash
sudo apt install graphviz
```

### 安装automotive-dlt

下载压缩包

> 通过网盘分享的文件：vsomeip
> 链接: https://pan.baidu.com/s/1m3P--jxc7DNWGixNbwS96Q?pwd=CDD0 
> 提取码: CDD0

从git仓库clone

```bash
git clone https://github.com/GENIVI/dlt-daemon.git
```

之后开始在命令行里编译然后安装

```bash
mkdir build && cd build
cmake ..
make
sudo make install
```

### 安装benchmark

下载压缩包

> 通过网盘分享的文件：vsomeip
> 链接: https://pan.baidu.com/s/1m3P--jxc7DNWGixNbwS96Q?pwd=CDD0 
> 提取码: CDD0

从git仓库clone

```bash
git clone https://github.com/google/benchmark.git
```

之后开始在命令行里编译然后安装

```bash
mkdir build && cd build
cmake .. -DBENCHMARK_ENABLE_GTEST_TESTS=OFF
make
sudo make install
```

### 安装googletest

下载压缩包

> 通过网盘分享的文件：vsomeip
> 链接: https://pan.baidu.com/s/1m3P--jxc7DNWGixNbwS96Q?pwd=CDD0 
> 提取码: CDD0

从git仓库clone

```bash
git clone https://github.com/google/googletest.git
```

之后开始在命令行里编译然后安装

```bash
mkdir build && cd build
cmake ..
make
sudo make install
```

导出路径，然后输出一下路径

```bash
export GTEST_ROOT=/home/carlchai/Desktop/flechazo/googletest-main
echo $GTEST_ROOT
```

然后终于结束啦，可以继续回到vsomeip啦

## 编译vsomeip

在vsomeip目录下创建一个文件夹并进入

```bash
mkdir build
cd build
```

### 执行cmake

```bash
cmake ..
```

![image-20250422162824116](./images//image-20250422162824116.png)

cmake完成

![image-20250422180048635](./images//image-20250422180048635.png)

### 接着make

```bash
make
```

等待编译吧

![image-20250422180353211](./images//image-20250422180353211.png)

终于完成啦

![image-20250422180819711](./images//image-20250422180819711.png)

### 然后进去example下吧

```bash
cd example
/* 如果仅仅修改了example的话只需要在这里make就好 */
make
```

![image-20250422180923689](./images//image-20250422180923689.png)

### 跑一下试试吧

额失败啦报错：

```bash
1 Configuration module could not be loaded!
```

经过排查这里是因为没有环境变量导致，也就是说我们需要把这个libvsomeip3-cfg.so的路径加一下

![image-20250423101528908](./images//image-20250423101528908.png)

这里填上路径之后就在example路径下make一下

![image-20250423111923180](./images//image-20250423111923180.png)

### 让我们再run一下吧

![image-20250423112010165](./images//image-20250423112010165.png)

可以看到已经正常跑起来了

![image-20250423112035287](./images//image-20250423112035287.png)

接下来我们来搭建一下python的环境吧

# Python环境

## 下载代码

拿到代码之后打开一个vscode并打开一个终端吧

![image-20250423112417537](./images//image-20250423112417537.png)

## 生成扩展

输入

```bash
sudo ./package.sh
```

额找不到？这样吧这里看到这个package.sh的第一行有一个bash那我们试试这个吧

```bash
sudo bash ./package.sh
```

![image-20250423112723065](./images//image-20250423112723065.png)

好吧根据提示，我们缺少python环境

## 安装python

```bash
python3 --version
```

看看是否有python

![image-20250423113131079](./images//image-20250423113131079.png)

如果没有的话就

```bash
sudo apt install python3
```

安装pip这里输入

```bash
sudo apt install python3-pip
```

![image-20250423113334005](./images//image-20250423113334005.png)

## 再次运行

```bash
sudo bash ./package.sh
```

![image-20250423113426806](./images//image-20250423113426806.png)

可以看到有很多报错，这里是说没找到vsomeip的路径，我们来加一下

## 配置python扩展

![image-20250423113537244](./images//image-20250423113537244.png)

在这里将路径换成自己刚才编译的vsomeip路径

我这里就直接用vsomeip的c++的路径了，因为后期调试添加的信息可以同步，之后再次执行

```bash
sudo bash ./package.sh
```

![image-20250423114006119](./images//image-20250423114006119.png)

## 可以看到这里就成功啦🚃

让我们运行python吧

首先安装一下python扩展

![image-20250423114506235](./images//image-20250423114506235.png)

随便找一个client吧，点击右上角的Run / Debug，我这里直接Debug了

![image-20250423114649964](./images//image-20250423114649964.png)

可以看到已经启动了

好可以先关掉了，因为这个时候我们的网络环境还未配置，所以通过wireshark还不能抓到报文

# 网络配置

## 记得要桥接一下网络哦

{% links %}

- site: VMware搭建ubuntu保姆级教程

  url: https://blog.csdn.net/qianshang52013/article/details/147749786?spm=1001.2014.3001.5501

  desc: flechazo

  image: https://q1.qlogo.cn/g?b=qq&nk=2861099&s=5

  color: "#9d5b8b"

{% endlinks %}

在ubuntu里配置网络

![image-20250423115126461](./images//image-20250423115126461.png)

我这里设置为Manual并设置Address为192.168.20.1，接着点击Apply

![image-20250423115255906](./images//image-20250423115255906.png)

输入ip a，可以看到ens37的ip被我们设置成功为192.168.20.1

![image-20250423115407493](./images//image-20250423115407493.png)

## 接着配置route

查看route表输入

```bash
ip route show
```

![image-20250423115544810](./images//image-20250423115544810.png)

因为我们要发送的目标是224.224.224.245，这是一个多播地址

我这里直接设置单播转发路由了输入

```bash
sudo ip route add 224.224.224.245 dev ens37
```

这个是存在老化时间的，时间长了没有通信就会被清除

![image-20250423115837157](./images//image-20250423115837157.png)

再次ip route show就可以看到刚才配置的route了

## 环境

| 环境 | ubuntu       | windows  | 开发板       |
| ---- | ------------ | -------- | ------------ |
| 网络 | 桥接ens37    | 以太网 8 | eth1         |
| IP   | 192.168.20.1 |          | 192.168.20.2 |
| 抓包 |              | 抓包     |              |

接着在网线另一端，我们在windows这里抓包

过滤

```bash
ip.src == 192.168.20.2 || ip.src == 192.168.20.1
```

![image-20250423130748494](./images//image-20250423130748494.png)

可以看到这里有SOME/IP-SD的报文了

# Python调用C++扩展

接下来由于vsomeip_py好久未更新了，有一个接口未实现，我们自行实现一下

这里我拆分到另一个文章中去介绍

【之后会把文章链接更新到这里】















