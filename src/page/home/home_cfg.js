
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
 * 2026-07-21     cc          create home page config (browser start page)
 * 2026-07-22     cc          add switchable search engines
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

/* home page config — all content driven by this file */
export const home_cfg = {
    /* name & subtitle */
    name: "Flechazo",
    subtitle: "我在人间贩卖黄昏 🌅 只为收集世间温柔遇见你",

    /* city for decorative weather */
    city: "上海",

    /* search engines — switchable in the search bar */
    searchEngines: [
        { name: "Google",  url: "https://www.google.com/search", param: "q" },
        { name: "Baidu",   url: "https://www.baidu.com/s",       param: "wd"},
        { name: "Bing",    url: "https://www.bing.com/search",   param: "q" },
    ],

    /* daily quote pool (rotate by day) */
    quotes: [
        { text: "代码是写给人看的，附带能在机器上运行。", author: "Linus Torvalds" },
        { text: "生活不止眼前的苟且，还有诗和远方的田野。", author: "高晓松" },
        { text: "你只有一次生命，所以去做让你真正快乐的事。", author: "YOLO" },
        { text: "世界上所有的惊喜和好运，都是你累积的温柔和善良。", author: "佚名" },
        { text: "愿有岁月可回首，且以深情共白头。", author: "佚名" },
        { text: "种一棵树最好的时间是十年前，其次是现在。", author: "谚语" },
    ],

    /* shuoshuo list (static, show the latest one) */
    shuoshuo: [
        { text: "今天把博客首页重新设计成了浏览器主页，感觉还不错~", time: "2026-07-21" },
        { text: "夏天的晚风，和冰镇西瓜最配了。", time: "2026-07-18" },
        { text: "周末去爬山，山顶的风景真的值得。", time: "2026-07-12" },
    ],

    /* social / contact links */
    socials: [
        { name: "GitHub",  short: "GH", url: "https://github.com/FlechazoCLF" },
        { name: "微信",     short: "WX", url: "" },
        { name: "QQ",      short: "QQ", url: "" },
        { name: "邮箱",     short: "@",  url: "mailto:hello@flechazo.mba" },
    ],

    /* quick navigation grid */
    navs: [
        { name: "首页",   icon: "🏠", url: "/" },
        { name: "导航",   icon: "🧭", url: "/navigate" },
        { name: "博客",   icon: "📝", url: "/blog" },
        { name: "碎碎念", icon: "💬", url: "/blog/csay" },
        { name: "关于",   icon: "🌅", url: "/blog/about" },
        { name: "Qwen",   icon: "🧠", url: "https://chat.qwen.ai/" },
    ],
};

/****************************************************************************************************
* Function Interface
****************************************************************************************************/

/* pick a quote by day so it changes daily but stays stable within a day */
export function home_quote_get() {
    let idx = 0;
    let list = null;

    do {
        list = home_cfg.quotes;
        if ((list == null) || (list.length == 0)) {
            break;
        }
        /* use day-of-year as index -> stable per day */
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0);
        const diff = now - start;
        const dayOfYear = Math.floor(diff / 86400000);
        idx = dayOfYear % list.length;
    } while (0);

    return list[idx];
}

/* get the latest shuoshuo */
export function home_shuoshuo_get() {
    let result = null;

    do {
        if ((home_cfg.shuoshuo == null) || (home_cfg.shuoshuo.length == 0)) {
            break;
        }
        result = home_cfg.shuoshuo[0];
    } while (0);

    return result;
}

/****************************************************************************************************
* File End!
****************************************************************************************************/
