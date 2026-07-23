
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
 * 2025-09-01     cc          refactor navigate page
 *
*/

/****************************************************************************************************
* Include
****************************************************************************************************/

/* react */
import React, { useState, useEffect } from 'react';
/* router */
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
/* layout */
import { Topbar } from '../../layout/topbar/topbar'
import { Footer } from '../../layout/footer/footer'
/* navigate config */
import { navigate_cfg_list, navigate_cfg_sticky_projects, Navigate_Cfg_Category_Get, Navigate_Cfg_Item_Search } from './navigate_cfg';
/* route */
import { cblog_route_get } from '../../route/route'
/* theme */
import { useTheme } from '../../kernel/theme/theme'
/* color */
import { color_get } from '../../kernel/color/color'

/****************************************************************************************************
* Define
****************************************************************************************************/

/****************************************************************************************************
* Type Define
****************************************************************************************************/

/****************************************************************************************************
* Variable
****************************************************************************************************/

/* view mode table */
const navigate_view_mode_table = [
    {
        name: "card",
        title: "🎴 卡片",
        func: Navigate_Show_Navigate_Item_Card
    },
    {
        name: "grid",
        title: "🔲 网格",
        func: Navigate_Show_Navigate_Item_Grid
    },
    {
        name: "list",
        title: "📋 列表",
        func: Navigate_Show_Navigate_Item_List
    }
];

/****************************************************************************************************
* Function Interface
****************************************************************************************************/

/****************************************************************************************************
* Navigate_Show_Profile_avatar_image()
****************************************************************************************************/
function Navigate_Show_Profile_avatar_image() {
    let aboutpath = null;
    const theme = useTheme();

    do
    {
        aboutpath = cblog_route_get("about").url;
    }while(0);

    return (
        <div>
            {/* banner */}
            <img
                src={process.env.PUBLIC_URL + '/images/avatar/avatar.jpg'}
                alt="banner"
                style={{
                    /* position */
                    marginTop: '60px',
                    /* size */
                    width: '180px',
                    height: '180px',
                    /* style */
                    borderRadius: '45px',
                    objectFit: 'cover',
                    cursor: 'pointer',
                    transition: 'all 0.5s ease',
                }}
                /* mouse */
                onClick={() => window.location.href = aboutpath}
                onMouseEnter={e => {
                    e.currentTarget.style.transform = 'scale(1.45)';
                    e.currentTarget.style.boxShadow = theme.total.shadowMd;
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = theme.total.shadowSm;
                }}
            />
        </div>
    )
}

/****************************************************************************************************
* Navigate_Show_Profile_avatar_title()
****************************************************************************************************/
function Navigate_Show_Profile_avatar_title() {
    let aboutpath = null;
    const theme = useTheme();

    do
    {
        aboutpath = cblog_route_get("about").url;
    }while(0);

    return (
        <div>
            {/* title */}
            <div 
                style={{
                    /* color */
                    color: theme.total.primary,
                    /* font */
                    fontSize: '4rem',
                    fontWeight: 'bold',
                    letterSpacing: 8,
                    /* shadow */
                    textShadow: theme.total.shadowXs,
                }}
            >
                Flechazo
            </div>
            {/* subtitle */}
            <div 
                style={{
                    /* size */
                    fontSize: '1rem', 
                    fontWeight: 'normal', 
                    /* color */
                    color: theme.total.description,
                }}
            >
                我在人间贩卖黄昏🌅<br/>
                只为收集世间温柔遇见你
            </div>
            {/* button */}
            <button
                style={{
                    /* position */
                    marginTop: '60px',
                    padding: '10px 20px',
                    /* font */
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    /* style */
                    borderRadius: '18px',
                    boxShadow: theme.total.shadowSm,
                    cursor: 'pointer',
                }}
                /* mouse */
                onClick={() => window.location.href = aboutpath}
                onMouseEnter={e => {
                    e.currentTarget.style.transform = 'scale(1.25)';
                    e.currentTarget.style.boxShadow = theme.total.shadowMd;
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = theme.total.shadowSm;
                }}
            >
                <span>Just For Fun !</span>
            </button>
        </div>
    )
}

