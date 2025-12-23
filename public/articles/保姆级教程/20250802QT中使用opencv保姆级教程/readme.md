---
title: OpenCV 保姆级安装教程 😊
date: 2025-08-02
author: flechazo
location: 上海
state: 已发布
priority: 64
authority: everyone
category: 保姆级教程
tags: 
cover: 
description: 详细图文教程，教你在QT中配置和使用OpenCV
icon: 
---

# OpenCV 保姆级安装教程 😊

本教程将指导您完成 OpenCV 的完整安装过程，包括源码下载、环境配置和编译安装。🎉

# 下载 OpenCV 源码 📥

访问 OpenCV 官方 GitHub 发布页面下载源码：
https://github.com/opencv/opencv/releases

下载完成后解压源码包：

![image-20250609141007025](./images/image-20250609141007025.png)

# 安装 CMake 🔧

## 下载 CMake：

访问 CMake 官方发布页面：https://github.com/Kitware/CMake/releases

![image-20250609141336198](./images/image-20250609141336198.png)

## 解压 CMake：

![image-20250609141741417](./images/image-20250609141741417.png)

## 配置环境变量： ⚙️

将 CMake 的 bin 目录添加到系统环境变量中：

![image-20250609142233892](./images/image-20250609142233892.png)

# 配置 OpenCV 编译环境 🛠️

## 打开 CMake GUI：

![image-20250609144019124](./images/image-20250609144019124.png)

## 设置源码路径和构建路径：

![image-20250609144336416](./images/image-20250609144336416.png)

## 配置 Qt 路径（如果使用 Qt）： 💼

![image-20250609145357079](./images/image-20250609145357079.png)

Qt 目录位置：

![image-20250609145253674](./images/image-20250609145253674.png)

## 配置编译选项： ⚙️

![image-20250609145444029](./images/image-20250609145444029.png)

> 注意：请确保使用与您的系统兼容的 CMake 版本。本教程使用 CMake 3.27.6。💡

![image-20250609153443440](./images/image-20250609153443440.png)

## 添加必要的环境变量： 🌍

![image-20250609153533471](./images/image-20250609153533471.png)

![image-20250609153753223](./images/image-20250609153753223.png)

## 清理并重新配置： 🧹

如果遇到问题，可以清理构建目录后重新开始：

![image-20250609154102926](./images/image-20250609154102926.png)

![image-20250609154312415](./images/image-20250609154312415.png)

## 配置编译选项： ⚙️

![image-20250609154739259](./images/image-20250609154739259.png)

![image-20250609154810204](./images/image-20250609154810204.png)

## 检查配置结果： ✅

![image-20250609155556305](./images/image-20250609155556305.png)

![image-20250609160013125](./images/image-20250609160013125.png)

## 生成构建文件： 📄

![image-20250609160121488](./images/image-20250609160121488.png)

# 编译和安装 🚀

## 打开命令提示符，进入构建目录： 💻

```bash
cd C:\Users\RTT\Desktop\flechazo\02_project\00_flechazo\opencv\opencv
```

![image-20250609160309052](./images/image-20250609160309052.png)

## 开始编译： ⏱️

```bash
mingw32-make -j16
```

![image-20250609160500758](./images/image-20250609160500758.png)

编译成功： ✅

![image-20250609161940641](./images/image-20250609161940641.png)

## 安装 OpenCV： 💾

以管理员权限运行命令提示符：

```bash
powershell -command "Start-Process cmd -Verb RunAs"
```

执行安装命令：
```bash
mingw32-make install
```

![image-20250609162031702](./images/image-20250609162031702.png)

![image-20250609163308054](./images/image-20250609163308054.png)

# 在 Qt 项目中配置 OpenCV 💼

在 Qt 项目的 .pro 文件中添加以下配置：

```cpp
# 添加 OpenCV 头文件路径
INCLUDEPATH += C:/Users/RTT/Desktop/flechazo/02_project/00_flechazo/opencv/opencv/install/include

# 添加 OpenCV 库文件路径
LIBS += -LC:/Users/RTT/Desktop/flechazo/02_project/00_flechazo/opencv/opencv/install/x64/mingw/lib \
    -lopencv_calib3d4110 \
    -lopencv_core4110 \
    -lopencv_dnn4110 \
    -lopencv_features2d4110 \
    -lopencv_flann4110 \
    -lopencv_highgui4110 \
    -lopencv_imgcodecs4110 \
    -lopencv_imgproc4110 \
    -lopencv_ml4110 \
    -lopencv_objdetect4110 \
    -lopencv_photo4110 \
    -lopencv_stitching4110 \
    -lopencv_video4110 \
    -lopencv_videoio4110
```

配置完成后的 Qt 项目：

![image-20250609193208901](./images/image-20250609193208901.png)

# 注意事项 ⚠️

1. 确保使用兼容的 CMake 版本 📌
2. 编译前确保所有环境变量正确配置 ⚙️
3. 如果遇到问题，可以尝试清理构建目录后重新开始 🔄
4. 安装时需要管理员权限 🔐
5. 配置 Qt 项目时注意路径要根据实际安装位置调整 📍