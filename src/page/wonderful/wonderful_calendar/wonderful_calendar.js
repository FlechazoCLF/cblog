
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
 * 2026-02-15     cc          the first version
 * 2026-03-11     cc          complete the style of calendar
 *
*/

/****************************************************************************************************
* Include
****************************************************************************************************/
/* react */
import React, { useState, useEffect } from 'react';
/* router */
import { Link } from 'react-router-dom';
/* article */
import { article_cfg_get } from '../../article/article_cfg';
/* theme */
import { useTheme } from '../../../kernel/theme/theme'

/****************************************************************************************************
* Define
****************************************************************************************************/

/****************************************************************************************************
* Type Define
****************************************************************************************************/

/****************************************************************************************************
* Variable
****************************************************************************************************/

/* calendar event type */
const Calendar_Event_Types = {
    '生日': { icon: '🎂', color: '#FF6B6B' },
    '纪念日': { icon: '💍', color: '#4ECDC4' },
    '考试': { icon: '📝', color: '#FFD166' },
    '存钱规划': { icon: '💰', color: '#6A4C93' },
    '会议': { icon: '📅', color: '#1A936F' },
};

/* calendar get month names */
const Calendar_getMonthNames = [
    '一月', '二月', '三月', '四月', '五月', '六月',
    '七月', '八月', '九月', '十月', '十一月', '十二月'
];

/* events */
let Wonderful_calendar_events = [
    /* year month day tags title cycle article */
];

/****************************************************************************************************
* Function Interface
****************************************************************************************************/

/****************************************************************************************************
* Wonderful_calendar_events_Init()
****************************************************************************************************/
function Wonderful_calendar_events_Init(articles) {
    let calendararticles = [];
    do
    {
        /* check parameter */
        if((articles == null) || (articles == undefined) || (articles.length == 0))
        {
            continue;
        }
        /* foreach article */
        for(let index_category = 0; index_category < articles.length; index_category++)
        {
            const category = articles[index_category];
            for(let index_article = 0; index_article < category.articles.length; index_article++)
            {
                const article = category.articles[index_article];
                calendararticles.push(article);
            }
        }
        /* filter */
        calendararticles = calendararticles.filter(article => (article.calendar !== ""));
        /* push events */
        Wonderful_calendar_events = [];
        calendararticles.map(article => (
            /* push */
            Wonderful_calendar_events.push(
                {
                    year: article.date.substring(0,4),
                    month: article.date.substring(5,7),
                    day: article.date.substring(8,10),
                    tags: article.tags.trim().split(/\s+/),
                    title: article.title,
                    cycle: article.calendar,
                    article: article.path
                }
            )
        ));
    }while(0);

    return (
        <>

        </>
    );
}

/****************************************************************************************************
* Wonderful_calendar_Init()
****************************************************************************************************/
export function Wonderful_calendar_Init() {

    do
    {
        /* init article data */
        const articles = article_cfg_get();
        /* init events */
        Wonderful_calendar_events_Init(articles);
    }while(0);

    return (
        <>

        </>
    );
}

/****************************************************************************************************
* Wonderful_calendar_getYears()
****************************************************************************************************/
function Wonderful_calendar_getYears() {
    let years = [];
    const currentYear = new Date().getFullYear();

    /* Get all events year */
    Wonderful_calendar_events.forEach(event => {
        if (!years.includes(event.year)) {
            years.push(event.year);
        }
    });
    /* sort years */
    years.sort((a, b) => a - b);
    /* fill years */
    for (let i = years[0] - 3; i <= currentYear + 3; i++) {
        if (!years.includes(i.toString()))
        {
            years.push(i.toString());
        }
    }
    /* sort years */
    return years.sort((a, b) => a - b);
}

/****************************************************************************************************
* Wonderful_calendar_get_days_in_month()
****************************************************************************************************/
function Wonderful_calendar_get_days_in_month(year, month) {
    return new Date(year, month, 0).getDate();
}