/****************************************************************************************************
* Navigate_Show_Profile()
****************************************************************************************************/
function Navigate_Show_Profile() {

    do
    {

    }while(0);

    return (
        <div style={{ 
                /* layout */
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                margin: '0 auto',
                /* top */
                marginTop: '80px',
                /* size */
                width: '60%',
            }}
        >
            {/* title */}
            <Navigate_Show_Profile_avatar_title />
            {/* banner */}
            <Navigate_Show_Profile_avatar_image />
        </div>
    );
}

/****************************************************************************************************
* Navigate_Show_Sticky()
****************************************************************************************************/
export function Navigate_Show_Sticky() {
    const theme = useTheme();

    do
    {

    }while(0);

    return (
        /* sticky project */
        <div 
            style={{
                /* layout */
                display: 'flex',
                justifyContent: 'center',
                /* gap */
                gap: '64px',
                margin: '90px 0',
            }}
        >
            {/* project */}
            {navigate_cfg_sticky_projects.map((item, idx) => {
                /* common props for both internal and external links */
                const commonProps = {
                    style: {
                        /* layout */
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        /* size */
                        width: '280px',
                        height: '140px',
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                        /* color */
                        background: theme.card.background,
                        /* style */
                        borderRadius: '18px',
                        boxShadow: theme.total.shadowSm,
                        transition: 'all 0.5s ease',
                    },
                    /* mouse */
                    onMouseEnter: e => {
                        e.currentTarget.style.transform = 'scale(1.25)';
                        e.currentTarget.style.boxShadow = theme.total.shadowMd;
                        e.currentTarget.style.background = theme.card.hover;
                    },
                    onMouseLeave: e => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = theme.total.shadowSm;
                        e.currentTarget.style.background = theme.card.background;
                    },
                };
                /* link content */
                const linkContent = (
                    <>
                        {/* title */}
                        <div 
                            style={{
                                marginBottom: '8px'
                            }}
                        >
                            {item.title}
                        </div>
                        {/* description */}
                        <div 
                            style={{
                                /* size */
                                fontWeight: 'normal',
                                fontSize: '0.95rem',
                                /* color */
                                color: theme.card.description
                            }}
                        >
                            {item.description}
                        </div>
                    </>
                );
                /* conditional rendering: external links use <a>, internal links use <Link> */
                return item.external ? (
                    <a
                        key={idx}
                        href={item.url}
                        {...commonProps}
                    >
                        {linkContent}
                    </a>
                ) : (
                    <Link
                        key={idx}
                        to={item.url}
                        {...commonProps}
                    >
                        {linkContent}
                    </Link>
                );
            })}
        </div>
    );
}

/****************************************************************************************************
* Navigate_Show_Navigate_Signature()
****************************************************************************************************/
function Navigate_Show_Navigate_Signature() {

    do
    {

    }while(0);

    return (
        <div 
            style={{
                /* position */
                textAlign: 'center',
                /* font */
                fontWeight: 'bold',
                fontSize: '2.2rem',
                letterSpacing: 2
            }}
        >
            You Only Live Once!
        </div>
    );
}

