
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
 * 2025-07-16     cc          the first version
 * 2025-08-07     cc          add sub navigate
 *
*/

/****************************************************************************************************
* Include
****************************************************************************************************/

/* react */
import React, { useState, useEffect } from 'react';
/* navigate config */
import { Navigate_Cfg_Category_Get } from '../../page/navigate/navigate_cfg';
/* topbar cfg */
import { Topbar_Cfg_Get } from '../topbar/topbar_cfg'
/* window */
import { Window_Get_Width } from '../../kernel/window/window';
/* hover ball */
import { Hoverball_Item_Register,Hoverball_Item_Update } from '../hoverball/hoverball'
/* sidebar state */
import { Sidebar_State,useSidebarState } from './sidebar_state'
/* theme */
import { useTheme } from '../../kernel/theme/theme'

/****************************************************************************************************
* Define
****************************************************************************************************/

/****************************************************************************************************
* Type Define
****************************************************************************************************/

/****************************************************************************************************
* Variable
****************************************************************************************************/

/****************************************************************************************************
* Function Interface
****************************************************************************************************/

/****************************************************************************************************
* Sidebar_Init()
****************************************************************************************************/
export function Sidebar_Init() {

    do
    {
        /* register hoverball */
        Hoverball_Item_Register({
            name:"Sidebar",
            icon:"◀",
            label:"收起侧边栏",
            onClickFunc:Sidebar_Click,
            active:Sidebar_State.get(),
            color:"#ff6b6b",
        });
    }while(0);

}

/****************************************************************************************************
* Sidebar_Click()
****************************************************************************************************/
export function Sidebar_Click() {

    do
    {
        /* toggle */
        Sidebar_State.toggle();
        /* update hoverball */
        Hoverball_Item_Update("Sidebar",{
            icon:Sidebar_State.get() ? "◀" : "▶",
            label:Sidebar_State.get() ? "收起侧边栏" : "展开侧边栏",
            active:Sidebar_State.get(),
        });
    }while(0);
}

/****************************************************************************************************
* Sidebar_Profile()
****************************************************************************************************/
export function Sidebar_Profile() {
    const theme = useTheme();

    do
    {

    }while(0);

    return (
        /* profile */
        <div>
            {/* avatar */}
            <img
                src={process.env.PUBLIC_URL + '/images/avatar/avatar.jpg'}
                style={{
                    /* size */
                    width: '50%',
                    /* position */
                    display: 'block',
                    margin: '0 auto',
                    /* style */
                    borderRadius: '32px',
                }}
                /* mouse */
                onMouseOver={e => {
                    e.currentTarget.style.transform = 'scale(1.25)';
                    e.currentTarget.style.boxShadow = theme.total.shadowSm;
                }}
                onMouseOut={e => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = theme.total.shadowMd;
                }}
            />
            {/* name */}
            <h2
                style={{
                    /* layout */
                    textAlign: 'center',
                    margin: '16px',
                }}
            >
                flechazo
            </h2>
            <p
                style={{
                    /* layout */
                    textAlign: 'center',
                }}
            >
                我在人间贩卖黄昏🌅<br/>
                只为收集世间温柔遇见你!
            </p>
        </div>
    );
}

/****************************************************************************************************
* Sidebar_Social()
****************************************************************************************************/
export function Sidebar_Social() {
    let socials = null;

    do
    {
        /* get socials */
        socials = Navigate_Cfg_Category_Get('flechazo');
    }while(0);

    return (
        /* Social */
        <div 
            style={{
                /* layout */
                display: 'flex',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
            }}
        >
            {socials.item.map( item => (
                <div 
                    style={{
                        /* size */
                        margin:'8px 1px',
                    }}
                >
                    {/* icon */}
                    <img src={item.icon}></img>
                    {/* name */}
                    <a href={item.url}>
                        {item.name}
                    </a>
                </div>
            ))}
        </div>
    );
}

