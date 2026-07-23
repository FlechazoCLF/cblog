
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
 * 2026-07-22     cc          add search page as home page
 *
*/

/****************************************************************************************************
* Include
****************************************************************************************************/

/* react */
import React, { useState, useEffect, useMemo, useRef } from 'react';
/* router */
import { Link } from 'react-router-dom';
/* color */
import { color_get } from '../../kernel/color/color'
/* theme */
import { useTheme } from '../../kernel/theme/theme'
/* home config */
import { home_cfg, home_shuoshuo_get } from './home_cfg'
/* Carousel */
import { Carousel } from '../../kernel/ui/carousel/carousel'
/* Select */
import { Select } from '../../kernel/ui/select/select'
/* footer */
import { Footer } from '../../layout/footer/footer'

/****************************************************************************************************
* Define
****************************************************************************************************/

/* weekday names */
const WEEKDAY = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

/****************************************************************************************************
* Home_Show_Contact()
****************************************************************************************************/
function Home_Show_Contact() {
    /* theme */
    const theme = useTheme();

    return (
        <div
            style={{
                /* layout */
                display: 'flex',
                gap: 12,
                justifyContent: 'center',
            }}
        >
            {home_cfg.socials.map((item, idx) => (
                <a
                    key={idx}
                    href={item.url}
                    target={item.url.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    title={item.name}
                    style={{
                        /* layout */
                        width: 36, height: 36,
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        /* style */
                        borderRadius: '50%',
                        fontSize: 12, fontWeight: 500,
                        textDecoration: 'none',
                        color: theme.total.primary,
                        background: theme.total.background + '8c',
                        border: '1px solid ' + theme.total.background + 'b2',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        cursor: 'pointer',
                        transition: 'all 0.25s ease',
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.transform = 'translateY(-3px) scale(1.08)';
                        e.currentTarget.style.background = theme.total.primary;
                        e.currentTarget.style.color = theme.total.textInverse;
                        e.currentTarget.style.boxShadow = '0 6px 18px ' + theme.total.primary + '4d';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                        e.currentTarget.style.background = theme.total.background + '8c';
                        e.currentTarget.style.color = theme.total.primary;
                        e.currentTarget.style.boxShadow = 'none';
                    }}
                >
                    {item.short}
                </a>
            ))}
        </div>
    );
}

/****************************************************************************************************
* Home_Show_Clock()
****************************************************************************************************/
function Home_Show_Clock() {
    /* theme */
    const theme = useTheme();
    /* live tick */
    const [tick, setTick] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => setTick(t => t + 1), 1000);
        return () => clearInterval(timer);
    }, []);

    /* time */
    const now = new Date();
    /* weather icon */
    const h = now.getHours();
    const weatherIcon = (h >= 6 && h < 18) ? "☀️" : (h >= 18 && h < 20) ? "🌅" : "🌙";

    return (
        <div
            style={{
                /* layout */
                padding: 18,
                textAlign: 'center',
            }}
        >
            {/* date */}
            <div
                style={{ 
                    /* style */ 
                    fontSize: 12, 
                    color: theme.total.textSecondary 
                }}
            >
                {`${now.getFullYear()} 年 ${String(now.getMonth() + 1).padStart(2, '0')} 月 ${String(now.getDate()).padStart(2, '0')} 日 ${WEEKDAY[now.getDay()]}`}
            </div>
            {/* time */}
            <div
                style={{ 
                    /* layout */
                    margin: '6px 0',
                    /* style */
                    fontSize: 42, 
                    fontWeight: 700, 
                    color: theme.total.textSecondary, 
                    letterSpacing: 3,
                    fontVariantNumeric: 'tabular-nums', 
                    fontFamily: '-apple-system, "Segoe UI", Roboto, monospace' 
                }}
            >
                {`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`}
            </div>
            {/* weather */}
            <div
                style={{ 
                    /* style */ 
                    fontSize: 12, 
                    color: theme.total.textMuted 
                }}
            >
                {weatherIcon} {home_cfg.city}
            </div>
        </div>
    );
}