/****************************************************************************************************
* Navigate_Show_Navigate_Control()
****************************************************************************************************/
function Navigate_Show_Navigate_Control({searchTerm,setSearchTerm,viewMode,setViewMode}) {
    const theme = useTheme();

    do
    {

    }while(0);

    return (
        /* navigate control */
        <div
            style={{
                /* display */
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'wrap',
                /* style */
                gap: '20px',
                margin: '30px 0',
            }}
        >
            {/* search */}
            <div 
                style={{
                    /* display */
                    position: 'relative',
                }}
            >
                <input
                    type="text"
                    placeholder="🔍搜索网站..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        /* display */
                        padding: '12px 20px',
                        outline: 'none',
                        width: '300px',
                        /* font */
                        fontSize: '16px',
                        /* style */
                        border: `2px solid ${theme.total.border}`,
                        borderRadius: '25px',
                        transition: 'all 0.3s ease',
                        backgroundColor: theme.total.background,
                        boxShadow: theme.total.shadowSm
                    }}
                    onFocus={(e) => {
                        e.target.style.borderColor = theme.total.primary;
                        e.target.style.boxShadow = theme.total.shadowMd;
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = theme.total.border;
                        e.target.style.boxShadow = theme.total.shadowSm;
                    }}
                />
            </div>

            {/* view mode */}
            <div 
                style={{
                    /* display */
                    display: 'flex',
                    padding: '4px',
                    /* style */
                    backgroundColor: theme.total.background,
                    borderRadius: '25px',
                    boxShadow: theme.total.shadowSm,
                }}
            >
                {navigate_view_mode_table.map(
                    (item) => (
                        <button
                            onClick={() => setViewMode(item.name)}
                            style={{
                                /* display */
                                padding: '8px 16px',
                                /* style */
                                border: 'none',
                                borderRadius: '20px',
                                background: viewMode === item.name ? theme.total.primary : 'transparent',
                                color: viewMode === item.name ? theme.total.textInverse : theme.total.textPrimary,
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {item.title}
                        </button>
                    )
                )}
            </div>
        </div>
    );
}

/****************************************************************************************************
* Navigate_Show_Navigate_Category()
****************************************************************************************************/
function Navigate_Show_Navigate_Category({activeCategory,setActiveCategory}) {
    const theme = useTheme();

    do
    {

    }while(0);

    return (
        <div
            style={{
                /* layout */
                display: 'flex',
                justifyContent: 'center',
                /* size */
                gap: '32px',
                margin: '40px 0 32px 0',
            }}
        >
            {/* category */}
            {navigate_cfg_list.map((section, idx) => (
                <div
                    /* style */
                    style={{
                        /* position */
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '18px',
                        /* size */
                        width: '120px',
                        height: '50px',
                        /* color */
                        color: activeCategory === section.category ? theme.total.background : theme.total.text,
                        background: activeCategory === section.category ? theme.total.primary : theme.total.background,
                        /* font */
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                        /* style */
                        cursor: 'pointer',
                        boxShadow: activeCategory === section.category ? `0 18px 16px ${theme.total.primary}33` : theme.total.shadowSm,
                        border: `1px solid ${theme.total.border}`,
                        transition: 'all 0.2s',
                    }}
                    /* set active category */
                    onClick={() => setActiveCategory(section.category)}
                    /* mouse */
                    onMouseEnter={e => {
                        e.currentTarget.style.fontSize = '1.2rem';
                        e.currentTarget.style.boxShadow = theme.total.shadowMd;
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.fontSize = '1.1rem';
                        e.currentTarget.style.boxShadow = theme.total.shadowSm;
                    }}
                >
                    {section.category}
                </div>
            ))}
        </div>
    );
}

/****************************************************************************************************
* Navigate_Show_Navigate_Item_Init()
****************************************************************************************************/
function Navigate_Show_Navigate_Item_Init() {
    let allCategory = null;

    do
    {
        /* init all items */
        allCategory = navigate_cfg_list.find(section => section.category === "全部");
        if(allCategory == null)
        {
            continue;
        }
        /* add all item */
        allCategory.item = navigate_cfg_list
            .filter(section => section.category !== "全部")
            .flatMap(section => section.item);
    }while(0);

    return (
        <div>

        </div>
    );
}

/****************************************************************************************************
* Navigate_Show_Item_Search_Info()
****************************************************************************************************/
function Navigate_Show_Item_Search_Info({activeCategory,searchTerm}) {
    const theme = useTheme();

    do
    {

    }while(0);

    return (
        <div
            style={{
                /* display */
                textAlign: 'center',
                margin: '20px 0',
                /* font */
                fontSize: '14px',
                /* color */
                color: theme.card.description,
            }}
        >
            搜索 "{searchTerm}" 找到 {Navigate_Cfg_Item_Search(activeCategory,searchTerm).length} 个结果
        </div>
    );
}

