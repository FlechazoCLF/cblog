
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
 *
*/

/****************************************************************************************************
* Include
****************************************************************************************************/

/* react */
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
/* categorize cfg */
import { Categorize_Cfg_Init, categorize_cfg_get, categorize_cfg_item_get } from './categorize_cfg'
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
* Categorize_Init()
****************************************************************************************************/
export function Categorize_Init() {

    do
    {
        /* cfg init */
        Categorize_Cfg_Init();
    }while(0);

    return (
        <div>

        </div>
    );
}

/****************************************************************************************************
* Categorize_Detail_Article()
****************************************************************************************************/
function Categorize_Detail_Article({articles, color, textMain, textSub}) {
    const theme = useTheme();
    return (
        <>
        {articles.map((article, i) => (
            <Link
                key={i}
                to={article.path}
                style={{
                    /* layout */
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 14,
                    padding: '12px 16px',
                    /* style */
                    background: theme.total.surface,
                    backdropFilter: 'blur(8px)',
                    borderRadius: 14,
                    border: `1px solid ${color}12`,
                    textDecoration: 'none',
                    transition: 'all 0.25s',
                }}
                onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateX(6px)';
                    e.currentTarget.style.boxShadow = `0 4px 16px ${color}15`;
                    e.currentTarget.style.borderColor = `${color}35`;
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = `${color}12`;
                }}
            >
                {/* day */}
                <div style={{ flexShrink: 0, textAlign: 'center', minWidth: 36, }}>
                    <div style={{ fontSize: 20, fontWeight: 700, color: color, lineHeight: 1, }}>
                        {article.date ? article.date.slice(8, 10) : '--'}
                    </div>
                </div>
                {/* content */}
                <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                    <div style={{
                        /* layout */
                        marginBottom: 3,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        /* style */
                        whiteSpace: 'nowrap',
                        fontWeight: 700,
                        fontSize: 14,
                        color: textMain,
                    }}>
                        {article.title}
                    </div>
                    {/* description */}
                    {article.description && (
                        <div style={{
                            /* layout */
                            display: '-webkit-box',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: 'vertical',
                            /* style */
                            fontSize: 12,
                            lineHeight: 1.4,
                            color: textSub,
                        }}>
                            {article.description}
                        </div>
                    )}
                    {/* tags */}
                    {article.tags && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 4 }}>
                            {article.tags.split(/[,，\s]+/).filter(Boolean).slice(0, 3).map((tag, ti) => (
                                <span key={ti} style={{
                                    /* style */
                                    fontSize: 10,
                                    fontWeight: 600,
                                    color: color,
                                    background: `${color}10`,
                                    borderRadius: 6,
                                    padding: '1px 6px',
                                }}>
                                    {tag.trim()}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </Link>
        ))}
        </>
    );
}

