---
title: 版本管理神器Git保姆级教程 🚀
date: 2025-06-19
author: flechazo
location: 上海
state: 已发布
priority: 8
authority: everyone
category: 保姆级教程
tags: 
cover: 
description: 详细图文教程，从零开始学习Git版本控制系统
icon: 
---

# 版本管理神器Git保姆级教程 🚀

# 工作流概览 📊

## 单人版本 (git add, git commit, git push, git pull, git fetch, git checkout) 👤

```mermaid
graph TD
    subgraph 工作区
        A[工作区 📁]
        B[暂存区 📥]
    end
    subgraph 本地仓库
        C[本地仓库 💾]
    end
    subgraph 远程仓库
        D[GitHub仓库 ☁️]
    end
    A[工作区 📁] -->|git add| B[暂存区 📥]
    B -->|git commit| C[本地仓库 💾]
    C -->|git push| D[远程仓库 ☁️]
    D -->|git pull| A
    D -->|git fetch| C
    C -->|git checkout| A
```

## 多人协作 (git push, git pull, git merge) 👥

```mermaid
graph TD
    subgraph 开发者A
        subgraph 本地仓库A
            C1[本地仓库A 💾]
        end
        A1[工作区A 📁] -->|git add| B1[暂存区A 📥]
        B1 -->|git commit| C1[本地仓库A 💾]
    end
    
    subgraph 开发者B
        subgraph 本地仓库B
            C2[本地仓库B 💾]
        end
        A2[工作区B 📁] -->|git add| B2[暂存区B 📥]
        B2 -->|git commit| C2[本地仓库B 💾]
    end
    
    subgraph 远程仓库
        D[GitHub仓库 ☁️]
    end
    
    C1 -->|git push| D
    C2 -->|git push| D
    D -->|git pull| A1
    D -->|git pull| A2
    
    C1 -->|git merge| C2
    C2 -->|git merge| C1
```

# 缘起 🌟

嘿，小伙伴们！相信大家或多或少都接触过git吧？它可是我们程序员的好帮手，不仅能帮我们管理代码，还能追踪产品的每次迭代。💪

说实话，自从用了git，我发现它不仅仅适用于代码管理，我现在连写文档、做设计稿都用git来管理了，简直不要太香！✨

> [!WARNING]
> 
> 友情提示：这篇教程可能会有点硬核 ⚠️
> 
> 但是别怕，跟着我一步步来，保证你能学会！🎯

还记得以前我是怎么管理文件的吗？就是导出、打压缩包、拷贝文件...现在想想都觉得有点土气呢 😅

![image-20250617112950440](./images/image-20250617112950440.png)

一点都不优雅，对吧？

看看用git是什么效果：

![image-20250617113140738](./images/image-20250617113140738.png)

是不是很惊艳？每一次提交，每一次改动，都能清晰地追踪和管理。再也不用担心文件丢失或者版本混乱了！

好了，废话不多说，让我们开始吧！

# 准备工作 🛠️

## 1. 创建GitHub账号 👤

首先，我们需要一个代码仓库。我的是：https://github.com/FlechazoCLF

![image-20250617113742362](./images/image-20250617113742362.png)

> 小贴士：作为程序员的第一课，科学上网是必备技能哦！

注册步骤：
1. 注册Gmail邮箱（https://gmail.com）
2. 用Gmail注册GitHub账号
3. 创建新仓库

![image-20250617113859215](./images/image-20250617113859215.png)

给仓库起个名字，点击创建就OK啦！

![image-20250617114003120](./images/image-20250617114003120.png)

## 2. 安装Git 💻

访问Git官网：https://git-scm.com/

下载地址：https://git-scm.com/downloads

安装步骤这里就不赘述了

![image-20250617114316356](./images/image-20250617114300906.png)

## 3. 安装TortoiseGit（推荐） 🐢

这是一个超好用的Git图形化工具，强烈推荐安装！

下载地址：https://tortoisegit.org/

![image-20250617114456994](./images/image-20250617114456994.png)

## 4. 配置SSH密钥 (ssh-keygen, cat ~/.ssh/id_ed25519.pub) 🔑

### 生成SSH密钥

1. 打开终端（Windows用户打开Git Bash）
2. 输入以下命令：
```bash
ssh-keygen -t ed25519 -C "你的邮箱地址"
```
3. 按回车接受默认文件位置
4. 输入密码（可以直接回车不设置密码）

### 配置GitHub

1. 复制公钥内容：
```bash
cat ~/.ssh/id_ed25519.pub
```
2. 登录GitHub
3. 点击右上角头像 -> Settings

![image-20250617114552255](./images/image-20250617114552255.png)

4. 左侧菜单选择 "SSH and GPG keys"

![image-20250617114630078](./images/image-20250617114630078.png)