/****************************************************************************************************
* Wonderful_calendar_get_firstday_in_month()
****************************************************************************************************/
function Wonderful_calendar_get_firstday_in_month(year, month) {
    const day = new Date(year, month - 1, 1).getDay();
    /* first day of week is monday (1) */
    const firstDay = ((day === 0) ? (7 - 1) : (day - 1));
    return firstDay;
}

/****************************************************************************************************
* Wonderful_calendar_generate_days()
****************************************************************************************************/
function Wonderful_calendar_generate_days(year, month) {
    let days = [];
    do {
        /* check parameter */
        if ((year == undefined || month == undefined) || (year == null || month == null) || (month < 0 || month > 12)) {
            continue;
        }
        /* get days in month */
        const daysInMonth = Wonderful_calendar_get_days_in_month(year, month);
        const firstDay = Wonderful_calendar_get_firstday_in_month(year, month);
        /* null days */
        for (let i = 0; i < firstDay; i++) {
            days.push(null);
        }
        /* days */
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(i);
        }
        /* null days */
        for (let i = 0; i < 42 - firstDay - daysInMonth; i++) {
            days.push(null);
        }
    } while (0);
    return days;
}

/****************************************************************************************************
* Wonderful_calendar_get_events()
****************************************************************************************************/
function Wonderful_calendar_get_events() {
    return Wonderful_calendar_events;
}

/****************************************************************************************************
* Wonderful_calendar_get_event()
****************************************************************************************************/
function Wonderful_calendar_get_event(year,month,day) {
    /* Get all events year */
    let events = Wonderful_calendar_get_events();
    /* filter */
    events = events.filter(function(event) {
        let match = true;
        /* match */
        if(!event.cycle.includes("每日"))
        {
            if(!event.cycle.includes("每月"))
            {
                if(!event.cycle.includes("每年"))
                {
                    if((year != "") && (year != null) && (year != undefined))
                    {
                        match = (event.year == year);
                        if(match == false)
                        {
                            return false;
                        }
                    }
                }
                if((month != "") && (month != null) && (month != undefined))
                {
                    match = (event.month == month);
                    if(match == false)
                    {
                        return false;
                    }
                }
            }
            if((day != "") && (day != null) && (day != undefined))
            {
                match = (event.day == day);
                if(match == false)
                {
                    return false;
                }
            }
        }
        return match;
    });
    return events;
}