/****************************************************************************************************
* Sidebar_Navigate()
****************************************************************************************************/
export function Sidebar_Navigate() {
    let topbar_cfg = null;
    const theme = useTheme();

    do
    {
        /* get cfg */
        topbar_cfg = Topbar_Cfg_Get();
    }while(0);

    return (
        <div 
            style={{
                /* layout */
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
                /* style */
                margin: '20px 20px',
                scrollbarWidth: 'none',
            }}
        >
            {/* create topbar navigate */}
            {topbar_cfg.map((item)=>(
                <div>
                    {/* root */}
                    <div>
                        <a 
                            href={item.url} 
                            style={{
                                /* layout */
                                display: 'block',
                                position: 'relative',
                                /* padding */
                                padding: '10px',
                                borderRadius : '10px',
                            }}
                            /* mouse */
                            onMouseOver={e => {
                                e.currentTarget.style.background = theme.navigate.hover;
                                /* Show children if they exist */
                                const parentDiv = e.currentTarget.parentNode.parentNode;
                                const childrenDiv = parentDiv.querySelector('div:nth-child(2)');
                                if (childrenDiv)
                                {
                                    childrenDiv.style.display = 'block';
                                }
                            }}
                            onMouseOut={e => {
                                e.currentTarget.style.background = 'transparent';
                                /* Hide children by child */
                                const parentDiv = e.currentTarget.parentNode.parentNode;
                                const childrenDiv = parentDiv.querySelector('div:nth-child(2)');
                                if (childrenDiv)
                                {
                                    childrenDiv.style.display = 'none';
                                }
                            }}
                        >
                            {item.name}
                        </a>
                    </div>
                    {/* children */}
                    {item.children && item.children.length > 0 && (
                    <div 
                        style={{
                            /* layout */
                            display: 'none',
                            marginLeft: '20px',
                            /* padding */
                            padding: '5px',
                            borderRadius: '8px',
                        }}
                        onMouseOver={e => {
                            e.currentTarget.style.display = 'block';
                        }}
                        onMouseOut={e => {
                            e.currentTarget.style.display = 'none';
                        }}
                    >
                        {item.children.map(child => (
                            <a 
                                href={child.url} 
                                style={{
                                    /* layout */
                                    display: 'block',
                                    /* padding */
                                    padding: '8px',
                                    borderRadius: '8px',
                                }}
                                onMouseOver={e => {
                                    e.currentTarget.style.background = theme.navigate.hover;
                                }}
                                onMouseOut={e => {
                                    e.currentTarget.style.background = theme.navigate.background;
                                }}
                            >
                                {child.name}
                            </a>
                        ))}
                    </div>
                    )}
                </div>
            ))}
        </div>
    );
}

/****************************************************************************************************
* Sidebar_Tail()
****************************************************************************************************/
export function Sidebar_Tail() {

    do
    {

    }while(0);

    return (
        /* tail */
        <div
            style={{
                /* position */
                textAlign: 'center',
                margin:'40px 0 20px 0',
            }}
        >
            倘若事与愿违，上天另有安排🚃！
        </div>
    );
}

/****************************************************************************************************
* Sidebar()
****************************************************************************************************/
export function Sidebar() {
    const theme = useTheme();
    /* open/close sidebar button */
    const [isOpenSidebar, setisOpenSidebar] = useState(Sidebar_State.get());
    useEffect(() => {
        const unsubscribe = Sidebar_State.subscribe(setisOpenSidebar);
        return unsubscribe;
    }, []);
    return (
        <div>
            {/* sidebar */}
            <aside 
                style={{
                    /* layout */
                    display: 'flex',
                    flexDirection: 'column',
                    top: '80px',
                    position: 'sticky',
                    marginLeft: isOpenSidebar ? '64px' : '0',
                    /* size */
                    width: isOpenSidebar ? '320px' : '0',
                    padding: isOpenSidebar ? '32px 16px' : '0',
                    maxHeight: 'calc(120vh - 80px - 40px)',
                    /* color */
                    background: theme.total.surfaceSecondary,
                    backdropFilter: 'blur(15px)',
                    /* animation */
                    transition: 'all 0.5s ease, transform 0.5s ease, opacity 0.5s ease',
                    transform: isOpenSidebar ? 'translateX(0)' : 'translateX(-100%)',
                    opacity: isOpenSidebar ? 1 : 0,
                    /* other */
                    overflow: isOpenSidebar ? 'visible' : 'hidden',
                    /* style */
                    borderRadius: '32px',
                    boxShadow: theme.total.shadowSm,
                }}
                /* mouse */
                onMouseOver={e => {
                    e.currentTarget.style.transform = 'translateY(-1px) scale(1.01)';
                    e.currentTarget.style.boxShadow = theme.total.shadowMd;
                }}
                onMouseOut={e => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = theme.total.shadowSm;
                }}
            >
                {isOpenSidebar && (
                    <>
                        {/* profile */}
                        {Sidebar_Profile()}
                        {/* social */}
                        {Sidebar_Social()}
                        {/* navigate */}
                        {Sidebar_Navigate()}
                        {/* tail */}
                        {Sidebar_Tail()}
                    </>
                )}
            </aside>
        </div>
    );
}

/****************************************************************************************************
* File End!
****************************************************************************************************/