/****************************************************************************************************
* Navigate_Show_Navigate_Item_Card()
****************************************************************************************************/
function Navigate_Show_Navigate_Item_Card(items)
{
    const theme = useTheme();
    /* grid */
    return (
        <div
            style={{
                /* display */
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                margin: '0 auto',
                gap: '20px',
                padding: '0 20px',
                /* style */
                maxWidth: '80%',
            }}
        >
            {items.map((section, idx) => {
                return (
                    <div 
                        key={idx}
                        style={{
                            /* display */
                            display: 'inline-block',
                            alignItems: 'center',
                            padding: '1px',
                            position: 'relative',
                            /* font */
                            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', 
                            /* style */
                            width: '200px',
                            borderRadius: '12px',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'translateY(0) scale(1)';
                        }}
                        onClick={() => window.open(section.url, section.external ? '_blank' : '_self')}
                    >
                        {/* image */}
                        <div
                            style={{
                                /* display */
                                position: 'relative',
                                flexShrink: 0,
                                overflow: 'hidden',
                                marginRight: '16px',
                                /* sytle */
                                width: '100%',
                                height: '100px',
                                borderRadius: '8px',
                                boxShadow: theme.total.shadowLg,
                            }}
                        >
                            <img
                                src={section.image}
                                alt={section.name}
                                style={{
                                    /* display */
                                    objectFit: 'cover',
                                    /* sytle */
                                    width: '100%',
                                    height: '100%',
                                }}
                            />
                        </div>
                        
                        {/* content */}
                        <div
                            style={{
                                /* display */
                                margin: '8px 8px 0 16px',
                                display: 'flex',
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'center',
                                minWidth: 0,
                            }}
                        >
                            <h3 
                                style={{
                                    /* display */
                                    margin: '0 0 4px 0',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    /* style */
                                    color: theme.total.text,
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {section.name}
                            </h3>
                            <p 
                                style={{
                                    /* display */
                                    display: '-webkit-box',
                                    overflow: 'hidden',
                                    margin: 0,
                                    /* style */
                                    color: theme.card.description,
                                    fontSize: '13px',
                                    lineHeight: '1.4',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                }}
                            >
                                {section.description}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

/****************************************************************************************************
* Navigate_Show_Navigate_Item_Grid()
****************************************************************************************************/
function Navigate_Show_Navigate_Item_Grid(items)
{
    const theme = useTheme();
    /* grid */
    return (
        <div
            style={{
                /* display */
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                margin: '0 auto',
                gap: '20px',
                padding: '0 20px',
                /* style */
                maxWidth: '80%',
            }}
        >
            {items.map((section, idx) => {
                return (
                    <div 
                        key={idx}
                        style={{
                            /* display */
                            display: 'flex',
                            alignItems: 'center',
                            padding: '16px',
                            position: 'relative',
                            /* style */
                            height: '80px',
                            backgroundColor: theme.total.background,
                            borderRadius: '12px',
                            boxShadow: theme.total.shadowSm,
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateY(-3px)';
                            e.currentTarget.style.boxShadow = theme.total.shadowMd;
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = theme.total.shadowSm;
                        }}
                        onClick={() => window.open(section.url, section.external ? '_blank' : '_self')}
                    >
                        {/* image */}
                        <div
                            style={{
                                /* display */
                                flexShrink: 0,
                                overflow: 'hidden',
                                marginRight: '16px',
                                /* sytle */
                                width: '48px',
                                height: '48px',
                                borderRadius: '8px',
                            }}
                        >
                            <img
                                src={section.image}
                                alt={section.name}
                                style={{
                                    /* display */
                                    objectFit: 'cover',
                                    /* sytle */
                                    width: '100%',
                                    height: '100%',
                                }}
                            />
                        </div>
                        
                        {/* content */}
                        <div
                            style={{
                                /* display */
                                display: 'flex',
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'center',
                                minWidth: 0,
                            }}
                        >
                            <h3 
                                style={{
                                    /* display */
                                    margin: '0 0 4px 0',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    /* style */
                                    color: theme.total.text,
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {section.name}
                            </h3>
                            <p 
                                style={{
                                    /* display */
                                    display: '-webkit-box',
                                    overflow: 'hidden',
                                    margin: 0,
                                    /* style */
                                    color: theme.card.description,
                                    fontSize: '13px',
                                    lineHeight: '1.4',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                }}
                            >
                                {section.description}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

/****************************************************************************************************
* Navigate_Show_Navigate_Item_List()
****************************************************************************************************/
function Navigate_Show_Navigate_Item_List(items)
{
    const theme = useTheme();
    /* list */
    return (
        <div
            style={{
                /* display */
                margin: '0 auto',
                padding: '0 20px',
                maxWidth: '1000px',
            }}
        >
            {items.map((section, idx) => {
                return (
                    <div 
                        key={idx} 
                        style={{
                            /* display */
                            display: 'flex',
                            alignItems: 'center',
                            padding: '20px',
                            marginBottom: '15px',
                            /* style */
                            backgroundColor: theme.total.background,
                            borderRadius: '12px',
                            boxShadow: theme.total.shadowSm,
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = theme.total.shadowMd;
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = theme.total.shadowSm;
                        }}
                        onClick={() => window.open(section.url, section.external ? '_blank' : '_self')}
                    >
                        {/* image */}
                        <img
                            src={section.image}
                            alt={section.name}
                            style={{
                                /* display */
                                objectFit: 'cover',
                                marginRight: '20px',
                                /* style */
                                width: '60px',
                                height: '60px',
                                borderRadius: '12px',
                            }}
                        />
                        {/* discription */}
                        <div 
                            style={{
                                /* display */
                                flex: 1,
                            }}
                        >
                            <h3 
                                style={{
                                    /* display */
                                    margin: '0 0 8px 0',
                                    /* style */
                                    color: theme.total.text,
                                    fontSize: '18px',
                                }}
                            >
                                {section.name}
                            </h3>
                            <p 
                                style={{
                                    /* display */
                                    margin: 0,
                                    /* style */
                                    color: theme.card.description,
                                    fontSize: '14px',
                                    lineHeight: '1.4',
                                }}
                            >
                                {section.description}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

/****************************************************************************************************
* Navigate_Show_Navigate_Item()
****************************************************************************************************/
function Navigate_Show_Navigate_Item({items, viewMode}) {
    let result = null;
    let viewModeFunction = null;

    do
    {
        /* check parameter */
        if((items == "") || (viewMode == ""))
        {
            continue
        }
        /* find view mode function */
        for (let index = 0; index < navigate_view_mode_table.length; index++)
        {
            const element = navigate_view_mode_table[index];
            if(element.name == viewMode)
            {
                viewModeFunction = element.func;
                /* map item */
                result = viewModeFunction(items);
                break;
            }
        }
    }while(0);

    return result;
}

/****************************************************************************************************
* Navigate_Show_Navigate()
****************************************************************************************************/
export function Navigate_Show_Navigate() {
    /* search */
    const [searchTerm, setSearchTerm] = useState('');
    /* state */
    const [activeCategory, setActiveCategory] = useState('全部');
    /* view mode card | grid | list */
    const [viewMode, setViewMode] = useState('card');

    return (
        <div>
            {/* Personalized Signature */}
            <Navigate_Show_Navigate_Signature />
            
            {/* search control */}
            <Navigate_Show_Navigate_Control searchTerm={searchTerm} setSearchTerm={setSearchTerm} viewMode={viewMode} setViewMode={setViewMode} />

            {/* map category */}
            <Navigate_Show_Navigate_Category activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

            {/* search items info */}
            {searchTerm && <Navigate_Show_Item_Search_Info activeCategory={activeCategory} searchTerm={searchTerm} />}

            {/* map items */}
            <Navigate_Show_Navigate_Item items={Navigate_Cfg_Item_Search(activeCategory,searchTerm)} viewMode={viewMode} />
        </div>
    );
}

/****************************************************************************************************
* Navigate_Show_Donate()
****************************************************************************************************/
export function Navigate_Show_Donate() {
    const theme = useTheme();

    do
    {

    }while(0);

    return (
        <div
            style={{
                /* layout */
                textAlign: 'center',
                margin: '48px 0', 
            }}
        >
            {/* Divider */}
            <div
                style={{
                    /* position */
                    margin: '32px auto 24px auto',
                    /* size */
                    width: '50%',
                    height: '1px',
                    /* color */
                    background: `linear-gradient(to right, transparent 0%, ${theme.card.description} 30%, ${theme.card.description} 70%, transparent 100%)`,
                    /* style */
                    boxShadow: theme.total.shadowSm,
                }}
            />
            {/* Donate */}
            <div
                style={{
                    /* layout */
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    /* gap */
                    gap: '40px',
                }}
            >
                {/* donate */}
                <div>
                    <div
                        style={{ 
                            /*  font */
                            fontWeight: 'bold',
                            fontSize: '1.3rem',
                            /* color */
                            color: theme.total.primary, 
                        }}
                    >
                        给我点一杯咖啡 ☕
                    </div>
                    <span
                        style={{
                            /*  font */
                            fontWeight: 'normal',
                            fontSize: '1rem',
                            /* color */
                            color: theme.card.description,
                        }}
                    >
                        如果你喜欢本站，欢迎扫码支持我！
                    </span>
                </div>
                {/* QR code */}
                <img
                    src={process.env.PUBLIC_URL + '/images/avatar/avatar.jpg'}
                    alt="打赏二维码"
                    style={{ 
                        width: 120,
                        height: 120,
                        borderRadius: 12,
                        boxShadow: theme.total.shadowSm,
                        transition: 'all 0.5s ease',

                    }}
                    /* mouse */
                    onMouseEnter={e => {
                        e.currentTarget.style.transform = 'scale(1.56)';
                        e.currentTarget.style.boxShadow = theme.total.shadowMd;
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = theme.total.shadowSm;
                    }}
                />
            </div>
        </div>
    );
}

/****************************************************************************************************
* Navigate_Show()
****************************************************************************************************/
export function Navigate_Show() {

    do
    {

    }while(0);

    return (
        <div>
            {/* profile */}
            <Navigate_Show_Profile />
            {/* title */}
            <Navigate_Show_Sticky />
            {/* navigate */}
            <Navigate_Show_Navigate />
            {/* donate */}
            <Navigate_Show_Donate />
        </div>
    );
}

/****************************************************************************************************
* navigate_init()
****************************************************************************************************/
export function navigate_init() {

    do
    {
        /* init all items */
        Navigate_Show_Navigate_Item_Init();
    }while(0);

    return (
        <div>

        </div>
    );
}

/****************************************************************************************************
* Navigate()
****************************************************************************************************/
export function Navigate() {
    let color = null;

    do
    {
        /* get color */
        color = color_get("gradient-rainbow","gradient-cream-beige");
        if(color == null)
        {
            /* default */
            console.log("navigate_init(): color is null");
            color = { name: "gradient-soft-dawn", description: "柔和黎明渐变", value: [ " #e9defa", " #fbfcdb",]};
        }
    }while(0);

    return (
        <div 
            style={{
                background: `linear-gradient(135deg, ${color.value[0]}, ${color.value[1]})`,
            }}
        >
            {/* top bar */}
            <Topbar />
            {/* content */}
            <Navigate_Show />
            {/* footer */}
            <Footer />
        </div>
    );
}

/****************************************************************************************************
* Navigate_Route()
****************************************************************************************************/
export function Navigate_Route() {

    do
    {

    }while(0);

    return (
        <Route path="/navigate" element={<div></div>}>

        </Route>
    );
}

/****************************************************************************************************
* File End!
****************************************************************************************************/