5. 点击 "New SSH key"
6. 粘贴公钥内容，给这个密钥起个名字
7. 点击 "Add SSH key" 保存

![image-20250617114751411](./images/image-20250617114751411.png)

## 5. 开启双重认证 (Two-factor Authentication)（可选） 🔒

为了增强账户安全性，建议开启双重认证。以下是详细步骤：

1. 登录 GitHub 账户后，点击右上角头像，选择 "Settings"（设置）

2. 在左侧菜单栏中，点击 "Password and authentication"（密码和认证）

3. 在 "Two-factor authentication" 部分，点击 "Enable two-factor authentication"（启用双重认证）

![image-20250617114751411](./images/image-20250617114751411.png)

在这里开启Two-factor authentication双重认证

4. 选择认证方式：
   - 推荐使用 "Set up using an app"（使用应用程序设置）
   - 在手机上安装认证器应用，如：
     - Google Authenticator
     - Microsoft Authenticator

![image-20250617132841247](./images/image-20250617132841247.png)

这里手机Google Play中下载一个Autheneticator用来验证

5. 使用认证器扫描 GitHub 显示的二维码

6. 输入认证器生成的 6 位验证码进行确认

7. 保存恢复码（Recovery codes）：
   - 这些恢复码用于在无法访问认证器时恢复账户
   - 请将恢复码保存在安全的地方
   - 建议下载或打印恢复码

完成以上步骤后，每次登录 GitHub 时都需要：
1. 输入密码
2. 输入认证器生成的验证码

这样可以有效防止未授权访问，提高账户安全性。

注意：开启双重认证后，在本地使用 Git 进行 push 操作时：
1. 如果使用 HTTPS 方式连接远程仓库，需要：
   - 使用个人访问令牌（Personal Access Token）替代密码
     - 在 GitHub 网站右上角点击头像 -> Settings
     - 左侧菜单滚动到底部，点击 "Developer settings"
     - 点击 "Personal access tokens" -> "Tokens (classic)"
     - 点击 "Generate new token" -> "Generate new token (classic)"
     - 设置令牌名称和有效期
     - 选择需要的权限范围（至少需要 repo 权限）
     - 生成后请立即保存令牌，因为它只会显示一次
   - 使用方式：
     - 当 Git 要求输入用户名和密码时
     - 用户名：输入你的 GitHub 用户名
     - 密码：输入生成的个人访问令牌（不是你的 GitHub 密码）
   - 或者使用 SSH 密钥进行认证

2. 如果使用 SSH 方式连接远程仓库：
   - 需要配置 SSH 密钥
   - 不需要每次都输入验证码

建议使用 SSH 方式，可以避免频繁输入认证信息。

# Git基础操作 🎯

```mermaid
graph TD
    A[工作区 📁] -->|git add| B[暂存区 📥]
    B -->|git commit| C[本地仓库 💾]
    C -->|git push| D[远程仓库 ☁️]
    D -->|git pull| A
    D -->|git fetch| C
    C -->|git checkout| A
```



## 1. 配置Git (git config) ⚙️

```mermaid
flowchart TD
    A[Git 配置系统 ⚙️] --> B[系统级配置\nSystem 🔧]
    B --> C[全局级配置\nGlobal 🌍]
    C --> D[本地级配置\nLocal 📁]
    B --> E[对所有用户和所有仓库生效\n通常位于Git安装目录]
    C --> F[对当前用户的所有仓库生效\n通常位于用户主目录]
    D --> G[仅对当前Git仓库生效\n位于仓库的.git/config文件]
```



首先，让我们配置一下Git的基本信息：

```bash
# 设置全局用户名和邮箱
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 设置本地仓库用户名和邮箱
git config --local user.name "Project Name"
git config --local user.email "project@example.com"

# 设置 HTTP/HTTPS 代理 (如果使用了科学上网，需要配置代理才能连接上远程仓库)
# http://proxy.example.com -> 你的代理的链接
# 8080/port -> 你的代理监听的端口
git config --global http.proxy http://proxy.example.com:8080
git config --global https.proxy https://proxy.example.com:port

# 设置带认证的代理
git config --global http.proxy http://username:password@proxy.example.com:8080

# 取消代理设置
git config --global --unset http.proxy
git config --global --unset https.proxy

# 查看配置是否成功
git config --list
```

## 2. 创建仓库 (git init, git clone) 📁

有两种方式可以创建仓库：

### 方式一：本地创建
```bash
# 在你想创建仓库的文件夹中打开终端
git init
```