/****************************************************************************************************
* Categorize_Detail()
****************************************************************************************************/
export function Categorize_Detail() {
    const { category } = useParams();
    let categorize = null;
    const theme = useTheme();

    do
    {
        /* get categorize */
        categorize = categorize_cfg_item_get(category);
    }while(0);

    const color = (categorize.color || theme.total.primary).trim();
    /* morandi palette — clean warm neutral, no color tint */
    const bgGrad = `linear-gradient(160deg, ${theme.total.surface}, ${theme.total.surfaceSecondary})`;
    const textMain = theme.total.textSecondary;
    const textSub = theme.total.textMuted;

    /* group articles by year → month */
    const timeline = {};
    categorize.articles.forEach(article => {
        const year = article.date ? article.date.slice(0, 4) : '未知';
        const month = article.date ? article.date.slice(5, 7) : '--';
        if (!timeline[year]) timeline[year] = {};
        if (!timeline[year][month]) timeline[year][month] = [];
        timeline[year][month].push(article);
    });
    const years = Object.keys(timeline).sort((a, b) => b - a);

    return (
        <div
            style={{
                /* layout */
                display: 'flex',
                flexDirection: 'column',
                width: '90%',
                padding: '32px',
                alignItems: 'center',
                /* style */
                background: bgGrad,
                borderRadius: '32px',
                boxShadow: theme.total.shadowMd,
                transition: 'box-shadow 0.3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = theme.total.shadowLg; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = theme.total.shadowMd; }}
        >
            {/* header */}
            <div style={{
                /* layout */
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                marginBottom: 8,
            }}>
                {/* icon */}
                <span style={{ fontSize: 48 }}>
                    {categorize.icon}
                </span>
                {/* category */}
                <div style={{ textAlign: 'left' }}>
                    <h1 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 'bold', color: textMain,}}>
                        {categorize.category}
                    </h1>
                    <p style={{ margin: '4px 0 0', fontSize: 14, color: textSub,}}>
                        {categorize.description}
                    </p>
                </div>
            </div>
            {/* count badge */}
            <div style={{
                /* layout */
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                padding: '4px 16px',
                marginBottom: 32,
                /* style */
                background: `${color}15`,
                borderRadius: 20,
                fontSize: 13,
                fontWeight: 600,
                color: color,
            }}>
                📝 共 {categorize.articles.length} 篇文章
            </div>

            {/* timeline */}
            <div style={{ width: '100%', maxWidth: 680 }}>
                {years.map(year => (
                    <div key={year} style={{ marginBottom: 32 }}>
                        {/* year heading */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, }}>
                            {/* year */}
                            <span style={{ fontSize: 28, fontWeight: 800, color: color, letterSpacing: 2, }}>
                                {year}
                            </span>
                            <div style={{ flex: 1, height: 2, background: `linear-gradient(90deg, ${color}40, transparent)`, }} />
                        </div>

                        {/* months */}
                        {Object.keys(timeline[year]).sort((a, b) => b - a).map(month => (
                            <div key={month} style={{ marginLeft: 16, marginBottom: 16 }}>
                                {/* month heading */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, paddingLeft: 4,}}>
                                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: color, flexShrink: 0, boxShadow: `0 0 0 3px ${color}25`, }} />
                                    {/* month */}
                                    <span style={{ fontSize: 15, fontWeight: 700, color: textMain, }}>
                                        {month}月
                                    </span>
                                    {/* count */}
                                    <span style={{ fontSize: 11, color: textSub, }}>
                                        {timeline[year][month].length} 篇
                                    </span>
                                </div>

                                {/* articles */}
                                <div style={{
                                    /* layout */
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 8,
                                    marginLeft: 20,
                                    borderLeft: `2px solid ${color}20`,
                                    paddingLeft: 16,
                                }}>
                                    <Categorize_Detail_Article articles={timeline[year][month]} color={color} textMain={textMain} textSub={textSub}></Categorize_Detail_Article>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

/****************************************************************************************************
* View Mode Definitions
****************************************************************************************************/

const Categorize_Views = [
    { key: 'cloud', label: '云览', icon: '☁️' },
    { key: 'bento', label: '便当', icon: '🍱' },
    { key: 'list',  label: '卡片', icon: '📋' },
    { key: 'glass', label: '磨砂', icon: '✨' },
];

/****************************************************************************************************
* Categorize_View_Cloud() — tag cloud style
****************************************************************************************************/
function Categorize_View_Cloud({categories, category_route, theme}) {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12, margin: '32px 0' }}>
            {categories.map((cat, i) => {
                const color = (cat.color || theme.total.primary).trim();
                return (
                    <Link
                        key={i}
                        to={category_route.url + "/" + cat.category}
                        style={{
                            /* layout */
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 8,
                            padding: '10px 20px',
                            /* style */
                            borderRadius: 50,
                            background: `${color}15`,
                            border: `1.5px solid ${color}40`,
                            textDecoration: 'none',
                            transition: 'all 0.25s',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = `${color}30`;
                            e.currentTarget.style.transform = 'translateY(-3px)';
                            e.currentTarget.style.boxShadow = `0 6px 20px ${color}25`;
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = `${color}15`;
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        {/* icon */}
                        <span style={{ fontSize: 18 }}>
                            {cat.icon}
                        </span>
                        {/* category */}
                        <span style={{ fontWeight: 600, fontSize: 14, color: color }}>
                            {cat.category}
                        </span>
                        {/* count */}
                        <span style={{ background: color, color: theme.total.textInverse, fontSize: 11, fontWeight: 700, borderRadius: 20, padding: '2px 8px', minWidth: 22, textAlign: 'center',}}>
                            {cat.articles ? cat.articles.length : 0}
                        </span>
                    </Link>
                );
            })}
        </div>
    );
}

/****************************************************************************************************
* Categorize_View_Bento() — bento grid style
****************************************************************************************************/
function Categorize_View_Bento({categories, category_route, theme}) {
    const sorted = [...categories].sort((a, b) => (b.articles?.length || 0) - (a.articles?.length || 0));
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, margin: '32px 0' }}>
            {sorted.map((cat, i) => {
                const color = (cat.color || theme.total.primary).trim();
                const isBig = cat.articles && cat.articles.length >= 10;
                /* morandi: mix category color with theme surface for muted, dusty tones */
                const morandiBg = isBig
                    ? `linear-gradient(145deg, ${color}18, ${theme.total.surfaceSecondary}, ${theme.total.surface})`
                    : `linear-gradient(135deg, ${color}10, ${theme.total.background})`;
                const morandiBorder = `${color}30`;
                const morandiText = theme.total.textPrimary;
                const morandiSub = theme.total.textMuted;

                return (
                    <Link
                        key={i}
                        to={category_route.url + "/" + cat.category}
                        style={{
                            /* layout */
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: isBig ? 'flex-start' : 'center',
                            justifyContent: 'center',
                            gridColumn: isBig ? 'span 2' : 'span 1',
                            gridRow: isBig ? 'span 2' : 'span 1',
                            padding: isBig ? 24 : 16,
                            /* style */
                            borderRadius: 20,
                            background: morandiBg,
                            border: `1.5px solid ${morandiBorder}`,
                            textDecoration: 'none',
                            transition: 'all 0.3s',
                            minHeight: isBig ? 140 : 90,
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.boxShadow = `0 12px 32px ${color}18`;
                            e.currentTarget.style.borderColor = `${color}55`;
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.style.borderColor = morandiBorder;
                        }}
                    >
                        {/* icon */}
                        <span style={{ fontSize: isBig ? 40 : 28, marginBottom: isBig ? 12 : 4 }}>
                            {cat.icon}
                        </span>
                        {/* title */}
                        <span style={{ fontWeight: 700, fontSize: isBig ? 16 : 13, color: morandiText, marginBottom: 4 }}>
                            {cat.category}
                        </span>
                        {/* description */}
                        {isBig && <span style={{ fontSize: 12, color: morandiSub, marginBottom: 8 }}>{cat.description}</span>}
                        {/* count */}
                        <span style={{ fontSize: 11, fontWeight: 600, color: color, background: `${color}15`, borderRadius: 12, padding: '3px 10px',}}>
                            {cat.articles ? cat.articles.length : 0} 篇
                        </span>
                    </Link>
                );
            })}
        </div>
    );
}

