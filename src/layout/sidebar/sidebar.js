
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
/* react-dom portal */
import { createPortal } from 'react-dom';
/* react-router-dom */
import { Link } from 'react-router-dom';
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
/* cfg */
import { Sidebar_Cfg_Announcement_Get } from './sidebar_cfg'
/* music player */
import { Music_Player } from '../music/music_player'
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
* Sidebar_Announcement_Modal()
****************************************************************************************************/
function Sidebar_Announcement_Modal({ items, onClose, theme }) {

    return (
        <div
            onClick={onClose}
            style={{
                /* layout */
                position: 'fixed',
                inset: 0,
                zIndex: 10000,
                /* center */
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                /* color */
                background: theme.total.overlay,
                /* animation */
                backdropFilter: 'blur(2px)',
                zIndex: 10000,
            }}
        >
            {/* modal */}
            <div
                onClick={e => e.stopPropagation()}
                style={{
                    /* layout */
                    width: '100%',
                    maxWidth: '460px',
                    maxHeight: '70vh',
                    overflowY: 'auto',
                    scrollbarWidth: 'none',
                    /* padding */
                    padding: '24px',
                    /* style */
                    background: theme.total.elevated,
                    borderRadius: '20px',
                    boxShadow: theme.total.shadowLg,
                }}
            >
                {/* header */}
                <div
                    style={{
                        /* layout */
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '16px',
                    }}
                >
                    <div
                        style={{
                            /* layout */
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            /* font */
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                            color: theme.sidebar.primary,
                        }}
                    >
                        📢 公告
                    </div>
                    <button
                        onClick={onClose}
                        title="关闭"
                        style={{
                            /* style */
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            /* font */
                            fontSize: '1.3rem',
                            lineHeight: 1,
                            color: theme.total.textMuted,
                        }}
                        /* mouse */
                        onMouseEnter={e => { e.currentTarget.style.color = theme.total.error; }}
                        onMouseLeave={e => { e.currentTarget.style.color = theme.total.textMuted; }}
                    >
                        ×
                    </button>
                </div>

                {/* list */}
                <div
                    style={{
                        /* layout */
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '14px',
                    }}
                >
                    {items.map(item => (
                        <Link
                            to={item.link}
                            key={item.id}
                            style={{
                                /* position */
                                position: 'relative',
                                /* style */
                                background: theme.total.surface,
                                border: `1px solid ${theme.total.borderSecondary}`,
                                borderRadius: '14px',
                                padding: '14px 16px',
                                paddingRight: '34px',
                            }}
                        >
                            {/* date */}
                            {item.date && (
                                <div
                                    style={{
                                        fontSize: '0.72rem',
                                        color: theme.total.textMuted,
                                        marginBottom: '4px',
                                    }}
                                >
                                    {item.date}
                                </div>
                            )}
                            {/* title */}
                            {item.title && (
                                <div
                                    style={{
                                        /* font */
                                        fontWeight: 'bold',
                                        fontSize: '0.95rem',
                                        color: theme.total.textPrimary,
                                        marginBottom: '4px',
                                    }}
                                >
                                    {item.title}
                                </div>
                            )}
                            {/* content */}
                            <div
                                style={{
                                    fontSize: '0.88rem',
                                    color: theme.total.textPrimary,
                                    lineHeight: 1.6,
                                }}
                            >
                                {item.text}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

/****************************************************************************************************
* Sidebar_Announcement()
****************************************************************************************************/
export function Sidebar_Announcement() {
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    /* get visible items */
    const items = Sidebar_Cfg_Announcement_Get();
    /* announcement summary */
    const summary = (items.length === 1) ? (items[0].title || items[0].text) : `${items.length} 条新公告`;

    return (
        <>
            {/* announcement */}
            <div
                onClick={() => setOpen(true)}
                title="点击查看全部公告哦🌅"
                style={{
                    /* layout */
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    /* single line */
                    overflow: 'hidden',
                    /* style */
                    cursor: 'pointer',
                    padding: '10px 14px',
                    borderRadius: '12px',
                }}
                /* mouse */
                onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = theme.total.shadowSm;
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = 'none';
                }}
            >
                {/* icon */}
                <span style={{ flexShrink: 0 }}>📢</span>
                {/* announcement count */}
                <span
                    style={{
                        /* layout */
                        flexShrink: 0,
                        /* style */
                        fontSize: '0.7rem',
                        fontWeight: 'bold',
                        color: theme.total.textInverse,
                        background: theme.total.primary,
                        borderRadius: '10px',
                        padding: '1px 7px',
                    }}
                >
                    {items.length}
                </span>
                {/* summary */}
                <span
                    style={{
                        /* layout */
                        flex: 1,
                        minWidth: 0,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        /* font */
                        fontSize: '0.85rem',
                        color: theme.total.textPrimary,
                    }}
                >
                    {summary}
                </span>
            </div>

            {/* modal */}
            {open && createPortal(
                <Sidebar_Announcement_Modal
                    items={items}
                    onClose={() => setOpen(false)}
                    theme={theme}
                />,
                document.body
            )}
        </>
    );
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
                    transition: 'all 0.3s ease',
                }}
                /* mouse */
                onMouseEnter={e => {
                    e.currentTarget.style.transform = 'scale(1.25)';
                    e.currentTarget.style.boxShadow = theme.total.shadowSm;
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
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
                        <Link 
                            to={item.url} 
                            style={{
                                /* layout */
                                display: 'block',
                                position: 'relative',
                                /* padding */
                                padding: '10px',
                                borderRadius : '10px',
                            }}
                            /* mouse */
                            onMouseEnter={e => {
                                e.currentTarget.style.background = theme.navigate.hover;
                                /* Show children if they exist */
                                const parentDiv = e.currentTarget.parentNode.parentNode;
                                const childrenDiv = parentDiv.querySelector('div:nth-child(2)');
                                if (childrenDiv)
                                {
                                    childrenDiv.style.display = 'block';
                                }
                            }}
                            onMouseLeave={e => {
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
                        </Link>
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
                        onMouseEnter={e => {
                            e.currentTarget.style.display = 'block';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.display = 'none';
                        }}
                    >
                        {item.children.map(child => (
                            <Link 
                                to={child.url} 
                                style={{
                                    /* layout */
                                    display: 'block',
                                    /* padding */
                                    padding: '8px',
                                    borderRadius: '8px',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.background = theme.navigate.hover;
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.background = "transparent";
                                }}
                            >
                                {child.name}
                            </Link>
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
        <div
            style={{
                /* layout */
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                /* sticky */
                position: 'sticky',
                alignSelf: 'flex-start',
                overflowY: 'auto',
                scrollbarWidth: 'none',
                /* animation */
                transition: 'all 0.5s ease',
                marginLeft: isOpenSidebar ? '64px' : '0',
                width: isOpenSidebar ? '320px' : '0',
                opacity: isOpenSidebar ? 1 : 0,
            }}
        >
            {/* announcement */}
            <Sidebar_Announcement />
            {/* sidebar */}
            <aside
                style={{
                    /* layout */
                    display: 'flex',
                    flexDirection: 'column',
                    flexShrink: 0,
                    padding: isOpenSidebar ? '32px 16px' : '0',
                    /* style */
                    borderRadius: '32px',
                }}
                /* mouse */
                onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = theme.total.shadowMd;
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = 'none';
                }}
            >
                {isOpenSidebar && (
                    <>
                        {/* profile */}
                        <Sidebar_Profile />
                        {/* social */}
                        <Sidebar_Social />
                        {/* navigate */}
                        <Sidebar_Navigate />
                        {/* tail */}
                        <Sidebar_Tail />
                    </>
                )}
            </aside>
            {/* music player */}
            {isOpenSidebar && (
                <Music_Player />
            )}
        </div>
    );
}

/****************************************************************************************************
* File End!
****************************************************************************************************/
