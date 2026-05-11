
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
export function Csay_Sidebar_Priority(csayarticles,selectedPriority, setSelectedPriority) {
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
                        color: theme.total.info,
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
                        background: theme.total.background,
                        /* style */
                        top: '100%',
                        right: '0',
                        width: '60px',
                        border: `1px solid ${theme.total.border}`,
                        borderRadius: '8px',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
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
export function Csay_Sidebar_Date(years,selectedYear,setSelectedYear,months,selectedMonth,setSelectedMonth) {
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
                            background: year === selectedYear ? '#1976d2' : 'transparent',
                            color: year === selectedYear ? theme.total.background : '#222',
                            /* font */
                            fontWeight: 500,
                            fontSize: 16,
                            /* style */
                            border: 'none',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            transition: 'background 0.2s',
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
                {/* sidebar year */}
                {months.map(month => (
                    <button
                        style={{
                            /* layout */
                            /* position */
                            width: 80,
                            padding: '8px 0',
                            margin: '8px 4px',
                            /* color */
                            background: month === selectedMonth ? '#1976d2' : 'transparent',
                            color: month === selectedMonth ? theme.total.background : '#222',
                            /* font */
                            fontSize: 16,
                            fontWeight: 500,
                            /* style */
                            border: 'none',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            transition: 'background 0.2s',
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
export function Csay_Sidebar(csayarticles,years,selectedYear,setSelectedYear,months,selectedMonth,setSelectedMonth,selectedPriority,setSelectedPriority) {

    return (
        <div>
            {/* priority */}
            {Csay_Sidebar_Priority(csayarticles,selectedPriority,setSelectedPriority)}
            {/* date */}
            {Csay_Sidebar_Date(years,selectedYear,setSelectedYear,months,selectedMonth,setSelectedMonth)}
        </div>
    );
}

/****************************************************************************************************
* Csay_Content_Item()
****************************************************************************************************/
export function Csay_Content_Item(articles) {
    const theme = useTheme();

    return (
        <div>
            {articles.map((article, idx) => {
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
                            justifyContent: isLeft ? 'flex-end' : 'flex-start', 
                            margin: '32px 24px', 
                        }}
                    >
                        {/* content */}
                        <a
                            href={article.path}
                            style={{
                                /* layout */
                                textAlign: 'left',
                                /* position */
                                position: 'relative',
                                width: '40%',
                                padding: 16,
                                margin:'0 20px',
                                /* color */
                                background: ' #F5F5F5',
                                /* style */
                                borderRadius: '16px',
                                boxShadow: theme.total.shadowSm,
                            }}
                        >
                            {/* date */}
                            <div 
                                style={{ 
                                    fontWeight: 600, 
                                    color: ' #1976d2', 
                                    marginBottom: 4 
                                }}
                            >
                                {month}月{day}日
                            </div>
                            <div>
                                {article.title}
                            </div>
                        </a>
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
                            background: '#1976d2',
                            /* style */
                            border: `4px solid ${theme.total.background}`,
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
export function Csay_Content(articles,selectedYear,selectedMonth,selectedPriority) {
    /* priority articles */
    const priorityArticles = articles.filter(article => (article.priority !== undefined ? article.priority : "64") <= selectedPriority);
    /* get year articles */
    const yearArticles = priorityArticles.filter(article => new Date(article.date).getFullYear() === selectedYear);
    /* get year moth article */
    const yearMonthArticles = articles.filter(article => {
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
                    background: '#1976d2',
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
                {Csay_Content_Item(yearArticles)}
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
                /* color */
                background: 'rgba(245, 245, 245, 0.6)',
                backdropFilter: 'blur(15px)',
                /* style */
                borderRadius: '32px',
                boxShadow: '0 20px 80px rgba(0, 0, 0, 0.25)',
            }}
            /* mouse */
            onMouseOver={e => {
                e.currentTarget.style.transform = 'translateY(-1px) scale(1.01)';
                e.currentTarget.style.boxShadow = '0 25px 85px rgba(0, 0, 0, 0.6)';
            }}
            onMouseOut={e => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 20px 80px rgba(0, 0, 0, 0.25)';
            }}
        >
            {/* sidebar year */}
            {Csay_Sidebar(csayarticles,years,selectedYear,setSelectedYear,months,selectedMonth,setSelectedMonth,selectedPriority,setSelectedPriority)}
            {/* content */}
            {Csay_Content(csayarticles,selectedYear,selectedMonth,selectedPriority)}
        </div>
    );
}

/****************************************************************************************************
* File End!
****************************************************************************************************/