/****************************************************************************************************
* Wonderful_calendar_view_events_list()
****************************************************************************************************/
function Wonderful_calendar_view_events_list({events}) {
    const theme = useTheme();
    return (
        <>
            {events.map((event, index) => (
                <Link
                    key={index}
                    to={event.article}
                    style={{
                        /* layout */
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '10px',
                        padding: '24px',
                        /* color */
                        backgroundColor: theme.total.surfaceHover,
                        /* style */
                        borderRadius: '24px',
                    }}
                >
                    {/* tags */}
                    <div
                        style={{
                            /* layout */
                            display: 'flex',
                            flexWrap: 'wrap',
                            flexDirection: 'row',
                            gap: '6px',
                            minWidth: '120px',
                        }}
                    >
                        {event.tags && event.tags.length > 0 ? (
                            event.tags.map((tag, tagIndex) => (
                                <span
                                    key={tagIndex}
                                    style={{
                                        /* layout */
                                        padding: '4px 8px',
                                        /* color */
                                        color: theme.total.textPrimary,
                                        backgroundColor: theme.total.warningBg,
                                        /* font */
                                        fontWeight: '500',
                                        fontSize: '12px',
                                        /* style */
                                        borderRadius: '8px',
                                    }}
                                >
                                    {tag}
                                </span>
                            ))
                        ) : (
                            <span
                                style={{
                                    /* layout */
                                    padding: '4px 8px',
                                    /* color */
                                    color: theme.total.textSecondary,
                                    backgroundColor: theme.total.borderSecondary,
                                    /* font */
                                    fontSize: '12px',
                                    /* style */
                                    borderRadius: '4px',
                                }}
                            >
                                无标签
                            </span>
                        )}
                    </div>
                    {/* title */}
                    <div
                        style={{
                            /* layout */
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4px',
                        }}
                    >
                        <div
                            style={{
                                /* layout */
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                /* color */
                                color: theme.total.text,
                                /* font */
                                fontSize: '16px',
                                fontWeight: '600',
                                /* style */
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {event.title}
                        </div>
                    </div>
                    {/* cycle */}
                    <div
                        style={{
                            /* layout */
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-end',
                            gap: '2px',
                            minWidth: '80px',
                        }}
                    >
                        <span
                            style={{
                                /* color */
                                color: theme.total.info,
                                /* font */
                                fontSize: '14px',
                                fontWeight: '600',
                            }}
                        >
                            {event.cycle}
                        </span>
                    </div>
                </Link>
            ))}
        </>
    );
}

/****************************************************************************************************
* Wonderful_calendar_view_events()
****************************************************************************************************/
function Wonderful_calendar_view_events({selectedYear,selectedMonth,selectedDay,showEventModal,setShowEventModal,events}) {
    const theme = useTheme();
    /* check show modal */
    if (!showEventModal || !selectedDay) return null;
    /* get events for the day */
    const dayEvents = Wonderful_calendar_get_event(selectedYear,selectedMonth,selectedDay);
    return (
        <div
            style={{
                /* layout */
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                /* color */
                background: `${theme.total.primaryLight}88`,
                /* style */
                zIndex: 1000,
                animation: 'fadeIn 0.3s ease',
            }}
            onClick={() => {
                /* close modal */
                setShowEventModal(false);
            }}
        >
            <div
                style={{
                    /* layout */
                    width: '90%',
                    maxWidth: '600px',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    /* color */
                    background: theme.total.background,
                    /* style */
                    borderRadius: '20px',
                    boxShadow: theme.total.shadowSm,
                    animation: 'slideUp 0.3s ease',
                }}
                onClick={e => e.stopPropagation()}
            >
                {/* event modal title */}
                <div
                    style={{
                        /* layout */
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '20px 25px',
                        /* color */
                        color: theme.total.textInverse,
                        background: `linear-gradient(135deg, ${theme.total.primary} 0%, ${theme.total.info} 100%)`,
                        /* style */
                        borderBottom: `1px solid ${theme.total.borderSecondary}`,
                    }}
                >
                    {/* title */}
                    <h3>
                        {selectedYear} 年 {selectedMonth} 月 {selectedDay} 日 的日程💝
                    </h3>
                    {/* close */}
                    <button
                        style={{
                            /* color */
                            color: theme.total.textInverse,
                            background: 'none',
                            /* style */
                            border: 'none',
                            fontSize: '2rem',
                            cursor: 'pointer',
                        }}
                        onClick={() => {
                            setShowEventModal(false);
                        }}
                    >
                        ×
                    </button>
                </div>
                {/* event list */}
                <div
                    style={{
                        /* layout */
                        padding: '32px',
                    }}
                >
                    {
                        (dayEvents.length > 0) ? (
                            <div
                                style={{
                                    /* layout */
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '10px',
                                }}
                            >
                                {/* events */}
                                <Wonderful_calendar_view_events_list events={dayEvents} />
                            </div>
                        ) : (
                            <div
                                style={{
                                    textAlign: 'center',
                                    padding: '40px 20px',
                                    color: theme.total.textSecondary,
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: '3rem',
                                        marginBottom: '15px',
                                        color: theme.total.textDisabled,
                                    }}
                                >
                                    📅
                                </div>
                                <p>今天没有事件</p>
                                <p>点击下方添加新事件</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

/****************************************************************************************************
* Wonderful_calendar_view_years_list()
****************************************************************************************************/
function Wonderful_calendar_view_years_list({selectedYear, setSelectedYear, setCurrentView, events}) {
    const theme = useTheme();
    /* get all years */
    const years = Wonderful_calendar_getYears();
    const currentYear = new Date().getFullYear();

    return (
        <>
            {years.map(year => {
                /* get events for the year */
                const yearEvents = Wonderful_calendar_get_event(year,"","");

                return (
                    <div
                        key={year}
                        style={{
                            /* layout */
                            textAlign: 'center',
                            padding: '16px',
                            /* color */
                            background: (year == currentYear) ? theme.total.primaryLight : theme.total.surfaceHover,
                            /* style */
                            borderRadius: '12px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            border: `2px solid ${(year === selectedYear) ? theme.total.info : 'transparent'}`,
                        }}
                        onClick={() => {
                            /* set year */
                            setSelectedYear(year);
                            /* to month */
                            setCurrentView('month');
                        }}
                    >
                        {/* Year */}
                        <div
                            style={{
                                /* layout */
                                marginBottom: '10px',
                                /* font */
                                fontSize: '2.2rem',
                                fontWeight: 'bold',
                                /* style */
                                color: theme.total.textPrimary,
                            }}
                        >
                            {year}
                        </div>
                        {/* events */}
                        <div
                            style={{
                                /* font */
                                fontSize: '0.9rem',
                                /* style */
                                color: theme.total.textSecondary,
                            }}
                        >
                            {yearEvents.length} 篇
                        </div>
                    </div>
                );
            })}
        </>
    );
}

/****************************************************************************************************
* Wonderful_calendar_view_years()
****************************************************************************************************/
function Wonderful_calendar_view_years({selectedYear, setSelectedYear, setCurrentView, events}) {
    const theme = useTheme();

    return (
        <>
            {/* year select */}
            <div
                style={{
                    /* layout */
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px 24px',
                    /* style */
                    background: `linear-gradient(135deg, ${theme.total.primary} 0%, ${theme.total.info} 100%)`,
                    color: theme.total.textInverse,
                    borderBottom: `1px solid ${theme.total.background}88`,
                    borderRadius: '16px',
                }}
            >
                <h2>
                    选择年份
                </h2>
            </div>
            {/* years list */}
            <div
                style={{
                    /* layout */
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                    gap: '16px',
                    marginTop: '16px',
                }}
            >
                <Wonderful_calendar_view_years_list selectedYear={selectedYear} setSelectedYear={setSelectedYear} setCurrentView={setCurrentView} events={events} />
            </div>
        </>
    );
}

/****************************************************************************************************
* Wonderful_calendar_view_months_list()
****************************************************************************************************/
function Wonderful_calendar_view_months_list({selectedYear, selectedMonth, setSelectedMonth, setCurrentView, events}) {
    const theme = useTheme();
    const monthNames = Calendar_getMonthNames;
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    return (
        <>
            {monthNames.map((month, index) => {
                const monthNumber = index + 1;
                const monthEvents = Wonderful_calendar_get_event(selectedYear,monthNumber,"");

                return (
                    <div
                        key={monthNumber}
                        style={{
                            /* layout */
                            padding: '20px',
                            textAlign: 'center',
                            /* color */
                            background: ((selectedYear == currentYear) && (monthNumber == currentMonth)) ? theme.total.primaryLight : theme.total.surfaceHover,
                            /* style */
                            borderRadius: '12px',
                            cursor: 'pointer',
                            border: `2px solid ${((monthNumber) === selectedMonth) ? theme.total.info : 'transparent'}`,
                        }}
                        onClick={() => {
                            /* day */
                            setSelectedMonth(monthNumber);
                            setCurrentView('day');
                        }}
                    >
                        <div
                            style={{
                                /* layout */
                                marginBottom: '10px',
                                /* font */
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                                /* color */
                                color: theme.total.textPrimary,
                            }}
                        >
                            {month}
                        </div>
                        <div
                            style={{
                                /* color */
                                color: theme.total.textSecondary,
                                /* font */
                                fontSize: '0.9rem',
                            }}
                        >
                            {monthEvents.length} 篇
                        </div>
                    </div>
                );
            })}
        </>
    );
}
/****************************************************************************************************
* Wonderful_calendar_view_months()
****************************************************************************************************/
function Wonderful_calendar_view_months({selectedYear, selectedMonth, setSelectedMonth, setCurrentView, events}) {
    const theme = useTheme();

    return (
        <>
            <div
                style={{
                    /* layout */
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px 24px',
                    /* style */
                    background: `linear-gradient(135deg, ${theme.total.primary} 0%, ${theme.total.info} 100%)`,
                    color: theme.total.textInverse,
                    borderBottom: `1px solid ${theme.total.background}88`,
                    borderRadius: '16px',
                }}
            >
                <h2>
                    {selectedYear} 年
                </h2>
                {/* to year view */}
                <button
                    style={{
                        /* layout */
                        display: 'flex',
                        alignItems: 'center',
                        /* color */
                        color: theme.total.textInverse,
                        background: `1px solid ${theme.total.background}88`,
                        border: 'none',
                        /* style */
                        borderRadius: '8px',
                        padding: '8px 16px',
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        /* return to year view */
                        setSelectedMonth(null);
                        setCurrentView('year');
                    }}
                >
                    ← 返回年份
                </button>
            </div>

            <div
                style={{
                    /* layout */
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                    gap: '20px',
                    marginTop: '20px',
                }}
            >
                <Wonderful_calendar_view_months_list selectedYear={selectedYear} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} setCurrentView={setCurrentView} events={events} />
            </div>
        </>
    );
}

/****************************************************************************************************
* Wonderful_calendar_view_days_list()
****************************************************************************************************/
function Wonderful_calendar_view_days_list({selectedYear, selectedMonth, selectedDay, setSelectedDay, setCurrentView, setShowEventModal, events}) {
    const theme = useTheme();
    /* get days */
    const days = Wonderful_calendar_generate_days(selectedYear, selectedMonth);
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const currentDay = new Date().getDate();

    return (
        <>
            {days.map((day, index) => {
                const dayEvents = Wonderful_calendar_get_event(selectedYear,selectedMonth,day);

                return (
                    <div
                        key={index}
                        style={{
                            /* layout */
                            aspectRatio: '1',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            /* style */
                            borderRadius: '12px',
                            cursor: 'pointer',
                            background: ((selectedYear == currentYear) && (selectedMonth == currentMonth) && (day == currentDay)) ?
                                theme.total.primaryLight : 
                                (day && (dayEvents.length > 0)) ? theme.total.selection : theme.total.tagBg,
                        }}
                        onClick={() => {
                            /* set day */
                            setSelectedDay(day);
                            if (!day) return;
                            /* show event modal */
                            setShowEventModal(true);
                        }}
                    >
                        {day && (
                            <>
                                {/* day */}
                                <div
                                    style={{
                                        /* color */
                                        color: theme.total.textPrimary,
                                        /* font */
                                        fontSize: '1.2rem',
                                        fontWeight: '500',
                                    }}
                                >
                                    {day}
                                </div>
                                {/* event */}
                                <div
                                    style={{
                                        /* color */
                                        color: theme.total.textSecondary,
                                        /* font */
                                        fontSize: '0.9rem',
                                    }}
                                >
                                    {dayEvents.length} 篇
                                </div>
                            </>
                        )}
                    </div>
                );
            })}
        </>
    );
}

/****************************************************************************************************
* Wonderful_calendar_view_days()
****************************************************************************************************/
function Wonderful_calendar_view_days({selectedYear, selectedMonth, selectedDay, setSelectedDay, setCurrentView, setShowEventModal, events}) {
    const theme = useTheme();

    return (
        <>
            <div
                style={{
                    /* layout */
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px 24px',
                    /* color */
                    background: `linear-gradient(135deg, ${theme.total.primary} 0%, ${theme.total.info} 100%)`,
                    color: theme.total.textInverse,
                    /* style */
                    borderBottom: `1px solid ${theme.total.background}88`,
                    borderRadius: '16px',
                }}
            >
                {/* title */}
                <h2>
                    {selectedYear} 年 {selectedMonth} 月
                </h2>
                {/* button */}
                <button
                    style={{
                        /* layout */
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 16px',
                        /* color */
                        color: theme.total.textInverse,
                        background: `1px solid ${theme.total.background}88`,
                        /* style */
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        /* return to month view */
                        setSelectedDay(null);
                        setCurrentView('month');
                    }}
                >
                    ← 返回月份
                </button>
            </div>
            {/* week titles */}
            <div
                style={{
                    /* layout */
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7, 1fr)',
                    padding: '10px 0',
                    marginTop: '16px',
                    /* style */
                    background: theme.total.surfaceSecondary,
                    borderTop: `1px solid ${theme.total.borderSecondary}`,
                    borderBottom: `1px solid ${theme.total.borderSecondary}`,
                }}
            >
                {['一', '二', '三', '四', '五', '六', '日'].map(day => (
                    <div
                        key={day}
                        style={{
                            /* layout */
                            textAlign: 'center',
                            fontWeight: 'bold',
                            /* color */
                            color: theme.total.textSecondary,
                            /* font */
                            fontSize: '1.1rem',
                        }}
                    >
                        {day}
                    </div>
                ))}
            </div>
            {/* days */}
            <div
                style={{
                    /* layout */
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7, 1fr)',
                    gap: '8px',
                    marginTop: '16px',
                }}
            >
                <Wonderful_calendar_view_days_list selectedYear={selectedYear} selectedMonth={selectedMonth} selectedDay={selectedDay} setSelectedDay={setSelectedDay} setCurrentView={setCurrentView} setShowEventModal={setShowEventModal} events={events} />
            </div>
        </>
    );
}

/****************************************************************************************************
* Wonderful_calendar_title()
****************************************************************************************************/
export function Wonderful_calendar_title() {
    return (
        /* title */
        <div
            style={{
                textAlign: 'center',
                marginBottom: '16px',
            }}
        >
            {/* title */}
            <h1
                style={{
                    fontSize: '2.5rem',
                    marginBottom: '10px'
                }}
            >
                📅 我的日程
            </h1>
            {/* description */}
            <p
                style={{
                    fontSize: '1.1rem',
                    opacity: 0.9
                }}
            >
                记录高光时刻，规划人生
            </p>
        </div>
    );
}

/****************************************************************************************************
* Wonderful_calendar()
****************************************************************************************************/
export function Wonderful_calendar() {
    const theme = useTheme();
    /* view */
    const [currentView, setCurrentView] = useState('year'); // 'year', 'month', 'day'
    /* year month day */
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null);
    /* events */
    const [showEventModal, setShowEventModal] = useState(false);
    const events = Wonderful_calendar_get_events();

    return (
        <div
            style={{
                /* layout */
                width: '90%',
                padding: '24px',
                margin: '0 auto',
                maxWidth: '960px',
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
            {/* title */}
            <Wonderful_calendar_title />
            {/* calendar */}
            {currentView === 'year' && <Wonderful_calendar_view_years selectedYear={selectedYear} setSelectedYear={setSelectedYear} setCurrentView={setCurrentView} events={events} />}
            {currentView === 'month' && <Wonderful_calendar_view_months selectedYear={selectedYear} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} setCurrentView={setCurrentView} events={events} />}
            {currentView === 'day' && <Wonderful_calendar_view_days selectedYear={selectedYear} selectedMonth={selectedMonth} selectedDay={selectedDay} setSelectedDay={setSelectedDay} setCurrentView={setCurrentView} setShowEventModal={setShowEventModal} events={events} />}
            {/* events */}
            <Wonderful_calendar_view_events selectedYear={selectedYear} selectedMonth={selectedMonth} selectedDay={selectedDay} showEventModal={showEventModal} setShowEventModal={setShowEventModal} events={events} />
        </div>
    );
}

/****************************************************************************************************
* File End!
****************************************************************************************************/