/****************************************************************************************************
* Home_Show_Search()
****************************************************************************************************/
function Home_Show_Search() {
    /* theme */
    const theme = useTheme();
    /* data */
    const engines = home_cfg.searchEngines || [];
    /* state */
    const [engine, setEngine] = useState(engines[0]);
    const [q, setQ] = useState('');
    const [focused, setFocused] = useState(false);
    const [hover, setHover] = useState(false);

    /* check engines */
    if (engines.length === 0) return null;

    /* submit */
    const onSubmit = (e) => {
        e.preventDefault();
        const v = q.trim();
        if (!v) return;
        const url = engine.url + '?' + engine.param + '=' + encodeURIComponent(v);
        window.open(url, '_blank', 'noopener');
    };

    return (
        <div
            style={{
                /* layout */
                marginTop: 48,
                marginBottom: 32,
                padding: '8px 12px',
                width: '100%',
                /* style */
                background: theme.total.background + '8c',
                backdropFilter: 'blur(22px) saturate(1.4)',
                WebkitBackdropFilter: 'blur(22px) saturate(1.4)',
                border: '1px solid ' + theme.total.background + 'b2',
                borderRadius: 18,
                boxShadow: theme.total.shadowLg,
                /* focus */
                ...((hover || focused) ? {
                    boxShadow: '0 0 0 3px ' + theme.total.primary + '59' + ', 0 16px 48px ' + theme.total.primary + '2e' + ', ' + theme.total.shadowSm,
                } : {}),
            }}
            /* mouse */
            onMouseEnter={() => {
                setHover(true);
            }}
            onMouseLeave={() => {
                setHover(false);
            }}
        >
            {/* form row */}
            <form 
                style={{ 
                    /* layout */
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 12, 
                    padding: '4px 6px' 
                }} 
                onSubmit={onSubmit}
            >
                {/* query input */}
                <input
                    className="homeSearchInput"
                    style={{ 
                        /* layout */
                        flex: 1, 
                        padding: '10px 0', 
                        minWidth: 0,
                        /* style */
                        background: 'transparent', 
                        border: 'none', 
                        outline: 'none', 
                        fontSize: 18, 
                        color: theme.total.textPrimary,
                    }}
                    type="text"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder={"🔎 Input " + engine.name + " Search ..."}
                    autoComplete="off"
                />
                {/* engine select */}
                {(hover || focused) && (
                    <Select
                        options={engines}
                        value={engine.name}
                        onChange={(it) => setEngine(it)}
                        getLabel={(it) => it.name}
                    />
                )}
                {/* placeholder style */}
                <style>{`.homeSearchInput::placeholder { color: ${theme.total.textDisabled}; }`}</style>
            </form>
        </div>
    );
}

/****************************************************************************************************
* Home_Show_Sentence()
****************************************************************************************************/
function Home_Show_Sentence() {
    /* theme */
    const theme = useTheme();
    /* Carousel item height (px) */
    const Carousel_H = 78;
    const items = useMemo(() => {
        const arr = [];
        /* push quotes */
        (home_cfg.quotes || []).forEach((q, i) => arr.push(
            <div
                key={'q' + i} 
                style={{
                    /* layout */
                    height: Carousel_H, 
                    display: 'flex', 
                    flexDirection: 'column',
                    justifyContent: 'center', 
                    gap: 4, 
                    padding: '0 8px',
                }}
            >
                {/* title */}
                <div 
                    style={{ 
                        /* style */ 
                        fontSize: 11, 
                        color: theme.total.primary, 
                        fontWeight: 600, 
                        letterSpacing: 1 
                    }}
                >
                    每日一句
                </div>
                {/* content */}
                <div 
                    style={{ 
                        /* layout */ 
                        lineHeight: 1.5, 
                        whiteSpace: 'nowrap', 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis', 
                        /* style */ 
                        fontSize: 14, 
                        color: theme.total.textSecondary 
                    }}
                >
                    {q.text}
                </div>
                {/* author */}
                <div 
                    style={{ 
                        /* layout */ 
                        textAlign: 'right', 
                        /* style */ 
                        fontSize: 11, 
                        color: theme.total.textDisabled 
                    }}
                >
                    — {q.author}
                </div>
            </div>
        ));
        /* push shuoshuo */
        (home_cfg.shuoshuo || []).forEach((s, i) => arr.push(
            <div 
                key={'s' + i} 
                style={{
                    /* layout */
                    height: Carousel_H, 
                    display: 'flex', 
                    flexDirection: 'column',
                    justifyContent: 'center', 
                    gap: 4, 
                    padding: '0 8px',
                }}
            >
                {/* title */}
                <div 
                    style={{ 
                        /* style */ 
                        fontSize: 11, 
                        color: theme.total.primary, 
                        fontWeight: 600, 
                        letterSpacing: 1 
                    }}
                >
                    说说
                </div>
                {/* content */}
                <div 
                    style={{ 
                        /* layout */ 
                        lineHeight: 1.5, 
                        whiteSpace: 'nowrap', 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis', 
                        /* style */ 
                        fontSize: 14, 
                        color: theme.total.textPrimary 
                    }}
                >
                    {s.text}
                </div>
                {/* time */}
                <div 
                    style={{ 
                        /* layout */ 
                        textAlign: 'right', 
                        /* style */ 
                        fontSize: 11, 
                        color: theme.total.textDisabled 
                    }}
                >
                    — {s.time}
                </div>
            </div>
        ));
        return arr;
    }, [theme]);

    return (
        <Carousel
            items={items}
            interval={5000}
            vertical
            pauseOnHover
            manual
            height={Carousel_H}
            viewportStyle={{
                /* style */
            }}
        />
    );
}