```mermaid
sequenceDiagram
    participant User as 用户 👤
    participant GitSystem as Git系统 ⚙️
    participant FileSystem as 文件系统 📁
    
    User->>GitSystem: git init [directory]
    GitSystem->>FileSystem: 在指定位置创建 .git/ 目录
    FileSystem-->>GitSystem: .git/ 目录创建成功
    GitSystem->>FileSystem: 在 .git/ 目录中创建初始文件结构 (HEAD, config, objects/, refs/等)
    FileSystem-->>GitSystem: 初始文件结构创建成功
    GitSystem-->>User: 仓库初始化完成
    Note over User,GitSystem: 此时仓库为空，尚未有任何提交
```

### 方式二：克隆远程仓库

```bash
# 克隆仓库到本地 例如 https://github.com/FlechazoCLF/FlechazoCLF
git clone https://github.com/FlechazoCLF/FlechazoCLF.git

# 克隆远程仓库的特定分支
git clone -b branch_name https://github.com/username/repo.git
```

![image-20250617134919420](./images/image-20250617134919420.png)

## 3. 基本工作流程 (git add, git commit) 🔄

### 添加文件
```bash
# 添加单个文件
git add 文件名

# 添加指定目录下的所有文件到暂存区
git add directory/

# 添加所有文件
git add .

# 添加特定类型文件
git add *.js

# 交互式添加：允许逐个文件或逐个变更块地选择要暂存的内容
git add -i

# 添加所有已跟踪但已修改的文件（不包括新创建的未跟踪文件）
git add -u

# 交互式添加补丁：允许选择文件中的特定修改行进行暂存
git add -p
```

### 提交更改

将暂存区中的所有文件快照提交到本地Git仓库，形成一个新的版本历史记录点。

```bash
# 提交暂存区的更改，并打开编辑器编写提交信息
git commit

# 提交暂存区的更改，并直接在命令行提供提交信息
git commit -m "你的提交信息"

# 添加并提交（适用于已跟踪的文件）
git commit -am "你的提交说明"

# 修改最后一次提交：将当前暂存区的内容合并到上一次提交中，并可以修改提交信息（慎用）
git commit --amend
```

```mermaid
sequenceDiagram
    participant WorkingDirectory as 工作目录 📁
    participant StagingArea as 暂存区 📥
    participant LocalRepository as 本地仓库 💾
    participant RemoteRepository as 远程仓库 ☁️
    
    WorkingDirectory->>StagingArea: git add (将修改添加到暂存区)
    StagingArea->>LocalRepository: git commit (创建新的提交对象)
    LocalRepository-->>LocalRepository: HEAD指针指向新的提交
    LocalRepository->>RemoteRepository: git push (推送提交到远程仓库)
    Note over WorkingDirectory,LocalRepository: 此时工作目录和暂存区状态被记录
```

> 小贴士：提交说明要清晰明了，建议使用以下格式：
>
> ```
> 类型: 简短描述
> 
> 详细描述（可选）
> 
> 相关issue（可选）
> ```
>
> 常用类型：
> - add: 新功能
> - update: 更新内容
> - fix: 修复bug
> - style: 代码格式
> - refactor: 重构
> - test: 增加测试
> - docs: 文档更新

## 4. 分支管理 (git branch, git checkout, git merge) 🌿

### 查看分支
```bash
# 列出所有本地分支，当前分支前会有一个星号 (*)
git branch

# 列出所有本地和远程分支
git branch -a

# 列出所有远程分支
git branch -r

# 创建一个新分支，新分支会指向当前提交
git branch <新分支名>

# 删除一个已合并的本地分支
git branch -d <分支名>

# 强制删除一个未合并的本地分支（会丢失未合并的提交，慎用）
git branch -D <分支名>

# 重命名当前分支
git branch -m <新分支名>

# 重命名指定分支
git branch -m <旧分支名> <新分支名>
```

### 常用选项

-   `-a` 或 `--all`：显示所有本地和远程分支。
-   `-r` 或 `--remotes`：显示所有远程跟踪分支。
-   `-v` 或 `--verbose`：显示分支的详细信息，包括最近一次提交的哈希和提交信息。
-   `-d` 或 `--delete`：删除一个已合并的分支。
-   `-D`：强制删除一个分支，即使它没有被合并。
-   `-m` 或 `--move`：移动或重命名一个分支。
-   `-c` 或 `--copy`：复制一个分支。

```mermaid
sequenceDiagram
    participant HEAD as HEAD 指针
    participant CurrentBranch as 当前分支
    participant CurrentCommit as 当前提交对象
    participant NewBranch as 新分支引用
    participant RemoteBranch as 远程分支
    
    HEAD->>CurrentBranch: HEAD 指向当前分支
    CurrentBranch->>CurrentCommit: 当前分支指向当前提交
    NewBranch->>CurrentCommit: git branch <新分支名> (新分支引用被创建并指向当前提交)
    RemoteBranch-->>CurrentCommit: 远程分支可能指向相同或不同的提交
    Note over HEAD,NewBranch: 此时 HEAD 仍然指向原分支，新分支只是一个指针
    Note over CurrentBranch,RemoteBranch: 远程分支可以跟踪本地分支，也可以独立存在
```