/****************************************************************************************************
* Categorize_View_List() — horizontal card list style
****************************************************************************************************/
function Categorize_View_List({categories, category_route, theme}) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 640, margin: '32px auto' }}>
            {categories.map((cat, i) => {
                const color = (cat.color || theme.total.primary).trim();
                /* list */
                return (
                    <Link
                        key={i}
                        to={category_route.url + "/" + cat.category}
                        style={{
                            /* layout */
                            display: 'flex',
                            alignItems: 'center',
                            gap: 16,
                            padding: '14px 20px',
                            /* style */
                            borderRadius: 16,
                            background: theme.card.background,
                            border: '1px solid ' + theme.total.borderSecondary,
                            borderLeft: `3px solid transparent`,
                            textDecoration: 'none',
                            transition: 'all 0.25s',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateX(6px)';
                            e.currentTarget.style.boxShadow = theme.total.shadowMd;
                            e.currentTarget.style.borderLeftColor = color;
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'translateX(0)';
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.style.borderLeftColor = 'transparent';
                        }}
                    >
                        {/* icon */}
                        <div
                            style={{
                                /* layout */
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                /* style */
                                fontSize: 22,
                                flexShrink: 0,
                                width: 44,
                                height: 44,
                                borderRadius: '50%',
                                background: `${color}15`,
                            }}
                        >
                            {cat.icon}
                        </div>
                        {/* info */}
                        <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                            <div
                                style={{
                                    /* style */
                                    fontWeight: 700,
                                    fontSize: 15,
                                    color: theme.total.text
                                }}
                            >
                                {cat.category}
                            </div>
                            <div
                                style={{
                                    /* layout */
                                    marginTop: 2,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    /* style */
                                    fontSize: 12,
                                    color: theme.total.textDisabled,
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {cat.description}
                            </div>
                        </div>
                        {/* count */}
                        <div style={{ fontWeight: 700, fontSize: 18, color: color, flexShrink: 0, textAlign: 'center' }}>
                            {cat.articles ? cat.articles.length : 0}
                            <div style={{ fontSize: 10, color: theme.total.textDisabled, fontWeight: 400 }}>
                                篇
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}

/****************************************************************************************************
* Categorize_View_Glass() — glassmorphism + gradient top bar style
****************************************************************************************************/
function Categorize_View_Glass({categories, category_route, theme}) {
    return (
        <div
            style={{
                /* layout */
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 18,
                margin: '32px 0'
            }}
        >
            {categories.map((cat, i) => {
                const color = (cat.color || theme.total.primary).trim();
                /* category card */
                return (
                    <Link
                        key={i}
                        to={category_route.url + "/" + cat.category}
                        style={{
                            /* layout */
                            position: 'relative',
                            overflow: 'hidden',
                            width: 200,
                            /* style */
                            borderRadius: 18,
                            background: `${theme.total.surfaceSecondary}5F`,
                            backdropFilter: 'blur(12px)',
                            border: `1px solid ${theme.total.borderSecondary}`,
                            boxShadow: theme.total.shadowSm,
                            textDecoration: 'none',
                            transition: 'all 0.3s',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateY(-6px)';
                            e.currentTarget.style.boxShadow = `0 12px 36px ${color}30`;
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = theme.total.shadowSm;
                        }}
                    >
                        {/* background */}
                        <div style={{ height: 5, background: `linear-gradient(90deg, ${color}, ${color}80)` }} />
                        {/* content */}
                        <div style={{ padding: '18px 18px 16px', textAlign: 'center' }}>
                            {/* icon */}
                            <div style={{ fontSize: 32, marginBottom: 8 }}>
                                {cat.icon}
                            </div>
                            {/* title */}
                            <div style={{ fontWeight: 700, fontSize: 15, color: theme.total.text, marginBottom: 6 }}>
                                {cat.category}
                            </div>
                            {/* description */}
                            <div style={{ fontSize: 11, color: theme.total.textDisabled, lineHeight: 1.4, marginBottom: 12, minHeight: 30 }}>
                                {cat.description}
                            </div>
                            {/* article count */}
                            <div style={{
                                /* layout */
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 4,
                                padding: '4px 14px',
                                /* style */
                                background: `${color}12`,
                                borderRadius: 20,
                                fontSize: 12,
                                fontWeight: 600,
                                color: color,
                            }}>
                                📝 {cat.articles ? cat.articles.length : 0} 篇
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}

/****************************************************************************************************
* Categorize_Item() — view switcher
****************************************************************************************************/
export function Categorize_Item({categories}) {
    const [activeView, setActiveView] = useState('bento');
    const theme = useTheme();
    let category_route = "";

    do
    {
        category_route = cblog_route_get("category");
    }while(0);

    const viewProps = { categories, category_route, theme };

    return (
        <div>
            {/* view switcher */}
            <div
                style={{
                    /* layout */
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 8,
                    margin: '24px 0 8px',
                }}
            >
                {Categorize_Views.map(v => (
                    <button
                        key={v.key}
                        onClick={() => setActiveView(v.key)}
                        style={{
                            /* layout */
                            padding: '8px 20px',
                            /* style */
                            borderRadius: 50,
                            border: 'none',
                            background: activeView === v.key ? theme.total.text : theme.total.surfaceSecondary,
                            color: activeView === v.key ? theme.total.background : theme.total.textDisabled,
                            fontWeight: 600,
                            fontSize: 13,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                        }}
                    >
                        {v.icon} {v.label}
                    </button>
                ))}
            </div>

            {/* active view */}
            {activeView === 'cloud' && <Categorize_View_Cloud categories={categories} category_route={category_route} theme={theme} />}
            {activeView === 'bento' && <Categorize_View_Bento categories={categories} category_route={category_route} theme={theme} />}
            {activeView === 'list'  && <Categorize_View_List  categories={categories} category_route={category_route} theme={theme} />}
            {activeView === 'glass' && <Categorize_View_Glass categories={categories} category_route={category_route} theme={theme} />}
        </div>
    );
}

/****************************************************************************************************
* Categorize_Statistic()
****************************************************************************************************/
export function Categorize_Statistic({categories}) {

    do
    {

    }while(0);

    return (
        <div 
            style={{
                textAlign: 'center',
            }}
        >
            共 {categories.length} 个分类，总计 {categories.reduce((sum, cat) => sum + (cat.articles ? cat.articles.length : 0), 0)} 篇文章
        </div>
    );
}

/****************************************************************************************************
* Categorize()
****************************************************************************************************/
export function Categorize() {
    let categories = null;
    const theme = useTheme();

    do
    {
        categories = categorize_cfg_get();
    }while(0);

    return (
        <div
            style={{
                /* layout */
                width: '90%',
                padding: '24px',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                /* style */
                borderRadius: '32px',
                transition: 'box-shadow 0.3s',
            }}
            /* mouse — shadow only, no transform to avoid jitter */
            onMouseEnter={e => {
                e.currentTarget.style.boxShadow = theme.total.shadowMd;
            }}
            onMouseLeave={e => {
                e.currentTarget.style.boxShadow = 'none';
            }}
        >
            {/* title */}
            <h1 style={{
                /* position */
                margin: '32px',
                /* font */
                fontSize: '2rem',
                fontWeight: 'bold',
                /* color */
                color: theme.total.text,
                /* style */
                borderBottom: `1px solid ${theme.total.primary}`,
            }}>
                文章分类
            </h1>
            {/* categories */}
            <Categorize_Item categories={categories} />
            {/* statistic */}
            <Categorize_Statistic categories={categories} />
        </div>
    );
}

/****************************************************************************************************
* File End!
****************************************************************************************************/