/****************************************************************************************************
* Home_Show_NavGrid()
****************************************************************************************************/
function Home_Show_NavGrid() {
    /* theme */
    const theme = useTheme();
    return (
        <div
            style={{
                /* layout */
                width: '80%',
                marginTop: 32,
                marginBottom: -32, 
            }}
        >
            {/* title */}
            <div
                style={{
                    /* layout */
                    marginBottom: 10, 
                    paddingLeft: 2,
                    /* style */
                    fontSize: 12, 
                    color: theme.total.textMuted
                }}
            >
                🗺 快捷导航
            </div>
            {/* grid */}
            <div
                style={{
                    /* layout */
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    gap: 10
                }}
            >
                {/* navs */}
                {home_cfg.navs.map((item) => (
                    <Link
                        to={item.url}
                        target="_blank"
                        style={{
                            /* layout */
                            display: 'block',
                            padding: '14px 12px',
                            textAlign: 'center',
                            /* style */
                            textDecoration: 'none',
                            color: theme.total.textPrimary,
                            background: theme.total.surfaceSecondary + '8c',
                            backdropFilter: 'blur(14px)',
                            WebkitBackdropFilter: 'blur(14px)',
                            border: '1px solid ' + theme.total.surfaceSecondary + 'b2',
                            borderRadius: 12,
                            transition: 'all 0.25s ease',
                        }}
                        /* mouse */
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateY(-3px)';
                            e.currentTarget.style.background = theme.total.primary;
                            e.currentTarget.style.color = theme.total.textInverse;
                            e.currentTarget.style.boxShadow = '0 8px 20px ' + theme.total.primary + '40';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.background = theme.total.surfaceSecondary + '8c';
                            e.currentTarget.style.color = theme.total.textPrimary;
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        {/* icon */}
                        <div 
                            style={{ 
                                /* layout */ 
                                marginBottom: 4, 
                                /* style */ 
                                fontSize: 20 
                            }}
                        >
                            {item.icon}
                        </div>
                        {/* name */}
                        <div 
                            style={{ 
                                /* style */ 
                                fontSize: 12 
                            }}
                        >
                            {item.name}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

/****************************************************************************************************
* Home_Show_Info()
****************************************************************************************************/
export function Home_Show_Info() {
    /* theme */
    const theme = useTheme();
    return (
        <>
            {/* name */}
            <div
                style={{ 
                    /* layout */
                    letterSpacing: 5, 
                    lineHeight: 1.1 ,
                    textAlign: 'center', 
                    /* style */
                    fontSize: 52, 
                    fontWeight: 700, 
                    color: theme.total.primary, 
                    textShadow: '0 2px 16px ' + theme.total.primary + '1f', 
                }}
            >
                {home_cfg.name}
            </div>
            {/* subtitle */}
            <div 
                style={{ 
                    /* layout */
                    textAlign: 'center', 
                    marginTop: 2 ,
                    /* style */
                    fontSize: 15, 
                    color: theme.total.textMuted, 
                }}
            >
                {home_cfg.subtitle}
            </div>
        </>
    );
}

/****************************************************************************************************
* Home_Show()
****************************************************************************************************/
export function Home_Show() {
    return (
        <div
            style={{
                /* layout */
                flex: 1, 
                position: 'relative', 
                width: '100%' 
            }}
        >
            {/* main */}
            <div 
                style={{
                    /* layout */
                    display: 'flex',
                    position: 'absolute',
                    flexDirection: 'column',
                    alignItems: 'center',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 'min(800px, 90vw)',
                    gap: 24,
                    padding: '0 8px'
                }}
            >
                {/* name & subtitle */}
                <Home_Show_Info />
                {/* search */}
                <Home_Show_Search />
                {/* nav grid */}
                <Home_Show_NavGrid />
            </div>

            {/* right floating panel */}
            <div
                style={{
                    /* layout */
                    display: 'flex',
                    position: 'absolute',
                    flexDirection: 'column',
                    top: 16,
                    right: 24,
                    width: 260,
                    gap: 14 
                }}
            >
                {/* clock */}
                <Home_Show_Clock />
                {/* Carousel */}
                <Home_Show_Sentence />
                {/* contact */}
                <Home_Show_Contact />
            </div>
        </div>
    );
}

/****************************************************************************************************
* Home_Topbar_Link()
****************************************************************************************************/
function Home_Topbar_Link({ href, children }) {
    const theme = useTheme();
    const [h, setH] = useState(false);
    return (
        <a
            href={href}
            onMouseEnter={() => setH(true)}
            onMouseLeave={() => setH(false)}
            style={{
                color: theme.total.textSecondary,
                textDecoration: 'none',
                transition: 'color 0.2s',
                ...(h ? { color: theme.total.primary } : {}),
            }}
        >
            {children}
        </a>
    );
}

/****************************************************************************************************
* Home_Topbar()
****************************************************************************************************/
export function Home_Topbar() {
    /* theme */
    const theme = useTheme();
    return (
        <div 
            style={{
                /* layout */
                display: 'flex', 
                position: 'relative', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                padding: '14px 32px', 
                /* style */
                fontSize: 12, 
                color: theme.total.textSecondary 
            }}
        >
            {/* home info */}
            <div>
                🏠 首页 | 欢迎来到 {home_cfg.name} 的空间
            </div>
            {/* topbar links */}
            <div 
                style={{ 
                    /* layout */
                    display: 'flex', 
                    gap: 18 
                }}
            >
                <Home_Topbar_Link href="/blog">博客</Home_Topbar_Link>
                <Home_Topbar_Link href="/">导航</Home_Topbar_Link>
                <Home_Topbar_Link href="/blog/about">关于</Home_Topbar_Link>
            </div>
        </div>
    );
}

/****************************************************************************************************
* Home()
****************************************************************************************************/
export function Home() {
    /* theme */
    const theme = useTheme();
    let color = null;
    let bgGradient = null;
    do {
        /* get color */
        color = color_get("gradient-rainbow", "gradient-cream-beige");
        bgGradient = (color == null) ? 
                        `linear-gradient(135deg, ${theme.total.background}, ${theme.total.surfaceSecondary})` : 
                        `linear-gradient(135deg, ${color.value[0]}, ${color.value[1]})`;
    } while (0);

    return (
        <div 
            style={{
                /* layout */
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                minHeight: '100vh',
                width: '100%',
                boxSizing: 'border-box',
                overflowX: 'hidden',
                /* color */
                background: bgGradient
            }}
        >
            {/* decorative glows */}
            <div
                style={{
                    /* layout */
                    position: 'absolute', 
                    overflow: 'hidden' ,
                    pointerEvents: 'none', 
                    inset: 0, 
                    zIndex: 0, 
                }}
            >
                <div style={{ position: 'absolute', width: 520, height: 520, top: -160, left: -120, borderRadius: '50%', filter: 'blur(80px)', opacity: 0.55, background: 'radial-gradient(circle, ' + theme.total.primary + '2e' + ' 0%, transparent 70%)' }}></div>
                <div style={{ position: 'absolute', width: 600, height: 600, bottom: -200, right: -160, borderRadius: '50%', filter: 'blur(80px)', opacity: 0.55, background: 'radial-gradient(circle, ' + theme.total.background + '29' + ' 0%, transparent 70%)' }}></div>
            </div>
            {/* top bar */}
            <Home_Topbar />
            {/* main show */}
            <Home_Show />
            {/* footer pinned to bottom of 100vh */}
            <div
                style={{
                    /* layout */
                    position: 'relative', 
                    textAlign: 'center', 
                    padding: 16, 
                    /* style */
                    fontSize: 11, 
                    color: theme.total.textDisabled, 
                    borderTop: '1px solid ' + theme.total.background + '66' 
                }}
            >
                Copyright © 2025 ~ {new Date().getFullYear()} 💮flechazo.<br/>
                All rights reserved.
            </div>
        </div>
    );
}

/****************************************************************************************************
* File End!
****************************************************************************************************/