### 创建和切换分支

```bash
# 创建新分支
git branch 分支名

# 切换到指定分支
git checkout <目标分支名>

# 创建并切换到新分支（常用操作）
git checkout -b <新分支名>

# 切换到上一个分支
git checkout -
```

### 合并分支
```bash
# 将指定分支的更改合并到当前分支
git merge <要合并的分支名>

# 合并时强制创建一个新的合并提交，即使可以快进合并（推荐）
git merge --no-ff <要合并的分支名>

# 合并时禁用自动提交，合并后停留在暂存区，允许手动修改再提交
git merge --no-commit <要合并的分支名>

# 合并时允许 Git 合并工具来解决冲突（当发生冲突时）
git merge --tool=<工具名> <要合并的分支名>

# 使用rebase方式合并
git rebase 分支名
```

```mermaid
gitGraph
    commit id: "A" tag: "初始提交"
    branch feature
    checkout feature
    commit id: "B" tag: "特性开发"
    checkout main
    commit id: "C" tag: "主分支更新"
    merge feature id: "D" tag: "快进合并"
    checkout main
    commit id: "E" tag: "继续开发"
    merge feature id: "F" tag: "非快进合并"
```

### 合并冲突解决流程

当需要整合分支时，可以选择使用 merge 或 rebase 方式。

**基本流程概述：**

1. 获取远程更新：使用 `git fetch` 获取远程仓库的最新状态
2. 创建并切换到新分支：使用 `git checkout -b feature` 创建开发分支
3. 开发工作：在本地分支上进行代码开发
4. 提交更改：使用 `git add` 和 `git commit` 提交本地更改
5. 整合远程分支：选择以下两种方式之一
   - **Merge 方式**：保留完整分支历史，创建合并提交
   - **Rebase 方式**：重写提交历史，使提交历史更线性
6. 解决冲突：如果发生冲突，需要手动解决
7. 推送到远程：使用 `git push` 将本地分支推送到远程仓库

```mermaid
sequenceDiagram
    participant LocalRepo as 本地仓库 💾
    participant RemoteRepo as 远程仓库 ☁️
    participant LocalBranch as 本地分支 🌿
    participant RemoteBranch as 远程分支 🌐
    participant User as 用户 👤
    
    LocalRepo->>RemoteRepo: git fetch (获取远程更新)
    RemoteRepo-->>LocalRepo: 返回远程分支信息
    User->>LocalRepo: git checkout -b feature (创建并切换到新分支)
    User->>LocalBranch: 进行开发工作
    User->>LocalBranch: git add & commit (提交更改)
    
    alt 选择 Merge
        LocalBranch->>RemoteBranch: git merge origin/master (合并远程主分支)
        alt 发生冲突
            RemoteBranch-->>User: Git 报告合并冲突
            User->>User: 手动编辑冲突文件 (解决冲突)
            User->>LocalBranch: git add <冲突文件> (标记冲突已解决)
            User->>LocalBranch: git commit (创建合并提交)
            LocalBranch-->>User: 合并完成
        else 无冲突
            RemoteBranch-->>User: 合并成功，自动生成合并提交
        end
    else 选择 Rebase
        LocalBranch->>RemoteBranch: git rebase -i origin/master (变基到远程主分支)
        alt 发生冲突
            RemoteBranch-->>User: Git 报告变基冲突
            User->>User: 手动编辑冲突文件 (解决冲突)
            User->>LocalBranch: git add <冲突文件> (标记冲突已解决)
            User->>LocalBranch: git rebase --continue (继续变基)
            LocalBranch-->>User: 变基完成
        else 无冲突
            RemoteBranch-->>User: 变基成功，重写提交历史
        end
    end
    
    User->>LocalRepo: git push origin feature (推送本地分支到远程)
    LocalRepo->>RemoteRepo: 创建/更新远程分支
```

### 使用工具解决冲突

```mermaid
sequenceDiagram
    participant Git as Git系统 ⚙️
    participant MergeTool as 合并工具 🔧
    participant User as 用户 👤
    
    Git->>User: 检测到合并冲突
    User->>Git: git mergetool (启动工具)
    Git->>MergeTool: 传递冲突文件信息
    MergeTool->>User: 显示冲突文件（通常有A、B、Base、Result四个区域）
    User->>MergeTool: 手动编辑并解决冲突
    MergeTool-->>Git: 保存解决后的文件
    Git-->>User: 冲突解决完成，文件已暂存
    Note over User,Git: 此时用户还需 git commit 提交合并结果
```

## 5. 推送操作 (git remote,git push, git pull, git fetch) 📤

