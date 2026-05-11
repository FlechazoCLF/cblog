
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
import React, { useContext } from 'react';
/* author */
import { Author_Get } from '../../kernel/author/author';
/* cfg */
import { Topbar_Cfg_Init,Topbar_Cfg_Get } from './topbar_cfg'
/* route */
import { cblog_route_get } from '../../route/route'
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
* Topbar_Init()
****************************************************************************************************/
export function Topbar_Init() {

    do
    {
        /* cfg init */
        Topbar_Cfg_Init();
    }while(0);

}

/****************************************************************************************************
* Topbar_Show_Logo()
****************************************************************************************************/
function Topbar_Show_Logo() {
    let home = null;
    const theme = useTheme();

    do
    {
        /* get route */
        home = cblog_route_get("home");
    }while(0);

    return (
        <div>
            <a 
                href={home.url}
            >
                <img
                    /* logo */
                    src={process.env.PUBLIC_URL + '/images/avatar/avatar.jpg'}
                    alt="flechazo"
                    style={{
                        height: '55px',
                        borderRadius: '45px',
                    }}
                    /* mouse */
                    onMouseOver={e => {
                        e.currentTarget.style.transform = 'scale(1.25)';
                        e.currentTarget.style.boxShadow = theme.total.shadowMd;
                    }}
                    onMouseOut={e => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = theme.total.shadowSm;
                    }}
                />
            </a>
        </div>
    );
}

/****************************************************************************************************
* Topbar_Show_Navigate()
****************************************************************************************************/
function Topbar_Show_Navigate() {
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
                flexDirection: 'row',
                /* padding */
                gap: '10px',
                alignItems: 'center',
            }}
        >
            {/* create topbar navigate */}
            {topbar_cfg.map((item)=>(
                <div 
                    style={{
                        /* layout */
                        position: 'relative',
                        justifyContent: 'center',
                    }}
                >
                    {/* root */}
                    <div>
                        <a 
                            href={item.url}
                            style={{
                                /* layout */
                                display: 'flex',
                                position: 'relative',
                                /* padding */
                                padding: '10px',
                                borderRadius : '10px',
                            }}
                            /* mouse */
                            onMouseOver={e => {
                                e.currentTarget.style.background = theme.total.surfaceSecondary;
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
                            position: 'absolute',
                            top: '100%',
                            width: '100%',
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
                                    background: theme.total.surfaceSecondary,
                                }}
                                onMouseOver={e => {
                                    e.currentTarget.style.background = theme.total.surfaceHover;
                                }}
                                onMouseOut={e => {
                                    e.currentTarget.style.background = theme.total.surfaceSecondary;
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
* Topbar_Show_QuickLink()
****************************************************************************************************/
function Topbar_Show_QuickLink() {
    let github = null;
    const theme = useTheme();
    /* author */
    const AuthContext = Author_Get();
    const { isAuthenticated, login, logout } = useContext(AuthContext);

    do
    {
        github = cblog_route_get("github");
    }while(0);

    return (
        <div>
            {/* github */}
            <a href={github.url}>
                {github.name}
            </a>
            {/* login */}
            <button
                style={{
                    /* position */
                    margin: '0px 16px',
                    padding: '4px 32px',
                    /* font */
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    /* style */
                    borderRadius: '18px',
                    boxShadow: theme.total.shadowSm,
                    cursor: 'pointer',
                }}
                /* mouse */
                onClick={isAuthenticated ? () => logout() : () => login('flechazo','')}
                onMouseOver={e => {
                    e.currentTarget.style.transform = 'scale(1.25)';
                    e.currentTarget.style.boxShadow = theme.total.shadowMd;
                }}
                onMouseOut={e => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = theme.total.shadowSm;
                }}
            >
                {isAuthenticated ? (
                    <span>登出</span>
                ):(
                    <span>登录</span>
                )}
            </button>
        </div>
    );
}

/****************************************************************************************************
* Topbar_Show()
****************************************************************************************************/
function Topbar_Show() {

    do
    {

    }while(0);

    return (
        <div
            style={{
                /* Horizontal Layout */
                display: 'flex',
                /* layout : 1   111   1 */
                justifyContent: 'space-between',
                /* center */
                alignItems: 'center',
                /* size */
                height: 64,
                padding: '0 8px',
            }}
        >
            {/* logo */}
            {Topbar_Show_Logo()}
            {/* navigate */}
            {Topbar_Show_Navigate()}
            {/* quick link */}
            {Topbar_Show_QuickLink()}
        </div>
    );
}

/****************************************************************************************************
* Topbar()
****************************************************************************************************/
export function Topbar() {
    const theme = useTheme();

    do
    {

    }while(0);

    return (
        <div
            style={{
                /* top */
                top: 10,
                position: 'sticky',
                zIndex: 10000,
                /* width */
                width: '80%',
                /* color */
                background: 'rgba(245, 245, 245, 0.6)',
                backdropFilter: 'blur(15px)',
                /* style */
                margin: '0 auto',
                borderRadius: '90px',
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
            {/* show */}
            {Topbar_Show()}
        </div>
    );
}

/****************************************************************************************************
* File End!
****************************************************************************************************/
