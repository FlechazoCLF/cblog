---
title: 超简单windows中多开微信
date: 2025-08-13
author: flechazo
location: 上海
state: 已发布
priority: 64
authority: everyone
category: 保姆级教程
tags: 
cover: 
description: 简单几步实现Windows系统中微信多开
icon: 
---

# Windows中多开微信的简单方法

在Windows系统中，默认情况下微信只能同时运行一个实例。但有时我们需要同时登录多个微信账号，这时就需要使用多开技术。

## 方法一：使用批处理脚本

创建一个.bat文件，内容如下：

```batch
start "" "C:\Program Files\Tencent\Weixin\Weixin.exe"
start "" "C:\Program Files\Tencent\Weixin\Weixin.exe"
```

双击运行此批处理文件，即可启动两个微信实例。

## 方法二：使用命令行

1. 按下`Win + R`打开运行对话框
2. 输入以下命令并回车：
   ```
   start "" "C:\Program Files\Tencent\Weixin\Weixin.exe"
   ```
3. 再次打开运行对话框，重复上述命令

## 注意事项

- 路径可能因安装位置不同而异，请根据实际情况调整
- 部分版本的微信可能会限制多开功能
- 如需更多实例，可以在脚本中添加更多的start命令行