### 添加远程仓库

```bash
# 添加远程仓库
git remote add origin https://gitee.com/carlchai/tutorial-git.git
               起的名字                git仓库链接

# 查看远程仓库
git remote -v
```

可以查看一下(我这里添加了3个远程仓库)

![](./images/wechat_2025-06-22_092427_864.png)

### 推送到远程
```bash
# 推送到远程仓库
git push origin 分支名

# 强制推送（谨慎使用！）
git push -f origin 分支名
```

### 拉取更新
```bash
# 拉取并合并
git pull

# 拉取特定分支
git pull origin 分支名

# 只拉取不合并
git fetch
```

# Git高级技巧 🎨

## 1. 查看历史 (git log, git reflog) 📜

```bash
# 查看提交历史
git log

# 查看简洁历史
git log --oneline

# 查看图形化历史
git log --graph --oneline

# 查看所有操作历史
git reflog
```

## 2. 撤销操作 (git checkout, git reset) ↩️

```bash
# 撤销工作区的修改
git checkout -- 文件名

# 撤销暂存区的修改
git reset HEAD 文件名

# 撤销提交记录保留工作目录中的修改内容
git reset --mixed HEAD~1

# 撤销提交保留修改并让它们处于“已暂存”状态
git reset --soft HEAD~1

# 完全删除提交以及对应的修改内容（不可逆 ）
git reset --hard HEAD~1

# 已推送到远程仓库的撤销 通过新增提交来撤销修改
git revert HEAD
```

## 3. 存储修改 (git stash) 💾

```bash
# 暂存当前所有未提交的修改 (包括暂存区和工作区，并自动生成描述)
git stash

# 暂存当前修改，并添加自定义描述信息
git stash save "<你的暂存描述>"

# 列出所有已保存的暂存项
git stash list

# 应用最近的暂存项，并保留在暂存堆栈中
git stash apply

# 应用最近的暂存项，并从暂存堆栈中移除（常用）
git stash pop

# 删除最近的暂存项
git stash drop

# 删除所有暂存项
git stash clear

# 查看指定暂存项的详细内容
git stash show <stash@{n}>

# 从暂存项中创建一个新分支
git stash branch <新分支名> <stash@{n}>
```

### 暂存操作状态流转图

```mermaid
stateDiagram-v2
    [*] --> CleanWorkingDir: 干净工作目录
    CleanWorkingDir --> ModifiedFiles: 文件被修改 (工作区)
    ModifiedFiles --> StagedFiles: git add (添加到暂存区)
    
    ModifiedFiles --> Stashed: git stash (暂存工作区和暂存区修改)
    StagedFiles --> Stashed: git stash (暂存工作区和暂存区修改)
    
    Stashed --> CleanWorkingDir: git stash apply / pop (应用暂存，工作区恢复)
    Stashed --> [*]: git stash drop / clear (丢弃暂存)
    
    StagedFiles --> Committed: git commit (提交修改，工作目录变为干净)
    Committed --> ModifiedFiles: 提交后文件再次被修改
```

## 4. 变基操作 (git rebase) 🔄

> [!WARNING]
>
> git rebase：变基操作，重写提交历史

### 基本用法

```bash
# 将当前分支（例如 feature）的提交移动到目标分支（例如 develop）的最新提交之后
git rebase develop

# 交互式变基：允许对指定范围的提交进行编辑、合并、删除、重排等操作
git rebase -i HEAD~3   # 变基最近3个提交
git rebase -i <起始提交哈希> # 变基从指定提交开始到当前HEAD的所有提交
```

### 变基流程图：线性化提交历史

```mermaid
sequenceDiagram
    participant FeatureBranch as 特性分支 (Old)
    participant BaseBranch as 基础分支 (New)
    participant RefactoredFeature as 特性分支 (Refactored)

    Note over FeatureBranch,BaseBranch: 特性分支从旧基点分出，基础分支有新提交

    FeatureBranch->>BaseBranch: git rebase <BaseBranch>
    BaseBranch->>RefactoredFeature: 特性分支的提交被逐个"复制"并应用到新的基点之上
    Note over RefactoredFeature: 原有提交 (SHA) 被重写，历史变得线性且更简洁
```

## 5. 应用提交 (git cherry-pick) 🍒

### git cherry-pick：选择性应用提交

选择性地将其他分支的单个或多个提交（通常是不连续的提交）应用到当前分支，而无需合并整个分支。

### 基本用法

