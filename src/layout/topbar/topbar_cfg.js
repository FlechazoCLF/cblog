
/****************************************************************************************************
* File Start!
****************************************************************************************************/

import { Children } from "react";

/*
 *
 *  Copyright (c) 2024-2026 by flechazo. All rights reserved.
 *
 * Author : CarlChai LinFeng Chai flechazo
 * Website: flechazo.mba
 *
 * Change Logs:
 * Date           Author       Notes
 * 2025-07-16     cc          the first version
 *
*/

/****************************************************************************************************
* Include
****************************************************************************************************/

/* route */
import { cblog_route_get } from '../../route/route'

/****************************************************************************************************
* Define
****************************************************************************************************/

/****************************************************************************************************
* Type Define
****************************************************************************************************/

/****************************************************************************************************
* Variable
****************************************************************************************************/

/* topbar_cfg_list */
export let topbar_cfg_list = [
    /* fill page & children */
    /* page name url children */
    {page:'home',            name:"🚃flechazo",        url: "/", children:[]},
    {page:'blog',            name:"🎃blog",            url: "/", children:[]},
    {page:'about',           name:"🎡about",           url: "/", children:[]},
    {page:'category',        name:"🌅category",        url: "/", children:[]},
    {page:'articlelist',     name:"🚀articlelist",     url: "/", children:[]},
    {page:'csay',            name:"🧮csay",            url: "/", children:[]},
    {page:'project',         name:"🛝project",         url: "/", children:[]},
    {page:'wonderful',       name:"🥯wonderful",       url: "/", children:[
        {page:'wonderful_love',       name:"💝love",       url: "/"},
        {page:'wonderful_calendar',   name:"📅calendar",   url: "/"},
        {page:'wonderful_chat',       name:"🎰chat",       url: "/"},
        {page:'wonderful_cook',       name:"🍛cook",       url: "/"},
        {page:'wonderful_english',    name:"📖english",    url: "/"},
        {page:'wonderful_emerge',     name:"🐌emerge",     url: "/"},
        {page:'wonderful_map',        name:"🗺map",        url: "/"},
    ]},
    {page:'friend',          name:"👾friend",          url: "/", children:[]},
]

/****************************************************************************************************
* Function Interface
****************************************************************************************************/

/****************************************************************************************************
* Topbar_Cfg_Route_Get()
****************************************************************************************************/
function Topbar_Cfg_Route_Get(pageList) {
    do
    {
        /* init list */
        for (let index = 0; index < pageList.length; index++)
        {
            let element = pageList[index];
            /* get route */
            const route = cblog_route_get(element.page);
            /* set url */
            element.url = route.url;
            /* sub item */
            if (element.children && (element.children.length > 0))
            {
                Topbar_Cfg_Route_Get(element.children);
            }
        }
    }while(0);
}

/****************************************************************************************************
* Topbar_Cfg_Init()
****************************************************************************************************/
export function Topbar_Cfg_Init() {

    do
    {
        /* init list */
        Topbar_Cfg_Route_Get(topbar_cfg_list);
    }while(0);

}

/****************************************************************************************************
* Topbar_Cfg_Get()
****************************************************************************************************/
export function Topbar_Cfg_Get() {
    let topbar_cfg = null;

    do
    {
        /* check */
        /* impletement */
        topbar_cfg = topbar_cfg_list;
    }while(0);

    return topbar_cfg;
}

/****************************************************************************************************
* File End!
****************************************************************************************************/
