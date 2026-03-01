
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
 * 2025-07-17     cc          the first version
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

/* cblog_route_list */
export const cblog_route_list = [
    /* flechazo */
    {page:"home",               name:"flechazo",       url:"/",                           description:"导航页面是网站默认的首页"},
    {page:"navigate",           name:"导航",           url:"/",                           description:"导航页面记录了所有常用的网站工具等等"},
    {page:"blog",               name:"博客",           url:"/blog",                       description:"flechazo小柴的个人博客页面记录我的精彩绝伦"},
    {page:"about",              name:"关于",           url:"/blog/about",                 description:"关于我的小世界"},
    {page:"category",           name:"分类",           url:"/blog/category",              description:"分类页面"},
    {page:"article",            name:"文章",           url:"/blog/articles",              description:"文章页面"},
    {page:"articlelist",        name:"文章列表",       url:"/blog/articlelist",           description:"文章列表"},
    {page:"csay",               name:"碎碎念",         url:"/blog/csay",                  description:"碎碎念这里是flechazo的时光飞船"},
    {page:"project",            name:"事业",           url:"/blog/project",               description:"项目管理页面"},
    {page:"friend",             name:"朋友圈",         url:"/blog/friend",                description:"flechazo的朋友们"},
    {page:"wonderful",          name:"精彩页",         url:"/blog/wonderful",             description:"一些精彩的个性页面"},
    {page:"wonderful_calendar", name:"日程",           url:"/blog/wonderful_calendar",    description:"一套日程系统"},
    {page:"wonderful_love",     name:"爱情",           url:"/blog/wonderful_love",        description:"爱情的绚烂在这里绽放"},
    {page:"wonderful_chat",     name:"轻语",           url:"/blog/wonderful_chat",        description:"轻语有趣的对话页面"},
    {page:"wonderful_cook",     name:"厨艺",           url:"/blog/wonderful_cook",        description:"记录着我做过的美食"},
    {page:"wonderful_english",  name:"英语",           url:"/blog/wonderful_english",     description:"英语学习的页面"},
    {page:"wonderful_emerge",   name:"架构设计工具",   url:"/blog/wonderful_emerge",      description:"这里采用分层展开的方式记录复杂的架构"},
    {page:"wonderful_map",      name:"地图",           url:"/blog/Wonderful_map",         description:"地图页面"},

    /* external */
    {page:"github",        name:"github",      url:"https://github.com/FlechazoCLF",         description:""},
]

/****************************************************************************************************
* Function Interface
****************************************************************************************************/

/****************************************************************************************************
* cblog_route_get()
****************************************************************************************************/
export function cblog_route_get(page) {
    let route = null;

    do
    {
        /* check parameter */
        if(page == "")
        {
            continue
        }
        /* impletement */
        /* find page */
        for (let index = 0; index < cblog_route_list.length; index++)
        {
            const element = cblog_route_list[index];
            if(element.page == page)
            {
                route = cblog_route_list[index];
                break;
            }
        }

    }while(0);

    return route;
}

/****************************************************************************************************
* cblog_route_init()
****************************************************************************************************/
export function cblog_route_init() {

    do
    {

    }while(0);

    return (
        <div>

        </div>
    );
}

/****************************************************************************************************
* cblog_route()
****************************************************************************************************/
export function cblog_route() {

    do
    {

    }while(0);

    return (
        <div>

        </div>
    );
}

/****************************************************************************************************
* File End!
****************************************************************************************************/