```bash
# 应用单个提交到当前分支
git cherry-pick <提交哈希>

# 应用多个提交到当前分支（按顺序）
git cherry-pick <提交哈希1> <提交哈希2> ...

# 应用一个提交范围到当前分支（不包含起始提交）
git cherry-pick <起始提交哈希>..<结束提交哈希>

# 应用一个提交范围到当前分支（包含起始提交）
git cherry-pick <起始提交哈希>^..<结束提交哈希>

# 在应用过程中如果遇到冲突，暂停并允许手动解决
git cherry-pick --no-commit <提交哈希>

# 解决冲突后继续 cherry-pick
git cherry-pick --continue

# 放弃当前的 cherry-pick 操作
git cherry-pick --abort
```

### 选择性应用流程

```mermaid
sequenceDiagram
    participant SourceBranch as 源分支
    participant TargetBranch as 目标分支
    participant SelectedCommit as 选定提交
    
    SourceBranch->>SelectedCommit: 在源分支上选择一个或多个提交
    SelectedCommit->>TargetBranch: git cherry-pick <提交哈希>
    TargetBranch-->>TargetBranch: 在目标分支上生成一个新的、内容相同的提交
    Note over SourceBranch,TargetBranch: 原始提交在源分支上保持不变，目标分支获得其内容的副本
```

## 6. 标签管理 (git tag) 🏷️

### git tag：管理标签，标记重要里程碑

用于创建、列出、删除和验证标签，这些标签通常用于标记软件发布版本或重要的里程碑。

### 基本用法

```bash
# 列出所有本地标签
git tag

# 搜索符合模式的标签
git tag -l "v1.*"

# 创建轻量标签（lightweight tag）：只是一个指向特定提交的引用，不包含额外信息
git tag v1.0.0

# 创建带注释的标签（annotated tag，推荐）：这是一个完整的Git对象，包含打标签者的信息、日期和标签信息，可以被签名
git tag -a v1.0.0 -m "版本1.0.0：首次稳定发布，包含核心功能"

# 查看指定标签的详细信息，包括提交信息
git show v1.0.0

# 推送所有本地标签到远程仓库
git push --tags

# 推送指定标签到远程仓库
git push origin v1.0.0

# 删除本地标签
git tag -d v1.0.0

# 删除远程标签：首先删除本地标签，然后推送一个空标签到远程
git push origin --delete v1.0.0
```

### 标签管理流程

```mermaid
sequenceDiagram
    participant LocalRepo as 本地仓库 💾
    participant RemoteRepo as 远程仓库 ☁️
    participant User as 用户 👤
    
    User->>LocalRepo: git tag <tag_name> (创建标签)
    LocalRepo-->>User: 标签创建成功
    
    User->>RemoteRepo: git push --tags / git push origin <tag_name> (推送标签)
    RemoteRepo-->>LocalRepo: 标签同步完成
    
    User->>LocalRepo: git tag -d <tag_name> (删除本地标签)
    User->>RemoteRepo: git push origin --delete <tag_name> (删除远程标签)
    Note over LocalRepo,RemoteRepo: 标签是静态的，通常指向发布点
```

## 7. 子模块管理 (git submodule) 📦

### git submodule：管理嵌套Git仓库

用于管理将其他 Git 仓库作为子目录嵌套到当前仓库（称为"超项目"）中的情况，这允许在一个 Git 仓库中包含和跟踪外部 Git 仓库的版本。

### 基本用法

```bash
# 添加一个子模块：将外部仓库克隆到指定路径，并在.gitmodules中记录
git submodule add <仓库URL> <路径>
# 示例：git submodule add https://github.com/example/submodule.git lib/submodule

# 初始化本地子模块配置：对于新克隆的超项目，需初始化子模块配置
git submodule init

# 更新子模块：将子模块更新到超项目所记录的特定提交
git submodule update

# 递归更新所有子模块：包括子模块内部的嵌套子模块
git submodule update --init --recursive

# 克隆包含子模块的仓库后，自动更新所有子模块
git clone <主仓库URL> --recursive
# 或者，如果已克隆主仓库：
# git submodule update --init --recursive

# 删除一个子模块（步骤较多）
# 1. 从 .gitmodules 文件中删除对应行
# 2. 从 .git/config 文件中删除对应段落
# 3. 运行 git rm --cached <path_to_submodule> (注意：不要加 -r)
# 4. 删除子模块目录
# 5. 提交更改
```

### 子模块结构图：主仓库与嵌套仓库的关系

```mermaid
flowchart TD
    A[主仓库 📦] --> B[子模块1 📦]
    A --> C[子模块2 📦]
    B --> D[子模块1.1 📦]
    C --> E[子模块2.1 📦]
    C --> F[子模块2.2 📦]
```

### git submodule foreach：在子模块中批量执行命令

允许在超项目中的每个子模块内执行指定的 Git 命令或 shell 命令。

### 基本用法

```bash
# 在所有子模块中拉取最新代码
git submodule foreach git pull origin master

# 递归地在所有子模块中执行 Git 命令（例如提交并推送）
git submodule foreach --recursive 'git add . && git commit -m \"[update] 更新子模块内容\" && git push'
```

