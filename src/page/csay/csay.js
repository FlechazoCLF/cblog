
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
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
/* article */
import { article_cfg_category_get } from '../article/article_cfg';
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
* Csay_Sidebar_Priority()
****************************************************************************************************/
export function Csay_Sidebar_Priority({csayarticles, selectedPriority, setSelectedPriority}) {
    const theme = useTheme();

    /* get priorityList */
    const allPriorities = csayarticles.map(article => 
        article.priority !== undefined ? Number(article.priority) : 64
    );
    /* sort */
    const priorityList = Array.from(new Set(allPriorities)).sort((a, b) => a - b);

    /* state */
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropMenu = () => {
        setIsOpen(!isOpen);
    };

    /* select */
    const selectPriority = (level) => {
        setSelectedPriority(level);
        setIsOpen(false);
    };

    return (
        <div
            style={{
                /* layout */    
                position: 'relative',
                /* style */
                width: '100%',
            }}
        >
            <div 
                style={{ 
                    /* layout */
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    /* style */
                    width: '100%',
                    gap: '20px',
                }}
            >
                {/* priority lable */}
                <div 
                    style={{ 
                        /* layout */
                        /* style */
                        fontWeight: 600, 
                        color: theme.total.primary,
                        whiteSpace: 'nowrap',
                    }}
                >
                    优先级
                </div>

                {/* drop menu */}
                <button
                    style={{
                        /* layout */
                        display: 'flex',
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        /* color */
                        background: theme.total.surfaceSecondary,
                        color: theme.total.textPrimary,
                        /* font */
                        fontWeight: 500,
                        fontSize: 16,
                        /* style */
                        cursor: 'pointer',
                        padding: '6px 0',
                        border: `1px solid ${theme.total.border}`,
                        borderRadius: '8px',
                    }}
                    onClick={toggleDropMenu}
                >
                    <span style={{ marginLeft: '40px' }}>{selectedPriority}</span>
                    <span style={{ marginRight: '10px' }}>⛪</span>
                </button>
            </div>
            
            {/* drop menu */}
            {isOpen && (
                <div
                    style={{
                        /* layout */
                        position: 'absolute',
                        overflowY: 'auto',
                        maxHeight: '200px',
                        /* color */
                        background: theme.total.elevated,
                        /* style */
                        top: '100%',
                        right: '0',
                        width: '120px',
                        border: `1px solid ${theme.total.border}`,
                        borderRadius: '8px',
                        boxShadow: theme.total.shadowMd,
                        zIndex: 10,
                    }}
                >
                    {priorityList.map(level => (
                        <div
                            style={{
                                /* layout */
                                textAlign: 'center',
                                /* style */
                                padding: '8px 0',
                                cursor: 'pointer',
                                background: level === selectedPriority ? theme.total.surfaceHover : 'transparent',
                                borderBottom: `1px solid ${theme.total.divider}`,
                                transition: 'background 0.15s',
                            }}
                            onMouseEnter={e => {
                                if (level !== selectedPriority) e.currentTarget.style.background = theme.total.surfaceHover;
                            }}
                            onMouseLeave={e => {
                                if (level !== selectedPriority) e.currentTarget.style.background = 'transparent';
                            }}
                            onClick={() => selectPriority(level)}
                        >
                            {level}
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}

/****************************************************************************************************
* Csay_Sidebar_Date()
****************************************************************************************************/
export function Csay_Sidebar_Date({years, selectedYear, setSelectedYear, months, selectedMonth, setSelectedMonth}) {
    const theme = useTheme();
    
    return (
        <div
            style={{
                /* layout */    
                display: 'flex',
            }}
        >
            {/* year */}
            <div
                style={{
                    /* layout */    
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* sidebar year */}
                {years.map(year => (
                    <button
                        style={{
                            /* layout */
                            /* position */
                            width: 80,
                            padding: '8px 0',
                            margin: '8px 4px',
                            /* color */
                            background: year === selectedYear ? theme.total.primary : 'transparent',
                            color: year === selectedYear ? theme.total.textInverse : theme.total.textPrimary,
                            /* font */
                            fontWeight: 500,
                            fontSize: 16,
                            /* style */
                            border: 'none',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            boxShadow: year === selectedYear ? theme.total.shadowXs : 'none',
                        }}
                        onMouseEnter={e => {
                            if (year !== selectedYear) {
                                e.currentTarget.style.background = theme.total.surfaceHover;
                            }
                        }}
                        onMouseLeave={e => {
                            if (year !== selectedYear) {
                                e.currentTarget.style.background = 'transparent';
                            }
                        }}
                        onClick={() => setSelectedYear(year)}
                    >
                        {year}
                    </button>
                ))}
            </div>
            {/* month */}
            <div
                style={{
                    /* layout */    
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* month label */}
                <div style={{ fontSize: 11, fontWeight: 700, color: theme.total.textMuted, letterSpacing: '0.5px', marginBottom: 8 }}>
                    MONTH
                </div>
                {/* sidebar month */}
                {months.map(month => (
                    <button
                        style={{
                            /* layout */
                            /* position */
                            width: 80,
                            padding: '8px 0',
                            margin: '8px 4px',
                            /* color */
                            background: month === selectedMonth ? theme.total.primary : 'transparent',
                            color: month === selectedMonth ? theme.total.textInverse : theme.total.textPrimary,
                            /* font */
                            fontSize: 16,
                            fontWeight: 500,
                            /* style */
                            border: 'none',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            boxShadow: month === selectedMonth ? theme.total.shadowXs : 'none',
                        }}
                        onMouseEnter={e => {
                            if (month !== selectedMonth) {
                                e.currentTarget.style.background = theme.total.surfaceHover;
                            }
                        }}
                        onMouseLeave={e => {
                            if (month !== selectedMonth) {
                                e.currentTarget.style.background = 'transparent';
                            }
                        }}
                        onClick={() => setSelectedMonth(month)}
                    >
                        {month}
                    </button>
                ))}
            </div>
        </div>
    );
}

/****************************************************************************************************
* Csay_Sidebar()
****************************************************************************************************/
export function Csay_Sidebar({csayarticles, years, selectedYear, setSelectedYear, months, selectedMonth, setSelectedMonth, selectedPriority, setSelectedPriority}) {
    const theme = useTheme();

    return (
        <div
            style={{
                /* layout */
                padding: '20px 16px',
                /* style */
                background: `${theme.total.surface}88`,
                borderRadius: '16px',
                boxShadow: theme.total.shadowXs,
            }}
        >
            {/* priority section */}
            <div style={{ fontSize: 11, fontWeight: 700, color: theme.total.textMuted, letterSpacing: '0.5px', marginBottom: 8 }}>
                PRIORITY
            </div>
            <Csay_Sidebar_Priority csayarticles={csayarticles} selectedPriority={selectedPriority} setSelectedPriority={setSelectedPriority} />

            {/* divider */}
            <div style={{ height: 1, background: theme.total.divider, margin: '20px 0' }} />

            {/* year section */}
            <div style={{ fontSize: 11, fontWeight: 700, color: theme.total.textMuted, letterSpacing: '0.5px', marginBottom: 8 }}>
                YEAR
            </div>
            <Csay_Sidebar_Date years={years} selectedYear={selectedYear} setSelectedYear={setSelectedYear} months={months} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
        </div>
    );
}

/****************************************************************************************************
* Csay_Content_Item()
****************************************************************************************************/
export function Csay_Content_Item({yearArticles}) {
    const theme = useTheme();

    return (
        <div>
            {yearArticles.map((article, idx) => {
                /* get date */
                let month = article.month;
                let day = article.day;
                if (!month || !day) {
                    const d = new Date(article.date);
                    month = d.getMonth() + 1;
                    day = d.getDate();
                }
                /* left or right */
                const isLeft = day % 2 === 0;
                return (
                    <div 
                        style={{
                            /* layout */
                            display: 'flex',
                            position: 'relative',
                            alignItems: 'center',
                            padding: '1px',
                            justifyContent: isLeft ? 'flex-end' : 'flex-start', 
                            margin: '32px 24px',
                            /* font */
                            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', 
                            /* style */
                            borderRadius: '12px',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                        }}
                    >
                        {/* content */}
                        <Link
                            to={article.path}
                            style={{
                                /* layout */
                                textAlign: 'left',
                                /* position */
                                position: 'relative',
                                width: '40%',
                                padding: 16,
                                margin:'0 20px',
                                /* color */
                                background: theme.total.surfaceSecondary,
                                color: theme.total.textPrimary,
                                textDecoration: 'none',
                                /* style */
                                borderRadius: '16px',
                                boxShadow: theme.total.shadowSm,
                                transition: 'all 0.25s',
                            }}
                            /* mouse */
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)';
                                e.currentTarget.style.boxShadow = theme.total.shadowMd;
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                e.currentTarget.style.boxShadow = theme.total.shadowSm;
                            }}
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
                                }}
                            >
                                <img
                                    src={article.cover}
                                    alt={article.name}
                                    style={{
                                        /* display */
                                        objectFit: 'cover',
                                        /* sytle */
                                        width: '100%',
                                        height: '100%',
                                    }}
                                />
                            </div>
                            {/* date */}
                            <div 
                                style={{ 
                                    fontWeight: 600, 
                                    color: theme.total.primary, 
                                    marginBottom: 4 
                                }}
                            >
                                {month}月{day}日
                            </div>
                            <div
                                style={{
                                fontSize: 14,
                                fontWeight: 500,
                                color: theme.total.textSecondary,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }}
                            >
                                {article.title} - {article.location}
                            </div>
                        </Link>
                        {/* time point */}
                        <div style={{
                            /* layout */
                            position: 'absolute',
                            /* position */
                            width: 24,
                            height: 24,
                            left: '50%',
                            top: '50%',
                            /* color */
                            background: theme.total.primary,
                            /* style */
                            border: `4px solid ${theme.total.surface}`,
                            borderRadius: '50%',
                            transform: 'translate(-50%, -50%)',
                            boxShadow: theme.total.shadowSm,
                            zIndex: 2,
                        }} />
                    </div>
                );
            })}
        </div>
    )
}

/****************************************************************************************************
* Csay_Content()
****************************************************************************************************/
export function Csay_Content({csayarticles, selectedYear, selectedMonth, selectedPriority}) {
    const theme = useTheme();
    /* priority articles */
    const priorityArticles = csayarticles.filter(article => (article.priority !== undefined ? article.priority : "64") <= selectedPriority);
    /* get year articles */
    const yearArticles = priorityArticles.filter(article => new Date(article.date).getFullYear() === selectedYear);
    /* get year moth article */
    const yearMonthArticles = csayarticles.filter(article => {
        const d = new Date(article.date);
        return ( !isNaN(d) && (d.getFullYear() === selectedYear) && ((d.getMonth() + 1) === selectedMonth) );
    });

    return (
        <div
            style={{
                /* layout */
                flex: 1, 
                /* position */
                position: 'relative',
            }}
        >
            {/* time line */}
            <div 
                style={{
                    /* layout */
                    /* position */
                    position: 'absolute',
                    left: '50%',
                    top: 0,
                    bottom: 0,
                    width: 2,
                    /* color */
                    background: theme.total.primary,
                    /* style */
                    transform: 'translateX(-50%)',
                }} 
            />
            {/* 时间线内容 */}
            <div 
                style={{
                    /* layout */
                    position: 'relative', 
                }}
            >
                <Csay_Content_Item yearArticles={yearArticles} />
            </div>
        </div>
    );
}

/****************************************************************************************************
* Csay_Article_Sort()
****************************************************************************************************/
export function Csay_Article_Sort(articles) {
    
    do
    {
        /* sort date */
        articles.sort((a, b) => new Date(b.date) - new Date(a.date));
    }while(0);

    return articles;
}


/****************************************************************************************************
* Csay_Article_YearIndex_Get()
****************************************************************************************************/
export function Csay_Article_YearIndex_Get(articles) {
    /* get years */
    const years = Array.from(
        new Set(
            articles.map(a => {
                const d = new Date(a.date);
                return isNaN(d) ? null : d.getFullYear();
            })
            .filter(y => y !== null)
        )
    ).sort((a, b) => b - a);

    return years;
}

/****************************************************************************************************
* Csay_Article_MonthIndex_Get()
****************************************************************************************************/
export function Csay_Article_MonthIndex_Get(articles,selectedYear) {
    /* get months */
    const months = Array.from(
        new Set(
            articles
            .filter(a => new Date(a.date).getFullYear() === selectedYear)
            .map(a => {
                const d = new Date(a.date);
                return isNaN(d) ? null : d.getMonth() + 1;
            })
            .filter(m => m !== null)
        )
    ).sort((a, b) => a - b);

    return months;
}

/****************************************************************************************************
* Csay()
****************************************************************************************************/
export function Csay() {
    const theme = useTheme();
    /* say category */
    let csaycategory = article_cfg_category_get("csay");
    /* sort */
    let csayarticles = Csay_Article_Sort(csaycategory.articles);
    /* year */
    const years = Csay_Article_YearIndex_Get(csayarticles);
    const [selectedYear, setSelectedYear] = useState(years[0] || null);
    /* months */
    const months = Csay_Article_MonthIndex_Get(csayarticles,selectedYear);
    const [selectedMonth, setSelectedMonth] = useState(months[0] || null);
    /* priority */
    const [selectedPriority, setSelectedPriority] = useState(64);

    return (
        <div
            style={{
                /* layout */
                display: 'flex',
                width: '90%',
                padding: '24px',
                /* style */
                borderRadius: '32px',
            }}
            /* mouse — shadow only, no transform for large container */
            onMouseEnter={e => {
                e.currentTarget.style.boxShadow = theme.total.shadowMd;
            }}
            onMouseLeave={e => {
                e.currentTarget.style.boxShadow = 'none';
            }}
        >
            {/* sidebar year */}
            <Csay_Sidebar csayarticles={csayarticles} years={years} selectedYear={selectedYear} setSelectedYear={setSelectedYear} months={months} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} selectedPriority={selectedPriority} setSelectedPriority={setSelectedPriority} />
            {/* content */}
            <Csay_Content csayarticles={csayarticles} selectedYear={selectedYear} selectedMonth={selectedMonth} selectedPriority={selectedPriority} />
        </div>
    );
}

/****************************************************************************************************
* File End!
****************************************************************************************************/
