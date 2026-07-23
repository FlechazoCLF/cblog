
/****************************************************************************************************
* File Start!
****************************************************************************************************/

/*
 *
 *  Copyright (c) 2024-2026 by flechazo. All rights reserved.
 *
 * Author : CarlChai LinFeng Chai flechazo
 * Website: flechazo.mba
 *
 * Change Logs:
 * Date           Author       Notes
 * 2026-05-24     cc          the first version
 *
*/

/****************************************************************************************************
* Include
****************************************************************************************************/

/****************************************************************************************************
* Define
****************************************************************************************************/

/****************************************************************************************************
* Type Define
****************************************************************************************************/

/****************************************************************************************************
* Variable
****************************************************************************************************/

/* navigate_database_list */
export let navigate_database_list = [
    {
        category: "全部",
        item: []
    },
    {
        category: "flechazo",
        item: [
            {name:"blog",url:"/blog",image:'/images/navigation/flechazo/blog.png',description:'flechazo的小世界',external: false},
            {name:"gitea",url:"http://localhost:3000/Flechazo",image:'/images/wallpaper/02.png',description:'flechazo的代码仓库',external: true},
            {name:"Github",url:"https://github.com/FlechazoCLF",image:'/images/navigation/flechazo/Github.png',description:'欢迎造访我的Gihub',external: true},
            {name:"Gitee",url:"https://gitee.com/carlchai",image:'/images/navigation/flechazo/Gitee.png',description:'欢迎造访我的Gitee',external: true},
            {name:"CSDN",url:"https://blog.csdn.net/qianshang52013",image:'/images/navigation/flechazo/CSDN.png',description:'欢迎造访我的CSDN',external: true},
            {name:"知乎",url:"https://www.zhihu.com/people/jiu_sheng",image:'/images/navigation/flechazo/知乎.png',description:'欢迎造访我的知乎',external: true},
            {name:"公众号",url:"https://mp.weixin.qq.com/",image:'/images/wallpaper/07.png',description:'柴大大学长',external: true},
            {name:"哔哩哔哩",url:"https://www.bilibili.com/",image:'/images/wallpaper/08.png',description:'B站',external: true},
            {name:"YouTube",url:"https://www.youtube.com/",image:'/images/wallpaper/09.png',description:'油管',external: true},
        ]
    },
    {
        category: "AI",
        item: [
            {name:"ollama",url:"https://ollama.com/",image:'/images/wallpaper/01.png',description:'本地部署大模型',external: true},
            {name:"Qwen",url:"https://chat.qwen.ai/",image:'/images/wallpaper/02.png',description:'阿里千问',external: true},
            {name:"DeepSeek",url:"https://chat.deepseek.com/",image:'/images/wallpaper/03.png',description:'深度求索',external: true},
            {name:"Kimi",url:"https://www.kimi.com/",image:'/images/wallpaper/04.png',description:'Kimi',external: true},
            {name:"豆包",url:"https://www.doubao.com/chat/",image:'/images/wallpaper/05.png',description:'字节',external: true},
            {name:"ChatGPT",url:"https://chatgpt.com/",image:'/images/wallpaper/06.png',description:'OpenAI',external: true},
        ]
    },
    {
        category: "产品",
        item: [
            {name:"CCOS",url:"https://github.com/FlechazoCLF/CCOS",image:'/images/wallpaper/01.png',description:'创造小世界',external: true},
            {name:"CCTools",url:"https://github.com/FlechazoCLF/CCTools",image:'/images/wallpaper/02.png',description:'一个提高生产效率的QT小工具',external: true},
            {name:"cblog",url:"https://github.com/FlechazoCLF/cblog",image:'/images/wallpaper/03.png',description:'基于react的个人博客系统',external: true},
            {name:"cByte",url:"https://github.com/FlechazoCLF/cByte",image:'/images/wallpaper/04.png',description:'一个协议字节代码生成器',external: true},
            {name:"cBilibiliRobot",url:"/",image:'/images/wallpaper/05.png',description:'超有趣的一个哔哩哔哩机器人',external: true},
            {name:"cfly",url:"/",image:'/images/wallpaper/06.png',description:'四轴无人机',external: true},
            {name:"cChat",url:"/",image:'/images/wallpaper/07.png',description:'命令行聊天工具',external: true},
            {name:"chome",url:"/",image:'/images/wallpaper/08.png',description:'室内设计建模',external: true},
            {name:"快捷键管理",url:"https://github.com/FlechazoCLF/ccshortcut",image:'/images/wallpaper/09.png',description:'windows快捷键自定义工具',external: true},
            {name:"clovercard",url:"/",image:'/images/wallpaper/10.png',description:'情侣卡牌设计套件',external: true},
            {name:"ccodetools",url:"/",image:'/images/wallpaper/11.png',description:'一个vscode扩展',external: true},
            {name:"cRobot",url:"/",image:'/images/wallpaper/12.png',description:'设计自己的机器人',external: true},
            {name:"ctax",url:"https://github.com/FlechazoCLF/cctax",image:'/images/wallpaper/13.png',description:'税后收入计算器',external: true},
            {name:"cWatch",url:"/",image:'/images/wallpaper/14.png',description:'打造自己的智能小手表',external: true},
            {name:"cDesk",url:"/",image:'/images/wallpaper/15.png',description:'免费开源的远程桌面',external: true},
            {name:"sdecide",url:"/",image:'/images/wallpaper/16.png',description:'小决定',external: true},
            {name:"EchoSearch",url:"https://github.com/FlechazoCLF/EchoSearch",image:'/images/wallpaper/17.png',description:'一款VS Code搜索插件',external: true},
        ]
    },
    {
        category: "教程",
        item: [
            {name:"保姆级教程",url:"https://github.com/FlechazoCLF/tutorial-git",image:'/images/wallpaper/01.png',description:'精心打造的Git保姆级教程',external: true},
            {name:"小林Coding",url:"https://xiaolincoding.com/",image:'/images/wallpaper/02.png',description:'图解以太网/图解操作系统',external: true},
            {name:"菜鸟教程",url:"https://www.runoob.com/",image:'/images/wallpaper/03.png',description:'菜鸟教程各种教程',external: true},
            {name:"CS-Notes",url:"http://www.cyc2018.xyz/",image:'/images/wallpaper/04.png',description:'优质教程',external: true},
            {name:"3Blue1Brown",url:"https://space.bilibili.com/88461692",image:'/images/wallpaper/05.png',description:'图解数学之美',external: true},
            {name:"黑马程序员",url:"https://space.bilibili.com/37974444",image:'/images/wallpaper/06.png',description:'黑马程序员',external: true},
            {name:"geeksforgeeks",url:"https://www.geeksforgeeks.org/",image:'/images/wallpaper/07.png',description:'非常优质的教程网站',external: true},
            {name:"小智学长嵌入式全栈学习",url:"https://x509p6c8to.feishu.cn/wiki/C5HHw0MqOii1d8kdziFcu1TlnJg",image:'/images/wallpaper/08.png',description:'非常优质的全套学习路线',external: true},
            {name:"动手学深度学习",url:"https://zh.d2l.ai/",image:'/images/wallpaper/09.png',description:'一定要学AI呀',external: true},
            {name:"hello-agent",url:"https://hello-agents.datawhale.cc/#/",image:'/images/wallpaper/10.png',description:'学习agent',external: true},
        ]
    },
    {
        category: "收藏项目",
        item: [
            {name:"我的Github收藏",url:"https://github.com/FlechazoCLF?tab=stars",image:'/images/wallpaper/01.png',description:'Github项目收藏',external: true},
            {name:"中文Github社区",url:"https://www.github-zh.com/",image:'/images/wallpaper/02.png',description:'Github中文',external: true},
        ]
    },
    {
        category: "工具",
        item: [
            {name:"Figma",url:"https://www.figma.com/",image:'/images/wallpaper/01.png',description:'原型设计',external: true},
            {name:"油猴插件",url:"https://www.youxiaohou.com/",image:'/images/wallpaper/02.png',description:'一个神一样的浏览器插件',external: true},
            {name:"pdf小工具",url:"https://smallpdf.com/cn/pdf-converter",image:'/images/wallpaper/03.png',description:'一个在线的pdf工具',external: true},
            {name:"css样式参考",url:"https://neumorphism.io/",image:'/images/wallpaper/04.png',description:'一个在线的css工具',external: true},
            {name:"BCompare",url:"https://www.scootersoftware.com/",image:'/images/wallpaper/05.png',description:'对比文件神器',external: true},
            {name:"Git",url:"https://git-scm.com/",image:'/images/wallpaper/06.png',description:'版本迭代神器',external: true},
            {name:"ssh",url:"https://ssh.org/",image:'/images/wallpaper/07.png',description:'一个vscode中的远程终端插件',external: true},
            {name:"OpenOCD",url:"https://www.openocd.org/",image:'/images/wallpaper/08.png',description:'一个开源的嵌入式调试工具',external: true},
            {name:"DIY电脑",url:"https://pcpartpicker.com/",image:'/images/wallpaper/09.png',description:'选配电脑',external: true},
            {name:"PowerToys",url:"https://github.com/microsoft/PowerToys",image:'/images/wallpaper/10.png',description:'微软官方电脑工具箱',external: true},
            {name:"Wireshark",url:"https://github.com/wireshark/wireshark",image:'/images/wallpaper/11.png',description:'网络抓包工具',external: true},
            {name:"Rufus",url:"https://rufus.ie/",image:'/images/wallpaper/12.png',description:'制作启动盘',external: true},
            {name:"Gitea",url:"https://about.gitea.com/",image:'/images/wallpaper/13.png',description:'搭建自己的代码仓库',external: true},
            {name:"frp",url:"https://github.com/fatedier/frp",image:'/images/wallpaper/14.png',description:'内网穿透-xtcp模式p2p直连',external: true},
            {name:"TailScale",url:"https://tailscale.com/",image:'/images/wallpaper/15.png',description:'组网工具',external: true},
            {name:"copyparty",url:"https://github.com/9001/copyparty",image:'/images/wallpaper/16.png',description:'浏览器访问本地文件夹',external: true},
            {name:"cpubenchmark",url:"https://www.cpubenchmark.net/",image:'/images/wallpaper/17.png',description:'cpu性能排行',external: true},
            {name:"code-server",url:"https://github.com/coder/code-server",image:'/images/wallpaper/18.png',description:'vscode服务端',external: true},
            {name:"V2rayN",url:"https://github.com/2dust/v2rayN",image:'/images/wallpaper/19.png',description:'VPN',external: true},
            {name:"Cloudreve",url:"https://github.com/cloudreve/Cloudreve",image:'/images/wallpaper/20.png',description:'个人云盘-Cloudreve修改后台策略导入一个本地文件夹',external: true},
            {name:"eCharts",url:"https://echarts.apache.org/zh/index.html",image:'/images/wallpaper/21.png',description:'JS好看的图表库',external: true},
            {name:"帮小忙",url:"https://tool.browser.qq.com/",image:'/images/wallpaper/22.png',description:'QQ浏览器在线小工具',external: true},
            {name:"网易云音乐解析",url:"https://github.com/Suxiaoqinx/Netease_url",image:'/images/wallpaper/23.png',description:'音乐解析',external: true},
            {name:"openssh",url:"https://www.openssh.org/",image:'/images/wallpaper/24.png',description:'linux中ssh服务 sudo apt install openssh-server',external: true},
            {name:"kodbox",url:"https://github.com/kalcaddle/kodbox",image:'/images/wallpaper/25.png',description:'可道云-一个有桌面的个人网盘',external: true},
            {name:"mermaid",url:"https://mermaid.js.org/",image:'/images/wallpaper/26.png',description:'markdown语法-流程图',external: true},
            {name:"markmap",url:"https://markmap.js.org/",image:'/images/wallpaper/27.png',description:'markdown语法-交互思维导图',external: true},
            {name:"魔戒",url:"https://www.mojie.me/",image:'/images/wallpaper/28.png',description:'VPN',external: true},
        ]
    },
    {
        category: "资源",
        item: [
            {name:"羽兔网",url:"https://www.yutu.cn/",image:'/images/wallpaper/01.png',description:'免费破解版软件下载',external: true},
            {name:"开源文档教程",url:"https://gitcode.com/Open-source-documentation-tutorial",image:'/images/wallpaper/02.png',description:'超多免费书籍',external: true},
            {name:"iconfont",url:"https://www.iconfont.cn/",image:'/images/wallpaper/03.png',description:'超多免费图标库',external: true},
            {name:"puresys",url:"https://www.puresys.net/",image:'/images/wallpaper/04.png',description:'纯净系统|软件下载',external: true},
            {name:"arm开发者资料",url:"https://developer.arm.com/",image:'/images/wallpaper/05.png',description:'arm芯片手册',external: true},
            {name:"国家数据",url:"https://data.stats.gov.cn/",image:'/images/wallpaper/06.png',description:'最权威的数据中心',external: true},
            {name:"立创硬件开源社",url:"https://oshwhub.com/",image:'/images/wallpaper/07.png',description:'嵌入式宝藏网站',external: true},
            {name:"立创开发板资料中心",url:"https://wiki.lckfb.com/zh-hans/",image:'/images/wallpaper/08.png',description:'嵌入式宝藏网站',external: true},
            {name:"RFC标准规范文档",url:"https://www.rfc-editor.org/",image:'/images/wallpaper/09.png',description:'可以找到很多标准和规范',external: true},
            {name:"野火资料下载中心",url:"https://doc.embedfire.com/",image:'/images/wallpaper/10.png',description:'野火教程',external: true},
            {name:"免费FRP服务",url:"https://freefrp.net/",image:'/images/wallpaper/11.png',description:'freefrp',external: true},
            {name:"立创商城",url:"https://www.szlcsc.com/",image:'/images/wallpaper/12.png',description:'元器件一站式购买',external: true},
        ]
    },
    {
        category: "动漫",
        item: [
            {name:"仙逆",url:"https://v.qq.com/channel/cartoon",image:'/images/wallpaper/01.png',description:'看动漫啦',external: true},
            {name:"OK解析网",url:"https://okzyw.cc/",image:'/images/wallpaper/02.png',description:'OK视频解析网',external: true},
            {name:"努力鸭视频解析",url:"https://www.nuliya.top/vip/",image:'/images/wallpaper/03.png',description:'努力鸭视频解析',external: true},
            {name:"高清资源分享",url:"https://link3.cc/wf33",image:'/images/wallpaper/04.png',description:'别人分享的高清资源',external: true},
        ]
    },
    {
        category: "政务",
        item: [
            {name:"临港新片区人才服务系统",url:"https://rcfw.lingang.gov.cn/",image:'/images/wallpaper/01.png',description:'人才服务系统',external: true},
            {name:"软考",url:"https://www.ruankao.org.cn/",image:'/images/wallpaper/02.png',description:'计算机考试',external: true},
            {name:"国家电子税务局",url:"https://tpass.shanghai.chinatax.gov.cn:8443/",image:'/images/wallpaper/03.png',description:'个税',external: true},
            {name:"上海人才服务网",url:"https://www.shrc.com.cn/website/index",image:'/images/wallpaper/04.png',description:'人才服务系统',external: true},
            {name:"Gmail",url:"https://mail.google.com/",image:'/images/wallpaper/05.png',description:'Google邮箱',external: true},
            {name:"中国政府网",url:"https://www.gov.cn/",image:'/images/wallpaper/06.png',description:'中国政府网看权威新闻',external: true},
        ]
    },
    {
        category: "未整理",
        item: [
            {name:"待添加",url:"/",image:'/images/wallpaper/01.png',description:'无',external: false},
        ]
    },
]

/* navigate_database_sticky_projects */
export const navigate_database_sticky_projects = [
    {
        title: 'CCOS',
        description: '分布式操作系统',
        url: 'https://github.com/FlechazoCLF/CCOS',
        image: '',
        external: true,
    },
    {
        title: 'flechazo',
        description: '幻想改变世界',
        url: 'https://github.com/FlechazoCLF',
        image: '',
        external: true,
    },
    {
        title: 'CCTools',
        description: 'QT电脑工具箱',
        url: 'https://github.com/FlechazoCLF/CCTools',
        image: '',
        external: true,
    },
]

/****************************************************************************************************
* Function Interface
****************************************************************************************************/

/****************************************************************************************************
* File End!
****************************************************************************************************/