### 子模块命令执行流程

```mermaid
sequenceDiagram
    participant MainRepo as 主仓库 📦
    participant Submodule1 as 子模块1 📦
    participant Submodule2 as 子模块2 📦
    participant SubmoduleN as ... (所有子模块) 📦
    
    MainRepo->>Submodule1: git submodule foreach <command>
    Submodule1-->>MainRepo: 命令执行结果 (for Submodule1)
    MainRepo->>Submodule2: git submodule foreach <command>
    Submodule2-->>MainRepo: 命令执行结果 (for Submodule2)
    MainRepo->>SubmoduleN: ... (对每个子模块依次执行)
    Note over MainRepo: 若带 --recursive，会进入子模块内部的子模块执行相同的命令
```

**注意：Windows 系统下 `git submodule foreach` 的引号与转义**

在 Windows 命令行 (CMD 或 PowerShell) 环境下使用 `git submodule foreach` 命令时，如果命令中包含引号，需要对内层引号进行反斜杠 `\` 转义。这与 Linux/macOS/Git Bash 环境有所不同。

**Windows 示例：**

```bash
git submodule foreach --recursive 'git add . && git commit -m \"[update] 更新描述文件\" && git push'
```

**Linux/macOS/Git Bash 示例：**

```bash
git submodule foreach --recursive 'git add . && git commit -m "[update] 更新描述文件" && git push'
```

## 8. 工作目录管理 (git clean) 🧹

### git clean：清理工作区未跟踪文件

用于清理工作目录中未被 Git 跟踪的文件和目录，以保持工作区整洁，尤其是在进行新任务或解决冲突后。

### 基本用法

```bash
# 演练模式：显示将要删除的文件和目录，但不会实际执行删除操作（安全预览）
git clean -n

# 强制删除所有未跟踪的文件（不包括目录）
git clean -f

# 强制删除所有未跟踪的文件和目录
git clean -fd

# 删除被 .gitignore 忽略的文件（慎用，通常不推荐）
git clean -xfd

# 删除所有未跟踪的文件，包括空目录
git clean -f -d -X
```

### 清理流程

```mermaid
sequenceDiagram
    participant User as 用户 👤
    participant GitSystem as Git系统 ⚙️
    participant WorkingDirectory as 工作目录 📁
    
    User->>GitSystem: git clean -n (预演清理操作)
    GitSystem->>WorkingDirectory: 扫描未跟踪文件和目录
    WorkingDirectory-->>GitSystem: 返回待清理列表
    GitSystem-->>User: 显示将要删除的文件/目录列表
    
    User->>GitSystem: git clean -f (确认并执行清理)
    GitSystem->>WorkingDirectory: 执行删除操作
    WorkingDirectory-->>GitSystem: 删除完成
    GitSystem-->>User: 清理操作报告
```

### .gitignore 文件配置：忽略不必要的文件

`.gitignore` 文件用于指定 Git 应该忽略哪些文件或目录，使其不会被 Git 跟踪和提交到仓库。这对于保持仓库整洁、避免提交敏感信息或构建产物非常重要。

### 常见配置示例

```gitignore
# 操作系统生成的文件
.DS_Store             # macOS 目录服务文件
Thumbs.db             # Windows 缩略图缓存
*.log                 # 日志文件
*.temp                # 临时文件

# 编译/构建生成的文件
*.o                   # C/C++ 编译对象文件
*.lo
*.obj
*.class               # Java 编译类文件
*.pyc                 # Python 编译缓存
*.exe                 # 可执行文件
*.dll                 # 动态链接库
*.so                  # 共享库
build/                # 构建输出目录
dist/                 # 发布目录

# 依赖管理生成的文件
node_modules/         # Node.js 项目依赖
vendor/               # PHP Composer 依赖

# 敏感信息或本地配置文件
.env                  # 环境变量文件
config.local.php      # 本地数据库配置或其他敏感配置
*.key                 # 私钥文件

# IDE 和编辑器配置文件
.idea/                # IntelliJ IDEA 配置文件
.vscode/              # Visual Studio Code 配置文件
*.iml                 # IntelliJ IDEA 模块文件
*.swp                 # Vim 交换文件

# 压缩文件
*.zip
*.tar.gz
*.rar
```

### .gitignore 规则解析

-   **空行**：被忽略，用于提高可读性。
-   **`#` 开头的行**：被视为注释。
-   **通配符 `*`**：匹配零个或多个字符。例如 `*.log` 会匹配所有以 `.log` 结尾的文件。
-   **通配符 `?`**：匹配单个字符。例如 `file?.txt` 会匹配 `file1.txt`、`fileA.txt` 等。
-   **字符范围 `[]`**：匹配括号内任何一个字符。例如 `[abc].txt` 匹配 `a.txt`、`b.txt`、`c.txt`。
-   **`!` 开头的行**：表示"不忽略"某个文件或目录，即使它之前被其他规则忽略。例如，`*.log` 忽略所有 `.log` 文件，但 `!debug.log` 可以取消忽略 `debug.log`。
-   **`/` 结尾**：表示匹配一个目录。例如 `myfolder/` 会忽略 `myfolder` 目录及其所有内容，但不会忽略名为 `myfolder` 的文件。
-   **`/` 开头**：匹配仓库根目录下的文件或目录。例如 `/temp` 只匹配根目录下的 `temp` 文件或目录，不匹配子目录中的 `temp`。
-   **`**` (双星号)**：匹配任意深度的目录。例如 `**/foo` 匹配任何目录下的 `foo` 文件或目录；`a/**/b` 匹配 `a` 目录下任意深度的 `b`。

# 命令总结 📝

## 基础命令 🔧
- `git init`: 初始化仓库
- `git clone`: 克隆远程仓库
- `git add`: 添加文件到暂存区
- `git commit`: 提交更改
- `git push`: 推送到远程
- `git pull`: 拉取并合并
- `git fetch`: 拉取不合并

## 分支操作 🌿
- `git branch`: 查看/创建分支
- `git checkout`: 切换分支
- `git merge`: 合并分支
- `git rebase`: 变基操作

## 查看与撤销 👀
- `git log`: 查看提交历史
- `git reflog`: 查看所有操作历史
- `git checkout --`: 撤销工作区修改
- `git reset`: 撤销暂存区/提交

## 存储与清理 💾
- `git stash`: 暂存修改
- `git clean`: 清理未跟踪文件

## 高级功能 ⚡
- `git cherry-pick`: 选择性应用提交
- `git tag`: 标签管理
- `git submodule`: 子模块管理

## 配置相关 ⚙️
- `git config`: 配置Git
- `ssh-keygen`: 生成SSH密钥

这些命令涵盖了Git日常使用中的大部分场景，从基础操作到高级功能。建议根据实际需求选择合适的命令使用。

# 常见问题列表✨

## 问题一：git clone 不了github

### 问题原因：

### 解决方案：

**1、获取github.com的ip地址**

140.82.113.4

**2、修改host文件**

C:\Windows\System32\drivers\etc

![image-20250604130617582](./images/image-20250604130617582.png)

> [!NOTE]
>
> 这里如果不让保存的话：就复制出来一份，然后修改，之后再复制回来

```bash
# github
140.82.113.4 github.com
```

**3、验证一下吧**

```bash
ping github.com
```

## 问题二：打开VPN代理后如何设置

### 问题原因：

需要给git也设置一下代理

### 解决方案：

**1、查看你的代理的port端口**

设置->参数设置

![image-20250604131510510](./images/image-20250604131510510.png)

![image-20250604131543011](./images/image-20250604131543011.png)

**2、配置**

```bash
git config --global http.proxy "127.0.0.1:端口号"
git config --global https.proxy "127.0.0.1:端口号"
```

## 问题三：一个本地仓库对应多个远程仓库

### 使用场景

> [!CAUTION]
>
> 当你有一份本地仓库，但是想同时上传到多个平台时

### 解决方案

```bash
# 添加远程仓库
# 本地的Gitea
git remote add origin http://localhost:3000/Flechazo/tutorial-git.git
# Gitee
git remote add gitee git@gitee.com:carlchai/tutorial-git.git
# Github
git remote add github https://github.com/FlechazoCLF/tutorial-git.git

# 查看
git remote -v

# 推送(选择不同的仓库来推送)
git push origin master
git push gitee master
git push github master
```

# 🎉 彩蛋：一个有趣的快捷键管理工具

恭喜你读到这里！作为奖励，我想分享一个正在开发中的有趣项目。🎁

## 项目背景 🌟

你是否曾经想过完全脱离鼠标来操作电脑？这个想法启发了我开发一个自定义快捷键管理工具。💡

## 核心功能 ⚡
- 完全自定义的快捷键系统
- 支持组合键映射
- 鼠标移动控制（例如：Ctrl + Space + 方向键/IJKL）
- 提高工作效率，减少手部移动

## 项目愿景 🎯
这个工具的目标是让电脑操作更加高效和便捷，特别适合喜欢键盘操作的用户。通过自定义快捷键，你可以：
- 减少手部移动
- 提高操作效率
- 打造个性化的操作体验

## 开源计划 🌐
项目正在积极开发中，计划在完成后开源。欢迎关注和参与！🤝

> 注：将想法转化为实际项目，就像Git一样，好的工具可以改变我们的工作方式。✨
